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
          2
      ],
      "semi" : [
        "error",
        "never"
      ],
      "space-in-parens": [
        "error",
        "always",
        {
          "exceptions": [
            "[]", "{}", "()"
          ]
        }
      ],
      "linebreak-style": [
        "error",
        "unix"
      ]
    }
};
