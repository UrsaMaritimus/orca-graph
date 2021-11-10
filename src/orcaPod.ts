import {
  Address,
  BigDecimal,
  BigInt,
  dataSource,
  ethereum,
  log,
} from '@graphprotocol/graph-ts';

import {
  ADDRESS_ZERO,
  BIG_DECIMAL_1E18,
  BIG_DECIMAL_1E6,
  BIG_DECIMAL_ZERO,
  BIG_INT_ZERO,
  ORCA_POD_ADDRESS,
  ORCA_TOKEN_ADDRESS,
  ORCA_AVAI_PAIR_ADDRESS,
} from './orcaPodHelper';

import { Pair as PairContract } from '../generated/OrcaPod/Pair';
import { Pod, PodUser, History } from '../generated/schema';
import { Orca as OrcaContract } from '../generated/OrcaPod/Orca';
import {
  OrcaPod as PodContract,
  Transfer as TransferEvent,
} from '../generated/OrcaPod/OrcaPod';

function getOrcaPrice(): BigDecimal {
  const pair = PairContract.bind(ORCA_AVAI_PAIR_ADDRESS);
  const reserves = pair.getReserves();
  return reserves.value1
    .toBigDecimal()
    .times(BIG_DECIMAL_1E18)
    .div(reserves.value0.toBigDecimal())
    .div(BIG_DECIMAL_1E6);
}

function createPod(block: ethereum.Block): Pod {
  const contract = PodContract.bind(dataSource.address());
  const bar = new Pod(dataSource.address().toHex());
  bar.decimals = contract.decimals();
  bar.name = contract.name();
  bar.orca = contract.orca();
  bar.symbol = contract.symbol();
  bar.totalSupply = BIG_DECIMAL_ZERO;
  bar.orcaStaked = BIG_DECIMAL_ZERO;
  bar.orcaStakedUSD = BIG_DECIMAL_ZERO;
  bar.orcaHarvested = BIG_DECIMAL_ZERO;
  bar.orcaHarvestedUSD = BIG_DECIMAL_ZERO;
  bar.xorcaMinted = BIG_DECIMAL_ZERO;
  bar.xorcaBurned = BIG_DECIMAL_ZERO;
  bar.xorcaAge = BIG_DECIMAL_ZERO;
  bar.xorcaAgeDestroyed = BIG_DECIMAL_ZERO;
  bar.ratio = BIG_DECIMAL_ZERO;
  bar.updatedAt = block.timestamp;
  bar.save();

  return bar as Pod;
}

function getPod(block: ethereum.Block): Pod {
  let bar = Pod.load(dataSource.address().toHex());

  if (bar === null) {
    bar = createPod(block);
  }

  return bar as Pod;
}

function createUser(address: Address, block: ethereum.Block): PodUser {
  const user = new PodUser(address.toHex());

  // Set relation to bar
  user.pod = dataSource.address().toHex();

  // TODO: Add user here
  user.user = '';

  user.xorca = BIG_DECIMAL_ZERO;
  user.xorcaMinted = BIG_DECIMAL_ZERO;
  user.xorcaBurned = BIG_DECIMAL_ZERO;

  user.orcaStaked = BIG_DECIMAL_ZERO;
  user.orcaStakedUSD = BIG_DECIMAL_ZERO;

  user.orcaHarvested = BIG_DECIMAL_ZERO;
  user.orcaHarvestedUSD = BIG_DECIMAL_ZERO;

  // In/Out
  user.xorcaOut = BIG_DECIMAL_ZERO;
  user.orcaOut = BIG_DECIMAL_ZERO;
  user.usdOut = BIG_DECIMAL_ZERO;

  user.xorcaIn = BIG_DECIMAL_ZERO;
  user.orcaIn = BIG_DECIMAL_ZERO;
  user.usdIn = BIG_DECIMAL_ZERO;

  user.xorcaAge = BIG_DECIMAL_ZERO;
  user.xorcaAgeDestroyed = BIG_DECIMAL_ZERO;

  user.xorcaOffset = BIG_DECIMAL_ZERO;
  user.orcaOffset = BIG_DECIMAL_ZERO;
  user.usdOffset = BIG_DECIMAL_ZERO;
  user.updatedAt = block.timestamp;

  return user as PodUser;
}

function getUser(address: Address, block: ethereum.Block): PodUser {
  let user = PodUser.load(address.toHex());

  if (user === null) {
    user = createUser(address, block);
  }

  return user as PodUser;
}

function getHistory(block: ethereum.Block): History {
  const day = block.timestamp.toI32() / 86400;

  const id = BigInt.fromI32(day).toString();

  let history = History.load(id);

  if (history === null) {
    const date = day * 86400;
    history = new History(id);
    history.date = date;
    history.timeframe = 'Day';
    history.orcaStaked = BIG_DECIMAL_ZERO;
    history.orcaStakedUSD = BIG_DECIMAL_ZERO;
    history.orcaHarvested = BIG_DECIMAL_ZERO;
    history.orcaHarvestedUSD = BIG_DECIMAL_ZERO;
    history.xorcaAge = BIG_DECIMAL_ZERO;
    history.xorcaAgeDestroyed = BIG_DECIMAL_ZERO;
    history.xorcaMinted = BIG_DECIMAL_ZERO;
    history.xorcaBurned = BIG_DECIMAL_ZERO;
    history.xorcaSupply = BIG_DECIMAL_ZERO;
    history.ratio = BIG_DECIMAL_ZERO;
  }

  return history as History;
}

