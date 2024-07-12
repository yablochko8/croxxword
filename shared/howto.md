If you create a folder structure that looks like this...
project/
├── server/
├── frontend/
└── shared/
...you may initially struggle to import variables from shared into frontend or server.

# How I've attempted it in this project

I combined the three `tsconfig.*.json` files into one, and then added in...

```js
{
"compilerOptions": {
  "rootDir": "../",
}
 "include": ["src", "vite.config.ts", "../shared"]
}
```

("src" and "vite.config.ts" were already in include)

# NOTES FROM A PREVIOUS PROJECT - DIFFERENT APPROACH

After some experimentation, the solution in my project was to make sure that the tsconfig.json includes the following under compilerOptions:

`/frontend/tsconfig.json`

add to paths and shared;

```
"paths": {
"shared": ["../shared"],
"@/_": ["./src/_"]
```

Full change and context here: https://github.com/fractal-bootcamp/lui.mailing-list-builder/pull/3/commits/e247e3e52f843ed9273e1e9f65ea32b013570d48
(in my case we also had to delete some near-duplicates like tsconfig.app.json, which may have been part of the problem)

this also requires the change in the tsconfig
"rootDir": ".." (edited)
