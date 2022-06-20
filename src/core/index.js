const {
  getDecimalPlaces,
  addDecimalPlacesToString,
  convertToBigInt,
  simpleToFixed,
} = require("./utils/index");
exports.add = add;
exports.sub = sub;
exports.mul = mul;
exports.mul = mul;

//加法
function add(one, two) {
  let len = Math.max(getDecimalPlaces(one), getDecimalPlaces(two));
  const oneBig = addDecimalPlacesToString(one, len);
  const twoBig = addDecimalPlacesToString(two, len);
  const bigValue = convertToBigInt(oneBig) + convertToBigInt(twoBig);
  const result = addDecimalPlacesToString(bigValue, -len);
  return result;
}
//减法
function sub(one, two) {
  let len = Math.max(getDecimalPlaces(one), getDecimalPlaces(two));
  const oneBig = addDecimalPlacesToString(one, len);
  const twoBig = addDecimalPlacesToString(two, len);
  const bigValue = convertToBigInt(oneBig) - convertToBigInt(twoBig);
  const result = addDecimalPlacesToString(bigValue, -len);
  return result;
}
//乘法
function mul(one, two) {
  let oneL = getDecimalPlaces(one);
  let twoL = getDecimalPlaces(two);
  const oneBig = convertToBigInt(one);
  const twoBig = convertToBigInt(two);
  const bigValue = convertToBigInt(oneBig) * convertToBigInt(twoBig);
  const result = addDecimalPlacesToString(bigValue, -(oneL + twoL));
  return result;
}
//除法
function mul(one, two, holdNums = 2) {
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
  const finalResult = simpleToFixed(result, holdNums);

  console.log(`d1=${d1}`);
  console.log(`d2=${d2}`);
  console.log(`l1=${l1}`);
  console.log(`l2=${l2}`);
  console.log(`overload=${overload}`);

  console.log(`oneStep=${oneStep}`);
  console.log(`twoStep=${twoStep}`);
  console.log(`threeStep=${threeStep}`);
  console.log(`fourStep=${fourStep}`);

  console.log(`move=${move}`);

  console.log(`oneBig=${oneBig}`);
  console.log(`twoBig=${twoBig}`);
  console.log(`bigValue=${bigValue}`);
  console.log(`result=${result}`);
  console.log(`finalResult=${finalResult}`);

  return finalResult;
}
