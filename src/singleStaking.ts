import { BigInt } from '@graphprotocol/graph-ts';

import {
  ChangedRewardsEndTimestamp,
  ChangedRewardsPerSecond,
  Deposit,
  EmergencyWithdraw,
  PoolAdded,
  PoolUpdated,
  SetRewardsStartTimestamp,
  Withdraw,
} from '../generated/OrcaStaking/OrcaStaking';
import { StakingUser } from '../generated/schema';
import { createUser } from './helpers';

import { createStaking } from './stakingHelpers';

const STORM_ADDRESS = '0x6afd5a1ea4b793cc1526d6dc7e99a608b356ef7b';

export function handleChangedRewardsEndTimestamp(
  event: ChangedRewardsEndTimestamp
): void {
  let staking = createStaking(STORM_ADDRESS);
  staking.endTimestamp = event.params.newEndTimestamp;
  staking.save();
}
export function handleChangedRewardsPerSecond(
  event: ChangedRewardsPerSecond
): void {
  let staking = createStaking(STORM_ADDRESS);
  staking.avaxPerSec = event.params.newRewardsPerSecond;
  staking.save();
}

export function handleDeposit(event: Deposit): void {
  let userAddress = event.params.user;
  let amount = event.params.amount;

  let user = createUser(userAddress);
  let staking = createStaking(STORM_ADDRESS);
  let stakingUser = StakingUser.load(staking.id + '-' + user.id);
  if (stakingUser === null) {
    stakingUser = new StakingUser(staking.id + '-' + user.id);
    stakingUser.staking = staking.id;
    stakingUser.user = user.id;
    stakingUser.staked = BigInt.fromI32(0);
    staking.userCount = staking.userCount.plus(BigInt.fromI32(1));
    stakingUser.save();
  }

  stakingUser.staked = stakingUser.staked.plus(amount);
  stakingUser.save();

  staking.totalStaked = staking.totalStaked.plus(amount);
  staking.save();
}

export function handleEmergencyWithdraw(event: EmergencyWithdraw): void {
  let userAddress = event.params.user;
  let amount = event.params.amount;

  let staking = createStaking(STORM_ADDRESS);
  let user = createUser(userAddress);
  let stakingUser = StakingUser.load(staking.id + '-' + user.id);
  staking.userCount = staking.userCount.minus(BigInt.fromI32(1));
  staking.totalStaked = staking.totalStaked.minus(amount);
  staking.save();

  stakingUser.staked = stakingUser.staked.minus(amount);
  stakingUser.save();
}

export function handlePoolAdded(event: PoolAdded): void {
  let totalAllocPoints = event.params.totalAllocPoints;
  let staking = createStaking(STORM_ADDRESS);

  staking.totalAllocPoints = totalAllocPoints;
  staking.save();
}
export function handlePoolUpdated(event: PoolUpdated): void {
  let totalAllocPoints = event.params.newTotalAllocPoints;

  let staking = createStaking(STORM_ADDRESS);
  staking.totalAllocPoints = totalAllocPoints;

  staking.save();
}
export function handleSetRewardsStartTimestamp(
  event: SetRewardsStartTimestamp
): void {
  let staking = createStaking(STORM_ADDRESS);
  staking.startTimestamp = event.params.startTimestamp;
  staking.save();
}

export function handleWithdraw(event: Withdraw): void {
  let userAddress = event.params.user;
  let amount = event.params.amount;

  let staking = createStaking(STORM_ADDRESS);
  let user = createUser(userAddress);
  let stakingUser = StakingUser.load(staking.id + '-' + user.id);
  if (amount.equals(stakingUser.staked)) {
    staking.userCount = staking.userCount.minus(BigInt.fromI32(1));
  }
  staking.totalStaked = staking.totalStaked.minus(amount);
  staking.save();

  stakingUser.staked = stakingUser.staked.minus(amount);
  stakingUser.save();
}
