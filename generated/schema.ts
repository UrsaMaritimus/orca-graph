// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Stablecoin extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Stablecoin entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Stablecoin entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Stablecoin", id.toString(), this);
  }

  static load(id: string): Stablecoin | null {
    return store.get("Stablecoin", id) as Stablecoin | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get decimals(): BigInt {
    let value = this.get("decimals");
    return value.toBigInt();
  }

  set decimals(value: BigInt) {
    this.set("decimals", Value.fromBigInt(value));
  }

  get bankCount(): i32 {
    let value = this.get("bankCount");
    return value.toI32();
  }

  set bankCount(value: i32) {
    this.set("bankCount", Value.fromI32(value));
  }

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    return value.toBigInt();
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
  }

  get paused(): boolean {
    let value = this.get("paused");
    return value.toBoolean();
  }

  set paused(value: boolean) {
    this.set("paused", Value.fromBoolean(value));
  }

  get banks(): Array<string> {
    let value = this.get("banks");
    return value.toStringArray();
  }

  set banks(value: Array<string>) {
    this.set("banks", Value.fromStringArray(value));
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Token entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Token entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Token", id.toString(), this);
  }

  static load(id: string): Token | null {
    return store.get("Token", id) as Token | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get decimals(): BigInt {
    let value = this.get("decimals");
    return value.toBigInt();
  }

  set decimals(value: BigInt) {
    this.set("decimals", Value.fromBigInt(value));
  }

  get price(): string {
    let value = this.get("price");
    return value.toString();
  }

  set price(value: string) {
    this.set("price", Value.fromString(value));
  }

  get banks(): Array<string> {
    let value = this.get("banks");
    return value.toStringArray();
  }

  set banks(value: Array<string>) {
    this.set("banks", Value.fromStringArray(value));
  }
}

export class TokenPrice extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save TokenPrice entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save TokenPrice entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("TokenPrice", id.toString(), this);
  }

  static load(id: string): TokenPrice | null {
    return store.get("TokenPrice", id) as TokenPrice | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get priceUSD(): BigInt {
    let value = this.get("priceUSD");
    return value.toBigInt();
  }

  set priceUSD(value: BigInt) {
    this.set("priceUSD", Value.fromBigInt(value));
  }
}

