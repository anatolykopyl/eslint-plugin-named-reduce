/**
 * @fileoverview Disallow Array#reduce() outside of a
 * @author Anatoly Kopyl
 */
"use strict";

const rule = require("../../../lib/rules/named-reduce"),
  RuleTester = require("eslint").RuleTester;

const config = {
  env: {
    browser: true,
    es6: true,
    mocha: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
}

const ruleTester = new RuleTester(config);
ruleTester.run("named-reduce", rule, {
  valid: [
    "function sum(nums) { return array.reduce(reducer) }",
    "const sum = (nums) => array.reduce(reducer)",
    "const sum = function(nums) { return array.reduce(reducer) }",
    "const positive = array.filter(reducer)"
  ],

  invalid: [
    {
      code: "const foo = array.reduce(reducer)",
      errors: [{ message: "reduce call should be wrapped in its own function." }],
    },
    {
      code: "function sum(nums) { const a = 2; return array.reduce(reducer) }",
      errors: [{ message: "reduce call should be wrapped in its own function." }],
    },
    {
      code: "function sum(nums) { const result = array.reduce(reducer); return result }",
      errors: [{ message: "reduce call should be wrapped in its own function." }],
    },
  ],
});