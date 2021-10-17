import { BigInt, log } from '@graphprotocol/graph-ts';

import { Staking } from '../generated/schema';

// TODO main net
export const STAKING_ADDRESS = '0xA3654801Ba6FB21d5A984F9a857441395dDeccFb';

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
    staking.userCount = BigInt.fromI32(0);
    staking.save();
  }

  return staking as Staking;
}
