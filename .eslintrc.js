module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "semi": "off", // Disable the requirement for semicolons
        "no-unused-vars": "warn", // Change the severity of the unused variable rule to a warning
        "no-console": "off", // Allow the use of console.log
        "react/prop-types": "off" // Disable prop-types rule for React components
    }
}
