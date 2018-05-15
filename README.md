# React-Redux-Webpack-Boilerplate
Provide the quick start code for React using Webpack2
Steps:

1) `npm install`
2) `npm start`

thats it...

# To run test cases:
`npm test`

# To Build:
`npm run build` 

# Webpack setup commands ubuntu: (Already done in this boilerplate)

npm install webpack --save npm install webpack-cli --save
npm install webpack-dev-server --save-dev
npm install --save html-webpack-plugin
npm install babel-loader babel-core babel-preset-env --save
npm install babel-cli babel-preset-react --save

npm install redux-logger --save

npm install --save react-hot-loader

npm install --save mini-css-extract-plugin
npm install --save optimize-css-assets-webpack-plugin
npm install --save uglifyjs-webpack-plugin

**In .babelrc file add following:** 

{
    "presets": ["react", "babel-preset-env"]
}
