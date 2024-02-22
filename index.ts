import { Linter } from "eslint";
import { readFile, writeFile } from "fs/promises";
// import prettier from "prettier";
import antfu from "@antfu/eslint-config";
import { writeResults } from "./write-results.js";
import { myRule } from "./rule.js";

console.clear();
console.log(`\n\n\n===============================\n\n\n`);

const testCode = await readFile("./test-code.ts", "utf8");

const linter = new Linter({
  configType: "flat",
});

const antfuConf = await antfu({ stylistic: { semi: true } });

const config: Linter.FlatConfig[] = [
  // @ts-expect-error IDK why
  ...antfuConf,
  {
    plugins: {
      temp: {
        rules: {
          "my-rule": myRule,
        },
      },
    },

    // @ts-expect-error IDK why
    rules: {
      [`temp/my-rule`]: ["error"],
    },
  },
];

const result = linter.verifyAndFix(testCode, config);

console.log({ result, fixed: result.fixed });

await writeResults(testCode, result.output);