export class Bank extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Bank entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Bank entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Bank", id.toString(), this);
  }

  static load(id: string): Bank | null {
    return store.get("Bank", id) as Bank | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get minimumCollateralPercentage(): BigInt {
    let value = this.get("minimumCollateralPercentage");
    return value.toBigInt();
  }

  set minimumCollateralPercentage(value: BigInt) {
    this.set("minimumCollateralPercentage", Value.fromBigInt(value));
  }

  get debtCeiling(): BigInt {
    let value = this.get("debtCeiling");
    return value.toBigInt();
  }

  set debtCeiling(value: BigInt) {
    this.set("debtCeiling", Value.fromBigInt(value));
  }

  get closingFee(): BigInt {
    let value = this.get("closingFee");
    return value.toBigInt();
  }

  set closingFee(value: BigInt) {
    this.set("closingFee", Value.fromBigInt(value));
  }

  get openingFee(): BigInt {
    let value = this.get("openingFee");
    return value.toBigInt();
  }

  set openingFee(value: BigInt) {
    this.set("openingFee", Value.fromBigInt(value));
  }

  get tokenPeg(): BigInt {
    let value = this.get("tokenPeg");
    return value.toBigInt();
  }

  set tokenPeg(value: BigInt) {
    this.set("tokenPeg", Value.fromBigInt(value));
  }

  get totalDebt(): BigInt {
    let value = this.get("totalDebt");
    return value.toBigInt();
  }

  set totalDebt(value: BigInt) {
    this.set("totalDebt", Value.fromBigInt(value));
  }

  get debtRatio(): BigInt {
    let value = this.get("debtRatio");
    return value.toBigInt();
  }

  set debtRatio(value: BigInt) {
    this.set("debtRatio", Value.fromBigInt(value));
  }

  get gainRatio(): BigInt {
    let value = this.get("gainRatio");
    return value.toBigInt();
  }

  set gainRatio(value: BigInt) {
    this.set("gainRatio", Value.fromBigInt(value));
  }

  get token(): string {
    let value = this.get("token");
    return value.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get stablecoin(): string {
    let value = this.get("stablecoin");
    return value.toString();
  }

  set stablecoin(value: string) {
    this.set("stablecoin", Value.fromString(value));
  }

  get totalCollateral(): BigInt {
    let value = this.get("totalCollateral");
    return value.toBigInt();
  }

  set totalCollateral(value: BigInt) {
    this.set("totalCollateral", Value.fromBigInt(value));
  }

  get vaultCount(): i32 {
    let value = this.get("vaultCount");
    return value.toI32();
  }

  set vaultCount(value: i32) {
    this.set("vaultCount", Value.fromI32(value));
  }

  get treasury(): BigInt {
    let value = this.get("treasury");
    return value.toBigInt();
  }

  set treasury(value: BigInt) {
    this.set("treasury", Value.fromBigInt(value));
  }

  get vaults(): Array<string> {
    let value = this.get("vaults");
    return value.toStringArray();
  }

  set vaults(value: Array<string>) {
    this.set("vaults", Value.fromStringArray(value));
  }
}

export class Vault extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Vault entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Vault entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Vault", id.toString(), this);
  }

  static load(id: string): Vault | null {
    return store.get("Vault", id) as Vault | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get number(): i32 {
    let value = this.get("number");
    return value.toI32();
  }

  set number(value: i32) {
    this.set("number", Value.fromI32(value));
  }

  get collateral(): BigInt {
    let value = this.get("collateral");
    return value.toBigInt();
  }

  set collateral(value: BigInt) {
    this.set("collateral", Value.fromBigInt(value));
  }

  get debt(): BigInt {
    let value = this.get("debt");
    return value.toBigInt();
  }

  set debt(value: BigInt) {
    this.set("debt", Value.fromBigInt(value));
  }

  get bank(): string {
    let value = this.get("bank");
    return value.toString();
  }

  set bank(value: string) {
    this.set("bank", Value.fromString(value));
  }

  get user(): string {
    let value = this.get("user");
    return value.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save User entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save User entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("User", id.toString(), this);
  }

  static load(id: string): User | null {
    return store.get("User", id) as User | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get balanceStable(): BigInt {
    let value = this.get("balanceStable");
    return value.toBigInt();
  }

  set balanceStable(value: BigInt) {
    this.set("balanceStable", Value.fromBigInt(value));
  }

  get vaults(): Array<string> | null {
    let value = this.get("vaults");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set vaults(value: Array<string> | null) {
    if (value === null) {
      this.unset("vaults");
    } else {
      this.set("vaults", Value.fromStringArray(value as Array<string>));
    }
  }

  get liquidations(): Array<string> | null {
    let value = this.get("liquidations");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set liquidations(value: Array<string> | null) {
    if (value === null) {
      this.unset("liquidations");
    } else {
      this.set("liquidations", Value.fromStringArray(value as Array<string>));
    }
  }

  get pools(): Array<string> | null {
    let value = this.get("pools");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set pools(value: Array<string> | null) {
    if (value === null) {
      this.unset("pools");
    } else {
      this.set("pools", Value.fromStringArray(value as Array<string>));
    }
  }

  get staking(): Array<string> | null {
    let value = this.get("staking");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set staking(value: Array<string> | null) {
    if (value === null) {
      this.unset("staking");
    } else {
      this.set("staking", Value.fromStringArray(value as Array<string>));
    }
  }

  get pod(): Array<string> | null {
    let value = this.get("pod");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set pod(value: Array<string> | null) {
    if (value === null) {
      this.unset("pod");
    } else {
      this.set("pod", Value.fromStringArray(value as Array<string>));
    }
  }
}

export class Liquidation extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Liquidation entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Liquidation entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Liquidation", id.toString(), this);
  }

  static load(id: string): Liquidation | null {
    return store.get("Liquidation", id) as Liquidation | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get user(): string {
    let value = this.get("user");
    return value.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }

  get token(): string {
    let value = this.get("token");
    return value.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get owed(): BigInt {
    let value = this.get("owed");
    return value.toBigInt();
  }

  set owed(value: BigInt) {
    this.set("owed", Value.fromBigInt(value));
  }
}

export class Exchange extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Exchange entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Exchange entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Exchange", id.toString(), this);
  }

  static load(id: string): Exchange | null {
    return store.get("Exchange", id) as Exchange | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get usdHeld(): BigInt {
    let value = this.get("usdHeld");
    return value.toBigInt();
  }

  set usdHeld(value: BigInt) {
    this.set("usdHeld", Value.fromBigInt(value));
  }

  get treasury(): BigInt {
    let value = this.get("treasury");
    return value.toBigInt();
  }

  set treasury(value: BigInt) {
    this.set("treasury", Value.fromBigInt(value));
  }

  get mintingFee(): BigInt {
    let value = this.get("mintingFee");
    return value.toBigInt();
  }

  set mintingFee(value: BigInt) {
    this.set("mintingFee", Value.fromBigInt(value));
  }

  get redeemingFee(): BigInt {
    let value = this.get("redeemingFee");
    return value.toBigInt();
  }

  set redeemingFee(value: BigInt) {
    this.set("redeemingFee", Value.fromBigInt(value));
  }
}

export class PodLeader extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save PodLeader entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save PodLeader entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("PodLeader", id.toString(), this);
  }

  static load(id: string): PodLeader | null {
    return store.get("PodLeader", id) as PodLeader | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get treasury(): Bytes {
    let value = this.get("treasury");
    return value.toBytes();
  }

  set treasury(value: Bytes) {
    this.set("treasury", Value.fromBytes(value));
  }

  get startTimestamp(): BigInt {
    let value = this.get("startTimestamp");
    return value.toBigInt();
  }

  set startTimestamp(value: BigInt) {
    this.set("startTimestamp", Value.fromBigInt(value));
  }

  get endTimestamp(): BigInt {
    let value = this.get("endTimestamp");
    return value.toBigInt();
  }

  set endTimestamp(value: BigInt) {
    this.set("endTimestamp", Value.fromBigInt(value));
  }

  get orca(): Bytes {
    let value = this.get("orca");
    return value.toBytes();
  }

  set orca(value: Bytes) {
    this.set("orca", Value.fromBytes(value));
  }

  get orcaPerSec(): BigInt {
    let value = this.get("orcaPerSec");
    return value.toBigInt();
  }

  set orcaPerSec(value: BigInt) {
    this.set("orcaPerSec", Value.fromBigInt(value));
  }

  get totalAllocPoints(): BigInt {
    let value = this.get("totalAllocPoints");
    return value.toBigInt();
  }

  set totalAllocPoints(value: BigInt) {
    this.set("totalAllocPoints", Value.fromBigInt(value));
  }

  get poolCount(): BigInt {
    let value = this.get("poolCount");
    return value.toBigInt();
  }

  set poolCount(value: BigInt) {
    this.set("poolCount", Value.fromBigInt(value));
  }

  get pools(): Array<string> {
    let value = this.get("pools");
    return value.toStringArray();
  }

  set pools(value: Array<string>) {
    this.set("pools", Value.fromStringArray(value));
  }
}

export class Pool extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Pool entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Pool entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Pool", id.toString(), this);
  }

  static load(id: string): Pool | null {
    return store.get("Pool", id) as Pool | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get leader(): string {
    let value = this.get("leader");
    return value.toString();
  }

  set leader(value: string) {
    this.set("leader", Value.fromString(value));
  }

  get pair(): Bytes {
    let value = this.get("pair");
    return value.toBytes();
  }

  set pair(value: Bytes) {
    this.set("pair", Value.fromBytes(value));
  }

  get allocPoint(): BigInt {
    let value = this.get("allocPoint");
    return value.toBigInt();
  }

  set allocPoint(value: BigInt) {
    this.set("allocPoint", Value.fromBigInt(value));
  }

  get lastRewardTimestamp(): BigInt {
    let value = this.get("lastRewardTimestamp");
    return value.toBigInt();
  }

  set lastRewardTimestamp(value: BigInt) {
    this.set("lastRewardTimestamp", Value.fromBigInt(value));
  }

  get totalStaked(): BigInt {
    let value = this.get("totalStaked");
    return value.toBigInt();
  }

  set totalStaked(value: BigInt) {
    this.set("totalStaked", Value.fromBigInt(value));
  }

  get depositFee(): BigInt {
    let value = this.get("depositFee");
    return value.toBigInt();
  }

  set depositFee(value: BigInt) {
    this.set("depositFee", Value.fromBigInt(value));
  }

  get userCount(): BigInt {
    let value = this.get("userCount");
    return value.toBigInt();
  }

  set userCount(value: BigInt) {
    this.set("userCount", Value.fromBigInt(value));
  }

  get treasuryAmount(): BigInt {
    let value = this.get("treasuryAmount");
    return value.toBigInt();
  }

  set treasuryAmount(value: BigInt) {
    this.set("treasuryAmount", Value.fromBigInt(value));
  }

  get users(): Array<string> {
    let value = this.get("users");
    return value.toStringArray();
  }

  set users(value: Array<string>) {
    this.set("users", Value.fromStringArray(value));
  }
}

export class PoolUser extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save PoolUser entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save PoolUser entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("PoolUser", id.toString(), this);
  }

  static load(id: string): PoolUser | null {
    return store.get("PoolUser", id) as PoolUser | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get user(): string {
    let value = this.get("user");
    return value.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }

  get staked(): BigInt {
    let value = this.get("staked");
    return value.toBigInt();
  }

  set staked(value: BigInt) {
    this.set("staked", Value.fromBigInt(value));
  }

  get lastTimestamp(): BigInt {
    let value = this.get("lastTimestamp");
    return value.toBigInt();
  }

  set lastTimestamp(value: BigInt) {
    this.set("lastTimestamp", Value.fromBigInt(value));
  }
}

export class Orca extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Orca entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Orca entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Orca", id.toString(), this);
  }

  static load(id: string): Orca | null {
    return store.get("Orca", id) as Orca | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get maxSupply(): BigInt {
    let value = this.get("maxSupply");
    return value.toBigInt();
  }

  set maxSupply(value: BigInt) {
    this.set("maxSupply", Value.fromBigInt(value));
  }

  get circulatingSupply(): BigInt {
    let value = this.get("circulatingSupply");
    return value.toBigInt();
  }

  set circulatingSupply(value: BigInt) {
    this.set("circulatingSupply", Value.fromBigInt(value));
  }

  get treasury(): Bytes {
    let value = this.get("treasury");
    return value.toBytes();
  }

  set treasury(value: Bytes) {
    this.set("treasury", Value.fromBytes(value));
  }

  get leader(): Bytes {
    let value = this.get("leader");
    return value.toBytes();
  }

  set leader(value: Bytes) {
    this.set("leader", Value.fromBytes(value));
  }

  get team(): Bytes {
    let value = this.get("team");
    return value.toBytes();
  }

  set team(value: Bytes) {
    this.set("team", Value.fromBytes(value));
  }
}

export class Staking extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Staking entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Staking entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Staking", id.toString(), this);
  }

  static load(id: string): Staking | null {
    return store.get("Staking", id) as Staking | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get startTimestamp(): BigInt {
    let value = this.get("startTimestamp");
    return value.toBigInt();
  }

  set startTimestamp(value: BigInt) {
    this.set("startTimestamp", Value.fromBigInt(value));
  }

  get endTimestamp(): BigInt {
    let value = this.get("endTimestamp");
    return value.toBigInt();
  }

  set endTimestamp(value: BigInt) {
    this.set("endTimestamp", Value.fromBigInt(value));
  }

  get avaxPerSec(): BigInt {
    let value = this.get("avaxPerSec");
    return value.toBigInt();
  }

  set avaxPerSec(value: BigInt) {
    this.set("avaxPerSec", Value.fromBigInt(value));
  }

  get totalAllocPoints(): BigInt {
    let value = this.get("totalAllocPoints");
    return value.toBigInt();
  }

  set totalAllocPoints(value: BigInt) {
    this.set("totalAllocPoints", Value.fromBigInt(value));
  }

  get totalStaked(): BigInt {
    let value = this.get("totalStaked");
    return value.toBigInt();
  }

  set totalStaked(value: BigInt) {
    this.set("totalStaked", Value.fromBigInt(value));
  }

  get userCount(): BigInt {
    let value = this.get("userCount");
    return value.toBigInt();
  }

  set userCount(value: BigInt) {
    this.set("userCount", Value.fromBigInt(value));
  }

  get users(): Array<string> {
    let value = this.get("users");
    return value.toStringArray();
  }

  set users(value: Array<string>) {
    this.set("users", Value.fromStringArray(value));
  }
}

