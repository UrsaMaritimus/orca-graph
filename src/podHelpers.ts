import { BigInt, Bytes } from '@graphprotocol/graph-ts';

import { PodLeader } from '../generated/schema';
import { ADDRESS_ZERO } from './helpers';

export const POD_LEADER_ADDRESS = '0x111E1E97435b57467E79d4930acc4B7EB3d478ad';
const ORCA_ADDRESS = '0x8B1d98A91F853218ddbb066F20b8c63E782e2430';

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
