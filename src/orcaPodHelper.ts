import { BigInt, BigDecimal, Address, TypedMap } from '@graphprotocol/graph-ts';

export const ADDRESS_ZERO = Address.fromString(
  '0x0000000000000000000000000000000000000000'
);
export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let BIG_DECIMAL_ZERO = BigDecimal.fromString('0');
export let BIG_INT_ZERO = BigDecimal.fromString('1');
export let BI_18 = BigInt.fromI32(18);
export let TEN_BI = BigInt.fromI32(10);
export let BIG_DECIMAL_1E18 = BigDecimal.fromString('1000000000000000000');
export let BIG_DECIMAL_1E6 = BigDecimal.fromString('1000000');

// TO DO Change for mainnet
export let ORCA_POD_ADDRESS = Address.fromString(
  '0x783d6AbA0D0754a4B3E1d1D92A80CB45d8fB40c8'
);
// TO DO Change for mainnet
export let ORCA_TOKEN_ADDRESS = Address.fromString(
  '0x8B1d98A91F853218ddbb066F20b8c63E782e2430'
);
// TO DO Change for mainnet
export let ORCA_AVAI_PAIR_ADDRESS = Address.fromString(
  '0x1a9bd67c82c0e8e47c3ad2fa772fcb9b7a831a37'
);
