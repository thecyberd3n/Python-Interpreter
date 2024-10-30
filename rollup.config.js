import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'editor.js', // Entry file
  output: {
    file: 'bundle.js', // Output to a folder your Python framework serves (like Flask’s /static)
    format: 'iife', // IIFE for browser compatibility
    sourcemap: true
  },
  plugins: [
    resolve(),  // Allows Rollup to resolve dependencies from node_modules
    commonjs(), // Converts CommonJS modules to ES6 for bundling
    terser()    // Minifies the bundle
  ]
};
