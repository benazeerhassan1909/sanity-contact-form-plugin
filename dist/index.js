import { defineType, definePlugin } from "sanity";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { forwardRef, createElement, Component, useState, useRef } from "react";
const contactFormSchema = {
  name: "contactForm",
  type: "document",
  title: "Forms",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Form Title"
    },
    {
      name: "showtitle",
      type: "boolean",
      title: "Show Title",
      initialValue: !1
    },
    {
      name: "id",
      type: "string",
      title: "ID",
      options: {
        source: "title"
      }
    },
    {
      name: "class",
      type: "string",
      title: "Class"
    },
    {
      name: "fields",
      type: "array",
      title: "Form Fields",
      of: [
        {
          type: "object",
          title: "Field",
          fields: [
            { name: "label", type: "string", title: "Label" },
            {
              name: "type",
              type: "string",
              title: "Field Type",
              options: {
                list: [
                  { title: "Text", value: "text" },
                  { title: "Email", value: "email" },
                  { title: "Tel", value: "tel" },
                  { title: "Textarea", value: "textarea" },
                  { title: "URL", value: "url" },
                  { title: "File Upload", value: "file" },
                  { title: "Checkbox", value: "checkbox" },
                  { title: "Select Dropdown", value: "select" },
                  { title: "Radio Buttons", value: "radio" }
                ],
                layout: "dropdown"
              }
            },
            {
              name: "showPlaceholder",
              type: "boolean",
              title: "Use Label as Placeholder?",
              initialValue: !0,
              hidden: ({ parent }) => parent?.type === "checkbox" || parent?.type === "radio" || parent?.type === "file" || parent?.type === "select"
            },
            {
              name: "placeholder",
              type: "string",
              title: "Placeholder Text",
              hidden: ({ parent }) => parent?.showPlaceholder
            },
            {
              name: "name",
              type: "string",
              title: "Field Name",
              description: "Unique field name (e.g., fullName, email, phone)"
            },
            {
              name: "selectOptions",
              type: "array",
              title: "Dropdown Options",
              of: [{ type: "string" }],
              description: "Add all available options for selection",
              hidden: ({ parent }) => parent?.type !== "select",
              validation: (Rule) => Rule.custom(
                (options, context) => context.parent?.type === "select" && (!options || options.length === 0) ? "At least one option is required for select fields" : !0
              )
            },
            {
              name: "radioOptions",
              type: "array",
              title: "Radio Options",
              of: [{ type: "string" }],
              description: "Add all available options for selection",
              hidden: ({ parent }) => parent?.type !== "radio"
            },
            {
              name: "checkboxOptions",
              type: "array",
              title: "Checkbox Options",
              of: [{ type: "string" }],
              description: "Add all available options for selection",
              hidden: ({ parent }) => parent?.type !== "checkbox"
            },
            {
              name: "helpText",
              type: "string",
              title: "Help Text"
            },
            {
              name: "note",
              type: "string",
              title: "Note"
            },
            {
              name: "isRequired",
              type: "boolean",
              title: "Required Field?",
              initialValue: !0
            }
          ]
        }
      ]
    },
    {
      name: "submitButtonText",
      type: "string",
      title: "Submit Button Text",
      initialValue: "Apply Now"
    }
  ]
}, formGeneralSettings = defineType({
  name: "formGeneralSettings",
  title: "Form: General Settings",
  type: "document",
  fields: [
    {
      name: "adminEmail",
      title: "Admin Email",
      type: "string",
      description: "The email address where submissions should be sent.",
      validation: (Rule) => Rule.required().email()
    },
    // Gmail smtp settings
    {
      name: "smtpUsername",
      title: "Gmail SMTP Username",
      type: "string",
      description: "For Gmail, use full address",
      validation: (Rule) => Rule.required().email()
    },
    {
      name: "smtpPassword",
      title: "Gmail SMTP Password",
      type: "string",
      description: "For Gmail, use an App Password",
      validation: (Rule) => Rule.required()
    },
    {
      name: "successMessage",
      title: "Success Message",
      type: "text",
      rows: 3,
      description: "Message displayed to the user after successful submission."
    },
    {
      name: "confirmationSubject",
      title: "Email Subject",
      type: "string"
    },
    {
      name: "confirmationMessage",
      title: "Email Message",
      type: "text",
      rows: 4
    },
    {
      name: "recaptchaEnabled",
      title: "Enable reCAPTCHA",
      type: "boolean",
      description: "Enable Google reCAPTCHA for spam protection.",
      initialValue: !1
    },
    {
      name: "recaptchaSiteKey",
      title: "reCAPTCHA Site Key",
      type: "string",
      description: "Google reCAPTCHA site key for spam protection.",
      hidden: ({ document: document2 }) => !document2?.recaptchaEnabled,
      validation: (Rule) => Rule.custom((field, context) => context.document?.recaptchaEnabled && !field ? "Site key is required when reCAPTCHA is enabled" : !0)
    },
    {
      name: "recaptchaSecretKey",
      title: "reCAPTCHA Secret Key",
      type: "string",
      description: "Google reCAPTCHA secret key for server-side validation.",
      hidden: ({ document: document2 }) => !document2?.recaptchaEnabled,
      validation: (Rule) => Rule.custom((field, context) => context.document?.recaptchaEnabled && !field ? "Secret key is required when reCAPTCHA is enabled" : !0)
    }
  ],
  preview: {
    prepare() {
      return {
        title: "Form: General Settings"
      };
    }
  }
});
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x.default : x;
}
var propTypes = { exports: {} }, reactIs$1 = { exports: {} }, reactIs_production_min$1 = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactIs_production_min$1;
function requireReactIs_production_min$1() {
  if (hasRequiredReactIs_production_min$1) return reactIs_production_min$1;
  hasRequiredReactIs_production_min$1 = 1;
  var b = typeof Symbol == "function" && Symbol.for, c = b ? Symbol.for("react.element") : 60103, d = b ? Symbol.for("react.portal") : 60106, e = b ? Symbol.for("react.fragment") : 60107, f = b ? Symbol.for("react.strict_mode") : 60108, g = b ? Symbol.for("react.profiler") : 60114, h = b ? Symbol.for("react.provider") : 60109, k = b ? Symbol.for("react.context") : 60110, l = b ? Symbol.for("react.async_mode") : 60111, m = b ? Symbol.for("react.concurrent_mode") : 60111, n = b ? Symbol.for("react.forward_ref") : 60112, p = b ? Symbol.for("react.suspense") : 60113, q = b ? Symbol.for("react.suspense_list") : 60120, r = b ? Symbol.for("react.memo") : 60115, t = b ? Symbol.for("react.lazy") : 60116, v = b ? Symbol.for("react.block") : 60121, w = b ? Symbol.for("react.fundamental") : 60117, x = b ? Symbol.for("react.responder") : 60118, y = b ? Symbol.for("react.scope") : 60119;
  function z(a) {
    if (typeof a == "object" && a !== null) {
      var u = a.$$typeof;
      switch (u) {
        case c:
          switch (a = a.type, a) {
            case l:
            case m:
            case e:
            case g:
            case f:
            case p:
              return a;
            default:
              switch (a = a && a.$$typeof, a) {
                case k:
                case n:
                case t:
                case r:
                case h:
                  return a;
                default:
                  return u;
              }
          }
        case d:
          return u;
      }
    }
  }
  function A(a) {
    return z(a) === m;
  }
  return reactIs_production_min$1.AsyncMode = l, reactIs_production_min$1.ConcurrentMode = m, reactIs_production_min$1.ContextConsumer = k, reactIs_production_min$1.ContextProvider = h, reactIs_production_min$1.Element = c, reactIs_production_min$1.ForwardRef = n, reactIs_production_min$1.Fragment = e, reactIs_production_min$1.Lazy = t, reactIs_production_min$1.Memo = r, reactIs_production_min$1.Portal = d, reactIs_production_min$1.Profiler = g, reactIs_production_min$1.StrictMode = f, reactIs_production_min$1.Suspense = p, reactIs_production_min$1.isAsyncMode = function(a) {
    return A(a) || z(a) === l;
  }, reactIs_production_min$1.isConcurrentMode = A, reactIs_production_min$1.isContextConsumer = function(a) {
    return z(a) === k;
  }, reactIs_production_min$1.isContextProvider = function(a) {
    return z(a) === h;
  }, reactIs_production_min$1.isElement = function(a) {
    return typeof a == "object" && a !== null && a.$$typeof === c;
  }, reactIs_production_min$1.isForwardRef = function(a) {
    return z(a) === n;
  }, reactIs_production_min$1.isFragment = function(a) {
    return z(a) === e;
  }, reactIs_production_min$1.isLazy = function(a) {
    return z(a) === t;
  }, reactIs_production_min$1.isMemo = function(a) {
    return z(a) === r;
  }, reactIs_production_min$1.isPortal = function(a) {
    return z(a) === d;
  }, reactIs_production_min$1.isProfiler = function(a) {
    return z(a) === g;
  }, reactIs_production_min$1.isStrictMode = function(a) {
    return z(a) === f;
  }, reactIs_production_min$1.isSuspense = function(a) {
    return z(a) === p;
  }, reactIs_production_min$1.isValidElementType = function(a) {
    return typeof a == "string" || typeof a == "function" || a === e || a === m || a === g || a === f || a === p || a === q || typeof a == "object" && a !== null && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
  }, reactIs_production_min$1.typeOf = z, reactIs_production_min$1;
}
var reactIs_development$1 = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactIs_development$1;
function requireReactIs_development$1() {
  return hasRequiredReactIs_development$1 || (hasRequiredReactIs_development$1 = 1, process.env.NODE_ENV !== "production" && function() {
    var hasSymbol = typeof Symbol == "function" && Symbol.for, REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103, REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106, REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107, REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108, REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114, REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109, REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110, REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111, REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111, REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112, REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113, REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120, REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115, REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116, REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121, REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117, REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118, REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
    function isValidElementType(type) {
      return typeof type == "string" || typeof type == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type == "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
    }
    function typeOf(object) {
      if (typeof object == "object" && object !== null) {
        var $$typeof = object.$$typeof;
        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type = object.type;
            switch (type) {
              case REACT_ASYNC_MODE_TYPE:
              case REACT_CONCURRENT_MODE_TYPE:
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
                return type;
              default:
                var $$typeofType = type && type.$$typeof;
                switch ($$typeofType) {
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_LAZY_TYPE:
                  case REACT_MEMO_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType;
                  default:
                    return $$typeof;
                }
            }
          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }
    }
    var AsyncMode = REACT_ASYNC_MODE_TYPE, ConcurrentMode = REACT_CONCURRENT_MODE_TYPE, ContextConsumer = REACT_CONTEXT_TYPE, ContextProvider = REACT_PROVIDER_TYPE, Element = REACT_ELEMENT_TYPE, ForwardRef = REACT_FORWARD_REF_TYPE, Fragment = REACT_FRAGMENT_TYPE, Lazy = REACT_LAZY_TYPE, Memo = REACT_MEMO_TYPE, Portal = REACT_PORTAL_TYPE, Profiler = REACT_PROFILER_TYPE, StrictMode = REACT_STRICT_MODE_TYPE, Suspense = REACT_SUSPENSE_TYPE, hasWarnedAboutDeprecatedIsAsyncMode = !1;
    function isAsyncMode(object) {
      return hasWarnedAboutDeprecatedIsAsyncMode || (hasWarnedAboutDeprecatedIsAsyncMode = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
    }
    function isConcurrentMode(object) {
      return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
    }
    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    }
    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE;
    }
    function isElement(object) {
      return typeof object == "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    }
    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    }
    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    }
    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    }
    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    }
    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    }
    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    }
    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    }
    reactIs_development$1.AsyncMode = AsyncMode, reactIs_development$1.ConcurrentMode = ConcurrentMode, reactIs_development$1.ContextConsumer = ContextConsumer, reactIs_development$1.ContextProvider = ContextProvider, reactIs_development$1.Element = Element, reactIs_development$1.ForwardRef = ForwardRef, reactIs_development$1.Fragment = Fragment, reactIs_development$1.Lazy = Lazy, reactIs_development$1.Memo = Memo, reactIs_development$1.Portal = Portal, reactIs_development$1.Profiler = Profiler, reactIs_development$1.StrictMode = StrictMode, reactIs_development$1.Suspense = Suspense, reactIs_development$1.isAsyncMode = isAsyncMode, reactIs_development$1.isConcurrentMode = isConcurrentMode, reactIs_development$1.isContextConsumer = isContextConsumer, reactIs_development$1.isContextProvider = isContextProvider, reactIs_development$1.isElement = isElement, reactIs_development$1.isForwardRef = isForwardRef, reactIs_development$1.isFragment = isFragment, reactIs_development$1.isLazy = isLazy, reactIs_development$1.isMemo = isMemo, reactIs_development$1.isPortal = isPortal, reactIs_development$1.isProfiler = isProfiler, reactIs_development$1.isStrictMode = isStrictMode, reactIs_development$1.isSuspense = isSuspense, reactIs_development$1.isValidElementType = isValidElementType, reactIs_development$1.typeOf = typeOf;
  }()), reactIs_development$1;
}
var hasRequiredReactIs$1;
function requireReactIs$1() {
  return hasRequiredReactIs$1 || (hasRequiredReactIs$1 = 1, process.env.NODE_ENV === "production" ? reactIs$1.exports = requireReactIs_production_min$1() : reactIs$1.exports = requireReactIs_development$1()), reactIs$1.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var objectAssign, hasRequiredObjectAssign;
function requireObjectAssign() {
  if (hasRequiredObjectAssign) return objectAssign;
  hasRequiredObjectAssign = 1;
  var getOwnPropertySymbols = Object.getOwnPropertySymbols, hasOwnProperty = Object.prototype.hasOwnProperty, propIsEnumerable = Object.prototype.propertyIsEnumerable;
  function toObject(val) {
    if (val == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(val);
  }
  function shouldUseNative() {
    try {
      if (!Object.assign)
        return !1;
      var test1 = new String("abc");
      if (test1[5] = "de", Object.getOwnPropertyNames(test1)[0] === "5")
        return !1;
      for (var test2 = {}, i = 0; i < 10; i++)
        test2["_" + String.fromCharCode(i)] = i;
      var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
        return test2[n];
      });
      if (order2.join("") !== "0123456789")
        return !1;
      var test3 = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(letter) {
        test3[letter] = letter;
      }), Object.keys(Object.assign({}, test3)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return objectAssign = shouldUseNative() ? Object.assign : function(target, source) {
    for (var from, to = toObject(target), symbols, s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);
      for (var key in from)
        hasOwnProperty.call(from, key) && (to[key] = from[key]);
      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);
        for (var i = 0; i < symbols.length; i++)
          propIsEnumerable.call(from, symbols[i]) && (to[symbols[i]] = from[symbols[i]]);
      }
    }
    return to;
  }, objectAssign;
}
var ReactPropTypesSecret_1, hasRequiredReactPropTypesSecret;
function requireReactPropTypesSecret() {
  if (hasRequiredReactPropTypesSecret) return ReactPropTypesSecret_1;
  hasRequiredReactPropTypesSecret = 1;
  var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return ReactPropTypesSecret_1 = ReactPropTypesSecret, ReactPropTypesSecret_1;
}
var has, hasRequiredHas;
function requireHas() {
  return hasRequiredHas || (hasRequiredHas = 1, has = Function.call.bind(Object.prototype.hasOwnProperty)), has;
}
var checkPropTypes_1, hasRequiredCheckPropTypes;
function requireCheckPropTypes() {
  if (hasRequiredCheckPropTypes) return checkPropTypes_1;
  hasRequiredCheckPropTypes = 1;
  var printWarning = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var ReactPropTypesSecret = requireReactPropTypesSecret(), loggedTypeFailures = {}, has2 = requireHas();
    printWarning = function(text) {
      var message = "Warning: " + text;
      typeof console < "u" && console.error(message);
      try {
        throw new Error(message);
      } catch {
      }
    };
  }
  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    if (process.env.NODE_ENV !== "production") {
      for (var typeSpecName in typeSpecs)
        if (has2(typeSpecs, typeSpecName)) {
          var error;
          try {
            if (typeof typeSpecs[typeSpecName] != "function") {
              var err = Error(
                (componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw err.name = "Invariant Violation", err;
            }
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error) && printWarning(
            (componentName || "React class") + ": type specification of " + location + " `" + typeSpecName + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof error + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), error instanceof Error && !(error.message in loggedTypeFailures)) {
            loggedTypeFailures[error.message] = !0;
            var stack = getStack ? getStack() : "";
            printWarning(
              "Failed " + location + " type: " + error.message + (stack ?? "")
            );
          }
        }
    }
  }
  return checkPropTypes.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (loggedTypeFailures = {});
  }, checkPropTypes_1 = checkPropTypes, checkPropTypes_1;
}
var factoryWithTypeCheckers, hasRequiredFactoryWithTypeCheckers;
function requireFactoryWithTypeCheckers() {
  if (hasRequiredFactoryWithTypeCheckers) return factoryWithTypeCheckers;
  hasRequiredFactoryWithTypeCheckers = 1;
  var ReactIs = requireReactIs$1(), assign = requireObjectAssign(), ReactPropTypesSecret = requireReactPropTypesSecret(), has2 = requireHas(), checkPropTypes = requireCheckPropTypes(), printWarning = function() {
  };
  process.env.NODE_ENV !== "production" && (printWarning = function(text) {
    var message = "Warning: " + text;
    typeof console < "u" && console.error(message);
    try {
      throw new Error(message);
    } catch {
    }
  });
  function emptyFunctionThatReturnsNull() {
    return null;
  }
  return factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
    var ITERATOR_SYMBOL = typeof Symbol == "function" && Symbol.iterator, FAUX_ITERATOR_SYMBOL = "@@iterator";
    function getIteratorFn(maybeIterable) {
      var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
      if (typeof iteratorFn == "function")
        return iteratorFn;
    }
    var ANONYMOUS = "<<anonymous>>", ReactPropTypes = {
      array: createPrimitiveTypeChecker("array"),
      bigint: createPrimitiveTypeChecker("bigint"),
      bool: createPrimitiveTypeChecker("boolean"),
      func: createPrimitiveTypeChecker("function"),
      number: createPrimitiveTypeChecker("number"),
      object: createPrimitiveTypeChecker("object"),
      string: createPrimitiveTypeChecker("string"),
      symbol: createPrimitiveTypeChecker("symbol"),
      any: createAnyTypeChecker(),
      arrayOf: createArrayOfTypeChecker,
      element: createElementTypeChecker(),
      elementType: createElementTypeTypeChecker(),
      instanceOf: createInstanceTypeChecker,
      node: createNodeChecker(),
      objectOf: createObjectOfTypeChecker,
      oneOf: createEnumTypeChecker,
      oneOfType: createUnionTypeChecker,
      shape: createShapeTypeChecker,
      exact: createStrictShapeTypeChecker
    };
    function is(x, y) {
      return x === y ? x !== 0 || 1 / x === 1 / y : x !== x && y !== y;
    }
    function PropTypeError(message, data) {
      this.message = message, this.data = data && typeof data == "object" ? data : {}, this.stack = "";
    }
    PropTypeError.prototype = Error.prototype;
    function createChainableTypeChecker(validate) {
      if (process.env.NODE_ENV !== "production")
        var manualPropTypeCallCache = {}, manualPropTypeWarningCount = 0;
      function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
        if (componentName = componentName || ANONYMOUS, propFullName = propFullName || propName, secret !== ReactPropTypesSecret) {
          if (throwOnDirectAccess) {
            var err = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw err.name = "Invariant Violation", err;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var cacheKey = componentName + ":" + propName;
            !manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3 && (printWarning(
              "You are manually calling a React.PropTypes validation function for the `" + propFullName + "` prop on `" + componentName + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), manualPropTypeCallCache[cacheKey] = !0, manualPropTypeWarningCount++);
          }
        }
        return props[propName] == null ? isRequired ? props[propName] === null ? new PropTypeError("The " + location + " `" + propFullName + "` is marked as required " + ("in `" + componentName + "`, but its value is `null`.")) : new PropTypeError("The " + location + " `" + propFullName + "` is marked as required in " + ("`" + componentName + "`, but its value is `undefined`.")) : null : validate(props, propName, componentName, location, propFullName);
      }
      var chainedCheckType = checkType.bind(null, !1);
      return chainedCheckType.isRequired = checkType.bind(null, !0), chainedCheckType;
    }
    function createPrimitiveTypeChecker(expectedType) {
      function validate(props, propName, componentName, location, propFullName, secret) {
        var propValue = props[propName], propType = getPropType(propValue);
        if (propType !== expectedType) {
          var preciseType = getPreciseType(propValue);
          return new PropTypeError(
            "Invalid " + location + " `" + propFullName + "` of type " + ("`" + preciseType + "` supplied to `" + componentName + "`, expected ") + ("`" + expectedType + "`."),
            { expectedType }
          );
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createAnyTypeChecker() {
      return createChainableTypeChecker(emptyFunctionThatReturnsNull);
    }
    function createArrayOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker != "function")
          return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside arrayOf.");
        var propValue = props[propName];
        if (!Array.isArray(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an array."));
        }
        for (var i = 0; i < propValue.length; i++) {
          var error = typeChecker(propValue, i, componentName, location, propFullName + "[" + i + "]", ReactPropTypesSecret);
          if (error instanceof Error)
            return error;
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createElementTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!isValidElement(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement."));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createElementTypeTypeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName];
        if (!ReactIs.isValidElementType(propValue)) {
          var propType = getPropType(propValue);
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createInstanceTypeChecker(expectedClass) {
      function validate(props, propName, componentName, location, propFullName) {
        if (!(props[propName] instanceof expectedClass)) {
          var expectedClassName = expectedClass.name || ANONYMOUS, actualClassName = getClassName(props[propName]);
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + actualClassName + "` supplied to `" + componentName + "`, expected ") + ("instance of `" + expectedClassName + "`."));
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createEnumTypeChecker(expectedValues) {
      if (!Array.isArray(expectedValues))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? printWarning(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : printWarning("Invalid argument supplied to oneOf, expected an array.")), emptyFunctionThatReturnsNull;
      function validate(props, propName, componentName, location, propFullName) {
        for (var propValue = props[propName], i = 0; i < expectedValues.length; i++)
          if (is(propValue, expectedValues[i]))
            return null;
        var valuesString = JSON.stringify(expectedValues, function(key, value) {
          var type = getPreciseType(value);
          return type === "symbol" ? String(value) : value;
        });
        return new PropTypeError("Invalid " + location + " `" + propFullName + "` of value `" + String(propValue) + "` " + ("supplied to `" + componentName + "`, expected one of " + valuesString + "."));
      }
      return createChainableTypeChecker(validate);
    }
    function createObjectOfTypeChecker(typeChecker) {
      function validate(props, propName, componentName, location, propFullName) {
        if (typeof typeChecker != "function")
          return new PropTypeError("Property `" + propFullName + "` of component `" + componentName + "` has invalid PropType notation inside objectOf.");
        var propValue = props[propName], propType = getPropType(propValue);
        if (propType !== "object")
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type " + ("`" + propType + "` supplied to `" + componentName + "`, expected an object."));
        for (var key in propValue)
          if (has2(propValue, key)) {
            var error = typeChecker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
            if (error instanceof Error)
              return error;
          }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createUnionTypeChecker(arrayOfTypeCheckers) {
      if (!Array.isArray(arrayOfTypeCheckers))
        return process.env.NODE_ENV !== "production" && printWarning("Invalid argument supplied to oneOfType, expected an instance of array."), emptyFunctionThatReturnsNull;
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (typeof checker != "function")
          return printWarning(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + getPostfixForTypeWarning(checker) + " at index " + i + "."
          ), emptyFunctionThatReturnsNull;
      }
      function validate(props, propName, componentName, location, propFullName) {
        for (var expectedTypes = [], i2 = 0; i2 < arrayOfTypeCheckers.length; i2++) {
          var checker2 = arrayOfTypeCheckers[i2], checkerResult = checker2(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
          if (checkerResult == null)
            return null;
          checkerResult.data && has2(checkerResult.data, "expectedType") && expectedTypes.push(checkerResult.data.expectedType);
        }
        var expectedTypesMessage = expectedTypes.length > 0 ? ", expected one of type [" + expectedTypes.join(", ") + "]" : "";
        return new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`" + expectedTypesMessage + "."));
      }
      return createChainableTypeChecker(validate);
    }
    function createNodeChecker() {
      function validate(props, propName, componentName, location, propFullName) {
        return isNode(props[propName]) ? null : new PropTypeError("Invalid " + location + " `" + propFullName + "` supplied to " + ("`" + componentName + "`, expected a ReactNode."));
      }
      return createChainableTypeChecker(validate);
    }
    function invalidValidatorError(componentName, location, propFullName, key, type) {
      return new PropTypeError(
        (componentName || "React class") + ": " + location + " type `" + propFullName + "." + key + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + type + "`."
      );
    }
    function createShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName], propType = getPropType(propValue);
        if (propType !== "object")
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
        for (var key in shapeTypes) {
          var checker = shapeTypes[key];
          if (typeof checker != "function")
            return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
          var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
          if (error)
            return error;
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function createStrictShapeTypeChecker(shapeTypes) {
      function validate(props, propName, componentName, location, propFullName) {
        var propValue = props[propName], propType = getPropType(propValue);
        if (propType !== "object")
          return new PropTypeError("Invalid " + location + " `" + propFullName + "` of type `" + propType + "` " + ("supplied to `" + componentName + "`, expected `object`."));
        var allKeys = assign({}, props[propName], shapeTypes);
        for (var key in allKeys) {
          var checker = shapeTypes[key];
          if (has2(shapeTypes, key) && typeof checker != "function")
            return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
          if (!checker)
            return new PropTypeError(
              "Invalid " + location + " `" + propFullName + "` key `" + key + "` supplied to `" + componentName + "`.\nBad object: " + JSON.stringify(props[propName], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(shapeTypes), null, "  ")
            );
          var error = checker(propValue, key, componentName, location, propFullName + "." + key, ReactPropTypesSecret);
          if (error)
            return error;
        }
        return null;
      }
      return createChainableTypeChecker(validate);
    }
    function isNode(propValue) {
      switch (typeof propValue) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !propValue;
        case "object":
          if (Array.isArray(propValue))
            return propValue.every(isNode);
          if (propValue === null || isValidElement(propValue))
            return !0;
          var iteratorFn = getIteratorFn(propValue);
          if (iteratorFn) {
            var iterator = iteratorFn.call(propValue), step;
            if (iteratorFn !== propValue.entries) {
              for (; !(step = iterator.next()).done; )
                if (!isNode(step.value))
                  return !1;
            } else
              for (; !(step = iterator.next()).done; ) {
                var entry = step.value;
                if (entry && !isNode(entry[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function isSymbol(propType, propValue) {
      return propType === "symbol" ? !0 : propValue ? propValue["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && propValue instanceof Symbol : !1;
    }
    function getPropType(propValue) {
      var propType = typeof propValue;
      return Array.isArray(propValue) ? "array" : propValue instanceof RegExp ? "object" : isSymbol(propType, propValue) ? "symbol" : propType;
    }
    function getPreciseType(propValue) {
      if (typeof propValue > "u" || propValue === null)
        return "" + propValue;
      var propType = getPropType(propValue);
      if (propType === "object") {
        if (propValue instanceof Date)
          return "date";
        if (propValue instanceof RegExp)
          return "regexp";
      }
      return propType;
    }
    function getPostfixForTypeWarning(value) {
      var type = getPreciseType(value);
      switch (type) {
        case "array":
        case "object":
          return "an " + type;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + type;
        default:
          return type;
      }
    }
    function getClassName(propValue) {
      return !propValue.constructor || !propValue.constructor.name ? ANONYMOUS : propValue.constructor.name;
    }
    return ReactPropTypes.checkPropTypes = checkPropTypes, ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache, ReactPropTypes.PropTypes = ReactPropTypes, ReactPropTypes;
  }, factoryWithTypeCheckers;
}
var factoryWithThrowingShims, hasRequiredFactoryWithThrowingShims;
function requireFactoryWithThrowingShims() {
  if (hasRequiredFactoryWithThrowingShims) return factoryWithThrowingShims;
  hasRequiredFactoryWithThrowingShims = 1;
  var ReactPropTypesSecret = requireReactPropTypesSecret();
  function emptyFunction() {
  }
  function emptyFunctionWithReset() {
  }
  return emptyFunctionWithReset.resetWarningCache = emptyFunction, factoryWithThrowingShims = function() {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret !== ReactPropTypesSecret) {
        var err = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw err.name = "Invariant Violation", err;
      }
    }
    shim.isRequired = shim;
    function getShim() {
      return shim;
    }
    var ReactPropTypes = {
      array: shim,
      bigint: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,
      any: shim,
      arrayOf: getShim,
      element: shim,
      elementType: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim,
      checkPropTypes: emptyFunctionWithReset,
      resetWarningCache: emptyFunction
    };
    return ReactPropTypes.PropTypes = ReactPropTypes, ReactPropTypes;
  }, factoryWithThrowingShims;
}
var hasRequiredPropTypes;
function requirePropTypes() {
  if (hasRequiredPropTypes) return propTypes.exports;
  if (hasRequiredPropTypes = 1, process.env.NODE_ENV !== "production") {
    var ReactIs = requireReactIs$1(), throwOnDirectAccess = !0;
    propTypes.exports = requireFactoryWithTypeCheckers()(ReactIs.isElement, throwOnDirectAccess);
  } else
    propTypes.exports = requireFactoryWithThrowingShims()();
  return propTypes.exports;
}
var propTypesExports = /* @__PURE__ */ requirePropTypes(), PropTypes = /* @__PURE__ */ getDefaultExportFromCjs(propTypesExports), _excluded = ["sitekey", "onChange", "theme", "type", "tabindex", "onExpired", "onErrored", "size", "stoken", "grecaptcha", "badge", "hl", "isolated"];
function _extends$1() {
  return _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends$1.apply(this, arguments);
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {}, sourceKeys = Object.keys(source), key, i;
  for (i = 0; i < sourceKeys.length; i++)
    key = sourceKeys[i], !(excluded.indexOf(key) >= 0) && (target[key] = source[key]);
  return target;
}
function _assertThisInitialized(self) {
  if (self === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return self;
}
function _inheritsLoose$1(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype), subClass.prototype.constructor = subClass, _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o2, p2) {
    return o2.__proto__ = p2, o2;
  }, _setPrototypeOf(o, p);
}
var ReCAPTCHA = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose$1(ReCAPTCHA2, _React$Component);
  function ReCAPTCHA2() {
    var _this;
    return _this = _React$Component.call(this) || this, _this.handleExpired = _this.handleExpired.bind(_assertThisInitialized(_this)), _this.handleErrored = _this.handleErrored.bind(_assertThisInitialized(_this)), _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this)), _this.handleRecaptchaRef = _this.handleRecaptchaRef.bind(_assertThisInitialized(_this)), _this;
  }
  var _proto = ReCAPTCHA2.prototype;
  return _proto.getCaptchaFunction = function(fnName) {
    return this.props.grecaptcha ? this.props.grecaptcha.enterprise ? this.props.grecaptcha.enterprise[fnName] : this.props.grecaptcha[fnName] : null;
  }, _proto.getValue = function() {
    var getResponse = this.getCaptchaFunction("getResponse");
    return getResponse && this._widgetId !== void 0 ? getResponse(this._widgetId) : null;
  }, _proto.getWidgetId = function() {
    return this.props.grecaptcha && this._widgetId !== void 0 ? this._widgetId : null;
  }, _proto.execute = function() {
    var execute2 = this.getCaptchaFunction("execute");
    if (execute2 && this._widgetId !== void 0)
      return execute2(this._widgetId);
    this._executeRequested = !0;
  }, _proto.executeAsync = function() {
    var _this2 = this;
    return new Promise(function(resolve, reject) {
      _this2.executionResolve = resolve, _this2.executionReject = reject, _this2.execute();
    });
  }, _proto.reset = function() {
    var resetter = this.getCaptchaFunction("reset");
    resetter && this._widgetId !== void 0 && resetter(this._widgetId);
  }, _proto.forceReset = function() {
    var resetter = this.getCaptchaFunction("reset");
    resetter && resetter();
  }, _proto.handleExpired = function() {
    this.props.onExpired ? this.props.onExpired() : this.handleChange(null);
  }, _proto.handleErrored = function() {
    this.props.onErrored && this.props.onErrored(), this.executionReject && (this.executionReject(), delete this.executionResolve, delete this.executionReject);
  }, _proto.handleChange = function(token) {
    this.props.onChange && this.props.onChange(token), this.executionResolve && (this.executionResolve(token), delete this.executionReject, delete this.executionResolve);
  }, _proto.explicitRender = function() {
    var render = this.getCaptchaFunction("render");
    if (render && this._widgetId === void 0) {
      var wrapper = document.createElement("div");
      this._widgetId = render(wrapper, {
        sitekey: this.props.sitekey,
        callback: this.handleChange,
        theme: this.props.theme,
        type: this.props.type,
        tabindex: this.props.tabindex,
        "expired-callback": this.handleExpired,
        "error-callback": this.handleErrored,
        size: this.props.size,
        stoken: this.props.stoken,
        hl: this.props.hl,
        badge: this.props.badge,
        isolated: this.props.isolated
      }), this.captcha.appendChild(wrapper);
    }
    this._executeRequested && this.props.grecaptcha && this._widgetId !== void 0 && (this._executeRequested = !1, this.execute());
  }, _proto.componentDidMount = function() {
    this.explicitRender();
  }, _proto.componentDidUpdate = function() {
    this.explicitRender();
  }, _proto.handleRecaptchaRef = function(elem) {
    this.captcha = elem;
  }, _proto.render = function() {
    var _this$props = this.props, childProps = _objectWithoutPropertiesLoose$1(_this$props, _excluded);
    return /* @__PURE__ */ React.createElement("div", _extends$1({}, childProps, {
      ref: this.handleRecaptchaRef
    }));
  }, ReCAPTCHA2;
}(React.Component);
ReCAPTCHA.displayName = "ReCAPTCHA";
ReCAPTCHA.propTypes = {
  sitekey: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  grecaptcha: PropTypes.object,
  theme: PropTypes.oneOf(["dark", "light"]),
  type: PropTypes.oneOf(["image", "audio"]),
  tabindex: PropTypes.number,
  onExpired: PropTypes.func,
  onErrored: PropTypes.func,
  size: PropTypes.oneOf(["compact", "normal", "invisible"]),
  stoken: PropTypes.string,
  hl: PropTypes.string,
  badge: PropTypes.oneOf(["bottomright", "bottomleft", "inline"]),
  isolated: PropTypes.bool
};
ReCAPTCHA.defaultProps = {
  onChange: function() {
  },
  theme: "light",
  type: "image",
  tabindex: 0,
  size: "normal",
  badge: "bottomright"
};
var reactIs = { exports: {} }, reactIs_production_min = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactIs_production_min;
function requireReactIs_production_min() {
  if (hasRequiredReactIs_production_min) return reactIs_production_min;
  hasRequiredReactIs_production_min = 1;
  var b = typeof Symbol == "function" && Symbol.for, c = b ? Symbol.for("react.element") : 60103, d = b ? Symbol.for("react.portal") : 60106, e = b ? Symbol.for("react.fragment") : 60107, f = b ? Symbol.for("react.strict_mode") : 60108, g = b ? Symbol.for("react.profiler") : 60114, h = b ? Symbol.for("react.provider") : 60109, k = b ? Symbol.for("react.context") : 60110, l = b ? Symbol.for("react.async_mode") : 60111, m = b ? Symbol.for("react.concurrent_mode") : 60111, n = b ? Symbol.for("react.forward_ref") : 60112, p = b ? Symbol.for("react.suspense") : 60113, q = b ? Symbol.for("react.suspense_list") : 60120, r = b ? Symbol.for("react.memo") : 60115, t = b ? Symbol.for("react.lazy") : 60116, v = b ? Symbol.for("react.block") : 60121, w = b ? Symbol.for("react.fundamental") : 60117, x = b ? Symbol.for("react.responder") : 60118, y = b ? Symbol.for("react.scope") : 60119;
  function z(a) {
    if (typeof a == "object" && a !== null) {
      var u = a.$$typeof;
      switch (u) {
        case c:
          switch (a = a.type, a) {
            case l:
            case m:
            case e:
            case g:
            case f:
            case p:
              return a;
            default:
              switch (a = a && a.$$typeof, a) {
                case k:
                case n:
                case t:
                case r:
                case h:
                  return a;
                default:
                  return u;
              }
          }
        case d:
          return u;
      }
    }
  }
  function A(a) {
    return z(a) === m;
  }
  return reactIs_production_min.AsyncMode = l, reactIs_production_min.ConcurrentMode = m, reactIs_production_min.ContextConsumer = k, reactIs_production_min.ContextProvider = h, reactIs_production_min.Element = c, reactIs_production_min.ForwardRef = n, reactIs_production_min.Fragment = e, reactIs_production_min.Lazy = t, reactIs_production_min.Memo = r, reactIs_production_min.Portal = d, reactIs_production_min.Profiler = g, reactIs_production_min.StrictMode = f, reactIs_production_min.Suspense = p, reactIs_production_min.isAsyncMode = function(a) {
    return A(a) || z(a) === l;
  }, reactIs_production_min.isConcurrentMode = A, reactIs_production_min.isContextConsumer = function(a) {
    return z(a) === k;
  }, reactIs_production_min.isContextProvider = function(a) {
    return z(a) === h;
  }, reactIs_production_min.isElement = function(a) {
    return typeof a == "object" && a !== null && a.$$typeof === c;
  }, reactIs_production_min.isForwardRef = function(a) {
    return z(a) === n;
  }, reactIs_production_min.isFragment = function(a) {
    return z(a) === e;
  }, reactIs_production_min.isLazy = function(a) {
    return z(a) === t;
  }, reactIs_production_min.isMemo = function(a) {
    return z(a) === r;
  }, reactIs_production_min.isPortal = function(a) {
    return z(a) === d;
  }, reactIs_production_min.isProfiler = function(a) {
    return z(a) === g;
  }, reactIs_production_min.isStrictMode = function(a) {
    return z(a) === f;
  }, reactIs_production_min.isSuspense = function(a) {
    return z(a) === p;
  }, reactIs_production_min.isValidElementType = function(a) {
    return typeof a == "string" || typeof a == "function" || a === e || a === m || a === g || a === f || a === p || a === q || typeof a == "object" && a !== null && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
  }, reactIs_production_min.typeOf = z, reactIs_production_min;
}
var reactIs_development = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactIs_development;
function requireReactIs_development() {
  return hasRequiredReactIs_development || (hasRequiredReactIs_development = 1, process.env.NODE_ENV !== "production" && function() {
    var hasSymbol = typeof Symbol == "function" && Symbol.for, REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103, REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106, REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107, REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108, REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114, REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109, REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110, REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111, REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111, REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112, REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113, REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120, REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115, REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116, REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121, REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117, REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118, REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
    function isValidElementType(type) {
      return typeof type == "string" || typeof type == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type == "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
    }
    function typeOf(object) {
      if (typeof object == "object" && object !== null) {
        var $$typeof = object.$$typeof;
        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type = object.type;
            switch (type) {
              case REACT_ASYNC_MODE_TYPE:
              case REACT_CONCURRENT_MODE_TYPE:
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
                return type;
              default:
                var $$typeofType = type && type.$$typeof;
                switch ($$typeofType) {
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_LAZY_TYPE:
                  case REACT_MEMO_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType;
                  default:
                    return $$typeof;
                }
            }
          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }
    }
    var AsyncMode = REACT_ASYNC_MODE_TYPE, ConcurrentMode = REACT_CONCURRENT_MODE_TYPE, ContextConsumer = REACT_CONTEXT_TYPE, ContextProvider = REACT_PROVIDER_TYPE, Element = REACT_ELEMENT_TYPE, ForwardRef = REACT_FORWARD_REF_TYPE, Fragment = REACT_FRAGMENT_TYPE, Lazy = REACT_LAZY_TYPE, Memo = REACT_MEMO_TYPE, Portal = REACT_PORTAL_TYPE, Profiler = REACT_PROFILER_TYPE, StrictMode = REACT_STRICT_MODE_TYPE, Suspense = REACT_SUSPENSE_TYPE, hasWarnedAboutDeprecatedIsAsyncMode = !1;
    function isAsyncMode(object) {
      return hasWarnedAboutDeprecatedIsAsyncMode || (hasWarnedAboutDeprecatedIsAsyncMode = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
    }
    function isConcurrentMode(object) {
      return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
    }
    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    }
    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE;
    }
    function isElement(object) {
      return typeof object == "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    }
    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    }
    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    }
    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    }
    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    }
    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    }
    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    }
    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    }
    reactIs_development.AsyncMode = AsyncMode, reactIs_development.ConcurrentMode = ConcurrentMode, reactIs_development.ContextConsumer = ContextConsumer, reactIs_development.ContextProvider = ContextProvider, reactIs_development.Element = Element, reactIs_development.ForwardRef = ForwardRef, reactIs_development.Fragment = Fragment, reactIs_development.Lazy = Lazy, reactIs_development.Memo = Memo, reactIs_development.Portal = Portal, reactIs_development.Profiler = Profiler, reactIs_development.StrictMode = StrictMode, reactIs_development.Suspense = Suspense, reactIs_development.isAsyncMode = isAsyncMode, reactIs_development.isConcurrentMode = isConcurrentMode, reactIs_development.isContextConsumer = isContextConsumer, reactIs_development.isContextProvider = isContextProvider, reactIs_development.isElement = isElement, reactIs_development.isForwardRef = isForwardRef, reactIs_development.isFragment = isFragment, reactIs_development.isLazy = isLazy, reactIs_development.isMemo = isMemo, reactIs_development.isPortal = isPortal, reactIs_development.isProfiler = isProfiler, reactIs_development.isStrictMode = isStrictMode, reactIs_development.isSuspense = isSuspense, reactIs_development.isValidElementType = isValidElementType, reactIs_development.typeOf = typeOf;
  }()), reactIs_development;
}
var hasRequiredReactIs;
function requireReactIs() {
  return hasRequiredReactIs || (hasRequiredReactIs = 1, process.env.NODE_ENV === "production" ? reactIs.exports = requireReactIs_production_min() : reactIs.exports = requireReactIs_development()), reactIs.exports;
}
var hoistNonReactStatics_cjs, hasRequiredHoistNonReactStatics_cjs;
function requireHoistNonReactStatics_cjs() {
  if (hasRequiredHoistNonReactStatics_cjs) return hoistNonReactStatics_cjs;
  hasRequiredHoistNonReactStatics_cjs = 1;
  var reactIs2 = requireReactIs(), REACT_STATICS = {
    childContextTypes: !0,
    contextType: !0,
    contextTypes: !0,
    defaultProps: !0,
    displayName: !0,
    getDefaultProps: !0,
    getDerivedStateFromError: !0,
    getDerivedStateFromProps: !0,
    mixins: !0,
    propTypes: !0,
    type: !0
  }, KNOWN_STATICS = {
    name: !0,
    length: !0,
    prototype: !0,
    caller: !0,
    callee: !0,
    arguments: !0,
    arity: !0
  }, FORWARD_REF_STATICS = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0
  }, MEMO_STATICS = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0
  }, TYPE_STATICS = {};
  TYPE_STATICS[reactIs2.ForwardRef] = FORWARD_REF_STATICS, TYPE_STATICS[reactIs2.Memo] = MEMO_STATICS;
  function getStatics(component) {
    return reactIs2.isMemo(component) ? MEMO_STATICS : TYPE_STATICS[component.$$typeof] || REACT_STATICS;
  }
  var defineProperty = Object.defineProperty, getOwnPropertyNames = Object.getOwnPropertyNames, getOwnPropertySymbols = Object.getOwnPropertySymbols, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor, getPrototypeOf = Object.getPrototypeOf, objectPrototype = Object.prototype;
  function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent != "string") {
      if (objectPrototype) {
        var inheritedComponent = getPrototypeOf(sourceComponent);
        inheritedComponent && inheritedComponent !== objectPrototype && hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
      var keys = getOwnPropertyNames(sourceComponent);
      getOwnPropertySymbols && (keys = keys.concat(getOwnPropertySymbols(sourceComponent)));
      for (var targetStatics = getStatics(targetComponent), sourceStatics = getStatics(sourceComponent), i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
          var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
          try {
            defineProperty(targetComponent, key, descriptor);
          } catch {
          }
        }
      }
    }
    return targetComponent;
  }
  return hoistNonReactStatics_cjs = hoistNonReactStatics, hoistNonReactStatics_cjs;
}
var hoistNonReactStatics_cjsExports = requireHoistNonReactStatics_cjs(), hoistStatics = /* @__PURE__ */ getDefaultExportFromCjs(hoistNonReactStatics_cjsExports);
function _extends() {
  return _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {}, sourceKeys = Object.keys(source), key, i;
  for (i = 0; i < sourceKeys.length; i++)
    key = sourceKeys[i], !(excluded.indexOf(key) >= 0) && (target[key] = source[key]);
  return target;
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype), subClass.prototype.constructor = subClass, subClass.__proto__ = superClass;
}
var SCRIPT_MAP = {}, idCount = 0;
function makeAsyncScript(getScriptURL, options) {
  return options = options || {}, function(WrappedComponent) {
    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || "Component", AsyncScriptLoader = /* @__PURE__ */ function(_Component) {
      _inheritsLoose(AsyncScriptLoader2, _Component);
      function AsyncScriptLoader2(props, context) {
        var _this;
        return _this = _Component.call(this, props, context) || this, _this.state = {}, _this.__scriptURL = "", _this;
      }
      var _proto = AsyncScriptLoader2.prototype;
      return _proto.asyncScriptLoaderGetScriptLoaderID = function() {
        return this.__scriptLoaderID || (this.__scriptLoaderID = "async-script-loader-" + idCount++), this.__scriptLoaderID;
      }, _proto.setupScriptURL = function() {
        return this.__scriptURL = typeof getScriptURL == "function" ? getScriptURL() : getScriptURL, this.__scriptURL;
      }, _proto.asyncScriptLoaderHandleLoad = function(state) {
        var _this2 = this;
        this.setState(state, function() {
          return _this2.props.asyncScriptOnLoad && _this2.props.asyncScriptOnLoad(_this2.state);
        });
      }, _proto.asyncScriptLoaderTriggerOnScriptLoaded = function() {
        var mapEntry = SCRIPT_MAP[this.__scriptURL];
        if (!mapEntry || !mapEntry.loaded)
          throw new Error("Script is not loaded.");
        for (var obsKey in mapEntry.observers)
          mapEntry.observers[obsKey](mapEntry);
        delete window[options.callbackName];
      }, _proto.componentDidMount = function() {
        var _this3 = this, scriptURL = this.setupScriptURL(), key = this.asyncScriptLoaderGetScriptLoaderID(), _options = options, globalName2 = _options.globalName, callbackName2 = _options.callbackName, scriptId = _options.scriptId;
        if (globalName2 && typeof window[globalName2] < "u" && (SCRIPT_MAP[scriptURL] = {
          loaded: !0,
          observers: {}
        }), SCRIPT_MAP[scriptURL]) {
          var entry = SCRIPT_MAP[scriptURL];
          if (entry && (entry.loaded || entry.errored)) {
            this.asyncScriptLoaderHandleLoad(entry);
            return;
          }
          entry.observers[key] = function(entry2) {
            return _this3.asyncScriptLoaderHandleLoad(entry2);
          };
          return;
        }
        var observers = {};
        observers[key] = function(entry2) {
          return _this3.asyncScriptLoaderHandleLoad(entry2);
        }, SCRIPT_MAP[scriptURL] = {
          loaded: !1,
          observers
        };
        var script = document.createElement("script");
        script.src = scriptURL, script.async = !0;
        for (var attribute in options.attributes)
          script.setAttribute(attribute, options.attributes[attribute]);
        scriptId && (script.id = scriptId);
        var callObserverFuncAndRemoveObserver = function(func) {
          if (SCRIPT_MAP[scriptURL]) {
            var mapEntry = SCRIPT_MAP[scriptURL], observersMap = mapEntry.observers;
            for (var obsKey in observersMap)
              func(observersMap[obsKey]) && delete observersMap[obsKey];
          }
        };
        callbackName2 && typeof window < "u" && (window[callbackName2] = function() {
          return _this3.asyncScriptLoaderTriggerOnScriptLoaded();
        }), script.onload = function() {
          var mapEntry = SCRIPT_MAP[scriptURL];
          mapEntry && (mapEntry.loaded = !0, callObserverFuncAndRemoveObserver(function(observer) {
            return callbackName2 ? !1 : (observer(mapEntry), !0);
          }));
        }, script.onerror = function() {
          var mapEntry = SCRIPT_MAP[scriptURL];
          mapEntry && (mapEntry.errored = !0, callObserverFuncAndRemoveObserver(function(observer) {
            return observer(mapEntry), !0;
          }));
        }, document.body.appendChild(script);
      }, _proto.componentWillUnmount = function() {
        var scriptURL = this.__scriptURL;
        if (options.removeOnUnmount === !0)
          for (var allScripts = document.getElementsByTagName("script"), i = 0; i < allScripts.length; i += 1)
            allScripts[i].src.indexOf(scriptURL) > -1 && allScripts[i].parentNode && allScripts[i].parentNode.removeChild(allScripts[i]);
        var mapEntry = SCRIPT_MAP[scriptURL];
        mapEntry && (delete mapEntry.observers[this.asyncScriptLoaderGetScriptLoaderID()], options.removeOnUnmount === !0 && delete SCRIPT_MAP[scriptURL]);
      }, _proto.render = function() {
        var globalName2 = options.globalName, _this$props = this.props, forwardedRef = _this$props.forwardedRef, childProps = _objectWithoutPropertiesLoose(_this$props, ["asyncScriptOnLoad", "forwardedRef"]);
        return globalName2 && typeof window < "u" && (childProps[globalName2] = typeof window[globalName2] < "u" ? window[globalName2] : void 0), childProps.ref = forwardedRef, createElement(WrappedComponent, childProps);
      }, AsyncScriptLoader2;
    }(Component), ForwardedComponent = forwardRef(function(props, ref) {
      return createElement(AsyncScriptLoader, _extends({}, props, {
        forwardedRef: ref
      }));
    });
    return ForwardedComponent.displayName = "AsyncScriptLoader(" + wrappedComponentName + ")", ForwardedComponent.propTypes = {
      asyncScriptOnLoad: PropTypes.func
    }, hoistStatics(ForwardedComponent, WrappedComponent);
  };
}
var callbackName = "onloadcallback", globalName = "grecaptcha";
function getOptions() {
  return typeof window < "u" && window.recaptchaOptions || {};
}
function getURL() {
  var dynamicOptions = getOptions(), hostname = dynamicOptions.useRecaptchaNet ? "recaptcha.net" : "www.google.com";
  return dynamicOptions.enterprise ? "https://" + hostname + "/recaptcha/enterprise.js?onload=" + callbackName + "&render=explicit" : "https://" + hostname + "/recaptcha/api.js?onload=" + callbackName + "&render=explicit";
}
var RecaptchaWrapper = makeAsyncScript(getURL, {
  callbackName,
  globalName,
  attributes: getOptions().nonce ? {
    nonce: getOptions().nonce
  } : {}
})(ReCAPTCHA);
const ContactForm = ({ formData }) => {
  const [formState, setFormState] = useState({}), [formErrors, setFormErrors] = useState({}), [isSubmitting, setIsSubmitting] = useState(!1), [submitStatus, setSubmitStatus] = useState({}), recaptchaRef = useRef(null), onReCAPTCHAChange = (captchaCode) => {
    captchaCode && setFormState((prev) => ({ ...prev, recaptcha: captchaCode }));
  }, handleChange = (e) => {
    const { name, value, checked, options } = e.target;
    let finalValue;
    const inputType = e.target.type;
    inputType === "checkbox" ? Array.isArray(formState[name]) ? finalValue = checked ? [...formState[name], value] : formState[name].filter((v) => v !== value) : finalValue = checked ? value : "" : inputType === "select-multiple" ? finalValue = Array.from(options).filter((opt) => opt.selected).map((opt) => opt.value) : finalValue = value, setFormState((prev) => ({ ...prev, [name]: finalValue }));
  }, validateForm = () => {
    const errors = {};
    if (!formData?.fields) return !1;
    let isValid = !0;
    return formData.fields.forEach((field) => {
      const fieldValue = formState[field.name], isEmpty = fieldValue == null || typeof fieldValue == "string" && fieldValue.trim() === "" || Array.isArray(fieldValue) && fieldValue.length === 0;
      field.isRequired && (field.type === "file" ? (!fieldValue || !(fieldValue instanceof File)) && (errors[field.name] = "Please upload a file", isValid = !1) : isEmpty && (errors[field.name] = `Please enter your ${field.label?.toLowerCase()}.`, isValid = !1), field.type === "checkbox" && !fieldValue && (errors[field.name] = "Please check the box", isValid = !1), field.type === "radio" && !fieldValue && (errors[field.name] = "Please select an option", isValid = !1)), !isEmpty && fieldValue && (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue.toString()) ? (errors[field.name] = "Please enter a valid email address", isValid = !1) : field.type === "url" && !/^https?:\/\/.+\..+/.test(fieldValue.toString()) ? (errors[field.name] = "Please enter a valid URL", isValid = !1) : field.type === "tel" && !/^[\d\s+\-()]{10,}$/.test(fieldValue.toString()) && (errors[field.name] = "Please enter a valid phone number", isValid = !1));
    }), setFormErrors(errors), isValid;
  }, handleFileChange = (e) => {
    const { name, files } = e.target, file = files?.[0];
    setFormState((prev) => ({
      ...prev,
      [name]: file || ""
    })), setFormErrors((prev) => ({ ...prev, [name]: "" }));
  }, resetForm = () => {
    const newState = {};
    formData.fields.forEach((field) => {
      field.type === "checkbox" ? newState[field.name] = field.checkboxOptions?.length && field.checkboxOptions.length > 1 ? [] : !1 : field.type === "select" ? newState[field.name] = [] : newState[field.name] = "";
    }), setFormState(newState), setFormErrors({});
  }, handleSubmit = async (e) => {
    e.preventDefault(), setIsSubmitting(!0), setSubmitStatus({});
    try {
      if (!validateForm()) throw new Error("Please fill in all required fields correctly.");
      if (!formData?.fields) throw new Error("Form configuration is missing");
      if (formData.settings.recaptchaEnabled && !recaptchaRef.current)
        throw new Error("reCAPTCHA script not loaded yet. Please try again.");
      const recaptchaToken = recaptchaRef.current ? recaptchaRef.current.getValue() : null, formPayload = new FormData();
      formPayload.append("Form Id", formData.id || ""), recaptchaToken && formPayload.append("recaptchaToken", recaptchaToken), Object.entries(formState).forEach(([key, value]) => {
        const field = formData.fields.find((f) => f.name === key), payloadKey = field && field.type === "file" ? key : field?.label || key;
        value instanceof File ? value && value.name && formPayload.append(payloadKey, value) : Array.isArray(value) ? value.forEach((v) => formPayload.append(payloadKey, v)) : typeof value == "string" && value !== "" && formPayload.append(payloadKey, value);
      }), formData.settings && formPayload.append("settings", JSON.stringify(formData.settings)), console.log("Submitting form with payload:", Object.fromEntries(formPayload.entries()));
      const response = await fetch("/api/submit-form", {
        method: "POST",
        body: formPayload
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }
      if ((await response.json()).recaptchaSuccess === !1)
        throw new Error("reCAPTCHA verification failed. Please try again.");
      formData.settings.recaptchaEnabled && (recaptchaRef.current?.reset(), setFormState((prev) => {
        const rest = { ...prev };
        return delete rest.recaptcha, rest;
      })), resetForm(), setSubmitStatus({
        success: !0,
        message: formData.settings.successMessage || "Form submitted successfully."
      }), setTimeout(() => {
        setSubmitStatus({}), recaptchaRef.current?.reset();
      }, 2e3);
    } catch (error) {
      setSubmitStatus({
        success: !1,
        message: error instanceof Error ? error.message : "Error submitting application. Please try again."
      });
    } finally {
      setIsSubmitting(!1);
    }
  };
  if (!formData) return /* @__PURE__ */ jsx("div", { children: "Loading form..." });
  const renderField = (field) => {
    const key = `field-${field.name}`, errorClass = formErrors[field.name] ? "has-error" : "", commonProps = {
      id: field.name,
      name: field.name,
      required: field.isRequired,
      onChange: handleChange,
      className: errorClass,
      placeholder: field.showPlaceholder ? field.label : field.placeholder,
      value: formState[field.name] || ""
    }, help = field.helpText && /* @__PURE__ */ jsx("div", { className: "help-tip", children: /* @__PURE__ */ jsx("p", { children: field.helpText }) }), note = field.note && /* @__PURE__ */ jsx("div", { className: "note-text", children: /* @__PURE__ */ jsxs("p", { children: [
      "Note:",
      field.note
    ] }) });
    switch (field.type) {
      case "textarea":
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: field.name, children: [
            field.label,
            " ",
            field.isRequired && /* @__PURE__ */ jsx("span", { className: "required-asterisk", children: "*" })
          ] }),
          help,
          note,
          /* @__PURE__ */ jsx("textarea", { ...commonProps })
        ] }, key);
      case "select":
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: field.name, children: [
            field.label,
            " ",
            field.isRequired && /* @__PURE__ */ jsx("span", { className: "required-asterisk", children: "*" })
          ] }),
          help,
          note,
          /* @__PURE__ */ jsxs(
            "select",
            {
              ...commonProps,
              value: Array.isArray(formState[field.name]) ? formState[field.name] : formState[field.name] || "",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", disabled: !0, children: field.placeholder || `Select ${field.label}` }),
                field.selectOptions?.map((opt) => /* @__PURE__ */ jsx("option", { value: opt, children: opt }, opt))
              ]
            }
          ),
          formErrors[field.name] && /* @__PURE__ */ jsx("div", { className: "general-error-form", children: formErrors[field.name] })
        ] }, key);
      case "checkbox":
        return /* @__PURE__ */ jsxs("div", { className: `checkbox-wrapper${formErrors[field.name] ? " has-error-border" : ""}`, children: [
          /* @__PURE__ */ jsxs("label", { className: "checkbox-labels", children: [
            field.label,
            " ",
            field.isRequired && /* @__PURE__ */ jsx("span", { className: "required-asterisk", children: "*" })
          ] }),
          help,
          note,
          field.checkboxOptions?.map((opt) => /* @__PURE__ */ jsxs("div", { className: "checkbox-option", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                name: field.name,
                value: opt,
                onChange: handleChange,
                className: "checkbox",
                id: `${field.name}-${opt}`,
                checked: Array.isArray(formState[field.name]) ? formState[field.name].includes(opt) : formState[field.name] === opt
              }
            ),
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: `${field.name}-${opt}`,
                style: { marginLeft: "0.25rem" },
                className: "checkbox-label",
                children: opt
              }
            )
          ] }, opt))
        ] }, key);
      case "radio":
        return /* @__PURE__ */ jsxs("div", { className: `radio-wrapper${formErrors[field.name] ? " has-error-border" : ""}`, children: [
          /* @__PURE__ */ jsxs("label", { className: "radio-label", children: [
            field.label,
            " ",
            field.isRequired && /* @__PURE__ */ jsx("span", { className: "required-asterisk", children: "*" })
          ] }),
          help,
          note,
          field.radioOptions?.map((opt) => /* @__PURE__ */ jsxs("div", { className: "radio-option", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "radio",
                name: field.name,
                value: opt,
                onChange: handleChange,
                className: "radio",
                id: `${field.name}-${opt}`,
                checked: formState[field.name] === opt
              }
            ),
            /* @__PURE__ */ jsx("label", { htmlFor: `${field.name}-${opt}`, style: { marginLeft: "0.25rem" }, children: opt })
          ] }, opt))
        ] }, key);
      case "file":
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: field.name, children: [
            field.label,
            " ",
            field.isRequired && /* @__PURE__ */ jsx("span", { className: "required-asterisk", children: "*" })
          ] }),
          help,
          note,
          /* @__PURE__ */ jsx(
            "input",
            {
              id: field.name,
              type: "file",
              name: field.name,
              placeholder: field.showPlaceholder ? field.label : field.placeholder,
              required: field.isRequired,
              onChange: handleFileChange,
              className: formErrors[field.name] ? "has-error" : ""
            },
            formState[field.name] instanceof File ? "file-filled" : "file-empty"
          ),
          formErrors[field.name] && /* @__PURE__ */ jsx("div", { className: "general-error-form", children: formErrors[field.name] })
        ] }, key);
      default:
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: field.name, children: [
            field.label,
            " ",
            field.isRequired && /* @__PURE__ */ jsx("span", { className: "required-asterisk", children: "*" })
          ] }),
          help,
          note,
          /* @__PURE__ */ jsx("input", { ...commonProps, type: field.type })
        ] }, key);
    }
  };
  return /* @__PURE__ */ jsxs("form", { id: formData.id, className: formData.class || "", onSubmit: handleSubmit, children: [
    formData.showtitle && /* @__PURE__ */ jsx("h2", { style: { textAlign: "center", color: "red" }, children: formData.title }),
    formData.fields.map(renderField),
    formData.settings && formData.settings.recaptchaEnabled && /* @__PURE__ */ jsx(
      RecaptchaWrapper,
      {
        sitekey: formData.settings.recaptchaSiteKey,
        ref: recaptchaRef,
        onChange: onReCAPTCHAChange
      }
    ),
    /* @__PURE__ */ jsx("button", { type: "submit", disabled: isSubmitting, children: isSubmitting ? "Submitting..." : formData.submitButtonText || "Apply Now" }),
    submitStatus.message && /* @__PURE__ */ jsx(
      "div",
      {
        className: ` ${submitStatus.success ? "resume-submit-success" : "general-error-form"}`,
        role: "alert",
        children: submitStatus.message
      }
    ),
    /* @__PURE__ */ jsx("style", { children: `
          form {
            max-width: 600px;
            margin: 2rem auto;
            padding: 2rem;
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            font-family: system-ui, sans-serif;
          }
          form h2 {
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
            color: #111827;
          }
          form>div {
            margin-bottom: 1.25rem;
            position: relative;
          }
          label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #374151;
          }
          .required-asterisk { color: red; }
          input, textarea, select {
            width: 100%;
            padding: 0.75rem;
            font-size: 1rem;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            background-color: #fff;
            color: #111827;
            transition: border-color 0.2s;
          }
          input:focus, textarea:focus, select:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 1px #2563eb33;
          }
          textarea {
            resize: vertical;
            min-height: 120px;
          }
          button[type='submit'] {
            background-color: #2563eb;
            color: white;
            padding: 0.75rem 1.25rem;
            font-size: 1rem;
            font-weight: 600;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s ease;
          }
          button[type='submit']:hover { background-color: #1d4ed8; }
          p { font-size: 1rem; color: #16a34a; margin-top: 1rem; }
          input[type="checkbox"].has-error-border {
            outline: 1px solid red;
            outline-offset: 1px;
            padding: 10px;
          }
          input.has-error, textarea.has-error  { border: 1px solid #ff0000 !important; }
          .radio, .checkbox {
            margin-right: 0.4rem;
            accent-color: #2563eb;
            width: 16px;
            height: 16px;
            cursor: pointer;
          }
          .radio-option, .checkbox-option { display: flex; gap: 0.5rem; }
          .has-error-border { border: 1px solid red; padding: 10px; }
          .general-error-form { color: red; margin-top: 1rem; }
          .resume-submit-success { color: green; margin-top: 1rem; }
          .help-tip {
            position: absolute;
            top: 0;
            right: 0;
            text-align: center;
            background-color: #595959;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            font-size: 12px;
            line-height: 21px;
            cursor: default
          }
          .help-tip:before {
            content: '?';
            font-weight: 700;
            color: #fff
          }
          .help-tip:hover p {
            display: block;
            transform-origin: 100% 0%;
            -webkit-animation: .3s ease-in-out fadeIn;
            animation: .3s ease-in-out fadeIn;
            z-index: 999
          }
          .help-tip p {
            display: none;
            background-color: #1e2021;
            padding: 15px 10px;
            width: 290px;
            position: absolute;
            border-radius: 3px;
            box-shadow: 1px 1px 1px rgba(0, 0, 0, .2);
            right: -4px;
            color: #fff;
            font-size: 13px;
            line-height: 1.4;
            word-wrap: break-word
          }
          .help-tip p:before {
            position: absolute;
            content: '';
            width: 0;
            height: 0;
            border: 6px solid transparent;
            border-bottom-color: #1e2021;
            right: 10px;
            top: -12px
          }
          .help-tip p:after {
            width: 100%;
            height: 40px;
            content: '';
            position: absolute;
            top: -40px;
            left: 0
          }
          .help-tip p a {
            color: #fff;
            font-size: inherit;
            text-decoration: none;
            pointer-events: none
          }
          .help-tip p{text-align: left}
          .note-text p {
            margin-bottom: 0.5rem;
            font-size: 0.8rem;
            font-style: italic;
            color:rgb(77, 78, 80)!important;
          }
        ` })
  ] });
}, SINGLETON_ID = "formGeneralSettings", contactFormPlugin = definePlugin(() => ({
  name: "sanity-plugin-contact-form",
  schema: {
    types: [contactFormSchema, formGeneralSettings]
  },
  document: {
    newDocumentOptions: (prev) => prev.filter((template) => template.templateId !== SINGLETON_ID)
  }
}));
export {
  ContactForm,
  contactFormPlugin
};
//# sourceMappingURL=index.js.map
