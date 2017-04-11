module.exports = {
    "env": {
      "es6": false
    },
    "extends": "standard",
    "plugins": [
        "standard",
        "promise"
    ],
    "rules": {
      "indent": [
          "error",
          2,
          {"SwitchCase": 1}
      ],
      "semi" : [
        "error",
        "never"
      ],
      "space-in-parens": [
        "error",
        "always"
      ],
      "linebreak-style": [
        "error",
        "unix"
      ]
    }
};
