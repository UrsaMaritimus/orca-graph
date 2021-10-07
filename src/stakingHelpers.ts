import { BigInt, log } from '@graphprotocol/graph-ts';

import { Staking } from '../generated/schema';

// TODO main net
export const STAKING_ADDRESS = '0xd6dd95c483befe87bf8cf9ce74438b057c93510e';

export function createStaking(): Staking {
  let staking = Staking.load(STAKING_ADDRESS);
  log.info('Staking address: {}', [STAKING_ADDRESS]);
  if (staking === null) {
    staking = new Staking(STAKING_ADDRESS);
    staking.startTimestamp = BigInt.fromI32(0);
    staking.endTimestamp = BigInt.fromI32(0);
    staking.avaxPerSec = BigInt.fromString('1000000000000000000');
    staking.totalAllocPoints = BigInt.fromI32(0);
    staking.totalStaked = BigInt.fromI32(0);
    staking.save();
  }

  return staking as Staking;
}