export class StakingUser extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save StakingUser entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save StakingUser entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("StakingUser", id.toString(), this);
  }

  static load(id: string): StakingUser | null {
    return store.get("StakingUser", id) as StakingUser | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get staking(): string {
    let value = this.get("staking");
    return value.toString();
  }

  set staking(value: string) {
    this.set("staking", Value.fromString(value));
  }

  get user(): string {
    let value = this.get("user");
    return value.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }

  get staked(): BigInt {
    let value = this.get("staked");
    return value.toBigInt();
  }

  set staked(value: BigInt) {
    this.set("staked", Value.fromBigInt(value));
  }
}

export class Pod extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Pod entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Pod entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Pod", id.toString(), this);
  }

  static load(id: string): Pod | null {
    return store.get("Pod", id) as Pod | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get decimals(): i32 {
    let value = this.get("decimals");
    return value.toI32();
  }

  set decimals(value: i32) {
    this.set("decimals", Value.fromI32(value));
  }

  get name(): string {
    let value = this.get("name");
    return value.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get orca(): Bytes {
    let value = this.get("orca");
    return value.toBytes();
  }

  set orca(value: Bytes) {
    this.set("orca", Value.fromBytes(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get totalSupply(): BigDecimal {
    let value = this.get("totalSupply");
    return value.toBigDecimal();
  }

  set totalSupply(value: BigDecimal) {
    this.set("totalSupply", Value.fromBigDecimal(value));
  }

  get ratio(): BigDecimal {
    let value = this.get("ratio");
    return value.toBigDecimal();
  }

  set ratio(value: BigDecimal) {
    this.set("ratio", Value.fromBigDecimal(value));
  }

  get xorcaMinted(): BigDecimal {
    let value = this.get("xorcaMinted");
    return value.toBigDecimal();
  }

  set xorcaMinted(value: BigDecimal) {
    this.set("xorcaMinted", Value.fromBigDecimal(value));
  }

  get xorcaBurned(): BigDecimal {
    let value = this.get("xorcaBurned");
    return value.toBigDecimal();
  }

  set xorcaBurned(value: BigDecimal) {
    this.set("xorcaBurned", Value.fromBigDecimal(value));
  }

  get orcaStaked(): BigDecimal {
    let value = this.get("orcaStaked");
    return value.toBigDecimal();
  }

  set orcaStaked(value: BigDecimal) {
    this.set("orcaStaked", Value.fromBigDecimal(value));
  }

  get orcaStakedUSD(): BigDecimal {
    let value = this.get("orcaStakedUSD");
    return value.toBigDecimal();
  }

  set orcaStakedUSD(value: BigDecimal) {
    this.set("orcaStakedUSD", Value.fromBigDecimal(value));
  }

  get orcaHarvested(): BigDecimal {
    let value = this.get("orcaHarvested");
    return value.toBigDecimal();
  }

  set orcaHarvested(value: BigDecimal) {
    this.set("orcaHarvested", Value.fromBigDecimal(value));
  }

  get orcaHarvestedUSD(): BigDecimal {
    let value = this.get("orcaHarvestedUSD");
    return value.toBigDecimal();
  }

  set orcaHarvestedUSD(value: BigDecimal) {
    this.set("orcaHarvestedUSD", Value.fromBigDecimal(value));
  }

  get xorcaAge(): BigDecimal {
    let value = this.get("xorcaAge");
    return value.toBigDecimal();
  }

  set xorcaAge(value: BigDecimal) {
    this.set("xorcaAge", Value.fromBigDecimal(value));
  }

  get xorcaAgeDestroyed(): BigDecimal {
    let value = this.get("xorcaAgeDestroyed");
    return value.toBigDecimal();
  }

  set xorcaAgeDestroyed(value: BigDecimal) {
    this.set("xorcaAgeDestroyed", Value.fromBigDecimal(value));
  }

  get PodUser(): Array<string> {
    let value = this.get("PodUser");
    return value.toStringArray();
  }

  set PodUser(value: Array<string>) {
    this.set("PodUser", Value.fromStringArray(value));
  }

  get updatedAt(): BigInt {
    let value = this.get("updatedAt");
    return value.toBigInt();
  }

  set updatedAt(value: BigInt) {
    this.set("updatedAt", Value.fromBigInt(value));
  }
}

export class PodUser extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save PodUser entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save PodUser entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("PodUser", id.toString(), this);
  }

  static load(id: string): PodUser | null {
    return store.get("PodUser", id) as PodUser | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get user(): string {
    let value = this.get("user");
    return value.toString();
  }

  set user(value: string) {
    this.set("user", Value.fromString(value));
  }

  get pod(): string | null {
    let value = this.get("pod");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set pod(value: string | null) {
    if (value === null) {
      this.unset("pod");
    } else {
      this.set("pod", Value.fromString(value as string));
    }
  }

  get xorca(): BigDecimal {
    let value = this.get("xorca");
    return value.toBigDecimal();
  }

  set xorca(value: BigDecimal) {
    this.set("xorca", Value.fromBigDecimal(value));
  }

  get xorcaIn(): BigDecimal {
    let value = this.get("xorcaIn");
    return value.toBigDecimal();
  }

  set xorcaIn(value: BigDecimal) {
    this.set("xorcaIn", Value.fromBigDecimal(value));
  }

  get xorcaOut(): BigDecimal {
    let value = this.get("xorcaOut");
    return value.toBigDecimal();
  }

  set xorcaOut(value: BigDecimal) {
    this.set("xorcaOut", Value.fromBigDecimal(value));
  }

  get xorcaMinted(): BigDecimal {
    let value = this.get("xorcaMinted");
    return value.toBigDecimal();
  }

  set xorcaMinted(value: BigDecimal) {
    this.set("xorcaMinted", Value.fromBigDecimal(value));
  }

  get xorcaBurned(): BigDecimal {
    let value = this.get("xorcaBurned");
    return value.toBigDecimal();
  }

  set xorcaBurned(value: BigDecimal) {
    this.set("xorcaBurned", Value.fromBigDecimal(value));
  }

  get xorcaOffset(): BigDecimal {
    let value = this.get("xorcaOffset");
    return value.toBigDecimal();
  }

  set xorcaOffset(value: BigDecimal) {
    this.set("xorcaOffset", Value.fromBigDecimal(value));
  }

  get xorcaAge(): BigDecimal {
    let value = this.get("xorcaAge");
    return value.toBigDecimal();
  }

  set xorcaAge(value: BigDecimal) {
    this.set("xorcaAge", Value.fromBigDecimal(value));
  }

  get xorcaAgeDestroyed(): BigDecimal {
    let value = this.get("xorcaAgeDestroyed");
    return value.toBigDecimal();
  }

  set xorcaAgeDestroyed(value: BigDecimal) {
    this.set("xorcaAgeDestroyed", Value.fromBigDecimal(value));
  }

  get orcaStaked(): BigDecimal {
    let value = this.get("orcaStaked");
    return value.toBigDecimal();
  }

  set orcaStaked(value: BigDecimal) {
    this.set("orcaStaked", Value.fromBigDecimal(value));
  }

  get orcaStakedUSD(): BigDecimal {
    let value = this.get("orcaStakedUSD");
    return value.toBigDecimal();
  }

  set orcaStakedUSD(value: BigDecimal) {
    this.set("orcaStakedUSD", Value.fromBigDecimal(value));
  }

  get orcaHarvested(): BigDecimal {
    let value = this.get("orcaHarvested");
    return value.toBigDecimal();
  }

  set orcaHarvested(value: BigDecimal) {
    this.set("orcaHarvested", Value.fromBigDecimal(value));
  }

  get orcaHarvestedUSD(): BigDecimal {
    let value = this.get("orcaHarvestedUSD");
    return value.toBigDecimal();
  }

  set orcaHarvestedUSD(value: BigDecimal) {
    this.set("orcaHarvestedUSD", Value.fromBigDecimal(value));
  }

  get orcaOut(): BigDecimal {
    let value = this.get("orcaOut");
    return value.toBigDecimal();
  }

  set orcaOut(value: BigDecimal) {
    this.set("orcaOut", Value.fromBigDecimal(value));
  }

  get orcaIn(): BigDecimal {
    let value = this.get("orcaIn");
    return value.toBigDecimal();
  }

  set orcaIn(value: BigDecimal) {
    this.set("orcaIn", Value.fromBigDecimal(value));
  }

  get usdOut(): BigDecimal {
    let value = this.get("usdOut");
    return value.toBigDecimal();
  }

  set usdOut(value: BigDecimal) {
    this.set("usdOut", Value.fromBigDecimal(value));
  }

  get usdIn(): BigDecimal {
    let value = this.get("usdIn");
    return value.toBigDecimal();
  }

  set usdIn(value: BigDecimal) {
    this.set("usdIn", Value.fromBigDecimal(value));
  }

  get updatedAt(): BigInt {
    let value = this.get("updatedAt");
    return value.toBigInt();
  }

  set updatedAt(value: BigInt) {
    this.set("updatedAt", Value.fromBigInt(value));
  }

  get orcaOffset(): BigDecimal {
    let value = this.get("orcaOffset");
    return value.toBigDecimal();
  }

  set orcaOffset(value: BigDecimal) {
    this.set("orcaOffset", Value.fromBigDecimal(value));
  }

  get usdOffset(): BigDecimal {
    let value = this.get("usdOffset");
    return value.toBigDecimal();
  }

  set usdOffset(value: BigDecimal) {
    this.set("usdOffset", Value.fromBigDecimal(value));
  }
}

export class History extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save History entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save History entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("History", id.toString(), this);
  }

  static load(id: string): History | null {
    return store.get("History", id) as History | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get date(): i32 {
    let value = this.get("date");
    return value.toI32();
  }

  set date(value: i32) {
    this.set("date", Value.fromI32(value));
  }

  get timeframe(): string {
    let value = this.get("timeframe");
    return value.toString();
  }

  set timeframe(value: string) {
    this.set("timeframe", Value.fromString(value));
  }

  get orcaStaked(): BigDecimal {
    let value = this.get("orcaStaked");
    return value.toBigDecimal();
  }

  set orcaStaked(value: BigDecimal) {
    this.set("orcaStaked", Value.fromBigDecimal(value));
  }

  get orcaStakedUSD(): BigDecimal {
    let value = this.get("orcaStakedUSD");
    return value.toBigDecimal();
  }

  set orcaStakedUSD(value: BigDecimal) {
    this.set("orcaStakedUSD", Value.fromBigDecimal(value));
  }

  get orcaHarvested(): BigDecimal {
    let value = this.get("orcaHarvested");
    return value.toBigDecimal();
  }

  set orcaHarvested(value: BigDecimal) {
    this.set("orcaHarvested", Value.fromBigDecimal(value));
  }

  get orcaHarvestedUSD(): BigDecimal {
    let value = this.get("orcaHarvestedUSD");
    return value.toBigDecimal();
  }

  set orcaHarvestedUSD(value: BigDecimal) {
    this.set("orcaHarvestedUSD", Value.fromBigDecimal(value));
  }

  get xorcaAge(): BigDecimal {
    let value = this.get("xorcaAge");
    return value.toBigDecimal();
  }

  set xorcaAge(value: BigDecimal) {
    this.set("xorcaAge", Value.fromBigDecimal(value));
  }

  get xorcaAgeDestroyed(): BigDecimal {
    let value = this.get("xorcaAgeDestroyed");
    return value.toBigDecimal();
  }

  set xorcaAgeDestroyed(value: BigDecimal) {
    this.set("xorcaAgeDestroyed", Value.fromBigDecimal(value));
  }

  get xorcaMinted(): BigDecimal {
    let value = this.get("xorcaMinted");
    return value.toBigDecimal();
  }

  set xorcaMinted(value: BigDecimal) {
    this.set("xorcaMinted", Value.fromBigDecimal(value));
  }

  get xorcaBurned(): BigDecimal {
    let value = this.get("xorcaBurned");
    return value.toBigDecimal();
  }

  set xorcaBurned(value: BigDecimal) {
    this.set("xorcaBurned", Value.fromBigDecimal(value));
  }

  get xorcaSupply(): BigDecimal {
    let value = this.get("xorcaSupply");
    return value.toBigDecimal();
  }

  set xorcaSupply(value: BigDecimal) {
    this.set("xorcaSupply", Value.fromBigDecimal(value));
  }

  get ratio(): BigDecimal {
    let value = this.get("ratio");
    return value.toBigDecimal();
  }

  set ratio(value: BigDecimal) {
    this.set("ratio", Value.fromBigDecimal(value));
  }
}
