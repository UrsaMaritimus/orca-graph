import { store, BigInt, log } from '@graphprotocol/graph-ts';

import { Redeem, Mint } from '../generated/Exchange/Exchange';

import { Exchange } from '../generated/schema';
import { ZERO_BI } from './helpers';

export function handleMint(event: Mint): void {
  let exchange = Exchange.load(event.address.toHexString());
  if (exchange === null) {
    exchange = new Exchange(event.address.toHexString());
    exchange.treasury = ZERO_BI;
    exchange.usdHeld = ZERO_BI;
    exchange.mintingFee = BigInt.fromI32(75);
    exchange.redeemingFee = BigInt.fromI32(75);
    exchange.save();
  }

  let amount = event.params.amount.div(BigInt.fromString('1000000000000'));

  let fee = event.params.fee;

  exchange.usdHeld = exchange.usdHeld.plus(amount);
  exchange.treasury = exchange.treasury.plus(fee);
  exchange.save();
}

export function handleRedeem(event: Redeem): void {
  let exchange = Exchange.load(event.address.toHexString());
  if (exchange === null) {
    exchange = new Exchange(event.address.toHexString());
    exchange.treasury = ZERO_BI;
    exchange.usdHeld = ZERO_BI;
    exchange.mintingFee = BigInt.fromI32(75);
    exchange.redeemingFee = BigInt.fromI32(75);
    exchange.save();
  }
  let amount = event.params.amount;
  let fee = event.params.fee;
  exchange.usdHeld = exchange.usdHeld.minus(amount).minus(fee);
  exchange.treasury = exchange.treasury.plus(fee);
  exchange.save();
}
