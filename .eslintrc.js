module.exports = {
  "extends": "semistandard",
  "rules": {
    // Por defecto las funciones se declaran con espacio antes del paréntesis! `function hello () {}`
    // Horrible, así que esta regla la cambiamos.
    "space-before-function-paren": ["error", {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always"
    }]
  }
};
