import {
  getDecimalPlaces,
  addDecimalPlacesToString,
  convertToBigInt,
  fomateToString,
} from "../utils/index";
//非大数加法
function normaladd(one, two) {
  let len = Math.max(getDecimalPlaces(one), getDecimalPlaces(two));
  let result =
    addDecimalPlacesToString(one, len) + addDecimalPlacesToString(two, len);
  result = addDecimalPlacesToString(result, -len);
  result = fomateToString(result);

  return result;
}
//非大数减法
function normalsub(one, two) {
  let len = Math.max(getDecimalPlaces(one), getDecimalPlaces(two));
  let result =
    addDecimalPlacesToString(one, len) - addDecimalPlacesToString(two, len);
  result = addDecimalPlacesToString(result, -len);
  result = fomateToString(result);

  return result;
}
//非大数乘法
function normalmul(one, two) {
  let oneL = getDecimalPlaces(one);
  let twoL = getDecimalPlaces(two);
  let result =
    addDecimalPlacesToString(one, oneL) * addDecimalPlacesToString(two, twoL);
  result = addDecimalPlacesToString(result, -(oneL + twoL));
  result = fomateToString(result);

  return result;
}
//非大数除法
function normaldivi(one, two) {
  let oneL = getDecimalPlaces(one);
  let twoL = getDecimalPlaces(two);
  let result =
    addDecimalPlacesToString(one, oneL) / addDecimalPlacesToString(two, twoL);
  result = addDecimalPlacesToString(result, -(oneL - twoL));

  return result;
}
//加法
function bigintadd(one, two) {
  const len = Math.max(getDecimalPlaces(one), getDecimalPlaces(two));
  const oneBig = addDecimalPlacesToString(one, len);
  const twoBig = addDecimalPlacesToString(two, len);
  const bigValue = convertToBigInt(oneBig) + convertToBigInt(twoBig);

  let result = addDecimalPlacesToString(bigValue, -len);
  result = fomateToString(result);
  return result;
}
//减法
function bigintsub(one, two) {
  const len = Math.max(getDecimalPlaces(one), getDecimalPlaces(two));
  const oneBig = addDecimalPlacesToString(one, len);
  const twoBig = addDecimalPlacesToString(two, len);
  const bigValue = convertToBigInt(oneBig) - convertToBigInt(twoBig);
  let result = addDecimalPlacesToString(bigValue, -len);
  result = fomateToString(result);

  return result;
}
//乘法
function bigintmul(one, two) {
  const oneL = getDecimalPlaces(one);
  const twoL = getDecimalPlaces(two);
  const oneBig = convertToBigInt(one);
  const twoBig = convertToBigInt(two);
  const bigValue = convertToBigInt(oneBig) * convertToBigInt(twoBig);
  let result = addDecimalPlacesToString(bigValue, -(oneL + twoL));
  result = fomateToString(result);

  return result;
}
//除法
function bigintdivi(one, two, holdNums) {
  //TODO
  if (holdNums === undefined) {
    holdNums = 2;
  }
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

  let twoStep = getDecimalPlaces(originalOneBig);
  if (twoStep > 0) {
    move = move + twoStep;
    originalOneBig = addDecimalPlacesToString(originalOneBig, twoStep);
  }

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

  const oneBig = originalOneBig;
  const twoBig = convertToBigInt(two);

  const bigValue = convertToBigInt(oneBig) / convertToBigInt(twoBig);
  const result = addDecimalPlacesToString(bigValue, -move);
  let finalResult = simpleToFixed(result, holdNums);

  return finalResult;
}

/**
 * 四舍五入重构toFixed
 * 不支持科学计数法,e写法
 * @param {String|Number} num
 * @param {Number} len
 * @return {String} str
 */
export function simpleToFixed(num, len = 2) {
  if (!Number.isInteger(len)) {
    return new Error("len argument must be interger");
  }
  if (len < 0) {
    return new Error("len argument must larger than zero");
  }
  let str = fomateToString(num);
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
      //add 会自动省略后置0，可能需补位
      let now = getDecimalPlaces(str) - len;
      if (!str.includes(".")) {
        str = `${str}.`;
      }
      while (now < 0) {
        str = `${str}0`;
        ++now;
      }
    } else {
      str = originValue;
    }
  }
  if (positive === 1) {
    str = `-${str}`;
  }
  return str;
}
export function add(one, two) {
  if (typeof BigInt === "function") {
    return bigintadd(one, two);
  } else {
    return normaladd(one, two);
  }
}
export function sub(one, two) {
  if (typeof BigInt === "function") {
    return bigintsub(one, two);
  } else {
    return normalsub(one, two);
  }
}
export function mul(one, two) {
  if (typeof BigInt === "function") {
    return bigintmul(one, two);
  } else {
    return normalmul(one, two);
  }
}
export function divi(one, two, holdNums) {
  if (typeof BigInt === "function") {
    return bigintdivi(one, two, holdNums);
  } else {
    return normaldivi(one, two, holdNums);
  }
}
