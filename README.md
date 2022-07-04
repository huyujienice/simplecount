# simpleCount

解决 javascript 计算中因 IEEE 754 标准引起的，浮点数精度以及计算不准确的问题
且兼容超大数计算

# 如何使用
const a = 0.1
const b = 0.2
const c = 1.335

const addResult = add(a,b)  //->'0.3'
const subResult = sub(a,b)  //->'-0.1'
const mulResult = mul(a,b)  //->'0.02'
const diviResult = divi(a,b)  //->'0.50'
const simpleToFixedResult = simpleToFiexed(c)  //->'1.34'

const d = Number.MAX_SAFE_INTEGER  //->9007199254740991
const e = 11
const f = 3

const bigAddResult = add(d,e) //->'9007199254741002'
const bigSubResult = sub(bigAddResult,f) //->'9007199254740999'
const bigMulResult = mul(bigAddResult,f) //->'27021597764223006'
const bigDiviResult = divi(bigAddResult,f) //->'3002399751580334.00'
const bigstfResult = simpleToFiexed(bigAddResult) //->'9007199254741002.00'

# 安装

## 1.建议使用 npm 包安装

yarn add simplecount
或者
npm install simplecount

## 2.浏览器环境可直接添加编译完成后的文件引用

<script type="text/javascript" src="simplecount.js"></script>

# API 列表

add(a,b) 返回结果字符串，加法,a+b
sub(a,b) 返回结果字符串，减法,a-b
mul(a,b) 返回结果字符串，乘法,a\*b
divi(a,b,c) 返回结果字符串，除法,a/b，保留 c 位小数，c 可不传，默认为 2
simpleToFixed(a,c) 返回结果字符串，四舍五入重构 toFixed,对 a 进行定点表示法格式化，c 表示小数点后数字的个数，c 可不传，默认为 2

## module 环境使用：

import {add,sub,mul,divi,simpleToFixed} from 'simplecount';

## commonjs 环境使用：

const {add,sub,mul,divi,simpleToFixed} = require('simplecount');

## 浏览器环境使用：

var add = window.simplecount.add;
var sub = window.simplecount.sub;
var mul = window.simplecount.mul;
var divi = window.simplecount.divi;
var simpleToFixed = window.simplecount.simpleToFixed;

## 单元测试

运行:
yarn test
yarn test:add
yarn test:sub
yarn test:mul
yarn test:divi

# simpleCount

a small and simple tools for js count accuracy problems
