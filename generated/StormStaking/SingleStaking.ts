// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ChangedRewardsEndTimestamp extends ethereum.Event {
  get params(): ChangedRewardsEndTimestamp__Params {
    return new ChangedRewardsEndTimestamp__Params(this);
  }
}

export class ChangedRewardsEndTimestamp__Params {
  _event: ChangedRewardsEndTimestamp;

  constructor(event: ChangedRewardsEndTimestamp) {
    this._event = event;
  }

  get oldEndTimestamp(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get newEndTimestamp(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class ChangedRewardsPerSecond extends ethereum.Event {
  get params(): ChangedRewardsPerSecond__Params {
    return new ChangedRewardsPerSecond__Params(this);
  }
}

export class ChangedRewardsPerSecond__Params {
  _event: ChangedRewardsPerSecond;

  constructor(event: ChangedRewardsPerSecond) {
    this._event = event;
  }

  get oldRewardsPerSecond(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get newRewardsPerSecond(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Deposit extends ethereum.Event {
  get params(): Deposit__Params {
    return new Deposit__Params(this);
  }
}

export class Deposit__Params {
  _event: Deposit;

  constructor(event: Deposit) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get pid(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class EmergencyWithdraw extends ethereum.Event {
  get params(): EmergencyWithdraw__Params {
    return new EmergencyWithdraw__Params(this);
  }
}

export class EmergencyWithdraw__Params {
  _event: EmergencyWithdraw;

  constructor(event: EmergencyWithdraw) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get pid(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class PoolAdded extends ethereum.Event {
  get params(): PoolAdded__Params {
    return new PoolAdded__Params(this);
  }
}

export class PoolAdded__Params {
  _event: PoolAdded;

  constructor(event: PoolAdded) {
    this._event = event;
  }

  get pid(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get token(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get allocPoints(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get totalAllocPoints(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get rewardStartTimestamp(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class PoolUpdated extends ethereum.Event {
  get params(): PoolUpdated__Params {
    return new PoolUpdated__Params(this);
  }
}

export class PoolUpdated__Params {
  _event: PoolUpdated;

  constructor(event: PoolUpdated) {
    this._event = event;
  }

  get pid(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get oldAllocPoints(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get newAllocPoints(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get newTotalAllocPoints(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class SetRewardsStartTimestamp extends ethereum.Event {
  get params(): SetRewardsStartTimestamp__Params {
    return new SetRewardsStartTimestamp__Params(this);
  }
}

export class SetRewardsStartTimestamp__Params {
  _event: SetRewardsStartTimestamp;

  constructor(event: SetRewardsStartTimestamp) {
    this._event = event;
  }

  get startTimestamp(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class Withdraw extends ethereum.Event {
  get params(): Withdraw__Params {
    return new Withdraw__Params(this);
  }
}

export class Withdraw__Params {
  _event: Withdraw;

  constructor(event: Withdraw) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get pid(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class SingleStaking__poolInfoResult {
  value0: Address;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;

  constructor(
    value0: Address,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    return map;
  }
}

export class SingleStaking__userInfoResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class SingleStaking extends ethereum.SmartContract {
  static bind(address: Address): SingleStaking {
    return new SingleStaking("SingleStaking", address);
  }

  endTimestamp(): BigInt {
    let result = super.call("endTimestamp", "endTimestamp():(uint256)", []);

    return result[0].toBigInt();
  }

  try_endTimestamp(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("endTimestamp", "endTimestamp():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getMultiplier(from: BigInt, to: BigInt): BigInt {
    let result = super.call(
      "getMultiplier",
      "getMultiplier(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(from),
        ethereum.Value.fromUnsignedBigInt(to)
      ]
    );

    return result[0].toBigInt();
  }

  try_getMultiplier(from: BigInt, to: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getMultiplier",
      "getMultiplier(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(from),
        ethereum.Value.fromUnsignedBigInt(to)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  pendingRewards(pid: BigInt, account: Address): BigInt {
    let result = super.call(
      "pendingRewards",
      "pendingRewards(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(pid),
        ethereum.Value.fromAddress(account)
      ]
    );

    return result[0].toBigInt();
  }

  try_pendingRewards(
    pid: BigInt,
    account: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "pendingRewards",
      "pendingRewards(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(pid),
        ethereum.Value.fromAddress(account)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  poolInfo(param0: BigInt): SingleStaking__poolInfoResult {
    let result = super.call(
      "poolInfo",
      "poolInfo(uint256):(address,uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new SingleStaking__poolInfoResult(
      result[0].toAddress(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt()
    );
  }

  try_poolInfo(
    param0: BigInt
  ): ethereum.CallResult<SingleStaking__poolInfoResult> {
    let result = super.tryCall(
      "poolInfo",
      "poolInfo(uint256):(address,uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new SingleStaking__poolInfoResult(
        value[0].toAddress(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt()
      )
    );
  }

  poolLength(): BigInt {
    let result = super.call("poolLength", "poolLength():(uint256)", []);

    return result[0].toBigInt();
  }

  try_poolLength(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("poolLength", "poolLength():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  rewardToken(): Address {
    let result = super.call("rewardToken", "rewardToken():(address)", []);

    return result[0].toAddress();
  }

  try_rewardToken(): ethereum.CallResult<Address> {
    let result = super.tryCall("rewardToken", "rewardToken():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  rewardsActive(): boolean {
    let result = super.call("rewardsActive", "rewardsActive():(bool)", []);

    return result[0].toBoolean();
  }

  try_rewardsActive(): ethereum.CallResult<boolean> {
    let result = super.tryCall("rewardsActive", "rewardsActive():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  rewardsPerSecond(): BigInt {
    let result = super.call(
      "rewardsPerSecond",
      "rewardsPerSecond():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_rewardsPerSecond(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "rewardsPerSecond",
      "rewardsPerSecond():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  startTimestamp(): BigInt {
    let result = super.call("startTimestamp", "startTimestamp():(uint256)", []);

    return result[0].toBigInt();
  }

  try_startTimestamp(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "startTimestamp",
      "startTimestamp():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  totalAllocPoint(): BigInt {
    let result = super.call(
      "totalAllocPoint",
      "totalAllocPoint():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_totalAllocPoint(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "totalAllocPoint",
      "totalAllocPoint():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  userInfo(param0: BigInt, param1: Address): SingleStaking__userInfoResult {
    let result = super.call(
      "userInfo",
      "userInfo(uint256,address):(uint256,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );

    return new SingleStaking__userInfoResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  try_userInfo(
    param0: BigInt,
    param1: Address
  ): ethereum.CallResult<SingleStaking__userInfoResult> {
    let result = super.tryCall(
      "userInfo",
      "userInfo(uint256,address):(uint256,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromAddress(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new SingleStaking__userInfoResult(
        value[0].toBigInt(),
        value[1].toBigInt()
      )
    );
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _rewardToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _startTimestamp(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _rewardsPerSecond(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddCall extends ethereum.Call {
  get inputs(): AddCall__Inputs {
    return new AddCall__Inputs(this);
  }

  get outputs(): AddCall__Outputs {
    return new AddCall__Outputs(this);
  }
}

export class AddCall__Inputs {
  _call: AddCall;

  constructor(call: AddCall) {
    this._call = call;
  }

  get allocPoint(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get token(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get withUpdate(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }
}

export class AddCall__Outputs {
  _call: AddCall;

  constructor(call: AddCall) {
    this._call = call;
  }
}

export class AddRewardsBalanceCall extends ethereum.Call {
  get inputs(): AddRewardsBalanceCall__Inputs {
    return new AddRewardsBalanceCall__Inputs(this);
  }

  get outputs(): AddRewardsBalanceCall__Outputs {
    return new AddRewardsBalanceCall__Outputs(this);
  }
}

export class AddRewardsBalanceCall__Inputs {
  _call: AddRewardsBalanceCall;

  constructor(call: AddRewardsBalanceCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class AddRewardsBalanceCall__Outputs {
  _call: AddRewardsBalanceCall;

  constructor(call: AddRewardsBalanceCall) {
    this._call = call;
  }
}

export class DepositCall extends ethereum.Call {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get pid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class EmergencyWithdrawCall extends ethereum.Call {
  get inputs(): EmergencyWithdrawCall__Inputs {
    return new EmergencyWithdrawCall__Inputs(this);
  }

  get outputs(): EmergencyWithdrawCall__Outputs {
    return new EmergencyWithdrawCall__Outputs(this);
  }
}

export class EmergencyWithdrawCall__Inputs {
  _call: EmergencyWithdrawCall;

  constructor(call: EmergencyWithdrawCall) {
    this._call = call;
  }

  get pid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class EmergencyWithdrawCall__Outputs {
  _call: EmergencyWithdrawCall;

  constructor(call: EmergencyWithdrawCall) {
    this._call = call;
  }
}

export class MassUpdatePoolsCall extends ethereum.Call {
  get inputs(): MassUpdatePoolsCall__Inputs {
    return new MassUpdatePoolsCall__Inputs(this);
  }

  get outputs(): MassUpdatePoolsCall__Outputs {
    return new MassUpdatePoolsCall__Outputs(this);
  }
}

export class MassUpdatePoolsCall__Inputs {
  _call: MassUpdatePoolsCall;

  constructor(call: MassUpdatePoolsCall) {
    this._call = call;
  }
}

export class MassUpdatePoolsCall__Outputs {
  _call: MassUpdatePoolsCall;

  constructor(call: MassUpdatePoolsCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SetCall extends ethereum.Call {
  get inputs(): SetCall__Inputs {
    return new SetCall__Inputs(this);
  }

  get outputs(): SetCall__Outputs {
    return new SetCall__Outputs(this);
  }
}

export class SetCall__Inputs {
  _call: SetCall;

  constructor(call: SetCall) {
    this._call = call;
  }

  get pid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get allocPoint(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get withUpdate(): boolean {
    return this._call.inputValues[2].value.toBoolean();
  }
}

export class SetCall__Outputs {
  _call: SetCall;

  constructor(call: SetCall) {
    this._call = call;
  }
}

export class SetRewardsPerSecondCall extends ethereum.Call {
  get inputs(): SetRewardsPerSecondCall__Inputs {
    return new SetRewardsPerSecondCall__Inputs(this);
  }

  get outputs(): SetRewardsPerSecondCall__Outputs {
    return new SetRewardsPerSecondCall__Outputs(this);
  }
}

export class SetRewardsPerSecondCall__Inputs {
  _call: SetRewardsPerSecondCall;

  constructor(call: SetRewardsPerSecondCall) {
    this._call = call;
  }

  get newRewardsPerSecond(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetRewardsPerSecondCall__Outputs {
  _call: SetRewardsPerSecondCall;

  constructor(call: SetRewardsPerSecondCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UpdatePoolCall extends ethereum.Call {
  get inputs(): UpdatePoolCall__Inputs {
    return new UpdatePoolCall__Inputs(this);
  }

  get outputs(): UpdatePoolCall__Outputs {
    return new UpdatePoolCall__Outputs(this);
  }
}

export class UpdatePoolCall__Inputs {
  _call: UpdatePoolCall;

  constructor(call: UpdatePoolCall) {
    this._call = call;
  }

  get pid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class UpdatePoolCall__Outputs {
  _call: UpdatePoolCall;

  constructor(call: UpdatePoolCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get pid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}
