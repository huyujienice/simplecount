/**
 * 将输入转换为正常书写样式字符串
 * .2 -> 0.2  0.10 -> 0.1  5.00 -> 5
 * @param {BigInt|String|number} str
 * @return {String} s
 */
function fomateToString(str) {
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
 * 将输入转换为BigInt
 *
 * @param {BigInt|String|Number} nums
 * @return {BigInt} result
 */
function convertToBigInt(nums) {
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
function getDecimalPlaces(nums) {
  let s = fomateToString(nums);
  if (!s.includes(".")) {
    return 0;
  } else {
    return s.split(".")[1].length;
  }
}
//小数点位置挪动
/**
 *
 *
 * @param {*} str
 * @param {*} len
 * @return {*}
 */
function addDecimalPlacesToString(str, len) {
  if (len === null || len === undefined) {
    len = 2;
  }
  // len 正数右挪，负数左挪
  if (!Number.isInteger(len)) {
    return new Error("len argument must be interger");
  }
  let s = fomateToString(str);
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

exports.getDecimalPlaces = getDecimalPlaces;
exports.addDecimalPlacesToString = addDecimalPlacesToString;
exports.convertToBigInt = convertToBigInt;
exports.fomateToString = fomateToString;
