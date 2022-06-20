const { add, sub, mul, divi, simpleToFixed } = require("./core/index");

function pagelog(msg) {
  const div = document.createElement("div");
  div.innerHTML = `${msg}`;
  document.body.appendChild(div);
}
const value3 = `1.95`;
const result3 = `simpleToFixed(${value3},1)=${simpleToFixed(value3, 1)}`;

pagelog(`value3=${value3}`);
pagelog(result3);

// const value1 = `1.22`;
// const value2 = `0.123`;

// console.log(`value1=${value1}`);
// console.log(`value2=${value2}`);

// console.log(`value1+value2=${value1 + value2}`);
// console.log(`add=${add(value1, value2)}`);

// console.log(`value1-value2=${value1 - value2}`);
// console.log(`sub=${sub(value1, value2)}`);

// console.log(`value1*value2=${value1 * value2}`);
// console.log(`mul=${mul(value1, value2)}`);

// console.log(`value1/value2=${value1 / value2}`);
// console.log(`divi=${divi(value1, value2)}`);
