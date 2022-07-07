declare module "simplecount" {
  export function add(
    one: string | number | BigInt,
    two: string | number | BigInt
  ): string;
  export function sub(
    one: string | number | BigInt,
    two: string | number | BigInt
  ): string;
  export function mul(
    one: string | number | BigInt,
    two: string | number | BigInt
  ): string;
  export function divi(
    one: string | number | BigInt,
    two: string | number | BigInt
  ): string;
  export function simpleToFixed(
    num: string | number | BigInt,
    len?: number
  ): string;
}
