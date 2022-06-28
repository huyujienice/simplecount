const { add, sub, mul, divi, simpleToFixed } = require("./core/index");
const BigNumber = require("bignumber.js");

function pagelog(msg) {
  const div = document.createElement("div");
  div.innerHTML = `${msg}`;
  document.body.appendChild(div);
}
const value3 = `1.9999`;
const result3 = `simpleToFixed(${value3},3)=${simpleToFixed(value3, 3)}`;

pagelog(`value3=${value3}`);
pagelog(result3);

const value1 = -10;
const value2 = 10;

pagelog(`value1=${value1}`);
pagelog(`value2=${value2}`);

pagelog(`value1+value2=${value1 + value2}`);
pagelog(`add=${add(value1, value2)}`);
pagelog(`bignumberjsadd=${BigNumber(value1).plus(value2)}`);
console.log(add(value1, value2) == BigNumber(value1).plus(value2));
console.log(typeof add(value1, value2));
console.log(typeof BigNumber(value1).plus(value2));


pagelog(`value1-value2=${value1 - value2}`);
pagelog(`sub=${sub(value1, value2)}`);

pagelog(`value1*value2=${value1 * value2}`);
pagelog(`mul=${mul(value1, value2)}`);

pagelog(`value1/value2=${value1 / value2}`);
pagelog(`divi=${divi(value1, value2)}`);
