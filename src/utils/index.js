/**
 * 将输入转换为正常书写样式字符串
 * .2 -> 0.2  0.10 -> 0.1  5.00 -> 5
 * @param {BigInt|String|number} str
 * @return {String} s
 */
 export function fomateToString(str) {
  let s;
  if (typeof nums === "bigint") {
    s = s.toString();
  }
  s = String(str);
  if (s.includes(".")) {
    if (s[0] == ".") {
      s = `0${s}`;
    }
    let len = s.length - 1;
    while (s[len] === "0") {
      s = s.slice(0, len);
      len = s.length - 1;
    }
    if (s[len] === ".") {
      s = s.slice(0, len);
      len = s.length - 1;
    }
  }
  return s;
}

/**
 * 将输入转化为正常字符串
 * 1.校验输入内容是否能够正常转换为Number
 * 2.将连续空字符串转化为0
 * 2.将科学计数法转化为正常显示
 *
 * @param {*} str
 * @return {String} s
 */
export function covertToString(str) {
  const oneJudge = Number(str);
  if (Number.isNaN(oneJudge)) {
    throw new Error(`${str} is not a normal number expression`);
  }

  let s;
  if (typeof nums === "bigint") {
    s = s.toString();
  }
  s = String(str);
  const twoJudge = s.replace(/[\b\s]/g, "");
  if (twoJudge.length == 0) {
    return "0";
  }

  if (s.includes("e") || s.includes("E")) {
    s = s.replace(/[eE]+/g, "e");
    const scienceStr = s.split("e")[0];
    const scienceLen = Number(s.split("e")[1]);
    s = moveDecimal(scienceStr, scienceLen);
  }

  return s;
}

/**
 * 将输入转换为BigInt
 *
 * @param {BigInt|String|Number} nums
 * @return {BigInt} result
 */
export function convertToBigInt(nums) {
  if (typeof nums === "bigint") {
    return nums;
  }
  let str = fomateToString(nums);
  //TODO 缺少校验步骤
  str = str.replace(/\./g, "");
  while (str.charAt[0] == 0) {
    str = str.slice(1);
  }
  let result = BigInt(str);
  return result;
}

/**
 *
 *
 * @param {*} nums
 * @return {*}
 */
export function getDecimalPlaces(nums) {
  let s = fomateToString(nums);
  if (!s.includes(".")) {
    return 0;
  } else {
    return s.split(".")[1].length;
  }
}

/**
 * 小数点位置挪动方法
 * len 正数右挪，负数左挪
 * @param {*} str
 * @param {*} len
 * @return {*}
 */
export function addDecimalPlacesToString(str, len = 2) {
  if (!Number.isInteger(len)) {
    return new Error("move length argument must be interger");
  }
  let s = fomateToString(str);
  const result = moveDecimal(s, len);
  return result;
}

/**
 * 小数点挪动核心代码
 * len正数为右挪扩大，负数为左挪缩小
 * @param {String} str
 * @param {Number} len
 * @return {String} result
 */
function moveDecimal(str, len) {
  let s = str;
  //数据源小数位数
  let rightL = getDecimalPlaces(str);
  //需要挪动的小数位数
  let l = len - rightL;
  //数据源去掉小数点,正负
  let result = s.replace(/\./g, "");
  let positive = 0;
  if (s[0] === "-") {
    //负数
    positive = 1;
    result = result.slice(1);
  }
  while (result[0] === "0" && result.length !== 1) {
    result = result.slice(1);
  }
  if (len >= rightL) {
    //整数
    let z = ``;
    while (l > 0) {
      z = `0${z}`;
      l--;
    }
    result = `${result}${z}`;
  } else {
    //小数
    let start = result.length - Math.abs(l);
    if (start >= 1) {
      result = result.slice(0, start) + "." + result.slice(start);
    } else {
      let absStart = Math.abs(start);
      let z = `0.`;
      while (absStart > 0) {
        z = `${z}0`;
        absStart--;
      }
      result = `${z}${result}`;
    }
  }
  if (positive === 1) {
    result = `-${result}`;
  }

  return result;
}
