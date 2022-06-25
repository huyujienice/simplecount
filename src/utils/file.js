//测试文件操作
const path = require("path");
const { constants } = require("node:fs");
const { appendFile, access, mkdir } = require("node:fs/promises");

//正常来说项目根目录即进程运行的目录
const projectRootPath = process.cwd();
//需要输出的文件目录，从项目根目录开始
const outputFilePath = `./dist/unittest/test.txt`;

//输出目录
const distOutputFilePath = path.join(projectRootPath, outputFilePath);
//输出目录对象
const outputObj = path.parse(distOutputFilePath);

//判断是否有这个目录或者文件
function judgeFilePath(path) {
  return new Promise((resolve, reject) => {
    access(path, constants.R_OK | constants.W_OK)
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  });
}
//创建目录
async function openNewFilePath(path) {
  try {
    //recursive参数，支持创建多级目录
    await mkdir(path, { recursive: true });
    console.log("mkdir success");
  } catch (error) {
    console.log("mkdir fail");
    console.log(error);
  }
}

//追加内容至文件夹
async function appendDistFile(dir, file, msg) {
  if (!msg.includes("\r\n")) {
    msg = `${msg}\r\n`;
  }
  try {
    await mkdir(dir, { recursive: true });
    await appendFile(file, msg);
  } catch (error) {
    console.log(error);
  }
}

async function textFuc() {
  //经过测试可以在项目以外（在用户范围内）创建任何文件
  await openNewFilePath(`//Users/clark/nodetest/test.js`);
}

exports.appendDistFile = appendDistFile;
exports.textFuc = textFuc;
exports.openNewFilePath = openNewFilePath;
