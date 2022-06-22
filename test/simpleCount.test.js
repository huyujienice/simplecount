const { add, sub, mul, divi, simpleToFixed } = require("../src/core/index");
const { appendDistFile, findFile } = require("../src/utils/file");
const BigNumber = require("bignumber.js");

let oneValue = `0.1`;
let twoValue = `0.1`;
let step = `0.1`;
let continueTest = true;

async function goontest() {
  if (!continueTest) return;
  let result = String(BigNumber(oneValue).plus(twoValue));
  let countreulst = add(oneValue, twoValue);
  let str = `bignumberjs:adds ${oneValue} + ${twoValue} to equal ${result}`;
  let nowstr = `simplecountjs:adds ${oneValue} + ${twoValue} to equal ${countreulst}`;
  if (result === countreulst) {
    console.log(str);
    console.log(nowstr);
    continueTest = true;
  } else {
    // throw new Error(nowstr);
    console.error(`count error :${nowstr}`);
  }
  twoValue = String(BigNumber(twoValue).plus(step));
  if (twoValue > 100) {
    continueTest = false;
  }
  if (continueTest) {
    goontest();
  }
}

goontest();