export function transfer(event: TransferEvent): void {
  // Convert to BigDecimal with 18 places, 1e18.
  const value = event.params.value.divDecimal(BIG_DECIMAL_1E18);

  // If value is zero, do nothing.
  if (value.equals(BIG_DECIMAL_ZERO)) {
    log.warning('Transfer zero value! Value: {} Tx: {}', [
      event.params.value.toString(),
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  const bar = getPod(event.block);
  const barContract = PodContract.bind(ORCA_POD_ADDRESS);

  const orcaPrice = getOrcaPrice();

  bar.totalSupply = barContract.totalSupply().divDecimal(BIG_DECIMAL_1E18);
  bar.orcaStaked = OrcaContract.bind(ORCA_TOKEN_ADDRESS)
    .balanceOf(ORCA_POD_ADDRESS)
    .divDecimal(BIG_DECIMAL_1E18);
  bar.ratio = bar.orcaStaked.div(bar.totalSupply);

  const what = value.times(bar.ratio);

  // Minted xorca
  if (event.params.from == ADDRESS_ZERO) {
    const user = getUser(event.params.to, event.block);

    log.info(
      '{} minted {} xorca in exchange for {} orca - orcaStaked before {} orcaStaked after {}',
      [
        event.params.to.toHex(),
        value.toString(),
        what.toString(),
        user.orcaStaked.toString(),
        user.orcaStaked.plus(what).toString(),
      ]
    );

    if (user.xorca == BIG_DECIMAL_ZERO) {
      log.info('{} entered the bar', [user.id]);
      user.pod = bar.id;
    }

    user.xorcaMinted = user.xorcaMinted.plus(value);

    const orcaStakedUSD = what.times(orcaPrice);

    user.orcaStaked = user.orcaStaked.plus(what);
    user.orcaStakedUSD = user.orcaStakedUSD.plus(orcaStakedUSD);

    const days = event.block.timestamp
      .minus(user.updatedAt)
      .divDecimal(BigDecimal.fromString('86400'));

    const xorcaAge = days.times(user.xorca);

    user.xorcaAge = user.xorcaAge.plus(xorcaAge);

    // Update last
    user.xorca = user.xorca.plus(value);

    user.updatedAt = event.block.timestamp;

    user.save();

    const barDays = event.block.timestamp
      .minus(bar.updatedAt)
      .divDecimal(BigDecimal.fromString('86400'));
    const barXorca = bar.xorcaMinted.minus(bar.xorcaBurned);
    bar.xorcaMinted = bar.xorcaMinted.plus(value);
    bar.xorcaAge = bar.xorcaAge.plus(barDays.times(barXorca));
    bar.orcaStaked = bar.orcaStaked.plus(what);
    bar.orcaStakedUSD = bar.orcaStakedUSD.plus(orcaStakedUSD);
    bar.updatedAt = event.block.timestamp;

    const history = getHistory(event.block);
    history.xorcaAge = bar.xorcaAge;
    history.xorcaMinted = history.xorcaMinted.plus(value);
    history.xorcaSupply = bar.totalSupply;
    history.orcaStaked = history.orcaStaked.plus(what);
    history.orcaStakedUSD = history.orcaStakedUSD.plus(orcaStakedUSD);
    history.ratio = bar.ratio;
    history.save();
  }

  // Burned xorca
  if (event.params.to == ADDRESS_ZERO) {
    log.info('{} burned {} xorca', [
      event.params.from.toHex(),
      value.toString(),
    ]);

    const user = getUser(event.params.from, event.block);

    user.xorcaBurned = user.xorcaBurned.plus(value);

    user.orcaHarvested = user.orcaHarvested.plus(what);

    const orcaHarvestedUSD = what.times(orcaPrice);

    user.orcaHarvestedUSD = user.orcaHarvestedUSD.plus(orcaHarvestedUSD);

    const days = event.block.timestamp
      .minus(user.updatedAt)
      .divDecimal(BigDecimal.fromString('86400'));

    const xorcaAge = days.times(user.xorca);

    user.xorcaAge = user.xorcaAge.plus(xorcaAge);

    const xorcaAgeDestroyed = user.xorcaAge.div(user.xorca).times(value);

    user.xorcaAgeDestroyed = user.xorcaAgeDestroyed.plus(xorcaAgeDestroyed);

    // remove xorcaAge
    user.xorcaAge = user.xorcaAge.minus(xorcaAgeDestroyed);
    // Update xorca last
    user.xorca = user.xorca.minus(value);

    if (user.xorca == BIG_DECIMAL_ZERO) {
      log.info('{} left the bar', [user.id]);
      user.pod = null;
    }

    user.updatedAt = event.block.timestamp;

    user.save();

    const barDays = event.block.timestamp
      .minus(bar.updatedAt)
      .divDecimal(BigDecimal.fromString('86400'));
    const barXorca = bar.xorcaMinted.minus(bar.xorcaBurned);
    bar.xorcaBurned = bar.xorcaBurned.plus(value);
    bar.xorcaAge = bar.xorcaAge
      .plus(barDays.times(barXorca))
      .minus(xorcaAgeDestroyed);
    bar.xorcaAgeDestroyed = bar.xorcaAgeDestroyed.plus(xorcaAgeDestroyed);
    bar.orcaHarvested = bar.orcaHarvested.plus(what);
    bar.orcaHarvestedUSD = bar.orcaHarvestedUSD.plus(orcaHarvestedUSD);
    bar.updatedAt = event.block.timestamp;

    const history = getHistory(event.block);
    history.xorcaSupply = bar.totalSupply;
    history.xorcaBurned = history.xorcaBurned.plus(value);
    history.xorcaAge = bar.xorcaAge;
    history.xorcaAgeDestroyed =
      history.xorcaAgeDestroyed.plus(xorcaAgeDestroyed);
    history.orcaHarvested = history.orcaHarvested.plus(what);
    history.orcaHarvestedUSD = history.orcaHarvestedUSD.plus(orcaHarvestedUSD);
    history.ratio = bar.ratio;
    history.save();
  }

  // If transfer from address to address and not known xorca pools.
  if (event.params.from != ADDRESS_ZERO && event.params.to != ADDRESS_ZERO) {
    log.info('transfered {} xorca from {} to {}', [
      value.toString(),
      event.params.from.toHex(),
      event.params.to.toHex(),
    ]);

    const fromUser = getUser(event.params.from, event.block);

    const fromUserDays = event.block.timestamp
      .minus(fromUser.updatedAt)
      .divDecimal(BigDecimal.fromString('86400'));

    // Recalc xorca age first
    fromUser.xorcaAge = fromUser.xorcaAge.plus(
      fromUserDays.times(fromUser.xorca)
    );
    // Calculate xorcaAge being transfered
    const xorcaAgeTranfered = fromUser.xorcaAge
      .div(fromUser.xorca)
      .times(value);
    // Subtract from xorcaAge
    fromUser.xorcaAge = fromUser.xorcaAge.minus(xorcaAgeTranfered);
    fromUser.updatedAt = event.block.timestamp;

    fromUser.xorca = fromUser.xorca.minus(value);
    fromUser.xorcaOut = fromUser.xorcaOut.plus(value);
    fromUser.orcaOut = fromUser.orcaOut.plus(what);
    fromUser.usdOut = fromUser.usdOut.plus(what.times(orcaPrice));

    if (fromUser.xorca == BIG_DECIMAL_ZERO) {
      log.info('{} left the bar by transfer OUT', [fromUser.id]);
      fromUser.pod = null;
    }

    fromUser.save();

    const toUser = getUser(event.params.to, event.block);

    if (toUser.pod === null) {
      log.info('{} entered the bar by transfer IN', [fromUser.id]);
      toUser.pod = bar.id;
    }

    // Recalculate xorca age and add incoming xorcaAgeTransfered
    const toUserDays = event.block.timestamp
      .minus(toUser.updatedAt)
      .divDecimal(BigDecimal.fromString('86400'));

    toUser.xorcaAge = toUser.xorcaAge
      .plus(toUserDays.times(toUser.xorca))
      .plus(xorcaAgeTranfered);
    toUser.updatedAt = event.block.timestamp;

    toUser.xorca = toUser.xorca.plus(value);
    toUser.xorcaIn = toUser.xorcaIn.plus(value);
    toUser.orcaIn = toUser.orcaIn.plus(what);
    toUser.usdIn = toUser.usdIn.plus(what.times(orcaPrice));

    const difference = toUser.xorcaIn
      .minus(toUser.xorcaOut)
      .minus(toUser.xorcaOffset);

    // If difference of orca in - orca out - offset > 0, then add on the difference
    // in staked orca based on xorca:orca ratio at time of reciept.
    if (difference.gt(BIG_DECIMAL_ZERO)) {
      const orca = toUser.orcaIn.minus(toUser.orcaOut).minus(toUser.orcaOffset);
      const usd = toUser.usdIn.minus(toUser.usdOut).minus(toUser.usdOffset);

      log.info(
        '{} recieved a transfer of {} xorca from {}, orca value of transfer is {}',
        [toUser.id, value.toString(), fromUser.id, what.toString()]
      );

      toUser.orcaStaked = toUser.orcaStaked.plus(orca);
      toUser.orcaStakedUSD = toUser.orcaStakedUSD.plus(usd);

      toUser.xorcaOffset = toUser.xorcaOffset.plus(difference);
      toUser.orcaOffset = toUser.orcaOffset.plus(orca);
      toUser.usdOffset = toUser.usdOffset.plus(usd);
    }

    toUser.save();
  }

  bar.save();
}
