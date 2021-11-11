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
  '0x69fa005cee59c3bbd657a38b67e32388910653b'
);
// TO DO Change for mainnet
export let ORCA_TOKEN_ADDRESS = Address.fromString(
  '0xb3308FD93936e5EFb9A1F2C6a513DEf68175Cb5d'
);
// TO DO Change for mainnet
export let ORCA_AVAI_PAIR_ADDRESS = Address.fromString(
  '0x045c6cd1b7a6f1d6cf66e2d45a9ba8e2b58cc217'
);
