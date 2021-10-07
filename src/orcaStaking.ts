import { BigInt } from '@graphprotocol/graph-ts';

import {
  ChangedRewardsEndTimestamp,
  ChangedRewardsPerSecond,
  ChangedTreasury,
  Deposit,
  EmergencyWithdraw,
  PoolAdded,
  PoolUpdated,
  SetRewardsStartTimestamp,
  Withdraw,
} from '../generated/OrcaStaking/OrcaStaking';
import { StakingUser } from '../generated/schema';
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

  let pool = Pool.load(pid.toHexString());
  let user = createUser(userAddress);

  let poolUser = PoolUser.load(user.id + '-' + pool.id);
  if (poolUser === null) {
    poolUser = new PoolUser(user.id + '-' + pool.id);
    poolUser.pool = pool.id;
    poolUser.user = user.id;
    poolUser.staked = BigInt.fromI32(0);
    poolUser.lastTimestamp = event.block.timestamp;
    poolUser.save();
  }

  poolUser.lastTimestamp = event.block.timestamp;
  poolUser.staked = poolUser.staked.plus(amount);
  poolUser.save();

  pool.lastRewardTimestamp = event.block.timestamp;
  pool.totalStaked = pool.totalStaked.plus(amount).minus(depositFee);
  pool.treasuryAmount = pool.treasuryAmount.plus(depositFee);
  pool.save();
}

export function handleEmergencyWithdraw(event: EmergencyWithdraw): void {
  let pid = event.params.pid;
  let userAddress = event.params.user;
  let amount = event.params.amount;

  let pool = Pool.load(pid.toHexString());
  let user = createUser(userAddress);
  let poolUser = PoolUser.load(user.id + '-' + pool.id);

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

  pool.lastRewardTimestamp = event.block.timestamp;
  pool.totalStaked = pool.totalStaked.minus(amount);
  pool.save();

  poolUser.lastTimestamp = event.block.timestamp;
  poolUser.staked = poolUser.staked.minus(amount);
  poolUser.save();
}
