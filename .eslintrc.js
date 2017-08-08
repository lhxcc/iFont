"use strict";

module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "env": {
      "browser": true,
      "node": true,
    },
    "rules": {
      "comma-dangle": "off",
      "linebreak-style": "off",
      "strict": ["off", "global"],
      "import/no-webpack-loader-syntax":"off",
      "import/no-extraneous-dependencies": "off",
      "jsx-a11y/no-static-element-interactions": "off",
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",
    },
    "plugins": [
      "react"
    ],
};
