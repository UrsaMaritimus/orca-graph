import { BigInt } from '@graphprotocol/graph-ts';

import {
  ChangedAddress,
  ChangedRewardsEndTimestamp,
  ChangedRewardsPerSecond,
  ChangedTreasury,
  Deposit,
  DepositFeeUpdated,
  EmergencyWithdraw,
  PoolAdded,
  PoolUpdated,
  SetRewardsStartTimestamp,
  Withdraw,
} from '../generated/PodLeader/PodLeader';
import { Pool, PoolUser, User } from '../generated/schema';
import { createUser } from './helpers';

import { createPodLeader } from './podHelpers';

export function handleChangedRewardsEndTimestamp(
  event: ChangedRewardsEndTimestamp
): void {
  let podLeader = createPodLeader();
  podLeader.endTimestamp = event.params.newEndTimestamp;
  podLeader.save();
}
export function handleChangedRewardsPerSecond(
  event: ChangedRewardsPerSecond
): void {
  let podLeader = createPodLeader();
  podLeader.orcaPerSec = event.params.newRewardsPerSecond;
  podLeader.save();
}
export function handleChangedTreasury(event: ChangedTreasury): void {
  let podLeader = createPodLeader();
  podLeader.treasury = event.params.newTreasury;
  podLeader.save();
}
export function handleDeposit(event: Deposit): void {
  let userAddress = event.params.user;
  let pid = event.params.pid;
  let amount = event.params.amount;
  let depositFee = event.params.fee;

  let pool = Pool.load(pid.toHexString());
  let user = createUser(userAddress);

  let poolUser = PoolUser.load(user.id + '-' + pool.id);
  if (poolUser === null) {
    poolUser = new PoolUser(user.id + '-' + pool.id);
    poolUser.pool = pool.id;
    poolUser.user = user.id;
    poolUser.staked = BigInt.fromI32(0);
    poolUser.lastTimestamp = event.block.timestamp;
    pool.userCount = pool.userCount.plus(BigInt.fromI32(1));
    poolUser.save();
  }

  poolUser.lastTimestamp = event.block.timestamp;
  poolUser.staked = poolUser.staked.plus(amount).minus(depositFee);
  poolUser.save();

  pool.lastRewardTimestamp = event.block.timestamp;
  pool.totalStaked = pool.totalStaked.plus(amount).minus(depositFee);
  pool.treasuryAmount = pool.treasuryAmount.plus(depositFee);
  pool.save();
}

export function handleFeeUpdated(event: DepositFeeUpdated): void {
  let pid = event.params.pid;
  let pool = Pool.load(pid.toHexString());
  pool.depositFee = BigInt.fromI32(event.params.newFee);
}

export function handleEmergencyWithdraw(event: EmergencyWithdraw): void {
  let pid = event.params.pid;
  let userAddress = event.params.user;
  let amount = event.params.amount;

  let pool = Pool.load(pid.toHexString());
  let user = createUser(userAddress);
  let poolUser = PoolUser.load(user.id + '-' + pool.id);
  pool.userCount = pool.userCount.minus(BigInt.fromI32(1));
  pool.totalStaked = pool.totalStaked.minus(amount);
  pool.save();

  poolUser.staked = poolUser.staked.minus(amount);
  poolUser.save();
}

export function handlePoolAdded(event: PoolAdded): void {
  let pid = event.params.pid;
  let token = event.params.token;
  let allocPoints = event.params.allocPoints;
  let totalAllocPoints = event.params.totalAllocPoints;
  let depositFee = event.params.depositFeeBP;
  let rewardStartTime = event.params.rewardStartTimestamp;
  let podLeader = createPodLeader();

  // Create pool
  let pool = Pool.load(pid.toHexString());
  if (pool === null) {
    pool = new Pool(pid.toHexString());
    pool.leader = podLeader.id;
    pool.pair = token;
    pool.allocPoint = allocPoints;
    pool.lastRewardTimestamp = rewardStartTime;
    pool.totalStaked = BigInt.fromI32(0);
    pool.depositFee = BigInt.fromI32(depositFee);
    pool.userCount = BigInt.fromI32(0);
    pool.treasuryAmount = BigInt.fromI32(0);
    pool.save();
  }

  podLeader.totalAllocPoints = totalAllocPoints;
  podLeader.save();
}
export function handlePoolUpdated(event: PoolUpdated): void {
  let pid = event.params.pid;
  let allocPoint = event.params.newAllocPoints;
  let totalAllocPoints = event.params.newTotalAllocPoints;

  let podLeader = createPodLeader();
  let pool = Pool.load(pid.toHexString());
  pool.allocPoint = allocPoint;
  podLeader.totalAllocPoints = totalAllocPoints;

  pool.save();
  podLeader.save();
}
export function handleSetRewardsStartTimestamp(
  event: SetRewardsStartTimestamp
): void {
  let podLeader = createPodLeader();
  podLeader.startTimestamp = event.params.startTimestamp;
  podLeader.save();
}

export function handleWithdraw(event: Withdraw): void {
  let pid = event.params.pid;
  let userAddress = event.params.user;
  let amount = event.params.amount;

  let pool = Pool.load(pid.toHexString());
  let user = createUser(userAddress);
  let poolUser = PoolUser.load(user.id + '-' + pool.id);
  if (amount.equals(poolUser.staked)) {
    pool.userCount = pool.userCount.minus(BigInt.fromI32(1));
  }
  pool.lastRewardTimestamp = event.block.timestamp;
  pool.totalStaked = pool.totalStaked.minus(amount);
  pool.save();

  poolUser.lastTimestamp = event.block.timestamp;
  poolUser.staked = poolUser.staked.minus(amount);
  poolUser.save();
}
