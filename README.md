# ESLint Plugin Playground

Experiment for making [ESLint Stylistic](https://eslint.style/) to format like
[Prettier does](https://prettier.io/blog/2020/08/24/2.1.0.html) for `html` template tag literals (and `svg`, `css`).

It is just using Prettier inside the template literal. This is a analogous to [ESLint plugin format](https://github.com/antfu/eslint-plugin-format), but for embedded languages.

This is my first attempt at making an ESLint plugin, so expect this to be very naive.

---

## Current issues

- Trim remaining surrounding whitespace
- Inherit indenting level
- How are nested literals supposed to behave?
- Should extract interpolations from the formatting process
- Replacing the text seems to block further processing for nested templates

## Try with the testbed

```
pnpm i
pnpm dev
```

<!-- ___DEMO___ -->

<!--  -->

## Original

<!-- prettier-ignore -->
```ts
const name = `Rantanplan`
  const animals = [ 
    `dog`,"cat"]


        


export default createBeerBottle({
           drink: ({ url }) => html`
   ${url}

<div>
        <h1>It's a 404!</h1>

  </  div>
                                               ${
                                                                // My eyes bleed
                                                 name +     'dddd'}

                   <span>

                   ${animals.map((e,i)=>html`
                                                <span>
                                                  <div>     ${e} / ${i}   </div>
                                                    </span>
                   `)}
                       </span>



                   <hr />
 `,
});

```

<!-- prettier-ignore -->
## With Prettier

```ts
const name = `Rantanplan`;
const animals = [`dog`, "cat"];

export default createBeerBottle({
  drink: ({ url }) => html`
    ${url}

    <div>
      <h1>It's a 404!</h1>
    </div>
    ${
      // My eyes bleed
      name + "dddd"
    }

    <span>
      ${animals.map(
        (e, i) => html`
          <span>
            <div>${e} / ${i}</div>
          </span>
        `,
      )}
    </span>

    <hr />
  `,
});

```

## Current result

<!-- prettier-ignore -->
```ts
const name = `Rantanplan`;
const animals = [
    `dog`, "cat"
];

export default createBeerBottle({
  drink: ({ url }) => html` ${url}

<div>
  <h1>It's a 404!</h1>
</div>
${ // My eyes bleed name + 'dddd'}

<span>
  ${animals.map((e,i)=>html`
  <span>
    <div>${e} / ${i}</div>
  </span>
  `)}
</span>

<hr />
`
,
});

```

---
