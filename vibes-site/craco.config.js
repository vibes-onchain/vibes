/* craco.config.js */

const {
  when,
  whenDev,
  whenProd,
  whenTest,
  ESLINT_MODES,
  POSTCSS_MODES,
} = require("@craco/craco");

module.exports = {
  // eslint: {
  //   mode: ESLINT_MODES.file,
  // },
  eslint: {
    mode: ESLINT_MODES.extends,
    configure: () => {
      // Workaround for broken ESLINT_MODES.file mode
      return require('./.eslintrc')
    }
  },
  babel: {
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-export-namespace-from",
      "@babel/plugin-transform-flow-strip-types",
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            ":": "./src",
          },
        },
      ],
    ],
  },
};
