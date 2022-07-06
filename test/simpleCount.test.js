// oneValue=-100,endValue=110,step=0.0001,Done in 17.89s
const path = require("path");
const fs = require("node:fs");
const {
  add,
  sub,
  mul,
  divi,
  simpleToFixed,
} = require("../dist/simplecount.js");
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

const ws = fs.createWriteStream(distOutputFilePath, {
  highWaterMark: 32 * 1024,
});

function writeMsg(msg) {
  // ws.write(msg);
}

let oneValue = -110;
let endValue = 110;
let step = `0.0001`;
let continueTest = true;
let msg = "";
let msgCount = 0;

async function testsimpletofixed() {
  if (!continueTest) return;
  let result = BigNumber(oneValue).toFormat(3);
  let countreulst = simpleToFixed(oneValue, 3);
  let nowstr = `simplecount:${oneValue}.simpleToFixed(${oneValue},3)=${countreulst}`;
  // 1,100 -> 1100
  result = result.replace(/,/g, "");
  // 不能用 === ,  因为bignumber有时返回的是对象，而simplecount永远返回字符串
  if (result == countreulst) {
    msg = `${msg}\r\n${oneValue}\r\n${nowstr}`;
    ++msgCount;
    if (msgCount > 1000) {
      writeMsg(msg);
      msg = "";
      msgCount = 0;
    }
    console.log(`${oneValue}`);
    continueTest = true;
  } else {
    console.log("\x1B[31m%s\x1B[0m", `error :${nowstr}`);
    process.exit(-1);
  }
  oneValue = String(BigNumber(oneValue).plus(step));
  // 若大于2侧都是字符串，那么以字符串的形式比较大小，不是以正常的数据形式
  // If both values are strings, they are compared as strings,
  // based on the values of the Unicode code points they contain.
  if (oneValue > endValue) {
    continueTest = false;
    ws.end(msg);
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
