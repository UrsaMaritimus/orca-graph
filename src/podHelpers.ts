import { BigInt, Bytes } from '@graphprotocol/graph-ts';

import { PodLeader } from '../generated/schema';
import { ADDRESS_ZERO } from './helpers';

const POD_LEADER_ADDRESS = '0x2cD766a722622395E74daD1647aae3AAAc097930';
const ORCA_ADDRESS = '0xb3308FD93936e5EFb9A1F2C6a513DEf68175Cb5d';

export function createPodLeader(): PodLeader {
  let podLeader = PodLeader.load(POD_LEADER_ADDRESS);
  if (podLeader === null) {
    podLeader = new PodLeader(POD_LEADER_ADDRESS);
    podLeader.treasury = Bytes.fromHexString(ADDRESS_ZERO) as Bytes;
    podLeader.startTimestamp = BigInt.fromI32(0);
    podLeader.endTimestamp = BigInt.fromI32(0);
    podLeader.orca = Bytes.fromHexString(ORCA_ADDRESS) as Bytes;
    podLeader.orcaPerSec = BigInt.fromString('1000000000000000000');
    podLeader.totalAllocPoints = BigInt.fromI32(0);
    podLeader.poolCount = BigInt.fromI32(0);
    podLeader.save();
  }

  return podLeader as PodLeader;
}
