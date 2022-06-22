const { add, sub, mul, divi, simpleToFixed } = require("../src/core/index");
const { appendDistFile, findFile } = require("../src/utils/file");
const BigNumber = require("bignumber.js");

let oneValue = `0.1`;
let twoValue = `0.1`;
let step = `0.001`;
let str = `adds ${oneValue} + ${twoValue} to equal ${result}`;
let result = BigNumber(oneValue).plus(twoValue);
let continueTest = true;

async function goontest() {
  if (!continueTest) return;
  result = BigNumber(oneValue).plus(twoValue);
  str = `adds ${oneValue} + ${twoValue} to equal ${result}`;
  if (add(oneValue, twoValue) == String(result)) {
    await appendDistFile(str);
  } else {
    throw new Error(str);
  }
  twoValue = Number(twoValue) + Number(step);
  if (twoValue > 100) {
    continueTest = false;
  }
  await goontest();
}
