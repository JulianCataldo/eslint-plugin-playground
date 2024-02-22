import type { Rule } from "eslint";

import synchronizedPrettier from "@prettier/sync";

const prettierOptions = {
  parser: "html",
  useTabs: false,
};

export const myRule = {
  meta: {
    fixable: "code",
  },
  create(context) {
    return {
      TemplateLiteral(node) {
        if (node.parent.type !== "TaggedTemplateExpression") return;
        console.log({ node });
        const sourceCode = context.sourceCode;
        const sourceCodeText = sourceCode.getText(node);

        // node.quasis.forEach((q) => console.log({ q }));
        // const firstToken = sourceCode.getFirstToken(node)!;

        const formattedCode = synchronizedPrettier.format(
          sourceCodeText,
          prettierOptions
        );
        // console.log({
        //   sourceCodeText,
        //   formattedCode,
        // });

        context.report({
          message: "oh no",

          loc: node.loc!,
          fix: (fixer) => {
            const replacedRange = fixer.replaceText(node, formattedCode);
            console.log({ replacedRange });
            return replacedRange;
          },
        });
      },

      // TemplateElement(node) {
      //   // console.log({ elem: node });
      // },
    };
  },
} satisfies Rule.RuleModule;
