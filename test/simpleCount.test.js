const { add, sub, mul, divi, simpleToFixed } = require("../src/core/index");
const { appendDistFile, findFile } = require("../src/utils/file");
const BigNumber = require("bignumber.js");

let oneValue = `0.00001`;
let twoValue = `0.1`;
let step = `0.00001`;
let continueTest = true;

async function testsimpletofixed() {
  if (!continueTest) return;
  let result = BigNumber(oneValue).toFormat(3);
  let countreulst = simpleToFixed(oneValue, 3);
  let str = `bignumberjs:${oneValue}.toFormat(3)=${result}`;
  let nowstr = `simplecount:${oneValue}.simpleToFixed(${oneValue},3)=${countreulst}`;
  if (result === countreulst) {
    console.log("\x1B[36m%s\x1B[0m", `right :${nowstr}`);
    continueTest = true;
  } else {
    console.log("\x1B[31m%s\x1B[0m", `error :${nowstr}`);
    throw new Error("test error");
  }
  oneValue = String(BigNumber(oneValue).plus(step));
  if (oneValue > 100) {
    continueTest = false;
  }
}

while (continueTest) {
  testsimpletofixed();
}

// async function goontestadd() {
//   if (!continueTest) return;
//   let result = BigNumber(oneValue).plus(twoValue);
//   let countreulst = add(oneValue, twoValue);
//   let str = `bignumberjs:adds ${oneValue} + ${twoValue} to equal ${result}`;
//   let nowstr = `simplecountjs:adds ${oneValue} + ${twoValue} to equal ${countreulst}`;
//   if (result === countreulst) {
//     console.log(str);
//     console.log(nowstr);
//     continueTest = true;
//   } else {
//     // throw new Error(nowstr);
//     console.error(Object.prototype.toString.call(str));
//     console.error(Object.prototype.toString.call(nowstr));
//     console.error(`count error :${str}`);
//     console.error(`count error :${nowstr}`);
//   }
//   twoValue = String(BigNumber(twoValue).plus(step));
//   if (twoValue > 100) {
//     continueTest = false;
//   }
//   if (continueTest) {
//     goontestadd();
//   }
// }

// goontestadd();
