import { store, BigInt, log } from '@graphprotocol/graph-ts';
import {
  Bank as BankContract,
  CreateVault,
  DestroyVault,
  TransferVault,
  LiquidateVault,
  DepositCollateral,
  WithdrawCollateral,
  BorrowToken,
  PayBackToken,
  NewDebtCeiling,
  GetPaid,
  NewClosingFee,
} from '../generated/templates/Bank/Bank';

import { Bank, Liquidation, Token } from '../generated/schema';
import { createUser, createVault, getTokenPrice } from './helpers';

export function handleCreateVault(event: CreateVault): void {
  let bank = Bank.load(event.address.toHexString());
  let user = createUser(event.params.creator);
  createVault(event.params.vaultID, bank as Bank, user);

  bank.vaultCount += 1;
  bank.save();
}
export function handleDestroyVault(event: DestroyVault): void {
  let bank = Bank.load(event.address.toHexString());
  store.remove('Vault', event.params.vaultID.toHexString());
  bank.vaultCount -= 1;
  bank.save();
}

export function handleTransferVault(event: TransferVault): void {
  let to = event.params.to;
  let from = event.params.from;
  let id = event.params.vaultID;
  let bank = Bank.load(event.address.toHexString());

  let user1 = createUser(from);
  let user2 = createUser(to);

  let vault = createVault(id, bank as Bank, user1);
  vault.user = user2.id;
}

// Handles liquidation of vaults
export function handleLiquidateVaults(event: LiquidateVault): void {
  let halfDebt = event.params.amountPaid;
  let caller = event.params.buyer;
  let closingFee = event.params.closingFee;
  let vaultID = event.params.vaultID;
  let tokenExtract = event.params.tokenExtract;

  let bank = Bank.load(event.address.toHexString());
  let token = Token.load(bank.token);
  let user = createUser(caller);
  let vault = createVault(vaultID, bank as Bank, user);

  // Updates token price
  getTokenPrice(token.symbol);

  // Update this vault's collateral and debt
  vault.collateral = vault.collateral.minus(closingFee).minus(tokenExtract);
  bank.treasury = bank.treasury.plus(closingFee);

  // The fee goes to the treasury, not technically TVL
  bank.totalCollateral = bank.totalCollateral.minus(tokenExtract);

  // Update debt
  vault.debt = vault.debt.minus(halfDebt);
  bank.totalDebt = bank.totalDebt.minus(halfDebt);

  let liquidation = Liquidation.load(
    caller.toHexString() + tokenExtract.toHexString()
  );
  if (liquidation === null) {
    liquidation = new Liquidation(
      caller.toHexString() + tokenExtract.toHexString()
    );
    liquidation.user = user.id;
    liquidation.token = token.id;
  }
  liquidation.owed = tokenExtract;

  liquidation.save();
  vault.save();
  bank.save();
}

// Handles depositing collateral
export function handleDepositCollateral(event: DepositCollateral): void {
  let amount = event.params.amount;
  let id = event.params.vaultID;
  let bank = Bank.load(event.address.toHexString());
  let token = Token.load(bank.token);
  let user = createUser(event.transaction.from);
  let vault = createVault(id, bank as Bank, user);

  // Updates token price
  getTokenPrice(token.symbol);

  // Update this vault's collateral
  vault.collateral = vault.collateral.plus(amount);
  bank.totalCollateral = bank.totalCollateral.plus(amount);

  vault.save();
  bank.save();
}

// Lets handle withdrawing of collateral now!
export function handleWithdrawCollateral(event: WithdrawCollateral): void {
  let amount = event.params.amount;
  let id = event.params.vaultID;

  let bank = Bank.load(event.address.toHexString());
  let token = Token.load(bank.token);
  let user = createUser(event.transaction.from);
  let vault = createVault(id, bank as Bank, user);

  // Updates token price
  getTokenPrice(token.symbol);

  // Update this vault's collateral
  vault.collateral = vault.collateral.minus(amount);
  bank.totalCollateral = bank.totalCollateral.minus(amount);

  vault.save();
  bank.save();
}
export function handleBorrowToken(event: BorrowToken): void {
  let amount = event.params.amount;
  let id = event.params.vaultID;

  let bank = Bank.load(event.address.toHexString());
  let token = Token.load(bank.token);
  let user = createUser(event.transaction.from);
  let vault = createVault(id, bank as Bank, user);

  // Updates token price
  getTokenPrice(token.symbol);

  // Update this vault's collateral
  vault.debt = vault.debt.plus(amount);
  bank.totalDebt = bank.totalDebt.plus(amount);

  vault.save();
  bank.save();
}

export function handlePayBackToken(event: PayBackToken): void {
  let amount = event.params.amount;
  let id = event.params.vaultID;
  let closingFee = event.params.closingFee;

  let bank = Bank.load(event.address.toHexString());
  let token = Token.load(bank.token);
  let user = createUser(event.transaction.from);
  let vault = createVault(id, bank as Bank, user);

  // Updates token price
  getTokenPrice(token.symbol);

  // Update this vault's collateral
  vault.debt = vault.debt.minus(amount);
  bank.totalDebt = bank.totalDebt.minus(amount);

  vault.collateral = vault.collateral.minus(closingFee);
  bank.treasury = bank.treasury.plus(closingFee);

  vault.save();
  bank.save();
}

export function handleNewDebtCeiling(event: NewDebtCeiling): void {
  let newDebtCeiling = event.params.newDebtCeiling;
  let bank = Bank.load(event.address.toHexString());
  bank.debtCeiling = newDebtCeiling;
  bank.save();
}

// Needs work
export function handleGetPaid(event: GetPaid): void {
  let caller = event.params.user;
  let amount = event.params.amount;
  let liquidation = Liquidation.load(
    caller.toHexString() + amount.toHexString()
  );
  log.info('liquidation value, please work: {}', [
    caller.toHexString() + amount.toHexString(),
  ]);

  // Remove it
  store.remove('Liquidation', caller.toHexString() + amount.toHexString());
}
export function handleNewClosingFee(event: NewClosingFee): void {
  let newClosingFee = event.params.newClosingFee;
  let bank = Bank.load(event.address.toHexString());
  bank.closingFee = newClosingFee;
  bank.save();
}
