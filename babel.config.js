module.exports = {
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            src: "./src",
            "@assets": "./assets",
            "@components": "./src/components",
            "@constants": "./src/constants",
            "@hooks": "./src/hooks",
            "@context": "./src/context",
            "@screens": "./src/screens",
            "@utils": "./src/utils",
            "@typings": "./src/typings",
          },
        },
      ],
    ],
    presets: ["babel-preset-expo", "@babel/preset-typescript"],
  };
  