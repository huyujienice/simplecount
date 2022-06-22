const {
  getDecimalPlaces,
  addDecimalPlacesToString,
  convertToBigInt,
  fomateToNormal,
} = require("../utils/index");

//加法
function add(one, two) {
  const len = Math.max(getDecimalPlaces(one), getDecimalPlaces(two));
  const oneBig = addDecimalPlacesToString(one, len);
  const twoBig = addDecimalPlacesToString(two, len);
  const bigValue = convertToBigInt(oneBig) + convertToBigInt(twoBig);
  let result = addDecimalPlacesToString(bigValue, -len);
  result = fomateToNormal(result);
  return result;
}
//减法
function sub(one, two) {
  const len = Math.max(getDecimalPlaces(one), getDecimalPlaces(two));
  const oneBig = addDecimalPlacesToString(one, len);
  const twoBig = addDecimalPlacesToString(two, len);
  const bigValue = convertToBigInt(oneBig) - convertToBigInt(twoBig);
  let result = addDecimalPlacesToString(bigValue, -len);
  result = fomateToNormal(result);

  return result;
}
//乘法
function mul(one, two) {
  const oneL = getDecimalPlaces(one);
  const twoL = getDecimalPlaces(two);
  const oneBig = convertToBigInt(one);
  const twoBig = convertToBigInt(two);
  const bigValue = convertToBigInt(oneBig) * convertToBigInt(twoBig);
  let result = addDecimalPlacesToString(bigValue, -(oneL + twoL));
  result = fomateToNormal(result);

  return result;
}
//除法
function divi(one, two, holdNums = 2) {
  //TODO
  if (holdNums < 0) {
    return new Error("can not keep negative decimal point");
  }
  const d1 = getDecimalPlaces(one);
  const d2 = getDecimalPlaces(two);
  let l1 = convertToBigInt(one).toString().length;
  const l2 = convertToBigInt(two).toString().length;
  const overload = holdNums + 1;

  let originalOneBig = convertToBigInt(one).toString();

  let move = 0;

  let oneStep = d2 - d1;
  originalOneBig = addDecimalPlacesToString(originalOneBig, oneStep);
  console.log(`originalOneBig=${originalOneBig}`);

  let twoStep = getDecimalPlaces(originalOneBig);
  if (twoStep > 0) {
    move = move + twoStep;
    originalOneBig = addDecimalPlacesToString(originalOneBig, twoStep);
  }
  console.log(`originalOneBig=${originalOneBig}`);

  l1 = originalOneBig.length;
  //保证l1比l2大1位，才有整数留存
  let threeStep = l2 + 1 - l1;
  if (threeStep >= 0) {
    move = move + threeStep;
    originalOneBig = addDecimalPlacesToString(originalOneBig, threeStep);
  }

  //保证精度(小数位)比l2大2位
  let fourStep = overload + 2;
  move = move + fourStep;
  originalOneBig = addDecimalPlacesToString(originalOneBig, fourStep);

  console.log(`originalOneBig=${originalOneBig}`);

  const oneBig = originalOneBig;
  const twoBig = convertToBigInt(two);

  const bigValue = convertToBigInt(oneBig) / convertToBigInt(twoBig);
  const result = addDecimalPlacesToString(bigValue, -move);
  let finalResult = simpleToFixed(result, holdNums);

  finalResult = fomateToNormal(finalResult);


  // console.log(`d1=${d1}`);
  // console.log(`d2=${d2}`);
  // console.log(`l1=${l1}`);
  // console.log(`l2=${l2}`);
  // console.log(`overload=${overload}`);

  // console.log(`oneStep=${oneStep}`);
  // console.log(`twoStep=${twoStep}`);
  // console.log(`threeStep=${threeStep}`);
  // console.log(`fourStep=${fourStep}`);

  // console.log(`move=${move}`);

  // console.log(`oneBig=${oneBig}`);
  // console.log(`twoBig=${twoBig}`);
  // console.log(`bigValue=${bigValue}`);
  // console.log(`result=${result}`);
  // console.log(`finalResult=${finalResult}`);


  return finalResult;
}

/**
 * 四舍五入重构toFixed
 * 不支持科学计数法,e写法
 * @param {String|Number} num
 * @param {Number} len
 * @return {String} str
 */
function simpleToFixed(num, len) {
  if (len === null || len === undefined) {
    len = 2;
  }
  if (!Number.isInteger(len)) {
    return new Error("len argument must be interger");
  }
  if (len < 0) {
    return new Error("len argument must larger than zero");
  }
  let str = String(num);
  //数据源小数位数
  let rightL = getDecimalPlaces(str);
  //需要挪动的小数位数
  let l = len - rightL;
  let positive = 0;
  if (str[0] === "-") {
    //负数
    positive = 1;
    str = str.slice(1);
  }
  if (l >= 0) {
    //需0补位
    let z = ``;
    while (l > 0) {
      z = `0${z}`;
      l--;
    }
    if (str.includes(".")) {
      str = `${str}${z}`;
    } else {
      str = `${str}.${z}`;
    }
  } else {
    //需取小数
    const decimal = str.split(".")[1];
    const integer = str.split(".")[0];
    let judge = 0;
    let decimalValue = decimal;
    if (decimal[len] !== undefined) {
      judge = Number(decimal[len]);
      decimalValue = decimal.slice(0, len);
    }
    const originValue = `${integer}.${decimalValue}`;
    if (judge > 4) {
      const one = addDecimalPlacesToString(1, -len);
      str = add(originValue, one);
    } else {
      str = originValue;
    }
  }
  if (positive === 1) {
    str = `-${str}`;
  }
  return str;
}

exports.add = add;
exports.sub = sub;
exports.mul = mul;
exports.divi = divi;
exports.simpleToFixed = simpleToFixed;
