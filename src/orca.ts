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
    orca.circulatingSupply = BigInt.fromString('25000000000000000000000');
    orca.maxSupply = BigInt.fromI32(0);
    orca.treasury = Bytes.fromHexString(
      '0x08eaea50d8f5d423f6904246c7b5f05f9bdb3957'
    ) as Bytes;
    orca.team = Bytes.fromHexString(ADDRESS_TEAM) as Bytes;
    orca.leader = Bytes.fromHexString(POD_LEADER_ADDRESS) as Bytes;
    orca.save();
  }

  if (from == ADDRESS_ZERO) {
    orca.maxSupply = amount;
  } else if (
    from == '0x318dfbe56155f9999fa913cddcaa5764a2b52134' ||
    from == '0x4422fb9afb547e8ed7a61ac9de0255c760ea55c1' ||
    from == '0x111e1e97435b57467e79d4930acc4b7eb3d478ad' ||
    from == '0x8b1d98a91f853218ddbb066f20b8c63e782e2430' ||
    from == '0x4fb25469d273225e2b777d80e27754776ecbcee5'
  ) {
    orca.circulatingSupply = orca.circulatingSupply.plus(amount);
  } else {
    return;
  }

  orca.save();
}
