import { BigInt, log, ethereum, Address } from '@graphprotocol/graph-ts';
import {
  CreateVaultType,
  Paused,
  Transfer,
  Unpaused,
} from '../generated/AVAI/AVAI';
import { Bank as BankTemplate } from '../generated/templates';
import { Token, Bank, TokenPrice } from '../generated/schema';
import { Chainlink } from '../generated/AVAI/Chainlink';
import {
  ZERO_BI,
  fetchTokenSymbol,
  fetchTokenName,
  fetchTokenDecimals,
  ADDRESS_ZERO,
  createUser,
  createStablecoin,
  getTokenPrice,
  CHAINLINK_ADDRESSES,
} from './helpers';

// Handles creating the vault
export function handleCreateVaultType(event: CreateVaultType): void {
  // Load Stablecoin or create if first Bank
  let stablecoin = createStablecoin();

  stablecoin.bankCount += 1;
  stablecoin.save();

  // Create the token
  let token = Token.load(event.params.token.toHexString());
  if (token === null) {
    token = new Token(event.params.token.toHexString());
    token.symbol = fetchTokenSymbol(event.params.token);
    token.name = fetchTokenName(event.params.token);
    let decimals = fetchTokenDecimals(event.params.token);

    if (decimals === null) return;
    token.decimals = decimals;
    token.price = getTokenPrice(fetchTokenSymbol(event.params.token)).id;
  }

  let bank = new Bank(event.params.bank.toHexString());
  bank.minimumCollateralPercentage = event.params.minimumCollateralPercentage;

  bank.debtCeiling = BigInt.fromString('10000000000000000000');
  bank.closingFee = BigInt.fromI32(75);
  bank.openingFee = ZERO_BI;
  bank.totalDebt = ZERO_BI;
  bank.totalCollateral = ZERO_BI;
  bank.tokenPeg = BigInt.fromString('100000000');
  bank.debtRatio = BigInt.fromI32(2);
  bank.gainRatio = BigInt.fromI32(11);
  bank.vaultCount = 0;
  bank.treasury = ZERO_BI;

  bank.token = token.id;
  bank.stablecoin = stablecoin.id;

  BankTemplate.create(event.params.bank);

  token.save();
  bank.save();
  stablecoin.save();
}

export function handlePaused(event: Paused): void {
  // Load Stablecoin or create if first Bank
  let stablecoin = createStablecoin();
  stablecoin.paused = true;
  stablecoin.save();
}

export function handleTransfer(event: Transfer): void {
  let stablecoin = createStablecoin();
  let eventToAsHexString = event.params.to.toHexString();
  let eventFromAsHexString = event.params.from.toHexString();

  // user stats
  let from = event.params.from;
  let to = event.params.to;
  // Mint
  if (eventFromAsHexString == ADDRESS_ZERO) {
    let user = createUser(to);
    user.balanceStable = user.balanceStable.plus(event.params.value);
    stablecoin.totalSupply = stablecoin.totalSupply.plus(event.params.value);
    stablecoin.save();
    user.save();
    return;
  }

  // Burn
  if (eventToAsHexString == ADDRESS_ZERO) {
    let user = createUser(from);
    user.balanceStable = user.balanceStable.minus(event.params.value);
    stablecoin.totalSupply = stablecoin.totalSupply.minus(event.params.value);
    stablecoin.save();
    user.save();
    return;
  }

  let user1 = createUser(to);
  let user2 = createUser(from);

  user1.balanceStable = user1.balanceStable.plus(event.params.value);
  user2.balanceStable = user2.balanceStable.minus(event.params.value);
  user1.save();
  user2.save();
}

export function handleUnpaused(event: Unpaused): void {
  // Load Stablecoin or create if first Bank
  let stablecoin = createStablecoin();
  stablecoin.paused = false;
  stablecoin.save();
}

export function handleBlock(block: ethereum.Block): void {
  CHAINLINK_ADDRESSES.entries.forEach((token) => {
    let tokenPrice = TokenPrice.load(token.key);
    if (tokenPrice === null) {
      tokenPrice = new TokenPrice(token.key);
      tokenPrice.priceUSD = ZERO_BI;
      tokenPrice.save();
    }
    let chainlink = Chainlink.bind(Address.fromString(token.value));
    let priceTemp = chainlink.try_latestRoundData();
    if (!priceTemp.reverted) {
      tokenPrice.priceUSD = priceTemp.value.value1;
    }
    tokenPrice.save();
  });
}
