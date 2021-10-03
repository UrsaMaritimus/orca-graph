import { BigInt, BigDecimal, Address, TypedMap } from '@graphprotocol/graph-ts';
import { AVAI } from '../generated/AVAI/AVAI';
import { ERC20 } from '../generated/AVAI/ERC20';
import { Chainlink } from '../generated/AVAI/Chainlink';
import { Bank, Stablecoin, User, Vault, TokenPrice } from '../generated/schema';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
export const FACTORY_ADDRESS = '0x346A59146b9b4a77100D369a3d18E8007A9F46a6';
export const ADDRESS_TEAM = ADDRESS_ZERO;

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let ZERO_BD = BigDecimal.fromString('0');
export let ONE_BD = BigDecimal.fromString('1');
export let BI_18 = BigInt.fromI32(18);
export let TEN_BI = BigInt.fromI32(10);

export let CHAINLINK_ADDRESSES = new TypedMap<string, string>();
CHAINLINK_ADDRESSES.set('WAVAX', '0x0A77230d17318075983913bC2145DB16C7366156');

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString('1');
  for (let i = ZERO_BI; i.lt(decimals); i = i.plus(ONE_BI)) {
    bd = bd.times(BigDecimal.fromString('10'));
  }
  return bd;
}

export function bigDecimalExp18(): BigDecimal {
  return BigDecimal.fromString('1000000000000000000');
}

export function convertEthToDecimal(eth: BigInt): BigDecimal {
  return eth.toBigDecimal().div(exponentToBigDecimal(BigInt.fromI32(18)));
}

export function convertTokenToDecimal(
  tokenAmount: BigInt,
  exchangeDecimals: BigInt
): BigDecimal {
  if (exchangeDecimals == ZERO_BI) {
    return tokenAmount.toBigDecimal();
  }
  return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals));
}

export function equalToZero(value: BigDecimal): boolean {
  const formattedVal = parseFloat(value.toString());
  const zero = parseFloat(ZERO_BD.toString());
  if (zero == formattedVal) {
    return true;
  }
  return false;
}

export function isNullEthValue(value: string): boolean {
  return (
    value ==
    '0x0000000000000000000000000000000000000000000000000000000000000001'
  );
}

export function fetchTokenTotalSupply(tokenAddress: Address): BigInt {
  let contract = ERC20.bind(tokenAddress);
  let totalSupplyValue = null;
  let totalSupplyResult = contract.try_totalSupply();
  if (!totalSupplyResult.reverted) {
    totalSupplyValue = totalSupplyResult;
  }
  return BigInt.fromI32(totalSupplyValue);
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
  // hardcode overrides
  // ...

  let contract = ERC20.bind(tokenAddress);
  // try types uint8 for decimals
  let decimalValue = null;
  let decimalResult = contract.try_decimals();
  if (!decimalResult.reverted) {
    decimalValue = decimalResult.value;
  }
  return BigInt.fromI32(decimalValue);
}

export function fetchTokenSymbol(tokenAddress: Address): string {
  // hard coded overrides
  // ...

  let contract = ERC20.bind(tokenAddress);

  // try types string and bytes32 for symbol
  let symbolValue = 'unknown';
  let symbolResult = contract.try_symbol();
  if (!symbolResult.reverted) {
    symbolValue = symbolResult.value;
  }

  return symbolValue;
}

export function fetchTokenName(tokenAddress: Address): string {
  let contract = ERC20.bind(tokenAddress);

  // try types string and bytes32 for name
  let nameValue = 'unknown';
  let nameResult = contract.try_name();
  if (!nameResult.reverted) {
    nameValue = nameResult.value;
  }

  return nameValue;
}

export function fetchStableCount(avaiAddress: Address): BigInt {
  let contract = AVAI.bind(avaiAddress);
  // try types uint8 for decimals
  let bankCount = BigInt.fromI32(0);
  let bankCountResult = contract.try_vaultCount();
  if (!bankCountResult.reverted) {
    bankCount = bankCountResult.value;
  }
  return bankCount;
}

export function createUser(address: Address): User {
  let user = User.load(address.toHexString());
  if (user === null) {
    user = new User(address.toHexString());
    user.balanceStable = ZERO_BI;
    user.save();
  }
  return user as User;
}

export function createStablecoin(): Stablecoin {
  let stablecoin = Stablecoin.load(FACTORY_ADDRESS);
  if (stablecoin === null) {
    stablecoin = new Stablecoin(FACTORY_ADDRESS);
    stablecoin.bankCount = 0;
    stablecoin.decimals = BI_18;
    stablecoin.totalSupply = ZERO_BI;
    stablecoin.name = 'AVAI';
    stablecoin.symbol = 'AVAI';
    stablecoin.paused = false;
    stablecoin.save();
  }

  return stablecoin as Stablecoin;
}

export function createVault(vaultID: BigInt, bank: Bank, user: User): Vault {
  let vault = Vault.load(vaultID.toHexString() + '-' + bank.id);

  if (vault === null) {
    vault = new Vault(vaultID.toHexString() + '-' + bank.id);
    vault.bank = bank.id;
    vault.collateral = ZERO_BI;
    vault.number = vaultID.toI32();
    vault.debt = ZERO_BI;
    vault.user = user.id;
    vault.save();
  }
  return vault as Vault;
}

export function getTokenPrice(name: string): TokenPrice {
  let price = BigInt.fromI32(0);
  // Get price
  let clinkAddress = CHAINLINK_ADDRESSES.getEntry(name);
  if (clinkAddress !== null) {
    let chainlink = Chainlink.bind(Address.fromString(clinkAddress.value));

    let priceTemp = chainlink.try_latestRoundData();
    if (!priceTemp.reverted) {
      price = priceTemp.value.value1;
    }
  }
  // Make token
  let tokenPrice = TokenPrice.load(name);
  if (tokenPrice === null) {
    tokenPrice = new TokenPrice(name);
  }
  tokenPrice.priceUSD = price;
  tokenPrice.save();

  return tokenPrice as TokenPrice;
}
