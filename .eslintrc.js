module.exports = {
  "extends": ["semistandard", "standard-jsx"],
  "rules": {
    // Por defecto las funciones se declaran con espacio antes del paréntesis! `function hello () {}`
    // Horrible, así que esta regla la cambiamos.
    "space-before-function-paren": ["error", {
        "anonymous": "never",
        "named": "never",
        "asyncArrow": "always"
    }]
  },
  "globals": {
    // TODO: revisar uso de fetch, o quizás tendríamos que usar alguna configuración de eslint para react native.
    "fetch": true
  }
};
