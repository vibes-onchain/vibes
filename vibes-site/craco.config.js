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
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  babel: {
    "presets": [
      [
        "@babel/preset-env",
        {
          "loose": true,
          "shippedProposals": true
        }
      ]
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      '@babel/plugin-proposal-private-methods',
      '@babel/plugin-proposal-private-property-in-object',
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
