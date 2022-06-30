// Done in 1094.92s
// -1200,-1200,1300,0.00001,Done in 63718.53s.
const path = require("path");
const fs = require("node:fs");
const { add, sub, mul, divi, simpleToFixed } = require("../dist/simplecount.js");
const BigNumber = require("bignumber.js");

//正常来说项目根目录即进程运行的目录
const projectRootPath = process.cwd();
//需要输出的文件目录，从项目根目录开始
const outputFilePath = `./dist/unittest/divi.txt`;
//输出目录
const distOutputFilePath = path.join(projectRootPath, outputFilePath);
//输出目录对象
const outputObj = path.parse(distOutputFilePath);

const ws = fs.createWriteStream(distOutputFilePath, {
  highWaterMark: 32 * 1024,
});

function writeMsg(msg) {
  ws.write(msg);
}

let oneValue = -1200;
let twoValue = -1200;
let endValue = 1300;
let step = 0.00001;
let continueTest = true;
let msg = "";
let msgCount = 0;

function testadd() {
  if (!continueTest) return;
  let result = String(BigNumber(oneValue).dividedBy(twoValue).toFixed(3));
  let countreulst = divi(oneValue, twoValue,3);
  let nowstr = `simplecount:divi(${oneValue},${twoValue},3)=${countreulst}`;
  // 1,100 -> 1100
  result = result.replace(/,/g, "");
  // 不能用 === ,  因为bignumber有时返回的是对象，而simplecount永远返回字符串

  // console.log(result);
  // console.log(countreulst);
  if (result == countreulst) {
    msg = `${msg}\r\n${oneValue},${twoValue}\r\n${nowstr}`;
    ++msgCount;
    if (msgCount > 1000) {
      // writeMsg(msg);
      msg = "";
      msgCount = 0;
    }
    console.log(`${oneValue},${twoValue}`);
    continueTest = true;
  } else {
    console.log("\x1B[31m%s\x1B[0m", `error :${nowstr}`);
    process.exit(-1);
  }
  if (oneValue <= endValue) {
    oneValue = String(BigNumber(oneValue).plus(step));
    console.log(`oneValue=${oneValue}`);
  } else if (twoValue <= endValue) {
    twoValue = String(BigNumber(twoValue).plus(step));
    if (twoValue == "0") {
      twoValue = String(BigNumber(twoValue).plus(step));
    }
  }
  // 若大于2侧都是字符串，那么以字符串的形式比较大小，不是以正常的数据形式
  // If both values are strings, they are compared as strings,
  // based on the values of the Unicode code points they contain.
  if (oneValue > endValue && twoValue > endValue) {
    continueTest = false;
    // ws.end(msg);
    msg = "";
    msgCount = 0;
  }
}

while (continueTest) {
  testadd();
}
