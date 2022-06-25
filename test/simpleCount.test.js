const path = require("path");
const { add, sub, mul, divi, simpleToFixed } = require("../src/core/index");
const { appendDistFile } = require("../src/utils/file");
const BigNumber = require("bignumber.js");

//正常来说项目根目录即进程运行的目录
const projectRootPath = process.cwd();
//需要输出的文件目录，从项目根目录开始
const outputFilePath = `./dist/unittest/simpleToFixed.txt`;
//输出目录
const distOutputFilePath = path.join(projectRootPath, outputFilePath);
//输出目录对象
const outputObj = path.parse(distOutputFilePath);

// console.log(outputObj);

function writeMsg(msg) {
  appendDistFile(outputObj.dir, distOutputFilePath, msg);
}

let oneValue = `0.0001`;
let twoValue = `0.1`;
let step = `0.0001`;
let continueTest = true;
let msg = "";
let msgCount = 0;

async function testsimpletofixed() {
  if (!continueTest) return;
  let result = BigNumber(oneValue).toFormat(3);
  let countreulst = simpleToFixed(oneValue, 3);
  let str = `bignumberjs:${oneValue}.toFormat(3)=${result}`;
  let nowstr = `simplecount:${oneValue}.simpleToFixed(${oneValue},3)=${countreulst}`;
  if (result === countreulst) {
    msg = `${msg}\r\n${str}\r\n${nowstr}`;
    ++msgCount;
    if (msgCount > 1000) {
      writeMsg(msg);
      msg = "";
      msgCount = 0;
    }
    console.log("\x1B[36m%s\x1B[0m", `${oneValue}`);
    continueTest = true;
  } else {
    console.log("\x1B[31m%s\x1B[0m", `error :${nowstr}`);
    process.exit();
  }
  oneValue = String(BigNumber(oneValue).plus(step));
  if (oneValue > 100) {
    continueTest = false;
    writeMsg(msg);
    msg = "";
    msgCount = 0;
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
