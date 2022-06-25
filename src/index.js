const { add, sub, mul, divi, simpleToFixed } = require("./core/index");

function pagelog(msg) {
  const div = document.createElement("div");
  div.innerHTML = `${msg}`;
  document.body.appendChild(div);
}
const value3 = `99.995`;
const result3 = `simpleToFixed(${value3},3)=${simpleToFixed(value3, 2)}`;

pagelog(`value3=${value3}`);
pagelog(result3);

const value1 = 19.9;
const value2 = 100;

pagelog(`value1=${value1}`);
pagelog(`value2=${value2}`);

pagelog(`value1+value2=${value1 + value2}`);
pagelog(`add=${add(value1, value2)}`); 

pagelog(`value1-value2=${value1 - value2}`);
pagelog(`sub=${sub(value1, value2)}`);

pagelog(`value1*value2=${value1 * value2}`);
pagelog(`mul=${mul(value1, value2)}`);

pagelog(`value1/value2=${value1 / value2}`);
pagelog(`divi=${divi(value1, value2)}`);
