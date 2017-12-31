module.exports = ({
  "extends": [
    "react-app",
    "airbnb"
  ],

  "env": {
    "browser": true,
    "es6": true
  },

  "rules": {
    "react/jsx-closing-bracket-location":0,

    // require object literal shorthand syntax
    "object-shorthand": [0, "never"],

    // disallow or enforce trailing commas
    "comma-dangle": [2, "always-multiline"],

    // Prefer default export when only 1 item is being exported in a file
    "import/prefer-default-export": 1,

    // disallow assignment in conditional expressions
    "no-cond-assign": 1,

    // disallow use of console (off by default in the node environment)
    "no-console": 0,

    // disallow use of constant expressions in conditions
    "no-constant-condition": 1,

    // disallow control characters in regular expressions
    "no-control-regex": 2,

    // disallow object as prop type
    "react/forbid-prop-types": 1,

    // disallow use of debugger
    "no-debugger": 2,

    // disallow duplicate arguments in functions
    "no-dupe-args": 2,

    // disallow duplicate keys when creating object literals
    "no-dupe-keys": 2,

    // disallow a duplicate case label.
    "no-duplicate-case": 2,

    // disallow empty statements
    "no-empty": 2,

    // disallow the use of empty character classes in regular expressions
    "no-empty-character-class": 2,

    // disallow assigning to the exception in a catch block
    "no-ex-assign": 2,

    // disallow double-negation boolean casts in a boolean context
    "no-extra-boolean-cast": 2,

    // disallow unnecessary semicolons
    "no-extra-semi": 2,

    // disallow overwriting functions written as function declarations
    "no-func-assign": 2,

    // disallow function or variable declarations in nested blocks
    "no-inner-declarations": 2,

    // disallow invalid regular expression strings in the RegExp constructor
    "no-invalid-regexp": 2,

    // disallow mixes of different operators
    "no-mixed-operators": 0,

    // disallow irregular whitespace outside of strings and comments
    "no-irregular-whitespace": 2,

    // disallow negation of the left operand of an in expression
    "no-negated-in-lhs": 2,

    // disallow the use of object properties of the global object (Math and
    // JSON) as functions
    "no-obj-calls": 2,

    // disallow multiple spaces in a regular expression literal
    "no-regex-spaces": 2,

    // disallow sparse arrays
    "no-sparse-arrays": 2,

    // disallow unreachable statements after a return, throw, continue, or break
    // statement
    "no-unreachable": 1,

    // disallow comparisons with the value NaN
    "use-isnan": 2,

    // Ensure JSDoc comments are valid (off by default)
    "valid-jsdoc": 2,

    // Ensure that the results of typeof are compared against a valid string
    "valid-typeof": 2,

    // Enforces return statements in callbacks of array's methods
    "array-callback-return": 1,

    //
    // Best Practices
    //
    // These are rules designed to prevent you from making mistakes.  They
    // either prescribe a better way of doing something or help you avoid
    // footguns.

    // treat var statements as if they were block scoped (off by default). 0:
    // deep destructuring is not compatible
    // https://github.com/eslint/eslint/issues/1863
    "block-scoped-var": 0,

    // Enforce object & array destructuring
    "prefer-destructuring": 1,

    // specify the maximum cyclomatic complexity allowed in a program (off by
    // default)
    "complexity": 0,

    // require return statements to either always or never specify values
    "consistent-return": 0,

    // specify curly brace conventions for all control statements
    "curly": 2,

    // require default case in switch statements (off by default)
    "default-case": 1,

    // encourages use of dot notation whenever possible
    "dot-notation": 2,

    // require the use of === and !==
    "eqeqeq": 1,

    // make sure for-in loops have an if statement (off by default)
    "guard-for-in": 0,

    // disallow the use of alert, confirm, and prompt
    "no-alert": 1,

    // disallow use of arguments.caller or arguments.callee
    "no-caller": 2,

    // disallow division operators explicitly at beginning of regular expression
    // (off by default)
    "no-div-regex": 2,

    // disallow else after a return in an if (off by default)
    "no-else-return": 2,

    // disallow comparisons to null without a type-checking operator (off by
    // default)
    "no-eq-null": 2,

    // disallow use of eval()
    "no-eval": 2,

    // disallow adding to native types
    "no-extend-native": 2,

    // disallow unnecessary function binding
    "no-extra-bind": 2,

    // disallow fallthrough of case statements
    "no-fallthrough": 2,

    // disallow the use of leading or trailing decimal points in numeric
    // literals (off by default)
    "no-floating-decimal": 2,

    // disallow use of eval()-like methods
    "no-implied-eval": 2,

    // disallow usage of __iterator__ property
    "no-iterator": 2,

    // disallow use of labeled statements
    "no-labels": 2,

    // disallow unnecessary nested blocks
    "no-lone-blocks": 2,

    // disallow creation of functions within loops
    "no-loop-func": 2,

    // disallow use of multiple spaces
    "no-multi-spaces": 2,

    // disallow use of multiline strings
    "no-multi-str": 2,

    // disallow reassignments of native objects
    "no-native-reassign": 2,

    // disallow use of new operator when not part of the assignment or comparison
    "no-new": 2,

    // disallow use of new operator for Function object
    "no-new-func": 2,

    // disallows creating new instances of String,Number, and Boolean
    "no-new-wrappers": 2,

    // disallow use of octal literals
    "no-octal": 2,

    // disallow use of octal escape sequences in string literals, such as var
    // foo = "Copyright \251";
    "no-octal-escape": 2,

    // disallow reassignment of function parameters (off by default)
    "no-param-reassign": 0,

    // disallow use of process.env (off by default)
    "no-process-env": 0,

    // disallow usage of __proto__ property
    "no-proto": 2,

    // disallow declaring the same variable more then once
    "no-redeclare": 2,

    // disallow use of assignment in return statement
    "no-return-assign": 0,

    // Require parens in arrow function arguments
    "arrow-parens": [2, "always", { "requireForBlockBody": false }],

    // disallow use of javascript: urls.
    "no-script-url": 2,

    // disallow comparisons where both sides are exactly the same (off by default)
    "no-self-compare": 2,

    // disallow use of comma operator
    "no-sequences": 2,

    // restrict what can be thrown as an exception (off by default)
    "no-throw-literal": 2,

    // disallow usage of expressions in statement position
    "no-unused-expressions": 2,

    // disallow use of void operator (off by default)
    "no-void": 2,

    // disallow usage of configurable warning terms in comments": 2, // e.g.
    // TODO or FIXME (off by default)
    "no-warning-comments": [0, {"terms": ["todo", "fixme"], "location": "start"}],

    // disallow use of the with statement
    "no-with": 2,

    // require use of the second argument for parseInt() (off by default)
    "radix": 0,

    // requires to declare all vars on top of their containing scope (off by default)
    "vars-on-top": 0,

    // require immediate function invocation to be wrapped in parentheses (off by default)
    "wrap-iife": 2,

    // require or disallow Yoda conditions
    "yoda": 2,

    //
    // Strict Mode
    //
    // These rules relate to using strict mode.

    // controls location of Use Strict Directives. 0: required by `babel-eslint`
    "strict": 0,

    //
    // Variables
    //
    // These rules have to do with variable declarations.
    //

    // disallow the catch clause parameter name being the same as a variable in
    // the outer scope (off by default in the node environment)
    "no-catch-shadow": 2,

    // disallow deletion of variables
    "no-delete-var": 2,

    // disallow labels that share a name with a variable
    "no-label-var": 2,

    // disallow declaration of variables already declared in the outer scope
    "no-shadow": 0,

    // disallow shadowing of names such as arguments
    "no-shadow-restricted-names": 2,

    // disallow use of undeclared variables unless mentioned in a /*global */ block
    "no-undef": 2,

    // disallow use of undefined when initializing variables
    "no-undef-init": 2,

    // Disallow Use of Chained Assignment Expressions
    "no-multi-assign": 1,

    // disallow use of undefined variable (off by default)
    "no-undefined": 2,

    // disallow declaration of variables that are not used in the code
    "no-unused-vars": [2, { "args": "none", "ignoreRestSiblings": true }],

    // disallow use of variables before they are defined
    "no-use-before-define": 1,

    //
    // Stylistic Issues
    //
    // These rules are purely matters of style and are quite subjective.

    // disallow specified properties
    "no-restricted-properties": 1,

    // disallow specified syntax
    "no-restricted-syntax": 1,

    // this option sets a specific tab width for your code (off by default)
    "indent": [2, 2, { "SwitchCase": 1 }],

    // enforce one true brace style (off by default)
    "brace-style": 2,

    // require camel case names
    "camelcase": 0,

    // enforce spacing before and after comma
    "comma-spacing": [1, {"before": false, "after": true}],

    // enforce one true comma style (off by default)
    "comma-style": [1, "last"],

    // enforces consistent naming when capturing the current execution context
    // (off by default)
    "consistent-this": [1, "_this"],

    // enforce newline at the end of file, with no multiple empty lines
    "eol-last": 1,

    // require function expressions to have a name (off by default)
    "func-names": 0,

    // enforces use of function declarations or expressions (off by default)
    "func-style": [2, "declaration", { "allowArrowFunctions": true }],

    // enforces spacing between keys and values in object literal properties
    "key-spacing": [1, {"beforeColon": false, "afterColon": true}],

    // specify the maximum depth callbacks can be nested (off by default)
    "max-nested-callbacks": [1, 5],

    // require a capital letter for constructors
    "new-cap": [1, {"newIsCap": true, "capIsNew": false}],

    // disallow the omission of parentheses when invoking a constructor with no
    // arguments
    "new-parens": 1,

    // allow or disallow an empty newline after var statement (off by default)
    "newline-after-var": 0,

    // disallow use of the Array constructor
    "no-array-constructor": 0,

    // disallow comments inline after code (off by default)
    "no-inline-comments": 2,

    // disallow if as the only statement in an else block (off by default)
    "no-lonely-if": 2,

    // disallow mixed spaces and tabs for indentation
    "no-mixed-spaces-and-tabs": 2,

    // disallow multiple empty lines (off by default)
    "no-multiple-empty-lines": [1, {"max": 2}],

    // disallow nested ternary expressions (off by default)
    "no-nested-ternary": 2,

    // disallow use of the Object constructor
    "no-new-object": 0,

    // disallow space between function identifier and application
    "no-spaced-func": 1,

    // disallow the use of ternary operators (off by default)
    "no-ternary": 0,

    // disallow trailing whitespace at the end of lines
    "no-trailing-spaces": 1,

    // disallow dangling underscores in identifiers
    "no-underscore-dangle": 2,

    // disallow unnecessary parentheses (off by default)
    "no-extra-parens": 0,

    // Make people use more spaces after block statements instead of blocks
    // being tied together
    "padding-line-between-statements": [
      2,
      {
        "blankLine": "always",
        "prev": ["block", "block-like", "multiline-block-like"],
        "next": "*"
      },
      {
        "blankLine": "always",
        "prev": "case",
        "next": "default"
      },
      {
        "blankLine": "any",
        "prev": "*",
        "next": "break"
      },
      {
        "blankLine": "always",
        "prev": ["block", "block-like", "multiline-block-like"],
        "next": "return"
      },
      {
        "blankLine": "any",
        "prev": ["const", "let", "var"],
        "next": "*"
      }
    ],

    // allow just one var statement per function (off by default)
    "one-var": [2, "never"],

    // require assignment operator shorthand where possible or prohibit it
    // entirely (off by default)
    "operator-assignment": [0, "never"],

    // Enforce that class methods utilize this
    "class-methods-use-this": 0,

    // enforce padding within blocks (off by default)
    "padded-blocks": [2, "never"],

    // require or disallow an empty line between class members
    "lines-between-class-members": [2, "always"],

    // require quotes around object literal property names (off by default)
    "quote-props": [1, "as-needed"],

    // specify whether double or single quotes should be used
    "quotes": [0, "single"],

    // require or disallow use of semicolons instead of ASI
    "semi": [2, "always"],

    // enforce spacing before and after semicolons
    "semi-spacing": [1, {"before": false, "after": true}],

    // sort variables within the same declaration block (off by default)
    "sort-vars": 0,

    // require a space after certain keywords (off by default)
    "keyword-spacing": [2, { "before": true, "after": true }],

    // require or disallow space before blocks (off by default)
    "space-before-blocks": [2, "always"],

    // enforce consistent line breaks inside function parentheses
    "function-paren-newline": 0,

    // require or disallow space before function opening parenthesis (off by default)
    "space-before-function-paren": [2, {"anonymous": "never", "named": "never"}],

    // require or disallow spaces inside object
    "object-curly-spacing": [1, "always"],

    // require or disallow spaces inside arrays
    "array-bracket-spacing": [1, "never"],

    // require or disallow spaces inside arrays/object inside each other
    "computed-property-spacing": [1, "never"],

    // require or disallow spaces inside parentheses (off by default)
    "space-in-parens": [1, "never"],

    // require spaces around operators
    "space-infix-ops": 1,

    // Require or disallow spaces before/after unary operators (words on by
    // default, nonwords off by default)
    "space-unary-ops": [1, {"words": true, "nonwords": false}],

    // require or disallow a space immediately following the // in a line
    // comment (off by default)
    "spaced-comment": [1, "always"],

    // require regex literals to be wrapped in parentheses (off by default)
    "wrap-regex": 0,

    //
    // ECMAScript 6
    //
    // These rules are only relevant to ES6 environments and are off by default.

    // require let or const instead of var (off by default)
    "no-var": 2,

    // enforce the spacing around the * in generator functions (off by default)
    "generator-star-spacing": [2, "before"],

    //
    // Legacy
    //
    // The following rules are included for compatibility with JSHint and JSLint.
    // While the names of the rules may not match up with the JSHint/JSLint counterpart,
    // the functionality is the same.

    // specify the maximum depth that blocks can be nested (off by default)
    "max-depth": [2, 4],

    // specify the maximum length of a line in your program (off by default)
    "max-len": [0, 100, 2],

    // limits the number of parameters that can be used in the function
    // declaration. (off by default)
    "max-params": [0, 99],

    // specify the maximum number of statement allowed in a function (off by default)
    "max-statements": 0,

    // disallow use of bitwise operators (off by default)
    "no-bitwise": 0,

    // disallow use of unary operators, ++ and -- (off by default)
    "no-plusplus": 0,

    //
    // eslint-plugin-react
    //
    // React specific linting rules for ESLint

    // Prevent missing displayName in a React component definition
    "react/display-name": 0,

    // Enforce quote style for JSX attributes
    "jsx-quotes": [2, "prefer-double"],

    // Disallow undeclared variables in JSX
    "react/jsx-no-undef": 2,

    // Enforce props alphabetical sorting
    "react/jsx-sort-props": 0,

    // Prevent React to be incorrectly marked as unused
    "react/jsx-uses-react": 2,

    // Enforce stateless React Components to be written as a pure function
    "react/prefer-stateless-function": 0,

    // Prevent variables used in JSX to be incorrectly marked as unused
    "react/jsx-uses-vars": 2,

    // Prevent function binding outside of the constructor
    "react/jsx-no-bind": [2, { "allowArrowFunctions": true }],

    // Prevent usage of setState in componentDidMount
    "react/no-did-mount-set-state": 2,

    // Prevent usage of setState in componentDidUpdate
    "react/no-will-update-set-state": 2,

    // Prevent usage of setState in componentDidUpdate
    "react/no-did-update-set-state": 2,

    // Prevent multiple component definition per file
    "react/no-multi-comp": 0,

    // Prevent usage of unknown DOM property
    "react/no-unknown-property": 2,

    // Prevent missing props validation in a React component definition
    "react/prop-types": 0,

    // Prevent missing React when using JSX
    "react/react-in-jsx-scope": 2,

    // Prevent extra closing tags for components without children
    "react/self-closing-comp": 2,

    // Prevent missing parentheses around multilines JSX
    "react/jsx-wrap-multilines": 2,

    // Prevent that an element uses an Array index in its key property
    "react/no-array-index-key": 0,

    // Prevent invalid characters from appearing in markup
    "react/no-unescaped-entities": 1,

    // Enforce component methods order
    "react/sort-comp": 0,

    // Allow interaction for static elements
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,

    // Disable so we can add events to anchors whenever we want
    "jsx-a11y/anchor-is-valid": 0,

    // Enforce alt property on an img-tag
    "jsx-a11y/alt-text": 1,

    // Enforce the usage of for-attribute on a label-element
    "jsx-a11y/label-has-for": 1,

    // Enforce the usage of autoFocus prop on jsx elements
    "jsx-a11y/no-autofocus": 0,

    // Enforce key events with mouse events
    "jsx-a11y/mouse-events-have-key-events": 0,

    // Enforce that iframes require a title attribute
    "jsx-a11y/iframe-has-title": 1,

    // NOTE: This has to be 0 because it has been removed or doesn't work properly
    "jsx-a11y/href-no-hash": 0
  }
});
