declare module "simplecount" {
  export function add(one: string | number, two: string | number): string;
  export function sub(one: string | number, two: string | number): string;
  export function mul(one: string | number, two: string | number): string;
  export function divi(one: string | number, two: string | number): string;
  export function simpleToFixed(num: string | number, len?: number): string;
}
