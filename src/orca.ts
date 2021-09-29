import { BigInt, Bytes } from '@graphprotocol/graph-ts';
import { Transfer } from '../generated/Orca/Orca';
import { ADDRESS_TEAM, ADDRESS_ZERO } from './helpers';
import { Orca } from '../generated/schema';
import { POD_LEADER_ADDRESS } from './podHelpers';
// If in:
// Treasury
// PodLeader
// Escrow
// Not circulating

// Filter for to, except for from zero addres

export function handleTransfer(event: Transfer): void {
  let from = event.params.from.toHexString();
  let to = event.params.to.toHexString();
  let amount = event.params.value;

  let orca = Orca.load(event.address.toHexString());
  if (orca === null) {
    orca = new Orca(event.address.toHexString());
    orca.circulatingSupply = BigInt.fromI32(0);
    orca.maxSupply = BigInt.fromI32(0);
    orca.treasury = Bytes.fromHexString(to) as Bytes;
    orca.team = Bytes.fromHexString(ADDRESS_TEAM) as Bytes;
    orca.leader = Bytes.fromHexString(POD_LEADER_ADDRESS) as Bytes;
    orca.save();
  }

  if (from == ADDRESS_ZERO) {
    orca.maxSupply = amount;
  } else if (
    to == orca.team.toHexString() ||
    to == orca.leader.toHexString() ||
    to == orca.treasury.toHexString()
  ) {
    return;
  } else {
    orca.circulatingSupply = orca.circulatingSupply.plus(amount);
  }

  orca.save();
}
