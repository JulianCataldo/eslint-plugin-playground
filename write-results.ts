import prettier from "prettier";

import { readFile, writeFile } from "fs/promises";

export async function writeResults(original: string, eslint: string) {
  const readme = await readFile("./README.md", "utf8");

  const withPrettier = await prettier.format(original, {
    useTabs: false,
    parser: "typescript",
  });

  const demo = `
<!--  -->

## Original

<!-- prettier-ignore -->
\`\`\`ts
${original}
\`\`\`

<!-- prettier-ignore -->
## With Prettier

\`\`\`ts
${withPrettier}
\`\`\`

## Current result

<!-- prettier-ignore -->
\`\`\`ts
${eslint}
\`\`\`
`;

  const marker = "<!-- ___DEMO___ -->";
  const replaced =
    readme.split(marker)[0] +
    `${marker}
${demo}
---
`;

  await writeFile("./README.md", replaced);

  await writeFile("./test-code.prettier.ts", withPrettier);
  await writeFile("./test-code.formatted.ts", eslint);
}
