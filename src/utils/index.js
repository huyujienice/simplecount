export function getDecimalPlaces(nums) {
  let s = new String(nums);
  if (!s.includes(".")) {
    return 0;
  } else {
    return s.split(".")[1].length;
  }
}
//小数点位置挪动
export function addDecimalPlacesToString(str, len = 2) {
  // len 正数右挪，负数左挪
  if (!Number.isInteger(len)) {
    return new Error("len argument must be interger");
  }
  let s = String(str);
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
  while (result[0] === "0") {
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

export function convertToBigInt(nums) {
  let str = new String(nums);
  //TODO 缺少校验步骤
  str = str.replace(/\./g, "");
  while (str.charAt[0] == 0) {
    str = str.slice(1);
  }
  let result = BigInt(str);
  return result;
}

//重构toFixed
export function simpleToFixed(num, len = 2) {
  if (!Number.isInteger(len)) {
    return new Error("len argument must be interger");
  }
  if (len < 0) {
    return new Error("len argument must larger than zero");
  }
  let result = String(num);
  //数据源小数位数
  let rightL = getDecimalPlaces(num);
  let positive = 0;
  if (result[0] === "-") {
    //负数
    positive = 1;
    result = result.slice(1);
  }
  if (rightL > len) {
    const r1 = result.split(".")[0];
    const r2 = result.split(".")[1].slice(0, len);
    const judge = Number(result.split(".")[1].slice(len)[0]);
    if (r2) {
      result = `${r1}.${r2}`;
    } else {
      result = `${r1}`;
    }
    if (judge > 4) {
      const addNum = addDecimalPlacesToString(1, -len);
      result = String(add(result, addNum));
    }
  }
  //填补位
  let w = getDecimalPlaces(result);
  if (w < len) {
    let c = len - w;
    while (c > 0) {
      if (result.includes(".")) {
        result = `${result}0`;
      } else {
        result = `${result}.0`;
      }
      c--;
    }
  }

  if (positive === 1) {
    result = `-${result}`;
  }
  return result;
}
