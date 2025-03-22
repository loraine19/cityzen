import {
  floating_ui_react_esm_exports,
  init_floating_ui_react_esm,
  require_Popover,
  require_alert,
  require_avatar,
  require_badge,
  require_button,
  require_card,
  require_checkbox,
  require_chip,
  require_cjs,
  require_cjs2,
  require_classnames,
  require_dialog,
  require_dist,
  require_generic,
  require_input,
  require_navbar,
  require_objectsToString,
  require_popover,
  require_progress,
  require_prop_types,
  require_rating,
  require_select,
  require_slider,
  require_spinner,
  require_theme,
  require_theme2,
  require_timeline,
  require_typography
} from "./chunk-RIFL6MD6.js";
import "./chunk-PZE7CTFH.js";
import "./chunk-M7J7YBEX.js";
import {
  require_react
} from "./chunk-W5UAQKRE.js";
import {
  __commonJS,
  __toCommonJS
} from "./chunk-OL46QLBJ.js";

// node_modules/@material-tailwind/react/types/components/accordion.js
var require_accordion = __commonJS({
  "node_modules/@material-tailwind/react/types/components/accordion.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { propTypesOpen: function() {
      return propTypesOpen;
    }, propTypesIcon: function() {
      return propTypesIcon;
    }, propTypesAnimate: function() {
      return propTypesAnimate;
    }, propTypesDisabled: function() {
      return propTypesDisabled;
    }, propTypesClassName: function() {
      return propTypesClassName;
    }, propTypesValue: function() {
      return propTypesValue;
    }, propTypesChildren: function() {
      return propTypesChildren;
    } });
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _generic = require_generic();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var propTypesOpen = _propTypes.default.bool.isRequired;
    var propTypesIcon = _propTypes.default.node;
    var propTypesAnimate = _generic.propTypesAnimation;
    var propTypesDisabled = _propTypes.default.bool;
    var propTypesClassName = _propTypes.default.string;
    var propTypesValue = _propTypes.default.instanceOf(Object).isRequired;
    var propTypesChildren = _propTypes.default.node.isRequired;
  }
});

// node_modules/@material-tailwind/react/components/Accordion/AccordionContext.js
var require_AccordionContext = __commonJS({
  "node_modules/@material-tailwind/react/components/Accordion/AccordionContext.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { AccordionContext: function() {
      return AccordionContext;
    }, useAccordion: function() {
      return useAccordion;
    }, AccordionContextProvider: function() {
      return AccordionContextProvider;
    } });
    var _react = _interopRequireDefault(require_react());
    var _accordion = require_accordion();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var AccordionContext = _react.default.createContext(null);
    AccordionContext.displayName = "MaterialTailwind.AccordionContext";
    function useAccordion() {
      var context = _react.default.useContext(AccordionContext);
      if (!context) {
        throw new Error("useAccordion() must be used within an Accordion. It happens when you use AccordionHeader or AccordionBody components outside the Accordion component.");
      }
      return context;
    }
    var AccordionContextProvider = function(param) {
      var value = param.value, children = param.children;
      return _react.default.createElement(AccordionContext.Provider, { value }, children);
    };
    AccordionContextProvider.propTypes = { value: _accordion.propTypesValue, children: _accordion.propTypesChildren };
    AccordionContextProvider.displayName = "MaterialTailwind.AccordionContextProvider";
  }
});

// node_modules/@material-tailwind/react/components/Accordion/AccordionHeader.js
var require_AccordionHeader = __commonJS({
  "node_modules/@material-tailwind/react/components/Accordion/AccordionHeader.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { AccordionHeader: function() {
      return AccordionHeader;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _accordionContext = require_AccordionContext();
    var _theme = require_theme2();
    var _accordion = require_accordion();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var AccordionHeader = _react.default.forwardRef(function(_param, ref) {
      var className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["className", "children"]);
      var _useAccordion = (0, _accordionContext.useAccordion)(), open = _useAccordion.open, icon = _useAccordion.icon, disabled = _useAccordion.disabled;
      var accordion = (0, _theme.useTheme)().accordion;
      var base = accordion.styles.base;
      className = className !== null && className !== void 0 ? className : "";
      var buttonStyles = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.header.initial), _defineProperty({}, (0, _objectsToString.default)(base.header.active), open)), className);
      var iconClasses = (0, _classnames.default)((0, _objectsToString.default)(base.header.icon));
      return _react.default.createElement("button", _extends({}, rest, { ref, type: "button", disabled, className: buttonStyles }), children, _react.default.createElement("span", { className: iconClasses }, icon !== null && icon !== void 0 ? icon : open ? _react.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" }, _react.default.createElement("path", { fillRule: "evenodd", d: "M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z", clipRule: "evenodd" })) : _react.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" }, _react.default.createElement("path", { fillRule: "evenodd", d: "M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z", clipRule: "evenodd" }))));
    });
    AccordionHeader.propTypes = { className: _accordion.propTypesClassName, children: _accordion.propTypesChildren };
    AccordionHeader.displayName = "MaterialTailwind.AccordionHeader";
    var _default = AccordionHeader;
  }
});

// node_modules/@material-tailwind/react/components/Accordion/AccordionBody.js
var require_AccordionBody = __commonJS({
  "node_modules/@material-tailwind/react/components/Accordion/AccordionBody.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { AccordionBody: function() {
      return AccordionBody;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _framerMotion = require_cjs2();
    var _classnames = _interopRequireDefault(require_classnames());
    var _deepmerge = _interopRequireDefault(require_cjs());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _tailwindMerge = require_dist();
    var _accordionContext = require_AccordionContext();
    var _theme = require_theme2();
    var _accordion = require_accordion();
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var AccordionBody = _react.default.forwardRef(function(_param, ref) {
      var className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["className", "children"]);
      var _useAccordion = (0, _accordionContext.useAccordion)(), open = _useAccordion.open, animate = _useAccordion.animate;
      var accordion = (0, _theme.useTheme)().accordion;
      var base = accordion.styles.base;
      className = className !== null && className !== void 0 ? className : "";
      var bodyClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.body)), className);
      var heightAnimation = { unmount: { height: "0px", transition: { duration: 0.2, times: [0.4, 0, 0.2, 1] } }, mount: { height: "auto", transition: { duration: 0.2, times: [0.4, 0, 0.2, 1] } } };
      var mainAnimation = { unmount: { transition: { duration: 0.3, ease: "linear" } }, mount: { transition: { duration: 0.3, ease: "linear" } } };
      var appliedAnimation = (0, _deepmerge.default)(heightAnimation, animate);
      return _react.default.createElement(_framerMotion.LazyMotion, { features: _framerMotion.domAnimation }, _react.default.createElement(_framerMotion.m.div, { className: "overflow-hidden", initial: "unmount", exit: "unmount", animate: open ? "mount" : "unmount", variants: appliedAnimation }, _react.default.createElement(_framerMotion.m.div, _extends({}, rest, { ref, className: bodyClasses, initial: "unmount", exit: "unmount", animate: open ? "mount" : "unmount", variants: mainAnimation }), children)));
    });
    AccordionBody.propTypes = { className: _accordion.propTypesClassName, children: _accordion.propTypesChildren };
    AccordionBody.displayName = "MaterialTailwind.AccordionBody";
    var _default = AccordionBody;
  }
});

// node_modules/@material-tailwind/react/components/Accordion/index.js
var require_Accordion = __commonJS({
  "node_modules/@material-tailwind/react/components/Accordion/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Accordion: function() {
      return Accordion;
    }, AccordionHeader: function() {
      return _accordionHeader.AccordionHeader;
    }, AccordionBody: function() {
      return _accordionBody.AccordionBody;
    }, useAccordion: function() {
      return _accordionContext.useAccordion;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _accordionContext = require_AccordionContext();
    var _accordion = require_accordion();
    var _accordionHeader = require_AccordionHeader();
    var _accordionBody = require_AccordionBody();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Accordion = _react.default.forwardRef(function(_param, ref) {
      var open = _param.open, icon = _param.icon, animate = _param.animate, className = _param.className, disabled = _param.disabled, children = _param.children, rest = _objectWithoutProperties(_param, ["open", "icon", "animate", "className", "disabled", "children"]);
      var accordion = (0, _theme.useTheme)().accordion;
      var defaultProps = accordion.defaultProps, base = accordion.styles.base;
      icon = icon !== null && icon !== void 0 ? icon : defaultProps.icon;
      animate = animate !== null && animate !== void 0 ? animate : defaultProps.animate;
      disabled = disabled !== null && disabled !== void 0 ? disabled : defaultProps.disabled;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var accordionClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.container), _defineProperty({}, (0, _objectsToString.default)(base.disabled), disabled)), className);
      var contextValue = _react.default.useMemo(function() {
        return { open, icon, animate, disabled };
      }, [open, icon, animate, disabled]);
      return _react.default.createElement(_accordionContext.AccordionContextProvider, { value: contextValue }, _react.default.createElement("div", _extends({}, rest, { ref, className: accordionClasses }), children));
    });
    Accordion.propTypes = { open: _accordion.propTypesOpen, icon: _accordion.propTypesIcon, animate: _accordion.propTypesAnimate, disabled: _accordion.propTypesDisabled, className: _accordion.propTypesClassName, children: _accordion.propTypesChildren };
    Accordion.displayName = "MaterialTailwind.Accordion";
    var _default = Object.assign(Accordion, { Header: _accordionHeader.AccordionHeader, Body: _accordionBody.AccordionBody });
  }
});

// node_modules/@material-tailwind/react/utils/findMatch.js
var require_findMatch = __commonJS({
  "node_modules/@material-tailwind/react/utils/findMatch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Object.defineProperty(exports, "default", { enumerable: true, get: function() {
      return _default;
    } });
    function findMatch(data, find, defaultValue) {
      var founded = data.findIndex(function(el) {
        return el === find;
      });
      return founded >= 0 ? find : defaultValue;
    }
    var _default = findMatch;
  }
});

// node_modules/material-ripple-effects/index.js
var require_material_ripple_effects = __commonJS({
  "node_modules/material-ripple-effects/index.js"(exports, module) {
    module.exports = class Ripple {
      constructor() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
      }
      findFurthestPoint(clickPointX, elementWidth, offsetX, clickPointY, elementHeight, offsetY) {
        this.x = clickPointX - offsetX > elementWidth / 2 ? 0 : elementWidth;
        this.y = clickPointY - offsetY > elementHeight / 2 ? 0 : elementHeight;
        this.z = Math.hypot(
          this.x - (clickPointX - offsetX),
          this.y - (clickPointY - offsetY)
        );
        return this.z;
      }
      appyStyles(element, color, rect, radius, event) {
        element.classList.add("ripple");
        element.style.backgroundColor = color === "dark" ? "rgba(0,0,0, 0.2)" : "rgba(255,255,255, 0.3)";
        element.style.borderRadius = "50%";
        element.style.pointerEvents = "none";
        element.style.position = "absolute";
        element.style.left = event.clientX - rect.left - radius + "px";
        element.style.top = event.clientY - rect.top - radius + "px";
        element.style.width = element.style.height = radius * 2 + "px";
      }
      applyAnimation(element) {
        element.animate(
          [
            {
              transform: "scale(0)",
              opacity: 1
            },
            {
              transform: "scale(1.5)",
              opacity: 0
            }
          ],
          {
            duration: 500,
            easing: "linear"
          }
        );
      }
      create(event, color) {
        const element = event.currentTarget;
        element.style.position = "relative";
        element.style.overflow = "hidden";
        const rect = element.getBoundingClientRect();
        const radius = this.findFurthestPoint(
          event.clientX,
          element.offsetWidth,
          rect.left,
          event.clientY,
          element.offsetHeight,
          rect.top
        );
        const circle = document.createElement("span");
        this.appyStyles(circle, color, rect, radius, event);
        this.applyAnimation(circle);
        element.appendChild(circle);
        setTimeout(() => circle.remove(), 500);
      }
    };
  }
});

// node_modules/@material-tailwind/react/components/IconButton/index.js
var require_IconButton = __commonJS({
  "node_modules/@material-tailwind/react/components/IconButton/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { IconButton: function() {
      return IconButton;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _materialRippleEffects = _interopRequireDefault(require_material_ripple_effects());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _button = require_button();
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var IconButton = _react.default.forwardRef(function(_param, ref) {
      var variant = _param.variant, size = _param.size, color = _param.color, ripple = _param.ripple, className = _param.className, children = _param.children, fullWidth = _param.fullWidth, rest = _objectWithoutProperties(_param, ["variant", "size", "color", "ripple", "className", "children", "fullWidth"]);
      var iconButton = (0, _theme.useTheme)().iconButton;
      var valid = iconButton.valid, defaultProps = iconButton.defaultProps, styles = iconButton.styles;
      var base = styles.base, variants = styles.variants, sizes = styles.sizes;
      variant = variant !== null && variant !== void 0 ? variant : defaultProps.variant;
      size = size !== null && size !== void 0 ? size : defaultProps.size;
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      ripple = ripple !== null && ripple !== void 0 ? ripple : defaultProps.ripple;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var rippleEffect = ripple !== void 0 && new _materialRippleEffects.default();
      var buttonBase = (0, _objectsToString.default)(base);
      var buttonVariant = (0, _objectsToString.default)(variants[(0, _findMatch.default)(valid.variants, variant, "filled")][(0, _findMatch.default)(valid.colors, color, "gray")]);
      var buttonSize = (0, _objectsToString.default)(sizes[(0, _findMatch.default)(valid.sizes, size, "md")]);
      var classes = (0, _tailwindMerge.twMerge)((0, _classnames.default)(buttonBase, buttonSize, buttonVariant), className);
      return _react.default.createElement("button", _extends({}, rest, { ref, className: classes, type: rest.type || "button", onMouseDown: function(e) {
        var onMouseDown = rest === null || rest === void 0 ? void 0 : rest.onMouseDown;
        if (ripple) {
          rippleEffect.create(e, (variant === "filled" || variant === "gradient") && color !== "white" ? "light" : "dark");
        }
        return typeof onMouseDown === "function" && onMouseDown(e);
      } }), _react.default.createElement("span", { className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform" }, children));
    });
    IconButton.propTypes = { variant: _propTypes.default.oneOf(_button.propTypesVariant), size: _propTypes.default.oneOf(_button.propTypesSize), color: _propTypes.default.oneOf(_button.propTypesColor), ripple: _button.propTypesRipple, className: _button.propTypesClassName, children: _button.propTypesChildren };
    IconButton.displayName = "MaterialTailwind.IconButton";
    var _default = IconButton;
  }
});

// node_modules/@material-tailwind/react/components/Alert/index.js
var require_Alert = __commonJS({
  "node_modules/@material-tailwind/react/components/Alert/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Alert: function() {
      return Alert;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _framerMotion = require_cjs2();
    var _classnames = _interopRequireDefault(require_classnames());
    var _deepmerge = _interopRequireDefault(require_cjs());
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _alert = require_alert();
    var _iconButton = _interopRequireDefault(require_IconButton());
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Alert = _react.default.forwardRef(function(_param, ref) {
      var variant = _param.variant, color = _param.color, icon = _param.icon, open = _param.open, action = _param.action, onClose = _param.onClose, animate = _param.animate, className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["variant", "color", "icon", "open", "action", "onClose", "animate", "className", "children"]);
      var alert = (0, _theme.useTheme)().alert;
      var defaultProps = alert.defaultProps, valid = alert.valid, styles = alert.styles;
      var base = styles.base, variants = styles.variants;
      variant = variant !== null && variant !== void 0 ? variant : defaultProps.variant;
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      animate = animate !== null && animate !== void 0 ? animate : defaultProps.animate;
      open = open !== null && open !== void 0 ? open : defaultProps.open;
      action = action !== null && action !== void 0 ? action : defaultProps.action;
      onClose = onClose !== null && onClose !== void 0 ? onClose : defaultProps.onClose;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var alertBase = (0, _objectsToString.default)(base.alert);
      var alertAction = (0, _objectsToString.default)(base.action);
      var alertVariant = (0, _objectsToString.default)(variants[(0, _findMatch.default)(valid.variants, variant, "filled")][(0, _findMatch.default)(valid.colors, color, "gray")]);
      var classes = (0, _tailwindMerge.twMerge)((0, _classnames.default)(alertBase, alertVariant), className);
      var actionClasses = (0, _classnames.default)(alertAction);
      var mainAnimation = { unmount: { opacity: 0 }, mount: { opacity: 1 } };
      var appliedAnimation = (0, _deepmerge.default)(mainAnimation, animate);
      var iconTemplate = _react.default.createElement("div", { className: "shrink-0" }, icon);
      var NewAnimatePresence = _framerMotion.AnimatePresence;
      return _react.default.createElement(_framerMotion.LazyMotion, { features: _framerMotion.domAnimation }, _react.default.createElement(NewAnimatePresence, null, open && _react.default.createElement(_framerMotion.m.div, _extends({}, rest, { ref, role: "alert", className: "".concat(classes, " flex"), initial: "unmount", exit: "unmount", animate: open ? "mount" : "unmount", variants: appliedAnimation }), icon && iconTemplate, _react.default.createElement("div", { className: "".concat(icon ? "ml-3" : "", " mr-12") }, children), onClose && !action && _react.default.createElement(_iconButton.default, { onClick: onClose, size: "sm", variant: "text", color: variant === "outlined" || variant === "ghost" ? color : "white", className: actionClasses }, _react.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-6 w-6", strokeWidth: 2 }, _react.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }))), action || null)));
    });
    Alert.propTypes = { variant: _propTypes.default.oneOf(_alert.propTypesVariant), color: _propTypes.default.oneOf(_alert.propTypesColor), icon: _alert.propTypesIcon, open: _alert.propTypesOpen, action: _alert.propTypesAction, onClose: _alert.propTypesOnClose, animate: _alert.propTypesAnimate, className: _alert.propTypesClassName, children: _alert.propTypesChildren };
    Alert.displayName = "MaterialTailwind.Alert";
    var _default = Alert;
  }
});

// node_modules/@material-tailwind/react/components/Avatar/index.js
var require_Avatar = __commonJS({
  "node_modules/@material-tailwind/react/components/Avatar/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Avatar: function() {
      return Avatar;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _avatar = require_avatar();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Avatar = _react.default.forwardRef(function(_param, ref) {
      var variant = _param.variant, size = _param.size, className = _param.className, color = _param.color, withBorder = _param.withBorder, rest = _objectWithoutProperties(_param, ["variant", "size", "className", "color", "withBorder"]);
      var avatar = (0, _theme.useTheme)().avatar;
      var valid = avatar.valid, defaultProps = avatar.defaultProps, styles = avatar.styles;
      var base = styles.base, variants = styles.variants, sizes = styles.sizes, borderColor = styles.borderColor;
      variant = variant !== null && variant !== void 0 ? variant : defaultProps.variant;
      size = size !== null && size !== void 0 ? size : defaultProps.size;
      withBorder = withBorder !== null && withBorder !== void 0 ? withBorder : defaultProps.withBorder;
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var avatarVariant = (0, _objectsToString.default)(variants[(0, _findMatch.default)(valid.variants, variant, "rounded")]);
      var avatarSize = (0, _objectsToString.default)(sizes[(0, _findMatch.default)(valid.sizes, size, "md")]);
      var avatarBorderColor = (0, _objectsToString.default)(borderColor[(0, _findMatch.default)(valid.colors, color, "gray")]);
      var _obj;
      var classes = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.initial), avatarVariant, avatarSize, (_obj = {}, _defineProperty(_obj, (0, _objectsToString.default)(base.withBorder), withBorder), _defineProperty(_obj, avatarBorderColor, withBorder), _obj)), className);
      return _react.default.createElement("img", _extends({}, rest, { ref, className: classes }));
    });
    Avatar.propTypes = { variant: _propTypes.default.oneOf(_avatar.propTypesVariant), size: _propTypes.default.oneOf(_avatar.propTypesSize), className: _avatar.propTypesClassName, withBorder: _avatar.propTypesWithBorder, color: _propTypes.default.oneOf(_avatar.propTypesColor) };
    Avatar.displayName = "MaterialTailwind.Avatar";
    var _default = Avatar;
  }
});

// node_modules/@material-tailwind/react/types/components/breadcrumbs.js
var require_breadcrumbs = __commonJS({
  "node_modules/@material-tailwind/react/types/components/breadcrumbs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { propTypesSeparator: function() {
      return propTypesSeparator;
    }, propTypesFullWidth: function() {
      return propTypesFullWidth;
    }, propTypesClassName: function() {
      return propTypesClassName;
    }, propTypesChildren: function() {
      return propTypesChildren;
    } });
    var _propTypes = _interopRequireDefault(require_prop_types());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var propTypesSeparator = _propTypes.default.node;
    var propTypesFullWidth = _propTypes.default.bool;
    var propTypesClassName = _propTypes.default.string;
    var propTypesChildren = _propTypes.default.node.isRequired;
  }
});

// node_modules/@material-tailwind/react/components/Breadcrumbs/index.js
var require_Breadcrumbs = __commonJS({
  "node_modules/@material-tailwind/react/components/Breadcrumbs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Breadcrumbs: function() {
      return Breadcrumbs;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireWildcard(require_react());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _breadcrumbs = require_breadcrumbs();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function") return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Breadcrumbs = (0, _react.forwardRef)(function(_param, ref) {
      var separator = _param.separator, fullWidth = _param.fullWidth, className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["separator", "fullWidth", "className", "children"]);
      var breadcrumbs = (0, _theme.useTheme)().breadcrumbs;
      var defaultProps = breadcrumbs.defaultProps, base = breadcrumbs.styles.base;
      separator = separator !== null && separator !== void 0 ? separator : defaultProps.separator;
      fullWidth = fullWidth !== null && fullWidth !== void 0 ? fullWidth : defaultProps.fullWidth;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var breadcrumbsRootClasses = (0, _classnames.default)((0, _objectsToString.default)(base.root.initial), _defineProperty({}, (0, _objectsToString.default)(base.root.fullWidth), fullWidth));
      var breadcrumbsListClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.list)), className);
      var breadcrumbsItemClasses = (0, _classnames.default)((0, _objectsToString.default)(base.item.initial));
      var breadcrumbsSeparatorClasses = (0, _classnames.default)((0, _objectsToString.default)(base.separator));
      return _react.default.createElement("nav", { "aria-label": "breadcrumb", className: breadcrumbsRootClasses }, _react.default.createElement("ol", _extends({}, rest, { ref, className: breadcrumbsListClasses }), _react.Children.map(children, function(child, index) {
        if ((0, _react.isValidElement)(child)) {
          var _child_props;
          return _react.default.createElement("li", { className: (0, _classnames.default)(breadcrumbsItemClasses, _defineProperty({}, (0, _objectsToString.default)(base.item.disabled), child === null || child === void 0 ? void 0 : (_child_props = child.props) === null || _child_props === void 0 ? void 0 : _child_props.disabled)) }, child, index !== _react.Children.count(children) - 1 && _react.default.createElement("span", { className: breadcrumbsSeparatorClasses }, separator));
        }
        return null;
      })));
    });
    Breadcrumbs.propTypes = { separator: _breadcrumbs.propTypesSeparator, fullWidth: _breadcrumbs.propTypesFullWidth, className: _breadcrumbs.propTypesClassName, children: _breadcrumbs.propTypesChildren };
    Breadcrumbs.displayName = "MaterialTailwind.Breadcrumbs";
    var _default = Breadcrumbs;
  }
});

// node_modules/@material-tailwind/react/components/Spinner/index.js
var require_Spinner = __commonJS({
  "node_modules/@material-tailwind/react/components/Spinner/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Spinner: function() {
      return Spinner;
    }, default: function() {
      return _default;
    } });
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _react = _interopRequireWildcard(require_react());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _spinner = require_spinner();
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _getRequireWildcardCache(nodeInterop) {
      if (typeof WeakMap !== "function") return null;
      var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
      var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(nodeInterop2) {
        return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
      })(nodeInterop);
    }
    function _interopRequireWildcard(obj, nodeInterop) {
      if (!nodeInterop && obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return { default: obj };
      }
      var cache = _getRequireWildcardCache(nodeInterop);
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Spinner = (0, _react.forwardRef)(function(_param, ref) {
      var color = _param.color, className = _param.className, rest = _objectWithoutProperties(_param, ["color", "className"]);
      var spinner = (0, _theme.useTheme)().spinner;
      var defaultProps = spinner.defaultProps, valid = spinner.valid, _spinner_styles = spinner.styles, base = _spinner_styles.base, colors = _spinner_styles.colors;
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var spinnerColor = (0, _objectsToString.default)(colors[(0, _findMatch.default)(valid.colors, color, "gray")]);
      var spinnerClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base)), className);
      var _rest_width, _rest_height;
      return _react.default.createElement("svg", _extends({}, rest, { ref, className: spinnerClasses, viewBox: "0 0 64 64", fill: "none", xmlns: "http://www.w3.org/2000/svg", width: (_rest_width = rest === null || rest === void 0 ? void 0 : rest.width) !== null && _rest_width !== void 0 ? _rest_width : 24, height: (_rest_height = rest === null || rest === void 0 ? void 0 : rest.height) !== null && _rest_height !== void 0 ? _rest_height : 24 }), _react.default.createElement("path", { d: "M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z", stroke: "currentColor", strokeWidth: "5", strokeLinecap: "round", strokeLinejoin: "round" }), _react.default.createElement("path", { d: "M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762", stroke: "currentColor", strokeWidth: "5", strokeLinecap: "round", strokeLinejoin: "round", className: spinnerColor }));
    });
    Spinner.propTypes = { color: _propTypes.default.oneOf(_spinner.propTypesColor), className: _spinner.propTypesClassName };
    Spinner.displayName = "MaterialTailwind.Spinner";
    var _default = Spinner;
  }
});

// node_modules/@material-tailwind/react/components/Button/index.js
var require_Button = __commonJS({
  "node_modules/@material-tailwind/react/components/Button/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Button: function() {
      return Button;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _materialRippleEffects = _interopRequireDefault(require_material_ripple_effects());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _spinner = _interopRequireDefault(require_Spinner());
    var _button = require_button();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Button = _react.default.forwardRef(function(_param, ref) {
      var variant = _param.variant, size = _param.size, color = _param.color, fullWidth = _param.fullWidth, ripple = _param.ripple, className = _param.className, children = _param.children, loading = _param.loading, rest = _objectWithoutProperties(_param, ["variant", "size", "color", "fullWidth", "ripple", "className", "children", "loading"]);
      var button = (0, _theme.useTheme)().button;
      var valid = button.valid, defaultProps = button.defaultProps, styles = button.styles;
      var base = styles.base, variants = styles.variants, sizes = styles.sizes;
      variant = variant !== null && variant !== void 0 ? variant : defaultProps.variant;
      size = size !== null && size !== void 0 ? size : defaultProps.size;
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      fullWidth = fullWidth !== null && fullWidth !== void 0 ? fullWidth : defaultProps.fullWidth;
      ripple = ripple !== null && ripple !== void 0 ? ripple : defaultProps.ripple;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var rippleEffect = ripple !== void 0 && new _materialRippleEffects.default();
      var buttonBase = (0, _objectsToString.default)(base.initial);
      var buttonVariant = (0, _objectsToString.default)(variants[(0, _findMatch.default)(valid.variants, variant, "filled")][(0, _findMatch.default)(valid.colors, color, "gray")]);
      var buttonSize = (0, _objectsToString.default)(sizes[(0, _findMatch.default)(valid.sizes, size, "md")]);
      var classes = (0, _tailwindMerge.twMerge)((0, _classnames.default)(buttonBase, buttonSize, buttonVariant, _defineProperty({}, (0, _objectsToString.default)(base.fullWidth), fullWidth), { "flex items-center gap-2": loading, "gap-3": size === "lg" }), className);
      var spinnerClass = (0, _tailwindMerge.twMerge)((0, _classnames.default)({ "w-4 h-4": true, "w-5 h-5": size === "lg" }));
      var _rest_disabled;
      return _react.default.createElement("button", _extends({}, rest, { disabled: (_rest_disabled = rest.disabled) !== null && _rest_disabled !== void 0 ? _rest_disabled : loading, ref, className: classes, type: rest.type || "button", onMouseDown: function(e) {
        var onMouseDown = rest === null || rest === void 0 ? void 0 : rest.onMouseDown;
        if (ripple) {
          rippleEffect.create(e, (variant === "filled" || variant === "gradient") && color !== "white" ? "light" : "dark");
        }
        return typeof onMouseDown === "function" && onMouseDown(e);
      } }), loading && _react.default.createElement(_spinner.default, { className: spinnerClass }), children);
    });
    Button.propTypes = { variant: _propTypes.default.oneOf(_button.propTypesVariant), size: _propTypes.default.oneOf(_button.propTypesSize), color: _propTypes.default.oneOf(_button.propTypesColor), fullWidth: _button.propTypesFullWidth, ripple: _button.propTypesRipple, className: _button.propTypesClassName, children: _button.propTypesChildren, loading: _button.propTypesLoading };
    Button.displayName = "MaterialTailwind.Button";
    var _default = Button;
  }
});

// node_modules/@material-tailwind/react/components/Card/CardHeader.js
var require_CardHeader = __commonJS({
  "node_modules/@material-tailwind/react/components/Card/CardHeader.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { CardHeader: function() {
      return CardHeader;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _card = require_card();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var CardHeader = _react.default.forwardRef(function(_param, ref) {
      var variant = _param.variant, color = _param.color, shadow = _param.shadow, floated = _param.floated, className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["variant", "color", "shadow", "floated", "className", "children"]);
      var cardHeader = (0, _theme.useTheme)().cardHeader;
      var defaultProps = cardHeader.defaultProps, styles = cardHeader.styles, valid = cardHeader.valid;
      var base = styles.base, variants = styles.variants;
      variant = variant !== null && variant !== void 0 ? variant : defaultProps.variant;
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      shadow = shadow !== null && shadow !== void 0 ? shadow : defaultProps.shadow;
      floated = floated !== null && floated !== void 0 ? floated : defaultProps.floated;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var cardHeaderRoot = (0, _objectsToString.default)(base.initial);
      var cardHeaderVariant = (0, _objectsToString.default)(variants[(0, _findMatch.default)(valid.variants, variant, "filled")][(0, _findMatch.default)(valid.colors, color, "white")]);
      var classes = (0, _tailwindMerge.twMerge)((0, _classnames.default)(cardHeaderRoot, cardHeaderVariant, _defineProperty({}, (0, _objectsToString.default)(base.shadow), shadow), _defineProperty({}, (0, _objectsToString.default)(base.floated), floated)), className);
      return _react.default.createElement("div", _extends({}, rest, { ref, className: classes }), children);
    });
    CardHeader.propTypes = { variant: _propTypes.default.oneOf(_card.propTypesVariant), color: _propTypes.default.oneOf(_card.propTypesColor), shadow: _card.propTypesShadow, floated: _card.propTypesFloated, className: _card.propTypesClassName, children: _card.propTypesChildren };
    CardHeader.displayName = "MaterialTailwind.CardHeader";
    var _default = CardHeader;
  }
});

// node_modules/@material-tailwind/react/components/Card/CardBody.js
var require_CardBody = __commonJS({
  "node_modules/@material-tailwind/react/components/Card/CardBody.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { CardBody: function() {
      return CardBody;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _card = require_card();
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var CardBody = _react.default.forwardRef(function(_param, ref) {
      var className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["className", "children"]);
      var cardBody = (0, _theme.useTheme)().cardBody;
      var defaultProps = cardBody.defaultProps, base = cardBody.styles.base;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var cardBodyClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base)), className);
      return _react.default.createElement("div", _extends({}, rest, { ref, className: cardBodyClasses }), children);
    });
    CardBody.propTypes = { className: _card.propTypesClassName, children: _card.propTypesChildren };
    CardBody.displayName = "MaterialTailwind.CardBody";
    var _default = CardBody;
  }
});

// node_modules/@material-tailwind/react/components/Card/CardFooter.js
var require_CardFooter = __commonJS({
  "node_modules/@material-tailwind/react/components/Card/CardFooter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { CardFooter: function() {
      return CardFooter;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _card = require_card();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var CardFooter = _react.default.forwardRef(function(_param, ref) {
      var divider = _param.divider, className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["divider", "className", "children"]);
      var cardFooter = (0, _theme.useTheme)().cardFooter;
      var defaultProps = cardFooter.defaultProps, base = cardFooter.styles.base;
      divider = divider !== null && divider !== void 0 ? divider : defaultProps.divider;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var cardFooterClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.initial), _defineProperty({}, (0, _objectsToString.default)(base.divider), divider)), className);
      return _react.default.createElement("div", _extends({}, rest, { ref, className: cardFooterClasses }), children);
    });
    CardFooter.propTypes = { divider: _card.propTypesDivider, className: _card.propTypesClassName, children: _card.propTypesChildren };
    CardFooter.displayName = "MaterialTailwind.CardFooter";
    var _default = CardFooter;
  }
});

// node_modules/@material-tailwind/react/components/Card/index.js
var require_Card = __commonJS({
  "node_modules/@material-tailwind/react/components/Card/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Card: function() {
      return Card;
    }, CardHeader: function() {
      return _cardHeader.CardHeader;
    }, CardBody: function() {
      return _cardBody.CardBody;
    }, CardFooter: function() {
      return _cardFooter.CardFooter;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _cardHeader = require_CardHeader();
    var _cardBody = require_CardBody();
    var _cardFooter = require_CardFooter();
    var _card = require_card();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Card = _react.default.forwardRef(function(_param, ref) {
      var variant = _param.variant, color = _param.color, shadow = _param.shadow, className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["variant", "color", "shadow", "className", "children"]);
      var card = (0, _theme.useTheme)().card;
      var defaultProps = card.defaultProps, styles = card.styles, valid = card.valid;
      var base = styles.base, variants = styles.variants;
      variant = variant !== null && variant !== void 0 ? variant : defaultProps.variant;
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      shadow = shadow !== null && shadow !== void 0 ? shadow : defaultProps.shadow;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var cardRoot = (0, _objectsToString.default)(base.initial);
      var cardVariant = (0, _objectsToString.default)(variants[(0, _findMatch.default)(valid.variants, variant, "filled")][(0, _findMatch.default)(valid.colors, color, "white")]);
      var classes = (0, _tailwindMerge.twMerge)((0, _classnames.default)(cardRoot, cardVariant, _defineProperty({}, (0, _objectsToString.default)(base.shadow), shadow)), className);
      return _react.default.createElement("div", _extends({}, rest, { ref, className: classes }), children);
    });
    Card.propTypes = { variant: _propTypes.default.oneOf(_card.propTypesVariant), color: _propTypes.default.oneOf(_card.propTypesColor), shadow: _card.propTypesShadow, className: _card.propTypesClassName, children: _card.propTypesChildren };
    Card.displayName = "MaterialTailwind.Card";
    var _default = Object.assign(Card, { Header: _cardHeader.CardHeader, Body: _cardBody.CardBody, Footer: _cardFooter.CardFooter });
  }
});

// node_modules/@material-tailwind/react/components/Checkbox/index.js
var require_Checkbox = __commonJS({
  "node_modules/@material-tailwind/react/components/Checkbox/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Checkbox: function() {
      return Checkbox;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _materialRippleEffects = _interopRequireDefault(require_material_ripple_effects());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _checkbox = require_checkbox();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Checkbox = _react.default.forwardRef(function(_param, ref) {
      var color = _param.color, label = _param.label, icon = _param.icon, ripple = _param.ripple, className = _param.className, disabled = _param.disabled, containerProps = _param.containerProps, labelProps = _param.labelProps, iconProps = _param.iconProps, inputRef = _param.inputRef, rest = _objectWithoutProperties(_param, ["color", "label", "icon", "ripple", "className", "disabled", "containerProps", "labelProps", "iconProps", "inputRef"]);
      var checkbox = (0, _theme.useTheme)().checkbox;
      var defaultProps = checkbox.defaultProps, valid = checkbox.valid, styles = checkbox.styles;
      var base = styles.base, colors = styles.colors;
      var checkboxId = _react.default.useId();
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      label = label !== null && label !== void 0 ? label : defaultProps.label;
      icon = icon !== null && icon !== void 0 ? icon : defaultProps.icon;
      ripple = ripple !== null && ripple !== void 0 ? ripple : defaultProps.ripple;
      disabled = disabled !== null && disabled !== void 0 ? disabled : defaultProps.disabled;
      containerProps = containerProps !== null && containerProps !== void 0 ? containerProps : defaultProps.containerProps;
      labelProps = labelProps !== null && labelProps !== void 0 ? labelProps : defaultProps.labelProps;
      iconProps = iconProps !== null && iconProps !== void 0 ? iconProps : defaultProps.iconProps;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var rippleEffect = ripple !== void 0 && new _materialRippleEffects.default();
      var rootClasses = (0, _classnames.default)((0, _objectsToString.default)(base.root), _defineProperty({}, (0, _objectsToString.default)(base.disabled), disabled));
      var containerClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.container)), containerProps === null || containerProps === void 0 ? void 0 : containerProps.className);
      var inputClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.input), (0, _objectsToString.default)(colors[(0, _findMatch.default)(valid.colors, color, "gray")])), className);
      var labelClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.label)), labelProps === null || labelProps === void 0 ? void 0 : labelProps.className);
      var iconContainerClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.icon)), iconProps === null || iconProps === void 0 ? void 0 : iconProps.className);
      return _react.default.createElement("div", { ref, className: rootClasses }, _react.default.createElement("label", _extends({}, containerProps, { className: containerClasses, htmlFor: rest.id || checkboxId, onMouseDown: function(e) {
        var onMouseDown = containerProps === null || containerProps === void 0 ? void 0 : containerProps.onMouseDown;
        if (ripple) {
          rippleEffect.create(e, "dark");
        }
        return typeof onMouseDown === "function" && onMouseDown(e);
      } }), _react.default.createElement("input", _extends({}, rest, { ref: inputRef, type: "checkbox", disabled, className: inputClasses, id: rest.id || checkboxId })), _react.default.createElement("span", { className: iconContainerClasses }, icon || _react.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-3.5 w-3.5", viewBox: "0 0 20 20", fill: "currentColor", stroke: "currentColor", strokeWidth: 1 }, _react.default.createElement("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" })))), label && _react.default.createElement("label", _extends({}, labelProps, { className: labelClasses, htmlFor: rest.id || checkboxId }), label));
    });
    Checkbox.propTypes = { color: _propTypes.default.oneOf(_checkbox.propTypesColor), label: _checkbox.propTypesLabel, icon: _checkbox.propTypesIcon, ripple: _checkbox.propTypesRipple, className: _checkbox.propTypesClassName, disabled: _checkbox.propTypesDisabled, containerProps: _checkbox.propTypesObject, labelProps: _checkbox.propTypesObject };
    Checkbox.displayName = "MaterialTailwind.Checkbox";
    var _default = Checkbox;
  }
});

// node_modules/@material-tailwind/react/components/Chip/index.js
var require_Chip = __commonJS({
  "node_modules/@material-tailwind/react/components/Chip/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Chip: function() {
      return Chip;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _framerMotion = require_cjs2();
    var _classnames = _interopRequireDefault(require_classnames());
    var _deepmerge = _interopRequireDefault(require_cjs());
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _chip = require_chip();
    var _iconButton = _interopRequireDefault(require_IconButton());
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Chip = _react.default.forwardRef(function(_param, ref) {
      var variant = _param.variant, size = _param.size, color = _param.color, icon = _param.icon, open = _param.open, onClose = _param.onClose, action = _param.action, animate = _param.animate, className = _param.className, value = _param.value, rest = _objectWithoutProperties(_param, ["variant", "size", "color", "icon", "open", "onClose", "action", "animate", "className", "value"]);
      var chip = (0, _theme.useTheme)().chip;
      var defaultProps = chip.defaultProps, valid = chip.valid, styles = chip.styles;
      var base = styles.base, variants = styles.variants, sizes = styles.sizes;
      variant = variant !== null && variant !== void 0 ? variant : defaultProps.variant;
      size = size !== null && size !== void 0 ? size : defaultProps.size;
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      animate = animate !== null && animate !== void 0 ? animate : defaultProps.animate;
      open = open !== null && open !== void 0 ? open : defaultProps.open;
      action = action !== null && action !== void 0 ? action : defaultProps.action;
      onClose = onClose !== null && onClose !== void 0 ? onClose : defaultProps.onClose;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var chipBase = (0, _objectsToString.default)(base.chip);
      var chipAction = (0, _objectsToString.default)(base.action);
      var chipIcon = (0, _objectsToString.default)(base.icon);
      var chipVariant = (0, _objectsToString.default)(variants[(0, _findMatch.default)(valid.variants, variant, "filled")][(0, _findMatch.default)(valid.colors, color, "gray")]);
      var chipSize = (0, _objectsToString.default)(sizes[(0, _findMatch.default)(valid.sizes, size, "md")]["chip"]);
      var actionSize = (0, _objectsToString.default)(sizes[(0, _findMatch.default)(valid.sizes, size, "md")]["action"]);
      var iconSize = (0, _objectsToString.default)(sizes[(0, _findMatch.default)(valid.sizes, size, "md")]["icon"]);
      var classes = (0, _tailwindMerge.twMerge)((0, _classnames.default)(chipBase, chipVariant, chipSize), className);
      var actionClasses = (0, _classnames.default)(chipAction, actionSize);
      var iconClasses = (0, _classnames.default)(chipIcon, iconSize);
      var contentClasses = (0, _classnames.default)({ "ml-4": icon && size === "sm", "ml-[18px]": icon && size === "md", "ml-5": icon && size === "lg", "mr-5": onClose });
      var mainAnimation = { unmount: { opacity: 0 }, mount: { opacity: 1 } };
      var appliedAnimation = (0, _deepmerge.default)(mainAnimation, animate);
      var iconTemplate = _react.default.createElement("div", { className: iconClasses }, icon);
      var NewAnimatePresence = _framerMotion.AnimatePresence;
      return _react.default.createElement(_framerMotion.LazyMotion, { features: _framerMotion.domAnimation }, _react.default.createElement(NewAnimatePresence, null, open && _react.default.createElement(_framerMotion.m.div, _extends({}, rest, { ref, className: classes, initial: "unmount", exit: "unmount", animate: open ? "mount" : "unmount", variants: appliedAnimation }), icon && iconTemplate, _react.default.createElement("span", { className: contentClasses }, value), onClose && !action && _react.default.createElement(_iconButton.default, { onClick: onClose, size: "sm", variant: "text", color: variant === "outlined" || variant === "ghost" ? color : "white", className: actionClasses }, _react.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: (0, _classnames.default)({ "h-3.5 w-3.5": size === "sm", "h-4 w-4": size === "md", "h-5 w-5": size === "lg" }), strokeWidth: 2 }, _react.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }))), action || null)));
    });
    Chip.propTypes = { variant: _propTypes.default.oneOf(_chip.propTypesVariant), size: _propTypes.default.oneOf(_chip.propTypesSize), color: _propTypes.default.oneOf(_chip.propTypesColor), icon: _chip.propTypesIcon, open: _chip.propTypesOpen, onClose: _chip.propTypesOnClose, action: _chip.propTypesAction, animate: _chip.propTypesAnimate, className: _chip.propTypesClassName, value: _chip.propTypesValue };
    Chip.displayName = "MaterialTailwind.Chip";
    var _default = Chip;
  }
});

// node_modules/@material-tailwind/react/components/Dialog/DialogHeader.js
var require_DialogHeader = __commonJS({
  "node_modules/@material-tailwind/react/components/Dialog/DialogHeader.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { DialogHeader: function() {
      return DialogHeader;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _dialog = require_dialog();
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var DialogHeader = _react.default.forwardRef(function(_param, ref) {
      var className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["className", "children"]);
      var dialogHeader = (0, _theme.useTheme)().dialogHeader;
      var defaultProps = dialogHeader.defaultProps, base = dialogHeader.styles.base;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var dialogHeaderClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base)), className);
      return _react.default.createElement("div", _extends({}, rest, { ref, className: dialogHeaderClasses }), children);
    });
    DialogHeader.propTypes = { className: _dialog.propTypesClassName, children: _dialog.propTypesChildren };
    DialogHeader.displayName = "MaterialTailwind.DialogHeader";
    var _default = DialogHeader;
  }
});

// node_modules/@material-tailwind/react/components/Dialog/DialogBody.js
var require_DialogBody = __commonJS({
  "node_modules/@material-tailwind/react/components/Dialog/DialogBody.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { DialogBody: function() {
      return DialogBody;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _dialog = require_dialog();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var DialogBody = _react.default.forwardRef(function(_param, ref) {
      var divider = _param.divider, className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["divider", "className", "children"]);
      var dialogBody = (0, _theme.useTheme)().dialogBody;
      var defaultProps = dialogBody.defaultProps, base = dialogBody.styles.base;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var dialogBodyClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.initial), _defineProperty({}, (0, _objectsToString.default)(base.divider), divider)), className);
      return _react.default.createElement("div", _extends({}, rest, { ref, className: dialogBodyClasses }), children);
    });
    DialogBody.propTypes = { divider: _dialog.propTypesDivider, className: _dialog.propTypesClassName, children: _dialog.propTypesChildren };
    DialogBody.displayName = "MaterialTailwind.DialogBody";
    var _default = DialogBody;
  }
});

// node_modules/@material-tailwind/react/components/Dialog/DialogFooter.js
var require_DialogFooter = __commonJS({
  "node_modules/@material-tailwind/react/components/Dialog/DialogFooter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { DialogFooter: function() {
      return DialogFooter;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _dialog = require_dialog();
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var DialogFooter = _react.default.forwardRef(function(_param, ref) {
      var className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["className", "children"]);
      var dialogFooter = (0, _theme.useTheme)().dialogFooter;
      var defaultProps = dialogFooter.defaultProps, base = dialogFooter.styles.base;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var dialogFooterClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base)), className);
      return _react.default.createElement("div", _extends({}, rest, { ref, className: dialogFooterClasses }), children);
    });
    DialogFooter.propTypes = { className: _dialog.propTypesClassName, children: _dialog.propTypesChildren };
    DialogFooter.displayName = "MaterialTailwind.DialogFooter";
    var _default = DialogFooter;
  }
});

// node_modules/@material-tailwind/react/components/Dialog/index.js
var require_Dialog = __commonJS({
  "node_modules/@material-tailwind/react/components/Dialog/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Dialog: function() {
      return Dialog;
    }, DialogHeader: function() {
      return _dialogHeader.DialogHeader;
    }, DialogBody: function() {
      return _dialogBody.DialogBody;
    }, DialogFooter: function() {
      return _dialogFooter.DialogFooter;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _react1 = (init_floating_ui_react_esm(), __toCommonJS(floating_ui_react_esm_exports));
    var _framerMotion = require_cjs2();
    var _classnames = _interopRequireDefault(require_classnames());
    var _deepmerge = _interopRequireDefault(require_cjs());
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _dialog = require_dialog();
    var _dialogHeader = require_DialogHeader();
    var _dialogBody = require_DialogBody();
    var _dialogFooter = require_DialogFooter();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys2 = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys2.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpreadProps(target, source) {
      source = source != null ? source : {};
      if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Dialog = _react.default.forwardRef(function(_param, ref) {
      var open = _param.open, handler = _param.handler, size = _param.size, dismiss = _param.dismiss, animate = _param.animate, className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["open", "handler", "size", "dismiss", "animate", "className", "children"]);
      var dialog = (0, _theme.useTheme)().dialog;
      var defaultProps = dialog.defaultProps, valid = dialog.valid, _dialog_styles = dialog.styles, base = _dialog_styles.base, sizes = _dialog_styles.sizes;
      handler = handler !== null && handler !== void 0 ? handler : void 0;
      size = size !== null && size !== void 0 ? size : defaultProps.size;
      dismiss = dismiss !== null && dismiss !== void 0 ? dismiss : defaultProps.dismiss;
      animate = animate !== null && animate !== void 0 ? animate : defaultProps.animate;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var backdropClasses = (0, _classnames.default)((0, _objectsToString.default)(base.backdrop));
      var dialogClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.container), (0, _objectsToString.default)(sizes[(0, _findMatch.default)(valid.sizes, size, "md")])), className);
      var animation = { unmount: { opacity: 0, y: -50, transition: { duration: 0.3 } }, mount: { opacity: 1, y: 0, transition: { duration: 0.3 } } };
      var backdropAnimation = { unmount: { opacity: 0, transition: { delay: 0.2 } }, mount: { opacity: 1 } };
      var appliedAnimation = (0, _deepmerge.default)(animation, animate);
      var _useFloating = (0, _react1.useFloating)({ open, onOpenChange: handler }), floating = _useFloating.floating, context = _useFloating.context;
      var id = (0, _react1.useId)();
      var labelId = "".concat(id, "-label");
      var descriptionId = "".concat(id, "-description");
      var getFloatingProps = (0, _react1.useInteractions)([(0, _react1.useClick)(context), (0, _react1.useRole)(context), (0, _react1.useDismiss)(context, dismiss)]).getFloatingProps;
      var mergedRef = (0, _react1.useMergeRefs)([ref, floating]);
      var NewAnimatePresence = _framerMotion.AnimatePresence;
      return _react.default.createElement(_framerMotion.LazyMotion, { features: _framerMotion.domAnimation }, _react.default.createElement(_react1.FloatingPortal, null, _react.default.createElement(NewAnimatePresence, null, open && _react.default.createElement(_react1.FloatingOverlay, { style: { zIndex: 9999 }, lockScroll: true }, _react.default.createElement(_react1.FloatingFocusManager, { context }, _react.default.createElement(_framerMotion.m.div, { className: size === "xxl" ? "" : backdropClasses, initial: "unmount", exit: "unmount", animate: open ? "mount" : "unmount", variants: backdropAnimation, transition: { duration: 0.2 } }, _react.default.createElement(_framerMotion.m.div, _extends({}, getFloatingProps(_objectSpreadProps(_objectSpread({}, rest), { ref: mergedRef, className: dialogClasses, "aria-labelledby": labelId, "aria-describedby": descriptionId })), { initial: "unmount", exit: "unmount", animate: open ? "mount" : "unmount", variants: appliedAnimation }), children)))))));
    });
    Dialog.propTypes = { open: _dialog.propTypesOpen, handler: _dialog.propTypesHandler, size: _propTypes.default.oneOf(_dialog.propTypesSize), dismiss: _dialog.propTypesDismiss, animate: _dialog.propTypesAnimate, className: _dialog.propTypesClassName, children: _dialog.propTypesChildren };
    Dialog.displayName = "MaterialTailwind.Dialog";
    var _default = Object.assign(Dialog, { Header: _dialogHeader.DialogHeader, Body: _dialogBody.DialogBody, Footer: _dialogFooter.DialogFooter });
  }
});

// node_modules/@material-tailwind/react/components/Input/index.js
var require_Input = __commonJS({
  "node_modules/@material-tailwind/react/components/Input/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Input: function() {
      return Input;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _classnames = _interopRequireDefault(require_classnames());
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _input = require_input();
    var _tailwindMerge = require_dist();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Input = _react.default.forwardRef(function(_param, ref) {
      var variant = _param.variant, color = _param.color, size = _param.size, label = _param.label, error = _param.error, success = _param.success, icon = _param.icon, containerProps = _param.containerProps, labelProps = _param.labelProps, className = _param.className, shrink = _param.shrink, inputRef = _param.inputRef, rest = _objectWithoutProperties(_param, ["variant", "color", "size", "label", "error", "success", "icon", "containerProps", "labelProps", "className", "shrink", "inputRef"]);
      var input = (0, _theme.useTheme)().input;
      var defaultProps = input.defaultProps, valid = input.valid, styles = input.styles;
      var base = styles.base, variants = styles.variants;
      variant = variant !== null && variant !== void 0 ? variant : defaultProps.variant;
      size = size !== null && size !== void 0 ? size : defaultProps.size;
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      label = label !== null && label !== void 0 ? label : defaultProps.label;
      labelProps = labelProps !== null && labelProps !== void 0 ? labelProps : defaultProps.labelProps;
      containerProps = containerProps !== null && containerProps !== void 0 ? containerProps : defaultProps.containerProps;
      shrink = shrink !== null && shrink !== void 0 ? shrink : defaultProps.shrink;
      icon = icon !== null && icon !== void 0 ? icon : defaultProps.icon;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var inputVariant = variants[(0, _findMatch.default)(valid.variants, variant, "outlined")];
      var inputSize = inputVariant.sizes[(0, _findMatch.default)(valid.sizes, size, "md")];
      var inputError = (0, _objectsToString.default)(inputVariant.error.input);
      var inputSuccess = (0, _objectsToString.default)(inputVariant.success.input);
      var inputShrink = (0, _objectsToString.default)(inputVariant.shrink.input);
      var inputColor = (0, _objectsToString.default)(inputVariant.colors.input[(0, _findMatch.default)(valid.colors, color, "gray")]);
      var labelError = (0, _objectsToString.default)(inputVariant.error.label);
      var labelSuccess = (0, _objectsToString.default)(inputVariant.success.label);
      var labelShrink = (0, _objectsToString.default)(inputVariant.shrink.label);
      var labelColor = (0, _objectsToString.default)(inputVariant.colors.label[(0, _findMatch.default)(valid.colors, color, "gray")]);
      var containerClasses = (0, _classnames.default)((0, _objectsToString.default)(base.container), (0, _objectsToString.default)(inputSize.container), containerProps === null || containerProps === void 0 ? void 0 : containerProps.className);
      var inputClasses = (0, _classnames.default)((0, _objectsToString.default)(base.input), (0, _objectsToString.default)(inputVariant.base.input), (0, _objectsToString.default)(inputSize.input), _defineProperty({}, (0, _objectsToString.default)(inputVariant.base.inputWithIcon), icon), _defineProperty({}, inputColor, !error && !success), _defineProperty({}, inputError, error), _defineProperty({}, inputSuccess, success), _defineProperty({}, inputShrink, shrink), className);
      var labelClasses = (0, _classnames.default)((0, _objectsToString.default)(base.label), (0, _objectsToString.default)(inputVariant.base.label), (0, _objectsToString.default)(inputSize.label), _defineProperty({}, labelColor, !error && !success), _defineProperty({}, labelError, error), _defineProperty({}, labelSuccess, success), _defineProperty({}, labelShrink, shrink), labelProps === null || labelProps === void 0 ? void 0 : labelProps.className);
      var iconClasses = (0, _classnames.default)((0, _objectsToString.default)(base.icon), (0, _objectsToString.default)(inputVariant.base.icon), (0, _objectsToString.default)(inputSize.icon));
      var asteriskClasses = (0, _classnames.default)((0, _objectsToString.default)(base.asterisk));
      return _react.default.createElement("div", _extends({}, containerProps, { ref, className: containerClasses }), icon && _react.default.createElement("div", { className: iconClasses }, icon), _react.default.createElement("input", _extends({}, rest, { ref: inputRef, className: inputClasses, placeholder: (rest === null || rest === void 0 ? void 0 : rest.placeholder) || " " })), _react.default.createElement("label", _extends({}, labelProps, { className: labelClasses }), label, " ", rest.required ? _react.default.createElement("span", { className: asteriskClasses }, "*") : ""));
    });
    Input.propTypes = { variant: _propTypes.default.oneOf(_input.propTypesVariant), size: _propTypes.default.oneOf(_input.propTypesSize), color: _propTypes.default.oneOf(_input.propTypesColor), label: _input.propTypesLabel, error: _input.propTypesError, success: _input.propTypesSuccess, icon: _input.propTypesIcon, labelProps: _input.propTypesLabelProps, containerProps: _input.propTypesContainerProps, shrink: _input.propTypesShrink, className: _input.propTypesClassName };
    Input.displayName = "MaterialTailwind.Input";
    var _default = Input;
  }
});

// node_modules/@material-tailwind/react/types/components/menu.js
var require_menu = __commonJS({
  "node_modules/@material-tailwind/react/types/components/menu.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { propTypesOpen: function() {
      return propTypesOpen;
    }, propTypesHandler: function() {
      return propTypesHandler;
    }, propTypesPlacement: function() {
      return propTypesPlacement;
    }, propTypesOffset: function() {
      return propTypesOffset;
    }, propTypesDismiss: function() {
      return propTypesDismiss;
    }, propTypesAnimate: function() {
      return propTypesAnimate;
    }, propTypesLockScroll: function() {
      return propTypesLockScroll;
    }, propTypesDisabled: function() {
      return propTypesDisabled;
    }, propTypesClassName: function() {
      return propTypesClassName;
    }, propTypesChildren: function() {
      return propTypesChildren;
    }, propTypesContextValue: function() {
      return propTypesContextValue;
    } });
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _generic = require_generic();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var propTypesOpen = _propTypes.default.bool;
    var propTypesHandler = _propTypes.default.func;
    var propTypesPlacement = _generic.propTypesPlacements;
    var propTypesOffset = _generic.propTypesOffsetType;
    var propTypesDismiss = _propTypes.default.shape({ itemPress: _propTypes.default.bool, enabled: _propTypes.default.bool, escapeKey: _propTypes.default.bool, referencePress: _propTypes.default.bool, referencePressEvent: _propTypes.default.oneOf(["pointerdown", "mousedown", "click"]), outsidePress: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.func]), outsidePressEvent: _propTypes.default.oneOf(["pointerdown", "mousedown", "click"]), ancestorScroll: _propTypes.default.bool, bubbles: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.shape({ escapeKey: _propTypes.default.bool, outsidePress: _propTypes.default.bool })]) });
    var propTypesAnimate = _generic.propTypesAnimation;
    var propTypesLockScroll = _propTypes.default.bool;
    var propTypesDisabled = _propTypes.default.bool;
    var propTypesClassName = _propTypes.default.string;
    var propTypesChildren = _propTypes.default.node.isRequired;
    var propTypesContextValue = _propTypes.default.shape({ open: _propTypes.default.bool.isRequired, handler: _propTypes.default.func.isRequired, setInternalOpen: _propTypes.default.func.isRequired, strategy: _propTypes.default.oneOf(["fixed", "absolute"]).isRequired, x: _propTypes.default.number.isRequired, y: _propTypes.default.number.isRequired, reference: _propTypes.default.func.isRequired, floating: _propTypes.default.func.isRequired, listItemsRef: _propTypes.default.instanceOf(Object).isRequired, getReferenceProps: _propTypes.default.func.isRequired, getFloatingProps: _propTypes.default.func.isRequired, getItemProps: _propTypes.default.func.isRequired, appliedAnimation: propTypesAnimate.isRequired, lockScroll: _propTypes.default.bool.isRequired, context: _propTypes.default.instanceOf(Object).isRequired, tree: _propTypes.default.any.isRequired, allowHover: _propTypes.default.bool.isRequired, activeIndex: _propTypes.default.number.isRequired, setActiveIndex: _propTypes.default.func.isRequired, nested: _propTypes.default.bool.isRequired });
  }
});

// node_modules/@material-tailwind/react/components/Menu/MenuContext.js
var require_MenuContext = __commonJS({
  "node_modules/@material-tailwind/react/components/Menu/MenuContext.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { MenuContext: function() {
      return MenuContext;
    }, useMenu: function() {
      return useMenu;
    }, MenuContextProvider: function() {
      return MenuContextProvider;
    } });
    var _react = _interopRequireDefault(require_react());
    var _menu = require_menu();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var MenuContext = _react.default.createContext(null);
    MenuContext.displayName = "MaterialTailwind.MenuContext";
    function useMenu() {
      var context = _react.default.useContext(MenuContext);
      if (!context) {
        throw new Error("useMenu() must be used within a Menu. It happens when you use MenuCore, MenuHandler, MenuItem or MenuList components outside the Menu component.");
      }
      return context;
    }
    var MenuContextProvider = function(param) {
      var value = param.value, children = param.children;
      return _react.default.createElement(MenuContext.Provider, { value }, children);
    };
    MenuContextProvider.prototypes = { value: _menu.propTypesContextValue, children: _menu.propTypesChildren };
    MenuContextProvider.displayName = "MaterialTailwind.MenuContextProvider";
  }
});

// node_modules/@material-tailwind/react/components/Menu/MenuCore.js
var require_MenuCore = __commonJS({
  "node_modules/@material-tailwind/react/components/Menu/MenuCore.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { MenuCore: function() {
      return MenuCore;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _react1 = (init_floating_ui_react_esm(), __toCommonJS(floating_ui_react_esm_exports));
    var _deepmerge = _interopRequireDefault(require_cjs());
    var _theme = require_theme2();
    var _menuContext = require_MenuContext();
    var _menu = require_menu();
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    var MenuCore = _react.default.forwardRef(function(param, ref) {
      var open = param.open, handler = param.handler, placement = param.placement, offset = param.offset, dismiss = param.dismiss, animate = param.animate, lockScroll = param.lockScroll, allowHover = param.allowHover, children = param.children;
      var menu = (0, _theme.useTheme)().menu;
      var defaultProps = menu.defaultProps;
      var _React_useState = _slicedToArray(_react.default.useState(false), 2), internalOpen = _React_useState[0], setInternalOpen = _React_useState[1];
      var _React_useState1 = _slicedToArray(_react.default.useState(false), 2), internalAllowHover = _React_useState1[0], setInternalAllowHover = _React_useState1[1];
      open = open !== null && open !== void 0 ? open : internalOpen;
      handler = handler !== null && handler !== void 0 ? handler : setInternalOpen;
      placement = placement !== null && placement !== void 0 ? placement : defaultProps.placement;
      offset = offset !== null && offset !== void 0 ? offset : defaultProps.offset;
      dismiss = dismiss !== null && dismiss !== void 0 ? dismiss : defaultProps.dismiss;
      animate = animate !== null && animate !== void 0 ? animate : defaultProps.animate;
      lockScroll = lockScroll !== null && lockScroll !== void 0 ? lockScroll : defaultProps.lockScroll;
      var animation = { unmount: { opacity: 0, transformOrigin: "top", transform: "scale(0.95)", transition: { duration: 0.2, times: [0.4, 0, 0.2, 1] } }, mount: { opacity: 1, transformOrigin: "top", transform: "scale(1)", transition: { duration: 0.2, times: [0.4, 0, 0.2, 1] } } };
      var appliedAnimation = (0, _deepmerge.default)(animation, animate);
      var _React_useState2 = _slicedToArray(_react.default.useState(null), 2), activeIndex = _React_useState2[0], setActiveIndex = _React_useState2[1];
      var listItemsRef = _react.default.useRef([]);
      var listContentRef = _react.default.useRef(_react.default.Children.map(children, function(child) {
        return _react.default.isValidElement(child) ? child.props.label : null;
      }));
      var tree = (0, _react1.useFloatingTree)();
      var nodeId = (0, _react1.useFloatingNodeId)();
      var parentId = (0, _react1.useFloatingParentNodeId)();
      var nested = parentId != null;
      var _useFloating = (0, _react1.useFloating)({ open, nodeId, placement, onOpenChange: handler, middleware: [(0, _react1.offset)(offset), (0, _react1.flip)(), (0, _react1.shift)()], whileElementsMounted: _react1.autoUpdate }), x = _useFloating.x, y = _useFloating.y, strategy = _useFloating.strategy, refs = _useFloating.refs, context = _useFloating.context;
      var _useInteractions = (0, _react1.useInteractions)([(0, _react1.useHover)(context, { handleClose: (0, _react1.safePolygon)({ restMs: 25, blockPointerEvents: true }), enabled: allowHover || nested && internalAllowHover, delay: { open: 75 } }), (0, _react1.useClick)(context, { toggle: !nested || !internalAllowHover, event: "mousedown", ignoreMouse: nested }), (0, _react1.useRole)(context, { role: "menu" }), (0, _react1.useDismiss)(context, dismiss), (0, _react1.useListNavigation)(context, { listRef: listItemsRef, activeIndex, nested, onNavigate: setActiveIndex }), (0, _react1.useTypeahead)(context, { listRef: listContentRef, onMatch: open ? setActiveIndex : void 0, activeIndex })]), getReferenceProps = _useInteractions.getReferenceProps, getFloatingProps = _useInteractions.getFloatingProps, getItemProps = _useInteractions.getItemProps;
      _react.default.useEffect(function() {
        var handleTreeClick = function handleTreeClick2() {
          if (dismiss.itemPress) handler(false);
        };
        var onSubMenuOpen = function onSubMenuOpen2(event) {
          if (event.nodeId !== nodeId && event.parentId === parentId) {
            handler(false);
          }
        };
        tree === null || tree === void 0 ? void 0 : tree.events.on("click", handleTreeClick);
        tree === null || tree === void 0 ? void 0 : tree.events.on("menuopen", onSubMenuOpen);
        return function() {
          tree === null || tree === void 0 ? void 0 : tree.events.off("click", handleTreeClick);
          tree === null || tree === void 0 ? void 0 : tree.events.off("menuopen", onSubMenuOpen);
        };
      }, [tree, nodeId, parentId, handler, dismiss]);
      _react.default.useEffect(function() {
        if (open) {
          tree === null || tree === void 0 ? void 0 : tree.events.emit("menuopen", { parentId, nodeId });
        }
      }, [tree, open, nodeId, parentId]);
      _react.default.useEffect(function() {
        var onPointerMove = function onPointerMove2(param2) {
          var pointerType = param2.pointerType;
          if (pointerType !== "touch") {
            setInternalAllowHover(true);
          }
        };
        var onKeyDown = function onKeyDown2() {
          setInternalAllowHover(false);
        };
        window.addEventListener("pointermove", onPointerMove, { once: true, capture: true });
        window.addEventListener("keydown", onKeyDown, true);
        return function() {
          window.removeEventListener("pointermove", onPointerMove, { capture: true });
          window.removeEventListener("keydown", onKeyDown, true);
        };
      }, [internalAllowHover]);
      var referenceRef = (0, _react1.useMergeRefs)([refs.setReference, ref]);
      var contextValue = _react.default.useMemo(function() {
        return { open, handler, setInternalOpen, strategy, x, y, reference: referenceRef, floating: refs.setFloating, listItemsRef, getReferenceProps, getFloatingProps, getItemProps, appliedAnimation, lockScroll, context, activeIndex, tree, allowHover, internalAllowHover, nested, setActiveIndex };
      }, [open, handler, setInternalOpen, strategy, x, y, referenceRef, refs, getReferenceProps, getFloatingProps, getItemProps, appliedAnimation, lockScroll, context, activeIndex, tree, allowHover, internalAllowHover, nested, setActiveIndex]);
      return _react.default.createElement(_menuContext.MenuContextProvider, { value: contextValue }, _react.default.createElement(_react1.FloatingNode, { id: nodeId }, children));
    });
    MenuCore.propTypes = { open: _menu.propTypesOpen, handler: _menu.propTypesHandler, placement: _propTypes.default.oneOf(_menu.propTypesPlacement), offset: _menu.propTypesOffset, dismiss: _menu.propTypesDismiss, animate: _menu.propTypesAnimate, lockScroll: _menu.propTypesLockScroll, children: _menu.propTypesChildren };
    MenuCore.displayName = "MaterialTailwind.MenuCore";
    var _default = MenuCore;
  }
});

// node_modules/@material-tailwind/react/components/Menu/MenuHandler.js
var require_MenuHandler = __commonJS({
  "node_modules/@material-tailwind/react/components/Menu/MenuHandler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { MenuHandler: function() {
      return MenuHandler;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _react1 = (init_floating_ui_react_esm(), __toCommonJS(floating_ui_react_esm_exports));
    var _menuContext = require_MenuContext();
    var _menu = require_menu();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys2 = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys2.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpreadProps(target, source) {
      source = source != null ? source : {};
      if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var MenuHandler = _react.default.forwardRef(function(_param, ref) {
      var children = _param.children, rest = _objectWithoutProperties(_param, ["children"]);
      var _useMenu = (0, _menuContext.useMenu)(), getReferenceProps = _useMenu.getReferenceProps, reference = _useMenu.reference, nested = _useMenu.nested;
      var mergedRef = (0, _react1.useMergeRefs)([ref, reference]);
      return _react.default.cloneElement(children, _objectSpread({}, getReferenceProps(_objectSpread(_objectSpreadProps(_objectSpread({}, rest), { ref: mergedRef, onClick: function onClick(event) {
        event.stopPropagation();
      } }), nested && { role: "menuitem" }))));
    });
    MenuHandler.propTypes = { children: _menu.propTypesChildren };
    MenuHandler.displayName = "MaterialTailwind.MenuHandler";
    var _default = MenuHandler;
  }
});

// node_modules/@material-tailwind/react/components/Menu/MenuList.js
var require_MenuList = __commonJS({
  "node_modules/@material-tailwind/react/components/Menu/MenuList.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { MenuList: function() {
      return MenuList;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _react1 = (init_floating_ui_react_esm(), __toCommonJS(floating_ui_react_esm_exports));
    var _framerMotion = require_cjs2();
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _menuContext = require_MenuContext();
    var _menu = require_menu();
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var MenuList = _react.default.forwardRef(function(_param, ref) {
      var children = _param.children, className = _param.className, rest = _objectWithoutProperties(_param, ["children", "className"]);
      var menu = (0, _theme.useTheme)().menu;
      var base = menu.styles.base;
      var _useMenu = (0, _menuContext.useMenu)(), open = _useMenu.open, handler = _useMenu.handler, strategy = _useMenu.strategy, x = _useMenu.x, y = _useMenu.y, floating = _useMenu.floating, listItemsRef = _useMenu.listItemsRef, getFloatingProps = _useMenu.getFloatingProps, getItemProps = _useMenu.getItemProps, appliedAnimation = _useMenu.appliedAnimation, lockScroll = _useMenu.lockScroll, context = _useMenu.context, activeIndex = _useMenu.activeIndex, tree = _useMenu.tree, allowHover = _useMenu.allowHover, internalAllowHover = _useMenu.internalAllowHover, setActiveIndex = _useMenu.setActiveIndex, nested = _useMenu.nested;
      className = className !== null && className !== void 0 ? className : "";
      var menuClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.menu)), className);
      var mergedRef = (0, _react1.useMergeRefs)([ref, floating]);
      var NewAnimatePresence = _framerMotion.AnimatePresence;
      var menuComponent = _react.default.createElement(_framerMotion.m.div, _extends({}, rest, { ref: mergedRef, style: { position: strategy, top: y !== null && y !== void 0 ? y : 0, left: x !== null && x !== void 0 ? x : 0 }, className: menuClasses }, getFloatingProps({ onKeyDown: function onKeyDown(event) {
        if (event.key === "Tab") {
          handler(false);
          if (event.shiftKey) {
            event.preventDefault();
          }
        }
      } }), { initial: "unmount", exit: "unmount", animate: open ? "mount" : "unmount", variants: appliedAnimation }), _react.default.Children.map(children, function(child, index) {
        return _react.default.isValidElement(child) && _react.default.cloneElement(child, getItemProps({ tabIndex: activeIndex === index ? 0 : -1, role: "menuitem", className: child.props.className, ref: function ref2(node) {
          listItemsRef.current[index] = node;
        }, onClick: function onClick(event) {
          if (child.props.onClick) {
            var _child_props, _child_props_onClick;
            (_child_props_onClick = (_child_props = child.props).onClick) === null || _child_props_onClick === void 0 ? void 0 : _child_props_onClick.call(_child_props, event);
          }
          tree === null || tree === void 0 ? void 0 : tree.events.emit("click");
        }, onMouseEnter: function onMouseEnter() {
          if (allowHover && open || internalAllowHover && open) {
            setActiveIndex(index);
          }
        } }));
      }));
      return _react.default.createElement(_framerMotion.LazyMotion, { features: _framerMotion.domAnimation }, _react.default.createElement(_react1.FloatingPortal, null, _react.default.createElement(NewAnimatePresence, null, open && _react.default.createElement(_react.default.Fragment, null, lockScroll ? _react.default.createElement(_react1.FloatingOverlay, { lockScroll: true }, _react.default.createElement(_react1.FloatingFocusManager, { context, modal: !nested, initialFocus: nested ? -1 : 0, returnFocus: !nested, visuallyHiddenDismiss: true }, menuComponent)) : _react.default.createElement(_react1.FloatingFocusManager, { context, modal: !nested, initialFocus: nested ? -1 : 0, returnFocus: !nested, visuallyHiddenDismiss: true }, menuComponent)))));
    });
    MenuList.propTypes = { className: _menu.propTypesClassName, children: _menu.propTypesChildren };
    MenuList.displayName = "MaterialTailwind.MenuList";
    var _default = MenuList;
  }
});

// node_modules/@material-tailwind/react/components/Menu/MenuItem.js
var require_MenuItem = __commonJS({
  "node_modules/@material-tailwind/react/components/Menu/MenuItem.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { MenuItem: function() {
      return MenuItem;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _menu = require_menu();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var MenuItem = _react.default.forwardRef(function(_param, ref) {
      var _param_className = _param.className, className = _param_className === void 0 ? "" : _param_className, _param_disabled = _param.disabled, disabled = _param_disabled === void 0 ? false : _param_disabled, children = _param.children, rest = _objectWithoutProperties(_param, ["className", "disabled", "children"]);
      var menu = (0, _theme.useTheme)().menu;
      var base = menu.styles.base;
      var menuItemClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.item.initial), _defineProperty({}, (0, _objectsToString.default)(base.item.disabled), disabled)), className);
      return _react.default.createElement("button", _extends({}, rest, { ref, role: "menuitem", className: menuItemClasses }), children);
    });
    MenuItem.propTypes = { className: _menu.propTypesClassName, disabled: _menu.propTypesDisabled, children: _menu.propTypesChildren };
    MenuItem.displayName = "MaterialTailwind.MenuItem";
    var _default = MenuItem;
  }
});

// node_modules/@material-tailwind/react/components/Menu/index.js
var require_Menu = __commonJS({
  "node_modules/@material-tailwind/react/components/Menu/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Menu: function() {
      return Menu;
    }, MenuHandler: function() {
      return _menuHandler.MenuHandler;
    }, MenuList: function() {
      return _menuList.MenuList;
    }, MenuItem: function() {
      return _menuItem.MenuItem;
    }, useMenu: function() {
      return _menuContext.useMenu;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _react1 = (init_floating_ui_react_esm(), __toCommonJS(floating_ui_react_esm_exports));
    var _menuContext = require_MenuContext();
    var _menuCore = require_MenuCore();
    var _menuHandler = require_MenuHandler();
    var _menuList = require_MenuList();
    var _menuItem = require_MenuItem();
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var Menu = _react.default.forwardRef(function(param, ref) {
      var open = param.open, handler = param.handler, placement = param.placement, offset = param.offset, dismiss = param.dismiss, animate = param.animate, lockScroll = param.lockScroll, allowHover = param.allowHover, children = param.children;
      var parentId = (0, _react1.useFloatingParentNodeId)();
      var props = { open, handler, placement, offset, dismiss, animate, lockScroll, allowHover };
      if (parentId == null) {
        return _react.default.createElement(_react1.FloatingTree, null, _react.default.createElement(_menuCore.MenuCore, _extends({ ref }, props), children));
      }
      return _react.default.createElement(_menuCore.MenuCore, _extends({ ref }, props), children);
    });
    Menu.propTypes = _menuCore.MenuCore.propTypes;
    Menu.displayName = "MaterialTailwind.Menu";
    var _default = Object.assign(Menu, { Handler: _menuHandler.MenuHandler, List: _menuList.MenuList, Item: _menuItem.MenuItem });
  }
});

// node_modules/@material-tailwind/react/components/Navbar/MobileNav.js
var require_MobileNav = __commonJS({
  "node_modules/@material-tailwind/react/components/Navbar/MobileNav.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { MobileNav: function() {
      return MobileNav;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _framerMotion = require_cjs2();
    var _react1 = (init_floating_ui_react_esm(), __toCommonJS(floating_ui_react_esm_exports));
    var _deepmerge = _interopRequireDefault(require_cjs());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _navbar = require_navbar();
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var MobileNav = _react.default.forwardRef(function(_param, ref) {
      var open = _param.open, animate = _param.animate, className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["open", "animate", "className", "children"]);
      var _mobileNavRef_current;
      console.error("<MobileNav /> will be deprecated in the future versions of @material-tailwind/react use <Collapse /> instead.\n      \nMore details: https://www.material-tailwind.com/docs/react/collapse\n      ");
      var mobileNavRef = _react.default.useRef(null);
      var navbar = (0, _theme.useTheme)().navbar;
      var styles = navbar.styles;
      var mobileNav = styles.base.mobileNav;
      animate = animate !== null && animate !== void 0 ? animate : {};
      className = className !== null && className !== void 0 ? className : "";
      var classes = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(mobileNav)), className);
      var mainAnimation = { unmount: { height: 0, opacity: 0, transition: { duration: 0.3, times: "[0.4, 0, 0.2, 1]" } }, mount: { opacity: 1, height: "".concat((_mobileNavRef_current = mobileNavRef.current) === null || _mobileNavRef_current === void 0 ? void 0 : _mobileNavRef_current.scrollHeight, "px"), transition: { duration: 0.3, times: "[0.4, 0, 0.2, 1]" } } };
      var appliedAnimation = (0, _deepmerge.default)(mainAnimation, animate);
      var NewAnimatePresence = _framerMotion.AnimatePresence;
      var mergedRef = (0, _react1.useMergeRefs)([ref, mobileNavRef]);
      return _react.default.createElement(_framerMotion.LazyMotion, { features: _framerMotion.domAnimation }, _react.default.createElement(NewAnimatePresence, null, _react.default.createElement(_framerMotion.m.div, _extends({}, rest, { ref: mergedRef, className: classes, initial: "unmount", exit: "unmount", animate: open ? "mount" : "unmount", variants: appliedAnimation }), children)));
    });
    MobileNav.displayName = "MaterialTailwind.MobileNav";
    MobileNav.propTypes = { open: _navbar.propTypesOpen, animate: _navbar.propTypesAnimate, className: _navbar.propTypesClassName, children: _navbar.propTypesChildren };
    var _default = MobileNav;
  }
});

// node_modules/@material-tailwind/react/components/Navbar/index.js
var require_Navbar = __commonJS({
  "node_modules/@material-tailwind/react/components/Navbar/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Navbar: function() {
      return Navbar;
    }, MobileNav: function() {
      return _mobileNav.MobileNav;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _mobileNav = require_MobileNav();
    var _navbar = require_navbar();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Navbar = _react.default.forwardRef(function(_param, ref) {
      var variant = _param.variant, color = _param.color, shadow = _param.shadow, blurred = _param.blurred, fullWidth = _param.fullWidth, className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["variant", "color", "shadow", "blurred", "fullWidth", "className", "children"]);
      var navbar = (0, _theme.useTheme)().navbar;
      var defaultProps = navbar.defaultProps, valid = navbar.valid, styles = navbar.styles;
      var base = styles.base, variants = styles.variants;
      variant = variant !== null && variant !== void 0 ? variant : defaultProps.variant;
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      shadow = shadow !== null && shadow !== void 0 ? shadow : defaultProps.shadow;
      blurred = blurred !== null && blurred !== void 0 ? blurred : defaultProps.blurred;
      fullWidth = fullWidth !== null && fullWidth !== void 0 ? fullWidth : defaultProps.fullWidth;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var _obj;
      var navbarRoot = (0, _classnames.default)((0, _objectsToString.default)(base.navbar.initial), (_obj = {}, _defineProperty(_obj, (0, _objectsToString.default)(base.navbar.shadow), shadow), _defineProperty(_obj, (0, _objectsToString.default)(base.navbar.blurred), blurred && color === "white"), _defineProperty(_obj, (0, _objectsToString.default)(base.navbar.fullWidth), fullWidth), _obj));
      var navbarVariant = (0, _classnames.default)((0, _objectsToString.default)(variants[(0, _findMatch.default)(valid.variants, variant, "filled")][(0, _findMatch.default)(valid.colors, color, "white")]));
      var navbarClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)(navbarRoot, navbarVariant), className);
      return _react.default.createElement("nav", _extends({}, rest, { ref, className: navbarClasses }), children);
    });
    Navbar.propTypes = { variant: _propTypes.default.oneOf(_navbar.propTypesVariant), color: _propTypes.default.oneOf(_navbar.propTypesColor), shadow: _navbar.propTypesShadow, blurred: _navbar.propTypesBlurred, fullWidth: _navbar.propTypesFullWidth, className: _navbar.propTypesClassName, children: _navbar.propTypesChildren };
    Navbar.displayName = "MaterialTailwind.Navbar";
    var _default = Object.assign(Navbar, { MobileNav: _mobileNav.MobileNav });
  }
});

// node_modules/@material-tailwind/react/components/Progress/index.js
var require_Progress = __commonJS({
  "node_modules/@material-tailwind/react/components/Progress/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Progress: function() {
      return Progress;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _progress = require_progress();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Progress = _react.default.forwardRef(function(_param, ref) {
      var variant = _param.variant, color = _param.color, size = _param.size, value = _param.value, label = _param.label, className = _param.className, barProps = _param.barProps, rest = _objectWithoutProperties(_param, ["variant", "color", "size", "value", "label", "className", "barProps"]);
      var progress = (0, _theme.useTheme)().progress;
      var defaultProps = progress.defaultProps, valid = progress.valid, styles = progress.styles;
      var base = styles.base, variants = styles.variants, sizes = styles.sizes;
      variant = variant !== null && variant !== void 0 ? variant : defaultProps.variant;
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      size = size !== null && size !== void 0 ? size : defaultProps.size;
      label = label !== null && label !== void 0 ? label : defaultProps.label;
      barProps = barProps !== null && barProps !== void 0 ? barProps : defaultProps.barProps;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var progressVariant = (0, _objectsToString.default)(variants[(0, _findMatch.default)(valid.variants, variant, "filled")][(0, _findMatch.default)(valid.colors, color, "gray")]);
      var progressContainerSize = (0, _objectsToString.default)(sizes[(0, _findMatch.default)(valid.sizes, size, "md")]["container"]["initial"]);
      var progressContainer = (0, _classnames.default)((0, _objectsToString.default)(base.container.initial), progressContainerSize);
      var progressWithLabelSize = (0, _objectsToString.default)(sizes[(0, _findMatch.default)(valid.sizes, size, "md")]["container"]["withLabel"]);
      var progressWithLabel = (0, _classnames.default)((0, _objectsToString.default)(base.container.withLabel), progressWithLabelSize);
      var progressBarSize = (0, _objectsToString.default)(sizes[(0, _findMatch.default)(valid.sizes, size, "md")]["bar"]);
      var progressBar = (0, _classnames.default)((0, _objectsToString.default)(base.bar), progressBarSize);
      var containerClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)(progressContainer, _defineProperty({}, progressWithLabel, label)), className);
      var barClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)(progressBar, progressVariant), barProps === null || barProps === void 0 ? void 0 : barProps.className);
      return _react.default.createElement("div", _extends({}, rest, { ref, className: containerClasses }), _react.default.createElement("div", _extends({}, barProps, { className: barClasses, style: { width: "".concat(value, "%") } }), label && "".concat(value, "% ").concat(typeof label === "string" ? label : "")));
    });
    Progress.propTypes = { variant: _propTypes.default.oneOf(_progress.propTypesVariant), color: _propTypes.default.oneOf(_progress.propTypesColor), size: _propTypes.default.oneOf(_progress.propTypesSize), value: _progress.propTypesValue, label: _progress.propTypesLabel, barProps: _progress.propTypesBarProps, className: _progress.propTypesClassName };
    Progress.displayName = "MaterialTailwind.Progress";
    var _default = Progress;
  }
});

// node_modules/@material-tailwind/react/components/Radio/index.js
var require_Radio = __commonJS({
  "node_modules/@material-tailwind/react/components/Radio/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Radio: function() {
      return Radio;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _materialRippleEffects = _interopRequireDefault(require_material_ripple_effects());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _checkbox = require_checkbox();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Radio = _react.default.forwardRef(function(_param, ref) {
      var color = _param.color, label = _param.label, icon = _param.icon, ripple = _param.ripple, className = _param.className, disabled = _param.disabled, containerProps = _param.containerProps, labelProps = _param.labelProps, iconProps = _param.iconProps, inputRef = _param.inputRef, rest = _objectWithoutProperties(_param, ["color", "label", "icon", "ripple", "className", "disabled", "containerProps", "labelProps", "iconProps", "inputRef"]);
      var radio = (0, _theme.useTheme)().radio;
      var defaultProps = radio.defaultProps, valid = radio.valid, styles = radio.styles;
      var base = styles.base, colors = styles.colors;
      var radioId = _react.default.useId();
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      label = label !== null && label !== void 0 ? label : defaultProps.label;
      icon = icon !== null && icon !== void 0 ? icon : defaultProps.icon;
      ripple = ripple !== null && ripple !== void 0 ? ripple : defaultProps.ripple;
      disabled = disabled !== null && disabled !== void 0 ? disabled : defaultProps.disabled;
      containerProps = containerProps !== null && containerProps !== void 0 ? containerProps : defaultProps.containerProps;
      labelProps = labelProps !== null && labelProps !== void 0 ? labelProps : defaultProps.labelProps;
      iconProps = iconProps !== null && iconProps !== void 0 ? iconProps : defaultProps.iconProps;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var rippleEffect = ripple !== void 0 && new _materialRippleEffects.default();
      var rootClasses = (0, _classnames.default)((0, _objectsToString.default)(base.root), _defineProperty({}, (0, _objectsToString.default)(base.disabled), disabled));
      var containerClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.container)), containerProps === null || containerProps === void 0 ? void 0 : containerProps.className);
      var inputClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.input), (0, _objectsToString.default)(colors[(0, _findMatch.default)(valid.colors, color, "gray")])), className);
      var labelClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.label)), labelProps === null || labelProps === void 0 ? void 0 : labelProps.className);
      var radioIconClasses = (0, _classnames.default)((0, _classnames.default)((0, _objectsToString.default)(base.icon)), colors[(0, _findMatch.default)(valid.colors, color, "gray")].color, iconProps === null || iconProps === void 0 ? void 0 : iconProps.className);
      return _react.default.createElement("div", { ref, className: rootClasses }, _react.default.createElement("label", _extends({}, containerProps, { className: containerClasses, htmlFor: rest.id || radioId, onMouseDown: function(e) {
        var onMouseDown = containerProps === null || containerProps === void 0 ? void 0 : containerProps.onMouseDown;
        if (ripple) {
          rippleEffect.create(e, "dark");
        }
        return typeof onMouseDown === "function" && onMouseDown(e);
      } }), _react.default.createElement("input", _extends({}, rest, { ref: inputRef, type: "radio", disabled, className: inputClasses, id: rest.id || radioId })), _react.default.createElement("span", { className: radioIconClasses }, icon || _react.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-3.5 w-3.5", viewBox: "0 0 16 16", fill: "currentColor" }, _react.default.createElement("circle", { "data-name": "ellipse", cx: "8", cy: "8", r: "8" })))), label && _react.default.createElement("label", _extends({}, labelProps, { className: labelClasses, htmlFor: rest.id || radioId }), label));
    });
    Radio.propTypes = { color: _propTypes.default.oneOf(_checkbox.propTypesColor), label: _checkbox.propTypesLabel, icon: _checkbox.propTypesIcon, ripple: _checkbox.propTypesRipple, className: _checkbox.propTypesClassName, disabled: _checkbox.propTypesDisabled, containerProps: _checkbox.propTypesObject, labelProps: _checkbox.propTypesObject };
    Radio.displayName = "MaterialTailwind.Radio";
    var _default = Radio;
  }
});

// node_modules/@material-tailwind/react/components/Select/SelectContext.js
var require_SelectContext = __commonJS({
  "node_modules/@material-tailwind/react/components/Select/SelectContext.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { SelectContext: function() {
      return SelectContext;
    }, useSelect: function() {
      return useSelect;
    }, usePrevious: function() {
      return usePrevious;
    }, SelectContextProvider: function() {
      return SelectContextProvider;
    } });
    var _react = _interopRequireDefault(require_react());
    var _framerMotion = require_cjs2();
    var _select = require_select();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var SelectContext = _react.default.createContext(null);
    SelectContext.displayName = "MaterialTailwind.SelectContext";
    function useSelect() {
      var context = _react.default.useContext(SelectContext);
      if (context === null) {
        throw new Error("useSelect() must be used within a Select. It happens when you use SelectOption component outside the Select component.");
      }
      return context;
    }
    function usePrevious(value) {
      var ref = _react.default.useRef();
      (0, _framerMotion.useIsomorphicLayoutEffect)(function() {
        ref.current = value;
      }, [value]);
      return ref.current;
    }
    var SelectContextProvider = function(param) {
      var value = param.value, children = param.children;
      return _react.default.createElement(SelectContext.Provider, { value }, children);
    };
    SelectContextProvider.propTypes = { value: _select.propTypesContextValue, children: _select.propTypesChildren };
    SelectContextProvider.displayName = "MaterialTailwind.SelectContextProvider";
  }
});

// node_modules/@material-tailwind/react/components/Select/SelectOption.js
var require_SelectOption = __commonJS({
  "node_modules/@material-tailwind/react/components/Select/SelectOption.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { SelectOption: function() {
      return SelectOption;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _selectContext = require_SelectContext();
    var _select = require_select();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var SelectOption = function(_param) {
      var handleSelect = function handleSelect2() {
        setSelectedIndex(index);
        onChange(value);
        setOpen(false);
        setActiveIndex(null);
      };
      var handleKeyDown = function handleKeyDown2(event) {
        if (event.key === "Enter" || event.key === " " && !dataRef.current.typing) {
          event.preventDefault();
          handleSelect();
        }
      };
      var _param_value = _param.value, value = _param_value === void 0 ? "" : _param_value, _param_index = _param.index, index = _param_index === void 0 ? 0 : _param_index, _param_disabled = _param.disabled, disabled = _param_disabled === void 0 ? false : _param_disabled, _param_className = _param.className, className = _param_className === void 0 ? "" : _param_className, children = _param.children, rest = _objectWithoutProperties(_param, ["value", "index", "disabled", "className", "children"]);
      var select = (0, _theme.useTheme)().select;
      var styles = select.styles;
      var base = styles.base;
      var _useSelect = (0, _selectContext.useSelect)(), selectedIndex = _useSelect.selectedIndex, setSelectedIndex = _useSelect.setSelectedIndex, listRef = _useSelect.listRef, setOpen = _useSelect.setOpen, onChange = _useSelect.onChange, activeIndex = _useSelect.activeIndex, setActiveIndex = _useSelect.setActiveIndex, getItemProps = _useSelect.getItemProps, dataRef = _useSelect.dataRef;
      var optionBaseClasses = (0, _objectsToString.default)(base.option.initial);
      var optionActiveClasses = (0, _objectsToString.default)(base.option.active);
      var optionDisabledClasses = (0, _objectsToString.default)(base.option.disabled);
      var _obj;
      var classes = (0, _tailwindMerge.twMerge)((0, _classnames.default)(optionBaseClasses, (_obj = {}, _defineProperty(_obj, optionActiveClasses, selectedIndex === index), _defineProperty(_obj, optionDisabledClasses, disabled), _obj)), className !== null && className !== void 0 ? className : "");
      return _react.default.createElement("li", _extends({}, rest, { role: "option", ref: function(node) {
        return listRef.current[index] = node;
      }, className: classes, disabled, tabIndex: activeIndex === index ? 0 : 1, "aria-selected": activeIndex === index && selectedIndex === index, "data-selected": selectedIndex === index }, getItemProps({ onClick: function(e) {
        var onClick = rest === null || rest === void 0 ? void 0 : rest.onClick;
        if (typeof onClick === "function") {
          onClick(e);
          handleSelect();
        }
        handleSelect();
      }, onKeyDown: function(e) {
        var onKeyDown = rest === null || rest === void 0 ? void 0 : rest.onKeyDown;
        if (typeof onKeyDown === "function") {
          onKeyDown(e);
          handleKeyDown(e);
        }
        handleKeyDown(e);
      } })), children);
    };
    SelectOption.propTypes = { value: _select.propTypesValue, index: _select.propTypesIndex, disabled: _select.propTypesDisabled, className: _select.propTypesClassName, children: _select.propTypesChildren };
    SelectOption.displayName = "MaterialTailwind.SelectOption";
    var _default = SelectOption;
  }
});

// node_modules/@material-tailwind/react/components/Select/index.js
var require_Select = __commonJS({
  "node_modules/@material-tailwind/react/components/Select/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Select: function() {
      return Select;
    }, Option: function() {
      return _selectOption.SelectOption;
    }, useSelect: function() {
      return _selectContext.useSelect;
    }, usePrevious: function() {
      return _selectContext.usePrevious;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _react1 = (init_floating_ui_react_esm(), __toCommonJS(floating_ui_react_esm_exports));
    var _framerMotion = require_cjs2();
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _deepmerge = _interopRequireDefault(require_cjs());
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _selectContext = require_SelectContext();
    var _select = require_select();
    var _selectOption = require_SelectOption();
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys2 = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys2.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpreadProps(target, source) {
      source = source != null ? source : {};
      if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    var Select = _react.default.forwardRef(function(_param, ref) {
      var variant = _param.variant, color = _param.color, size = _param.size, label = _param.label, error = _param.error, success = _param.success, arrow = _param.arrow, value = _param.value, onChange = _param.onChange, selected = _param.selected, offset = _param.offset, dismiss = _param.dismiss, animate = _param.animate, lockScroll = _param.lockScroll, labelProps = _param.labelProps, menuProps = _param.menuProps, className = _param.className, disabled = _param.disabled, name = _param.name, children = _param.children, containerProps = _param.containerProps, rest = _objectWithoutProperties(_param, ["variant", "color", "size", "label", "error", "success", "arrow", "value", "onChange", "selected", "offset", "dismiss", "animate", "lockScroll", "labelProps", "menuProps", "className", "disabled", "name", "children", "containerProps"]);
      var _children_;
      var select = (0, _theme.useTheme)().select;
      var defaultProps = select.defaultProps, valid = select.valid, styles = select.styles;
      var base = styles.base, variants = styles.variants;
      var _React_useState = _slicedToArray(_react.default.useState("close"), 2), state = _React_useState[0], setState = _React_useState[1];
      variant = variant !== null && variant !== void 0 ? variant : defaultProps.variant;
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      size = size !== null && size !== void 0 ? size : defaultProps.size;
      label = label !== null && label !== void 0 ? label : defaultProps.label;
      error = error !== null && error !== void 0 ? error : defaultProps.error;
      success = success !== null && success !== void 0 ? success : defaultProps.success;
      arrow = arrow !== null && arrow !== void 0 ? arrow : defaultProps.arrow;
      value = value !== null && value !== void 0 ? value : defaultProps.value;
      onChange = onChange !== null && onChange !== void 0 ? onChange : defaultProps.onChange;
      selected = selected !== null && selected !== void 0 ? selected : defaultProps.selected;
      offset = offset !== null && offset !== void 0 ? offset : defaultProps.offset;
      dismiss = dismiss !== null && dismiss !== void 0 ? dismiss : defaultProps.dismiss;
      animate = animate !== null && animate !== void 0 ? animate : defaultProps.animate;
      labelProps = labelProps !== null && labelProps !== void 0 ? labelProps : defaultProps.labelProps;
      menuProps = menuProps !== null && menuProps !== void 0 ? menuProps : defaultProps.menuProps;
      var _merge;
      containerProps = (_merge = (0, _deepmerge.default)(containerProps, (defaultProps === null || defaultProps === void 0 ? void 0 : defaultProps.containerProps) || {})) !== null && _merge !== void 0 ? _merge : defaultProps.containerProps;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      children = Array.isArray(children) ? children : [children];
      var listItemsRef = _react.default.useRef([]);
      var _React_Children_map;
      var listContentRef = _react.default.useRef(_toConsumableArray((_React_Children_map = _react.default.Children.map(children, function(child) {
        var props = child.props;
        return props === null || props === void 0 ? void 0 : props.value;
      })) !== null && _React_Children_map !== void 0 ? _React_Children_map : []));
      var _React_useState1 = _slicedToArray(_react.default.useState(false), 2), open = _React_useState1[0], setOpen = _React_useState1[1];
      var _React_useState2 = _slicedToArray(_react.default.useState(null), 2), activeIndex = _React_useState2[0], setActiveIndex = _React_useState2[1];
      var _React_useState3 = _slicedToArray(_react.default.useState(0), 2), selectedIndex = _React_useState3[0], setSelectedIndex = _React_useState3[1];
      var _React_useState4 = _slicedToArray(_react.default.useState(false), 2), controlledScrolling = _React_useState4[0], setControlledScrolling = _React_useState4[1];
      var prevActiveIndex = (0, _selectContext.usePrevious)(activeIndex);
      var _useFloating = (0, _react1.useFloating)({ placement: "bottom-start", open, onOpenChange: setOpen, whileElementsMounted: _react1.autoUpdate, middleware: [(0, _react1.offset)(5), (0, _react1.flip)({ padding: 10 }), (0, _react1.size)({ apply: function apply(param) {
        var rects = param.rects, elements = param.elements;
        var _elements_floating, _rects_reference;
        Object.assign(elements === null || elements === void 0 ? void 0 : (_elements_floating = elements.floating) === null || _elements_floating === void 0 ? void 0 : _elements_floating.style, { width: "".concat(rects === null || rects === void 0 ? void 0 : (_rects_reference = rects.reference) === null || _rects_reference === void 0 ? void 0 : _rects_reference.width, "px"), zIndex: 99 });
      }, padding: 20 })] }), x = _useFloating.x, y = _useFloating.y, strategy = _useFloating.strategy, refs = _useFloating.refs, context = _useFloating.context;
      _react.default.useEffect(function() {
        setSelectedIndex(Math.max(0, listContentRef.current.indexOf(value) + 1));
      }, [value]);
      var floatingRef = refs.floating;
      var _useInteractions = (0, _react1.useInteractions)([(0, _react1.useClick)(context), (0, _react1.useRole)(context, { role: "listbox" }), (0, _react1.useDismiss)(context, _objectSpread({}, dismiss)), (0, _react1.useListNavigation)(context, { listRef: listItemsRef, activeIndex, selectedIndex, onNavigate: setActiveIndex, loop: true }), (0, _react1.useTypeahead)(context, { listRef: listContentRef, activeIndex, selectedIndex, onMatch: open ? setActiveIndex : setSelectedIndex })]), getReferenceProps = _useInteractions.getReferenceProps, getFloatingProps = _useInteractions.getFloatingProps, getItemProps = _useInteractions.getItemProps;
      (0, _framerMotion.useIsomorphicLayoutEffect)(function() {
        var floating = floatingRef.current;
        if (open && controlledScrolling && floating) {
          var item = activeIndex != null ? listItemsRef.current[activeIndex] : selectedIndex != null ? listItemsRef.current[selectedIndex] : null;
          if (item && prevActiveIndex != null) {
            var _listItemsRef_current_prevActiveIndex;
            var _listItemsRef_current_prevActiveIndex_offsetHeight;
            var itemHeight = (_listItemsRef_current_prevActiveIndex_offsetHeight = (_listItemsRef_current_prevActiveIndex = listItemsRef.current[prevActiveIndex]) === null || _listItemsRef_current_prevActiveIndex === void 0 ? void 0 : _listItemsRef_current_prevActiveIndex.offsetHeight) !== null && _listItemsRef_current_prevActiveIndex_offsetHeight !== void 0 ? _listItemsRef_current_prevActiveIndex_offsetHeight : 0;
            var floatingHeight = floating.offsetHeight;
            var top = item.offsetTop;
            var bottom = top + itemHeight;
            if (top < floating.scrollTop) {
              floating.scrollTop -= floating.scrollTop - top + 5;
            } else if (bottom > floatingHeight + floating.scrollTop) {
              floating.scrollTop += bottom - floatingHeight - floating.scrollTop + 5;
            }
          }
        }
      }, [open, controlledScrolling, prevActiveIndex, activeIndex]);
      var contextValue = _react.default.useMemo(function() {
        return { selectedIndex, setSelectedIndex, listRef: listItemsRef, setOpen, onChange: onChange || function() {
        }, activeIndex, setActiveIndex, getItemProps, dataRef: context.dataRef };
      }, [selectedIndex, onChange, activeIndex, getItemProps, context.dataRef]);
      _react.default.useEffect(function() {
        if (open) {
          setState("open");
        } else if (!open && selectedIndex || !open && value) {
          setState("withValue");
        } else {
          setState("close");
        }
      }, [open, value, selectedIndex, selected]);
      var selectVariant = variants[(0, _findMatch.default)(valid.variants, variant, "outlined")];
      var selectSize = selectVariant.sizes[(0, _findMatch.default)(valid.sizes, size, "md")];
      var selectError = selectVariant.error.select;
      var selectSuccess = selectVariant.success.select;
      var selectColor = selectVariant.colors.select[(0, _findMatch.default)(valid.colors, color, "gray")];
      var labelError = selectVariant.error.label;
      var labelSuccess = selectVariant.success.label;
      var labelColor = selectVariant.colors.label[(0, _findMatch.default)(valid.colors, color, "gray")];
      var stateClasses = selectVariant.states[state];
      var containerClasses = (0, _classnames.default)((0, _objectsToString.default)(base.container), (0, _objectsToString.default)(selectSize.container), containerProps === null || containerProps === void 0 ? void 0 : containerProps.className);
      var selectClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.select), (0, _objectsToString.default)(selectVariant.base.select), (0, _objectsToString.default)(stateClasses.select), (0, _objectsToString.default)(selectSize.select), _defineProperty({}, (0, _objectsToString.default)(selectColor[state]), !error && !success), _defineProperty({}, (0, _objectsToString.default)(selectError.initial), error), _defineProperty({}, (0, _objectsToString.default)(selectError.states[state]), error), _defineProperty({}, (0, _objectsToString.default)(selectSuccess.initial), success), _defineProperty({}, (0, _objectsToString.default)(selectSuccess.states[state]), success)), className);
      var _labelProps_className;
      var labelClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.label), (0, _objectsToString.default)(selectVariant.base.label), (0, _objectsToString.default)(stateClasses.label), (0, _objectsToString.default)(selectSize.label.initial), (0, _objectsToString.default)(selectSize.label.states[state]), _defineProperty({}, (0, _objectsToString.default)(labelColor[state]), !error && !success), _defineProperty({}, (0, _objectsToString.default)(labelError.initial), error), _defineProperty({}, (0, _objectsToString.default)(labelError.states[state]), error), _defineProperty({}, (0, _objectsToString.default)(labelSuccess.initial), success), _defineProperty({}, (0, _objectsToString.default)(labelSuccess.states[state]), success)), (_labelProps_className = labelProps.className) !== null && _labelProps_className !== void 0 ? _labelProps_className : "");
      var arrowClasses = (0, _classnames.default)((0, _objectsToString.default)(base.arrow.initial), _defineProperty({}, (0, _objectsToString.default)(base.arrow.active), open));
      var _menuProps_className;
      var menuClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.menu)), (_menuProps_className = menuProps.className) !== null && _menuProps_className !== void 0 ? _menuProps_className : "");
      var buttonContentClasses = (0, _classnames.default)("absolute top-2/4 -translate-y-2/4", variant === "outlined" ? "left-3 pt-0.5" : "left-0 pt-3");
      var animation = { unmount: { opacity: 0, transformOrigin: "top", transform: "scale(0.95)", transition: { duration: 0.2, times: [0.4, 0, 0.2, 1] } }, mount: { opacity: 1, transformOrigin: "top", transform: "scale(1)", transition: { duration: 0.2, times: [0.4, 0, 0.2, 1] } } };
      var appliedAnimation = (0, _deepmerge.default)(animation, animate);
      var NewAnimatePresence = _framerMotion.AnimatePresence;
      _react.default.useEffect(function() {
        if (value && !onChange) {
          console.error("Warning: You provided a `value` prop to a select component without an `onChange` handler. This will render a read-only select. If the field should be mutable use `onChange` handler with `value` together.");
        }
      }, [value, onChange]);
      var selectMenu = _react.default.createElement(_react1.FloatingFocusManager, { context, modal: false }, _react.default.createElement(_framerMotion.m.ul, _extends({}, getFloatingProps(_objectSpreadProps(_objectSpread({}, menuProps), { ref: refs.setFloating, role: "listbox", className: menuClasses, style: { position: strategy, top: y !== null && y !== void 0 ? y : 0, left: x !== null && x !== void 0 ? x : 0, overflow: "auto" }, onPointerEnter: function onPointerEnter(e) {
        var onPointerEnter2 = menuProps === null || menuProps === void 0 ? void 0 : menuProps.onPointerEnter;
        if (typeof onPointerEnter2 === "function") {
          onPointerEnter2(e);
          setControlledScrolling(false);
        }
        setControlledScrolling(false);
      }, onPointerMove: function onPointerMove(e) {
        var onPointerMove2 = menuProps === null || menuProps === void 0 ? void 0 : menuProps.onPointerMove;
        if (typeof onPointerMove2 === "function") {
          onPointerMove2(e);
          setControlledScrolling(false);
        }
        setControlledScrolling(false);
      }, onKeyDown: function onKeyDown(e) {
        var onKeyDown2 = menuProps === null || menuProps === void 0 ? void 0 : menuProps.onKeyDown;
        if (typeof onKeyDown2 === "function") {
          onKeyDown2(e);
          setControlledScrolling(true);
        }
        setControlledScrolling(true);
      } })), { initial: "unmount", exit: "unmount", animate: open ? "mount" : "unmount", variants: appliedAnimation }), _react.default.Children.map(children, function(child, index) {
        var _child_props;
        return _react.default.isValidElement(child) && _react.default.cloneElement(child, _objectSpreadProps(_objectSpread({}, child.props), { index: ((_child_props = child.props) === null || _child_props === void 0 ? void 0 : _child_props.index) || index + 1, id: "material-tailwind-select-".concat(index) }));
      })));
      return _react.default.createElement(_selectContext.SelectContextProvider, { value: contextValue }, _react.default.createElement("div", _extends({}, containerProps, { ref, className: containerClasses }), _react.default.createElement("button", _extends({ type: "button" }, getReferenceProps(_objectSpreadProps(_objectSpread({}, rest), { ref: refs.setReference, className: selectClasses, disabled, name }))), typeof selected === "function" ? _react.default.createElement("span", { className: buttonContentClasses }, selected(children[selectedIndex - 1], selectedIndex - 1)) : value && !onChange ? _react.default.createElement("span", { className: buttonContentClasses }, value) : _react.default.createElement("span", _extends({}, (_children_ = children[selectedIndex - 1]) === null || _children_ === void 0 ? void 0 : _children_.props, { className: buttonContentClasses })), _react.default.createElement("div", { className: arrowClasses }, arrow !== null && arrow !== void 0 ? arrow : _react.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor" }, _react.default.createElement("path", { fillRule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", clipRule: "evenodd" })))), _react.default.createElement("label", _extends({}, labelProps, { className: labelClasses }), label), _react.default.createElement(_framerMotion.LazyMotion, { features: _framerMotion.domAnimation }, _react.default.createElement(NewAnimatePresence, null, open && _react.default.createElement(_react.default.Fragment, null, lockScroll ? _react.default.createElement(_react1.FloatingOverlay, { lockScroll: true }, selectMenu) : selectMenu)))));
    });
    Select.propTypes = { variant: _propTypes.default.oneOf(_select.propTypesVariant), color: _propTypes.default.oneOf(_select.propTypesColor), size: _propTypes.default.oneOf(_select.propTypesSize), label: _select.propTypesLabel, error: _select.propTypesError, success: _select.propTypesSuccess, arrow: _select.propTypesArrow, value: _select.propTypesValue, onChange: _select.propTypesOnChange, selected: _select.propTypesSelected, offset: _select.propTypesOffset, dismiss: _select.propTypesDismiss, animate: _select.propTypesAnimate, lockScroll: _select.propTypesLockScroll, labelProps: _select.propTypesLabelProps, menuProps: _select.propTypesMenuProps, className: _select.propTypesClassName, disabled: _select.propTypesDisabled, name: _select.propTypesName, children: _select.propTypesChildren, containerProps: _select.propTypesContainerProps };
    Select.displayName = "MaterialTailwind.Select";
    var _default = Object.assign(Select, { Option: _selectOption.SelectOption });
  }
});

// node_modules/@material-tailwind/react/components/Switch/index.js
var require_Switch = __commonJS({
  "node_modules/@material-tailwind/react/components/Switch/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Switch: function() {
      return Switch;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _materialRippleEffects = _interopRequireDefault(require_material_ripple_effects());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _checkbox = require_checkbox();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Switch = _react.default.forwardRef(function(_param, ref) {
      var color = _param.color, label = _param.label, ripple = _param.ripple, className = _param.className, disabled = _param.disabled, containerProps = _param.containerProps, circleProps = _param.circleProps, labelProps = _param.labelProps, inputRef = _param.inputRef, rest = _objectWithoutProperties(_param, ["color", "label", "ripple", "className", "disabled", "containerProps", "circleProps", "labelProps", "inputRef"]);
      var _useTheme = (0, _theme.useTheme)(), toggle = _useTheme.switch;
      var defaultProps = toggle.defaultProps, valid = toggle.valid, styles = toggle.styles;
      var base = styles.base, colors = styles.colors;
      var switchId = _react.default.useId();
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      ripple = ripple !== null && ripple !== void 0 ? ripple : defaultProps.ripple;
      disabled = disabled !== null && disabled !== void 0 ? disabled : defaultProps.disabled;
      containerProps = containerProps !== null && containerProps !== void 0 ? containerProps : defaultProps.containerProps;
      labelProps = labelProps !== null && labelProps !== void 0 ? labelProps : defaultProps.labelProps;
      circleProps = circleProps !== null && circleProps !== void 0 ? circleProps : defaultProps.circleProps;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var rippleEffect = ripple !== void 0 && new _materialRippleEffects.default();
      var rootClasses = (0, _classnames.default)((0, _objectsToString.default)(base.root), _defineProperty({}, (0, _objectsToString.default)(base.disabled), disabled));
      var containerClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.container)), containerProps === null || containerProps === void 0 ? void 0 : containerProps.className);
      var inputClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.input), (0, _objectsToString.default)(colors[(0, _findMatch.default)(valid.colors, color, "gray")])), className);
      var circleClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.circle), colors[(0, _findMatch.default)(valid.colors, color, "gray")].circle, colors[(0, _findMatch.default)(valid.colors, color, "gray")].before), circleProps === null || circleProps === void 0 ? void 0 : circleProps.className);
      var rippleClasses = (0, _classnames.default)((0, _objectsToString.default)(base.ripple));
      var labelClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.label)), labelProps === null || labelProps === void 0 ? void 0 : labelProps.className);
      return _react.default.createElement("div", { ref, className: rootClasses }, _react.default.createElement("div", _extends({}, containerProps, { className: containerClasses }), _react.default.createElement("input", _extends({}, rest, { ref: inputRef, type: "checkbox", disabled, id: rest.id || switchId, className: inputClasses })), _react.default.createElement("label", _extends({}, circleProps, { htmlFor: rest.id || switchId, className: circleClasses }), ripple && _react.default.createElement("div", { className: rippleClasses, onMouseDown: function(e) {
        var onMouseDown = containerProps === null || containerProps === void 0 ? void 0 : containerProps.onMouseDown;
        if (ripple) {
          rippleEffect.create(e, "dark");
        }
        return typeof onMouseDown === "function" && onMouseDown(e);
      } }))), label && _react.default.createElement("label", _extends({}, labelProps, { htmlFor: rest.id || switchId, className: labelClasses }), label));
    });
    Switch.propTypes = { color: _propTypes.default.oneOf(_checkbox.propTypesColor), label: _checkbox.propTypesLabel, ripple: _checkbox.propTypesRipple, className: _checkbox.propTypesClassName, disabled: _checkbox.propTypesDisabled, containerProps: _checkbox.propTypesObject, labelProps: _checkbox.propTypesObject, circleProps: _checkbox.propTypesObject };
    Switch.displayName = "MaterialTailwind.Switch";
    var _default = Switch;
  }
});

// node_modules/@material-tailwind/react/types/components/tabs.js
var require_tabs = __commonJS({
  "node_modules/@material-tailwind/react/types/components/tabs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { propTypesId: function() {
      return propTypesId;
    }, propTypesValue: function() {
      return propTypesValue;
    }, propTypesAnimate: function() {
      return propTypesAnimate;
    }, propTypesDisabled: function() {
      return propTypesDisabled;
    }, propTypesClassName: function() {
      return propTypesClassName;
    }, propTypesOrientation: function() {
      return propTypesOrientation;
    }, propTypesIndicator: function() {
      return propTypesIndicator;
    }, propTypesChildren: function() {
      return propTypesChildren;
    } });
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _generic = require_generic();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var propTypesId = _propTypes.default.string;
    var propTypesValue = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]).isRequired;
    var propTypesAnimate = _generic.propTypesAnimation;
    var propTypesDisabled = _propTypes.default.bool;
    var propTypesClassName = _propTypes.default.string;
    var propTypesOrientation = _propTypes.default.oneOf(["horizontal", "vertical"]);
    var propTypesIndicator = _propTypes.default.instanceOf(Object);
    var propTypesChildren = _propTypes.default.node.isRequired;
  }
});

// node_modules/@material-tailwind/react/components/Tabs/TabsContext.js
var require_TabsContext = __commonJS({
  "node_modules/@material-tailwind/react/components/Tabs/TabsContext.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { TabsContext: function() {
      return TabsContext;
    }, useTabs: function() {
      return useTabs;
    }, TabsContextProvider: function() {
      return TabsContextProvider;
    }, setId: function() {
      return setId;
    }, setActive: function() {
      return setActive;
    }, setAnimation: function() {
      return setAnimation;
    }, setIndicator: function() {
      return setIndicator;
    }, setIsInitial: function() {
      return setIsInitial;
    }, setOrientation: function() {
      return setOrientation;
    } });
    var _react = _interopRequireDefault(require_react());
    var _tabs = require_tabs();
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys2 = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys2.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpreadProps(target, source) {
      source = source != null ? source : {};
      if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    function reducer(state, action) {
      switch (action.type) {
        case "SET_ID": {
          return _objectSpreadProps(_objectSpread({}, state), { id: action.value });
        }
        case "SET_ACTIVE": {
          return _objectSpreadProps(_objectSpread({}, state), { active: action.value });
        }
        case "SET_ANIMATION": {
          return _objectSpreadProps(_objectSpread({}, state), { appliedAnimation: action.value });
        }
        case "SET_INDICATOR": {
          return _objectSpreadProps(_objectSpread({}, state), { indicatorProps: action.value });
        }
        case "SET_IS_INITIAL": {
          return _objectSpreadProps(_objectSpread({}, state), { isInitial: action.value });
        }
        case "SET_ORIENTATION": {
          return _objectSpreadProps(_objectSpread({}, state), { orientation: action.value });
        }
        default: {
          throw new Error("Unhandled action type: ".concat(action.type));
        }
      }
    }
    var TabsContext = _react.default.createContext(null);
    TabsContext.displayName = "MaterialTailwind.TabsContext";
    function useTabs() {
      var context = _react.default.useContext(TabsContext);
      if (!context) {
        throw new Error("useTabs() must be used within a Tabs. It happens when you use TabsHeader, TabsBody, Tab or TabPanel outside the Tabs component.");
      }
      return context;
    }
    var TabsContextProvider = function(param) {
      var id = param.id, value = param.value, orientation = param.orientation, children = param.children;
      var initialState = _react.default.useMemo(function() {
        return { id: id !== null && id !== void 0 ? id : "indicator", active: value, orientation, isInitial: true, appliedAnimation: { initial: {}, unmount: {}, mount: {} }, indicatorProps: void 0 };
      }, [id, value, orientation]);
      var _React_useReducer = _slicedToArray(_react.default.useReducer(reducer, initialState), 2), state = _React_useReducer[0], dispatch = _React_useReducer[1];
      var contextValue = _react.default.useMemo(function() {
        return { state, dispatch };
      }, [state]);
      return _react.default.createElement(TabsContext.Provider, { value: contextValue }, children);
    };
    var setId = function(dispatch, value) {
      return dispatch({ type: "SET_ID", value });
    };
    var setActive = function(dispatch, value) {
      return dispatch({ type: "SET_ACTIVE", value });
    };
    var setAnimation = function(dispatch, value) {
      return dispatch({ type: "SET_ANIMATION", value });
    };
    var setIndicator = function(dispatch, value) {
      return dispatch({ type: "SET_INDICATOR", value });
    };
    var setIsInitial = function(dispatch, value) {
      return dispatch({ type: "SET_IS_INITIAL", value });
    };
    var setOrientation = function(dispatch, value) {
      return dispatch({ type: "SET_ORIENTATION", value });
    };
    TabsContextProvider.propTypes = { id: _tabs.propTypesId, value: _tabs.propTypesValue, orientation: _tabs.propTypesOrientation, children: _tabs.propTypesChildren };
    TabsContextProvider.displayName = "MaterialTailwind.TabsContextProvider";
  }
});

// node_modules/@material-tailwind/react/components/Tabs/Tab.js
var require_Tab = __commonJS({
  "node_modules/@material-tailwind/react/components/Tabs/Tab.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Tab: function() {
      return Tab;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _framerMotion = require_cjs2();
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _tabsContext = require_TabsContext();
    var _tabs = require_tabs();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Tab = _react.default.forwardRef(function(_param, ref) {
      var value = _param.value, className = _param.className, activeClassName = _param.activeClassName, disabled = _param.disabled, children = _param.children, rest = _objectWithoutProperties(_param, ["value", "className", "activeClassName", "disabled", "children"]);
      var _useTheme = (0, _theme.useTheme)(), tabTheme = _useTheme.tab;
      var defaultProps = tabTheme.defaultProps, base = tabTheme.styles.base;
      var _useTabs = (0, _tabsContext.useTabs)(), state = _useTabs.state, dispatch = _useTabs.dispatch;
      var id = state.id, active = state.active, indicatorProps = state.indicatorProps;
      disabled = disabled !== null && disabled !== void 0 ? disabled : defaultProps.disabled;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      activeClassName = (0, _tailwindMerge.twMerge)(defaultProps.activeClassName || "", activeClassName);
      var _obj;
      var tabClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.tab.initial), (_obj = {}, _defineProperty(_obj, (0, _objectsToString.default)(base.tab.disabled), disabled), _defineProperty(_obj, activeClassName, active === value), _obj)), className);
      var _indicatorProps_className;
      var indicatorClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.indicator)), (_indicatorProps_className = indicatorProps === null || indicatorProps === void 0 ? void 0 : indicatorProps.className) !== null && _indicatorProps_className !== void 0 ? _indicatorProps_className : "");
      return _react.default.createElement("li", _extends({}, rest, { ref, role: "tab", className: tabClasses, onClick: function(e) {
        var onClick = rest === null || rest === void 0 ? void 0 : rest.onClick;
        if (typeof onClick === "function") {
          (0, _tabsContext.setActive)(dispatch, value);
          (0, _tabsContext.setIsInitial)(dispatch, false);
          onClick(e);
        }
        (0, _tabsContext.setIsInitial)(dispatch, false);
        (0, _tabsContext.setActive)(dispatch, value);
      }, "data-value": value }), _react.default.createElement("div", { className: "z-20 text-inherit" }, children), active === value && _react.default.createElement(_framerMotion.motion.div, _extends({}, indicatorProps, { transition: { duration: 0.5 }, className: indicatorClasses, layoutId: id })));
    });
    Tab.propTypes = { value: _tabs.propTypesValue, className: _tabs.propTypesClassName, disabled: _tabs.propTypesDisabled, children: _tabs.propTypesChildren };
    Tab.displayName = "MaterialTailwind.Tab";
    var _default = Tab;
  }
});

// node_modules/@material-tailwind/react/components/Tabs/TabsBody.js
var require_TabsBody = __commonJS({
  "node_modules/@material-tailwind/react/components/Tabs/TabsBody.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { TabsBody: function() {
      return TabsBody;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _framerMotion = require_cjs2();
    var _deepmerge = _interopRequireDefault(require_cjs());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _tabsContext = require_TabsContext();
    var _tabs = require_tabs();
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var TabsBody = _react.default.forwardRef(function(_param, ref) {
      var animate = _param.animate, className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["animate", "className", "children"]);
      var tabsBody = (0, _theme.useTheme)().tabsBody;
      var defaultProps = tabsBody.defaultProps, base = tabsBody.styles.base;
      var dispatch = (0, _tabsContext.useTabs)().dispatch;
      animate = animate !== null && animate !== void 0 ? animate : defaultProps.animate;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var tabsBodyClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base)), className);
      var mainAnimation = _react.default.useMemo(function() {
        return { initial: { opacity: 0, position: "absolute", top: "0", left: "0", zIndex: 1, transition: { duration: 0 } }, unmount: { opacity: 0, position: "absolute", top: "0", left: "0", zIndex: 1, transition: { duration: 0.5, times: [0.4, 0, 0.2, 1] } }, mount: { opacity: 1, position: "relative", zIndex: 2, transition: { duration: 0.5, times: [0.4, 0, 0.2, 1] } } };
      }, []);
      var appliedAnimation = _react.default.useMemo(function() {
        return (0, _deepmerge.default)(mainAnimation, animate);
      }, [animate, mainAnimation]);
      (0, _framerMotion.useIsomorphicLayoutEffect)(function() {
        (0, _tabsContext.setAnimation)(dispatch, appliedAnimation);
      }, [appliedAnimation, dispatch]);
      return _react.default.createElement("div", _extends({}, rest, { ref, className: tabsBodyClasses }), children);
    });
    TabsBody.propTypes = { animate: _tabs.propTypesAnimate, className: _tabs.propTypesClassName, children: _tabs.propTypesChildren };
    TabsBody.displayName = "MaterialTailwind.TabsBody";
    var _default = TabsBody;
  }
});

// node_modules/@material-tailwind/react/components/Tabs/TabsHeader.js
var require_TabsHeader = __commonJS({
  "node_modules/@material-tailwind/react/components/Tabs/TabsHeader.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { TabsHeader: function() {
      return TabsHeader;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _tabsContext = require_TabsContext();
    var _tabs = require_tabs();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var TabsHeader = _react.default.forwardRef(function(_param, ref) {
      var indicatorProps = _param.indicatorProps, className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["indicatorProps", "className", "children"]);
      var tabsHeader = (0, _theme.useTheme)().tabsHeader;
      var defaultProps = tabsHeader.defaultProps, styles = tabsHeader.styles;
      var _useTabs = (0, _tabsContext.useTabs)(), state = _useTabs.state, dispatch = _useTabs.dispatch;
      var orientation = state.orientation;
      _react.default.useEffect(function() {
        (0, _tabsContext.setIndicator)(dispatch, indicatorProps);
      }, [dispatch, indicatorProps]);
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var tabsHeaderClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(styles.base), _defineProperty({}, styles[orientation] && (0, _objectsToString.default)(styles[orientation]), orientation)), className);
      return _react.default.createElement("nav", null, _react.default.createElement("ul", _extends({}, rest, { ref, role: "tablist", className: tabsHeaderClasses }), children));
    });
    TabsHeader.propTypes = { indicatorProps: _tabs.propTypesIndicator, className: _tabs.propTypesClassName, children: _tabs.propTypesChildren };
    TabsHeader.displayName = "MaterialTailwind.TabsHeader";
    var _default = TabsHeader;
  }
});

// node_modules/@material-tailwind/react/components/Tabs/TabPanel.js
var require_TabPanel = __commonJS({
  "node_modules/@material-tailwind/react/components/Tabs/TabPanel.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { TabPanel: function() {
      return TabPanel;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _framerMotion = require_cjs2();
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _tabsContext = require_TabsContext();
    var _tabs = require_tabs();
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var TabPanel = _react.default.forwardRef(function(_param, ref) {
      var value = _param.value, className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["value", "className", "children"]);
      var tabPanel = (0, _theme.useTheme)().tabPanel;
      var defaultProps = tabPanel.defaultProps, base = tabPanel.styles.base;
      var state = (0, _tabsContext.useTabs)().state;
      var active = state.active, appliedAnimation = state.appliedAnimation, isInitial = state.isInitial;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var tabPanelClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base)), className);
      var NewAnimatePresence = _framerMotion.AnimatePresence;
      return _react.default.createElement(_framerMotion.LazyMotion, { features: _framerMotion.domAnimation }, _react.default.createElement(NewAnimatePresence, { exitBeforeEnter: true }, _react.default.createElement(_framerMotion.m.div, _extends({}, rest, { ref, role: "tabpanel", className: tabPanelClasses, initial: "unmount", exit: "unmount", animate: active === value ? "mount" : isInitial ? "initial" : "unmount", variants: appliedAnimation, "data-value": value }), children)));
    });
    TabPanel.propTypes = { value: _tabs.propTypesValue, className: _tabs.propTypesClassName, children: _tabs.propTypesChildren };
    TabPanel.displayName = "MaterialTailwind.TabPanel";
    var _default = TabPanel;
  }
});

// node_modules/@material-tailwind/react/components/Tabs/index.js
var require_Tabs = __commonJS({
  "node_modules/@material-tailwind/react/components/Tabs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Tabs: function() {
      return Tabs;
    }, Tab: function() {
      return _tab.Tab;
    }, TabsBody: function() {
      return _tabsBody.TabsBody;
    }, TabsHeader: function() {
      return _tabsHeader.TabsHeader;
    }, TabPanel: function() {
      return _tabPanel.TabPanel;
    }, useTabs: function() {
      return _tabsContext.useTabs;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _tabsContext = require_TabsContext();
    var _tab = require_Tab();
    var _tabsBody = require_TabsBody();
    var _tabsHeader = require_TabsHeader();
    var _tabPanel = require_TabPanel();
    var _tabs = require_tabs();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Tabs = _react.default.forwardRef(function(_param, ref) {
      var value = _param.value, className = _param.className, orientation = _param.orientation, children = _param.children, rest = _objectWithoutProperties(_param, ["value", "className", "orientation", "children"]);
      var tabs = (0, _theme.useTheme)().tabs;
      var defaultProps = tabs.defaultProps, styles = tabs.styles;
      var tabsId = _react.default.useId();
      orientation = orientation !== null && orientation !== void 0 ? orientation : defaultProps.orientation;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var tabsClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(styles.base), _defineProperty({}, styles[orientation] && (0, _objectsToString.default)(styles[orientation]), orientation)), className);
      return _react.default.createElement(_tabsContext.TabsContextProvider, { id: tabsId, value, orientation }, _react.default.createElement("div", _extends({}, rest, { ref, className: tabsClasses }), children));
    });
    Tabs.propTypes = { id: _tabs.propTypesId, value: _tabs.propTypesValue, className: _tabs.propTypesClassName, orientation: _tabs.propTypesOrientation, children: _tabs.propTypesChildren };
    Tabs.displayName = "MaterialTailwind.Tabs";
    var _default = Object.assign(Tabs, { Tab: _tab.Tab, Body: _tabsBody.TabsBody, Header: _tabsHeader.TabsHeader, Panel: _tabPanel.TabPanel });
  }
});

// node_modules/@material-tailwind/react/components/Textarea/index.js
var require_Textarea = __commonJS({
  "node_modules/@material-tailwind/react/components/Textarea/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Textarea: function() {
      return Textarea;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _classnames = _interopRequireDefault(require_classnames());
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _input = require_input();
    var _tailwindMerge = require_dist();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Textarea = _react.default.forwardRef(function(_param, ref) {
      var variant = _param.variant, color = _param.color, size = _param.size, label = _param.label, error = _param.error, success = _param.success, resize = _param.resize, labelProps = _param.labelProps, containerProps = _param.containerProps, shrink = _param.shrink, className = _param.className, rest = _objectWithoutProperties(_param, ["variant", "color", "size", "label", "error", "success", "resize", "labelProps", "containerProps", "shrink", "className"]);
      var textarea = (0, _theme.useTheme)().textarea;
      var defaultProps = textarea.defaultProps, valid = textarea.valid, styles = textarea.styles;
      var base = styles.base, variants = styles.variants;
      variant = variant !== null && variant !== void 0 ? variant : defaultProps.variant;
      size = size !== null && size !== void 0 ? size : defaultProps.size;
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      label = label !== null && label !== void 0 ? label : defaultProps.label;
      labelProps = labelProps !== null && labelProps !== void 0 ? labelProps : defaultProps.labelProps;
      containerProps = containerProps !== null && containerProps !== void 0 ? containerProps : defaultProps.containerProps;
      shrink = shrink !== null && shrink !== void 0 ? shrink : defaultProps.shrink;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var textareaVariant = variants[(0, _findMatch.default)(valid.variants, variant, "outlined")];
      var textareaError = (0, _objectsToString.default)(textareaVariant.error.textarea);
      var textareaSuccess = (0, _objectsToString.default)(textareaVariant.success.textarea);
      var textareaShrink = (0, _objectsToString.default)(textareaVariant.shrink.textarea);
      var textareaColor = (0, _objectsToString.default)(textareaVariant.colors.textarea[(0, _findMatch.default)(valid.colors, color, "gray")]);
      var labelError = (0, _objectsToString.default)(textareaVariant.error.label);
      var labelSuccess = (0, _objectsToString.default)(textareaVariant.success.label);
      var labelShrink = (0, _objectsToString.default)(textareaVariant.shrink.label);
      var labelColor = (0, _objectsToString.default)(textareaVariant.colors.label[(0, _findMatch.default)(valid.colors, color, "gray")]);
      var containerClasses = (0, _classnames.default)((0, _objectsToString.default)(base.container), containerProps === null || containerProps === void 0 ? void 0 : containerProps.className);
      var textareaClasses = (0, _classnames.default)((0, _objectsToString.default)(base.textarea), (0, _objectsToString.default)(textareaVariant.base.textarea), (0, _objectsToString.default)(textareaVariant.sizes[(0, _findMatch.default)(valid.sizes, size, "md")].textarea), _defineProperty({}, textareaColor, !error && !success), _defineProperty({}, textareaError, error), _defineProperty({}, textareaSuccess, success), _defineProperty({}, textareaShrink, shrink), !resize ? "!resize-none" : "", className);
      var labelClasses = (0, _classnames.default)((0, _objectsToString.default)(base.label), (0, _objectsToString.default)(textareaVariant.base.label), (0, _objectsToString.default)(textareaVariant.sizes[(0, _findMatch.default)(valid.sizes, size, "md")].label), _defineProperty({}, labelColor, !error && !success), _defineProperty({}, labelError, error), _defineProperty({}, labelSuccess, success), _defineProperty({}, labelShrink, shrink), labelProps === null || labelProps === void 0 ? void 0 : labelProps.className);
      var asteriskClasses = (0, _classnames.default)((0, _objectsToString.default)(base.asterisk));
      return _react.default.createElement("div", { ref, className: containerClasses }, _react.default.createElement("textarea", _extends({}, rest, { className: textareaClasses, placeholder: (rest === null || rest === void 0 ? void 0 : rest.placeholder) || " " })), _react.default.createElement("label", { className: labelClasses }, label, " ", rest.required ? _react.default.createElement("span", { className: asteriskClasses }, "*") : ""));
    });
    Textarea.propTypes = { variant: _propTypes.default.oneOf(_input.propTypesVariant), size: _propTypes.default.oneOf(_input.propTypesSize), color: _propTypes.default.oneOf(_input.propTypesColor), label: _input.propTypesLabel, error: _input.propTypesError, success: _input.propTypesSuccess, resize: _input.propTypesResize, labelProps: _input.propTypesLabelProps, containerProps: _input.propTypesContainerProps, shrink: _input.propTypesShrink, className: _input.propTypesClassName };
    Textarea.displayName = "MaterialTailwind.Textarea";
    var _default = Textarea;
  }
});

// node_modules/@material-tailwind/react/components/Tooltip/index.js
var require_Tooltip = __commonJS({
  "node_modules/@material-tailwind/react/components/Tooltip/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Tooltip: function() {
      return Tooltip;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _react1 = (init_floating_ui_react_esm(), __toCommonJS(floating_ui_react_esm_exports));
    var _framerMotion = require_cjs2();
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _deepmerge = _interopRequireDefault(require_cjs());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _popover = require_popover();
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys2 = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys2.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpreadProps(target, source) {
      source = source != null ? source : {};
      if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    var Tooltip = _react.default.forwardRef(function(_param, ref) {
      var open = _param.open, handler = _param.handler, content = _param.content, interactive = _param.interactive, placement = _param.placement, offset = _param.offset, dismiss = _param.dismiss, animate = _param.animate, className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["open", "handler", "content", "interactive", "placement", "offset", "dismiss", "animate", "className", "children"]);
      var tooltip = (0, _theme.useTheme)().tooltip;
      var defaultProps = tooltip.defaultProps, base = tooltip.styles.base;
      var _React_useState = _slicedToArray(_react.default.useState(false), 2), internalOpen = _React_useState[0], setInternalOpen = _React_useState[1];
      open = open !== null && open !== void 0 ? open : internalOpen;
      handler = handler !== null && handler !== void 0 ? handler : setInternalOpen;
      interactive = interactive !== null && interactive !== void 0 ? interactive : defaultProps.interactive;
      placement = placement !== null && placement !== void 0 ? placement : defaultProps.placement;
      offset = offset !== null && offset !== void 0 ? offset : defaultProps.offset;
      dismiss = dismiss !== null && dismiss !== void 0 ? dismiss : defaultProps.dismiss;
      animate = animate !== null && animate !== void 0 ? animate : defaultProps.animate;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var tooltipClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base)), className);
      var animation = { unmount: { opacity: 0 }, mount: { opacity: 1 } };
      var appliedAnimation = (0, _deepmerge.default)(animation, animate);
      var _useFloating = (0, _react1.useFloating)({ open, onOpenChange: handler, middleware: [(0, _react1.offset)(offset), (0, _react1.flip)(), (0, _react1.shift)()], placement }), x = _useFloating.x, y = _useFloating.y, reference = _useFloating.reference, floating = _useFloating.floating, strategy = _useFloating.strategy, refs = _useFloating.refs, update = _useFloating.update, context = _useFloating.context;
      var _useInteractions = (0, _react1.useInteractions)([(0, _react1.useClick)(context, { enabled: interactive }), (0, _react1.useFocus)(context), (0, _react1.useHover)(context), (0, _react1.useRole)(context, { role: "tooltip" }), (0, _react1.useDismiss)(context, dismiss)]), getReferenceProps = _useInteractions.getReferenceProps, getFloatingProps = _useInteractions.getFloatingProps;
      _react.default.useEffect(function() {
        if (refs.reference.current && refs.floating.current && open) {
          return (0, _react1.autoUpdate)(refs.reference.current, refs.floating.current, update);
        }
      }, [open, update, refs.reference, refs.floating]);
      var mergedRef = (0, _react1.useMergeRefs)([ref, floating]);
      var childMergedRef = (0, _react1.useMergeRefs)([ref, reference]);
      var NewAnimatePresence = _framerMotion.AnimatePresence;
      return _react.default.createElement(_react.default.Fragment, null, typeof children === "string" ? _react.default.createElement("span", _extends({}, getReferenceProps({ ref: childMergedRef })), children) : _react.default.cloneElement(children, _objectSpread({}, getReferenceProps(_objectSpreadProps(_objectSpread({}, children === null || children === void 0 ? void 0 : children.props), { ref: childMergedRef })))), _react.default.createElement(_framerMotion.LazyMotion, { features: _framerMotion.domAnimation }, _react.default.createElement(_react1.FloatingPortal, null, _react.default.createElement(NewAnimatePresence, null, open && _react.default.createElement(_framerMotion.m.div, _extends({}, getFloatingProps(_objectSpreadProps(_objectSpread({}, rest), { ref: mergedRef, className: tooltipClasses, style: { position: strategy, top: y !== null && y !== void 0 ? y : "", left: x !== null && x !== void 0 ? x : "" } })), { initial: "unmount", exit: "unmount", animate: open ? "mount" : "unmount", variants: appliedAnimation }), content)))));
    });
    Tooltip.propTypes = { open: _popover.propTypesOpen, handler: _popover.propTypesHandler, content: _popover.propTypesContent, interactive: _popover.propTypesInteractive, placement: _propTypes.default.oneOf(_popover.propTypesPlacement), offset: _popover.propTypesOffset, dismiss: _popover.propTypesDismiss, animate: _popover.propTypesAnimate, className: _popover.propTypesClassName, children: _popover.propTypesChildren };
    Tooltip.displayName = "MaterialTailwind.Tooltip";
    var _default = Tooltip;
  }
});

// node_modules/@material-tailwind/react/components/Typography/index.js
var require_Typography = __commonJS({
  "node_modules/@material-tailwind/react/components/Typography/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Typography: function() {
      return Typography;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _typography = require_typography();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys2 = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys2.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpreadProps(target, source) {
      source = source != null ? source : {};
      if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Typography = _react.default.forwardRef(function(_param, ref) {
      var variant = _param.variant, color = _param.color, textGradient = _param.textGradient, as = _param.as, className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["variant", "color", "textGradient", "as", "className", "children"]);
      var typography = (0, _theme.useTheme)().typography;
      var defaultProps = typography.defaultProps, valid = typography.valid, styles = typography.styles;
      var variants = styles.variants, colors = styles.colors, gradient = styles.textGradient;
      variant = variant !== null && variant !== void 0 ? variant : defaultProps.variant;
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      textGradient = textGradient || defaultProps.textGradient;
      as = as !== null && as !== void 0 ? as : void 0;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var typographyVariant = (0, _objectsToString.default)(variants[(0, _findMatch.default)(valid.variants, variant, "paragraph")]);
      var typographyColor = colors[(0, _findMatch.default)(valid.colors, color, "inherit")];
      var gradientTextClasses = (0, _objectsToString.default)(gradient);
      var classes = (0, _tailwindMerge.twMerge)((0, _classnames.default)(typographyVariant, _defineProperty({}, typographyColor.color, !textGradient), _defineProperty({}, gradientTextClasses, textGradient), _defineProperty({}, typographyColor.gradient, textGradient)), className);
      var template;
      switch (variant) {
        case "h1":
          template = _react.default.createElement(as || "h1", _objectSpreadProps(_objectSpread({}, rest), { ref, className: classes }), children);
          break;
        case "h2":
          template = _react.default.createElement(as || "h2", _objectSpreadProps(_objectSpread({}, rest), { ref, className: classes }), children);
          break;
        case "h3":
          template = _react.default.createElement(as || "h3", _objectSpreadProps(_objectSpread({}, rest), { ref, className: classes }), children);
          break;
        case "h4":
          template = _react.default.createElement(as || "h4", _objectSpreadProps(_objectSpread({}, rest), { ref, className: classes }), children);
          break;
        case "h5":
          template = _react.default.createElement(as || "h5", _objectSpreadProps(_objectSpread({}, rest), { ref, className: classes }), children);
          break;
        case "h6":
          template = _react.default.createElement(as || "h6", _objectSpreadProps(_objectSpread({}, rest), { ref, className: classes }), children);
          break;
        case "lead":
          template = _react.default.createElement(as || "p", _objectSpreadProps(_objectSpread({}, rest), { ref, className: classes }), children);
          break;
        case "paragraph":
          template = _react.default.createElement(as || "p", _objectSpreadProps(_objectSpread({}, rest), { ref, className: classes }), children);
          break;
        case "small":
          template = _react.default.createElement(as || "p", _objectSpreadProps(_objectSpread({}, rest), { ref, className: classes }), children);
          break;
        default:
          template = _react.default.createElement(as || "p", _objectSpreadProps(_objectSpread({}, rest), { ref, className: classes }), children);
          break;
      }
      return template;
    });
    Typography.propTypes = { variant: _propTypes.default.oneOf(_typography.propTypesVariant), color: _propTypes.default.oneOf(_typography.propTypesColor), as: _typography.propTypesAs, textGradient: _typography.propTypesTextGradient, className: _typography.propTypesClassName, children: _typography.propTypesChildren };
    Typography.displayName = "MaterialTailwind.Typography";
    var _default = Typography;
  }
});

// node_modules/@material-tailwind/react/types/components/collapse.js
var require_collapse = __commonJS({
  "node_modules/@material-tailwind/react/types/components/collapse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { propTypesClassName: function() {
      return propTypesClassName;
    }, propTypesChildren: function() {
      return propTypesChildren;
    }, propTypesOpen: function() {
      return propTypesOpen;
    }, propTypesAnimate: function() {
      return propTypesAnimate;
    } });
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _generic = require_generic();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var propTypesClassName = _propTypes.default.string;
    var propTypesChildren = _propTypes.default.node.isRequired;
    var propTypesOpen = _propTypes.default.bool.isRequired;
    var propTypesAnimate = _generic.propTypesAnimation;
  }
});

// node_modules/@material-tailwind/react/components/Collapse/index.js
var require_Collapse = __commonJS({
  "node_modules/@material-tailwind/react/components/Collapse/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Collapse: function() {
      return Collapse;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _framerMotion = require_cjs2();
    var _react1 = (init_floating_ui_react_esm(), __toCommonJS(floating_ui_react_esm_exports));
    var _deepmerge = _interopRequireDefault(require_cjs());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _collapse = require_collapse();
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Collapse = _react.default.forwardRef(function(_param, ref) {
      var open = _param.open, animate = _param.animate, className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["open", "animate", "className", "children"]);
      var mobileNavRef = _react.default.useRef(null);
      var collapse = (0, _theme.useTheme)().collapse;
      var styles = collapse.styles;
      var base = styles.base;
      animate = animate !== null && animate !== void 0 ? animate : {};
      className = className !== null && className !== void 0 ? className : "";
      var classes = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base)), className);
      var mainAnimation = { unmount: { height: "0px", transition: { duration: 0.3, times: [0.4, 0, 0.2, 1] } }, mount: { height: "auto", transition: { duration: 0.3, times: [0.4, 0, 0.2, 1] } } };
      var appliedAnimation = (0, _deepmerge.default)(mainAnimation, animate);
      var NewAnimatePresence = _framerMotion.AnimatePresence;
      var mergedRef = (0, _react1.useMergeRefs)([ref, mobileNavRef]);
      return _react.default.createElement(_framerMotion.LazyMotion, { features: _framerMotion.domAnimation }, _react.default.createElement(NewAnimatePresence, null, _react.default.createElement(_framerMotion.m.div, _extends({}, rest, { ref: mergedRef, className: classes, initial: "unmount", exit: "unmount", animate: open ? "mount" : "unmount", variants: appliedAnimation }), children)));
    });
    Collapse.displayName = "MaterialTailwind.Collapse";
    Collapse.propTypes = { open: _collapse.propTypesOpen, animate: _collapse.propTypesAnimate, className: _collapse.propTypesClassName, children: _collapse.propTypesChildren };
    var _default = Collapse;
  }
});

// node_modules/@material-tailwind/react/types/components/list.js
var require_list = __commonJS({
  "node_modules/@material-tailwind/react/types/components/list.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { propTypesClassName: function() {
      return propTypesClassName;
    }, propTypesDisabled: function() {
      return propTypesDisabled;
    }, propTypesSelected: function() {
      return propTypesSelected;
    }, propTypesRipple: function() {
      return propTypesRipple;
    }, propTypesChildren: function() {
      return propTypesChildren;
    } });
    var _propTypes = _interopRequireDefault(require_prop_types());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var propTypesClassName = _propTypes.default.string;
    var propTypesDisabled = _propTypes.default.bool;
    var propTypesSelected = _propTypes.default.bool;
    var propTypesRipple = _propTypes.default.bool;
    var propTypesChildren = _propTypes.default.node.isRequired;
  }
});

// node_modules/@material-tailwind/react/components/List/ListItemPrefix.js
var require_ListItemPrefix = __commonJS({
  "node_modules/@material-tailwind/react/components/List/ListItemPrefix.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { ListItemPrefix: function() {
      return ListItemPrefix;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _theme = require_theme2();
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _list = require_list();
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var ListItemPrefix = _react.default.forwardRef(function(_param, ref) {
      var className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["className", "children"]);
      var list = (0, _theme.useTheme)().list;
      var base = list.styles.base;
      var listItemPrefixClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.itemPrefix)), className);
      return _react.default.createElement("div", _extends({}, rest, { ref, className: listItemPrefixClasses }), children);
    });
    ListItemPrefix.propTypes = { className: _list.propTypesClassName, children: _list.propTypesChildren };
    ListItemPrefix.displayName = "MaterialTailwind.ListItemPrefix";
    var _default = ListItemPrefix;
  }
});

// node_modules/@material-tailwind/react/components/List/ListItemSuffix.js
var require_ListItemSuffix = __commonJS({
  "node_modules/@material-tailwind/react/components/List/ListItemSuffix.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { ListItemSuffix: function() {
      return ListItemSuffix;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _theme = require_theme2();
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _list = require_list();
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var ListItemSuffix = _react.default.forwardRef(function(_param, ref) {
      var className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["className", "children"]);
      var list = (0, _theme.useTheme)().list;
      var base = list.styles.base;
      var listItemSuffixClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.itemSuffix)), className);
      return _react.default.createElement("div", _extends({}, rest, { ref, className: listItemSuffixClasses }), children);
    });
    ListItemSuffix.propTypes = { className: _list.propTypesClassName, children: _list.propTypesChildren };
    ListItemSuffix.displayName = "MaterialTailwind.ListItemSuffix";
    var _default = ListItemSuffix;
  }
});

// node_modules/@material-tailwind/react/components/List/ListItem.js
var require_ListItem = __commonJS({
  "node_modules/@material-tailwind/react/components/List/ListItem.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { ListItem: function() {
      return ListItem;
    }, ListItemPrefix: function() {
      return _listItemPrefix.ListItemPrefix;
    }, ListItemSuffix: function() {
      return _listItemSuffix.ListItemSuffix;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _theme = require_theme2();
    var _materialRippleEffects = _interopRequireDefault(require_material_ripple_effects());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _list = require_list();
    var _listItemPrefix = require_ListItemPrefix();
    var _listItemSuffix = require_ListItemSuffix();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var ListItem = _react.default.forwardRef(function(_param, ref) {
      var className = _param.className, disabled = _param.disabled, selected = _param.selected, ripple = _param.ripple, children = _param.children, rest = _objectWithoutProperties(_param, ["className", "disabled", "selected", "ripple", "children"]);
      var list = (0, _theme.useTheme)().list;
      var defaultProps = list.defaultProps, base = list.styles.base;
      ripple = ripple !== null && ripple !== void 0 ? ripple : defaultProps.ripple;
      var rippleEffect = ripple !== void 0 && new _materialRippleEffects.default();
      var _obj;
      var listItemClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.item.initial), (_obj = {}, _defineProperty(_obj, (0, _objectsToString.default)(base.item.disabled), disabled), _defineProperty(_obj, (0, _objectsToString.default)(base.item.selected), selected && !disabled), _obj)), className);
      return _react.default.createElement("div", _extends({}, rest, { ref, role: "button", tabIndex: 0, className: listItemClasses, onMouseDown: function(e) {
        var onMouseDown = rest === null || rest === void 0 ? void 0 : rest.onMouseDown;
        if (ripple) rippleEffect.create(e, "dark");
        return typeof onMouseDown === "function" && onMouseDown(e);
      } }), children);
    });
    ListItem.propTypes = { className: _list.propTypesClassName, selected: _list.propTypesSelected, disabled: _list.propTypesDisabled, ripple: _list.propTypesRipple, children: _list.propTypesChildren };
    ListItem.displayName = "MaterialTailwind.ListItem";
    var _default = Object.assign(ListItem, { Prefix: _listItemPrefix.ListItemPrefix, Suffix: _listItemSuffix.ListItemSuffix });
  }
});

// node_modules/@material-tailwind/react/components/List/index.js
var require_List = __commonJS({
  "node_modules/@material-tailwind/react/components/List/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { List: function() {
      return List;
    }, ListItem: function() {
      return _listItem.ListItem;
    }, ListItemPrefix: function() {
      return _listItemPrefix.ListItemPrefix;
    }, ListItemSuffix: function() {
      return _listItemSuffix.ListItemSuffix;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _theme = require_theme2();
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _list = require_list();
    var _listItem = require_ListItem();
    var _listItemPrefix = require_ListItemPrefix();
    var _listItemSuffix = require_ListItemSuffix();
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var List = _react.default.forwardRef(function(_param, ref) {
      var className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["className", "children"]);
      var list = (0, _theme.useTheme)().list;
      var defaultProps = list.defaultProps, base = list.styles.base;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var listClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.list)), className);
      return _react.default.createElement("nav", _extends({}, rest, { ref, className: listClasses }), children);
    });
    List.propTypes = { className: _list.propTypesClassName, children: _list.propTypesChildren };
    List.displayName = "MaterialTailwind.List";
    var _default = Object.assign(List, { Item: _listItem.ListItem, ItemPrefix: _listItemPrefix.ListItemPrefix, ItemSuffix: _listItemSuffix.ListItemSuffix });
  }
});

// node_modules/@material-tailwind/react/components/ButtonGroup/index.js
var require_ButtonGroup = __commonJS({
  "node_modules/@material-tailwind/react/components/ButtonGroup/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { ButtonGroup: function() {
      return ButtonGroup;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _button = require_button();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var ButtonGroup = _react.default.forwardRef(function(_param, ref) {
      var variant = _param.variant, size = _param.size, color = _param.color, fullWidth = _param.fullWidth, ripple = _param.ripple, className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["variant", "size", "color", "fullWidth", "ripple", "className", "children"]);
      var buttonGroup = (0, _theme.useTheme)().buttonGroup;
      var defaultProps = buttonGroup.defaultProps, styles = buttonGroup.styles, valid = buttonGroup.valid;
      var base = styles.base, dividerColor = styles.dividerColor;
      variant = variant !== null && variant !== void 0 ? variant : defaultProps.variant;
      size = size !== null && size !== void 0 ? size : defaultProps.size;
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      ripple = ripple !== null && ripple !== void 0 ? ripple : defaultProps.ripple;
      fullWidth = fullWidth !== null && fullWidth !== void 0 ? fullWidth : defaultProps.fullWidth;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var _obj;
      var classes = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.initial), (_obj = {}, _defineProperty(_obj, (0, _objectsToString.default)(base.fullWidth), fullWidth), _defineProperty(_obj, "divide-x", variant !== "outlined"), _defineProperty(_obj, (0, _objectsToString.default)(dividerColor[(0, _findMatch.default)(valid.colors, color, "gray")]), variant !== "outlined"), _obj)), className);
      return _react.default.createElement("div", _extends({}, rest, { ref, className: classes }), _react.default.Children.map(children, function(child, index) {
        var _child_props;
        return _react.default.isValidElement(child) && _react.default.cloneElement(child, { variant, size, color, ripple, fullWidth, className: (0, _tailwindMerge.twMerge)((0, _classnames.default)({ "rounded-r-none": index !== _react.default.Children.count(children) - 1, "border-r-0": index !== _react.default.Children.count(children) - 1, "rounded-l-none": index !== 0 }), (_child_props = child.props) === null || _child_props === void 0 ? void 0 : _child_props.className) });
      }));
    });
    ButtonGroup.propTypes = { variant: _propTypes.default.oneOf(_button.propTypesVariant), size: _propTypes.default.oneOf(_button.propTypesSize), color: _propTypes.default.oneOf(_button.propTypesColor), fullWidth: _button.propTypesFullWidth, ripple: _button.propTypesRipple, className: _button.propTypesClassName, children: _button.propTypesChildren };
    ButtonGroup.displayName = "MaterialTailwind.ButtonGroup";
    var _default = ButtonGroup;
  }
});

// node_modules/@material-tailwind/react/types/components/carousel.js
var require_carousel = __commonJS({
  "node_modules/@material-tailwind/react/types/components/carousel.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { propTypesClassName: function() {
      return propTypesClassName;
    }, propTypesPrevArrow: function() {
      return propTypesPrevArrow;
    }, propTypesNextArrow: function() {
      return propTypesNextArrow;
    }, propTypesNavigation: function() {
      return propTypesNavigation;
    }, propTypesAutoplay: function() {
      return propTypesAutoplay;
    }, propTypesAutoplayDelay: function() {
      return propTypesAutoplayDelay;
    }, propTypesTransition: function() {
      return propTypesTransition;
    }, propTypesLoop: function() {
      return propTypesLoop;
    }, propTypesChildren: function() {
      return propTypesChildren;
    }, propTypesSlideRef: function() {
      return propTypesSlideRef;
    } });
    var _propTypes = _interopRequireDefault(require_prop_types());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var propTypesClassName = _propTypes.default.string;
    var propTypesPrevArrow = _propTypes.default.func;
    var propTypesNextArrow = _propTypes.default.func;
    var propTypesNavigation = _propTypes.default.func;
    var propTypesAutoplay = _propTypes.default.bool;
    var propTypesAutoplayDelay = _propTypes.default.number;
    var propTypesTransition = _propTypes.default.object;
    var propTypesLoop = _propTypes.default.bool;
    var propTypesChildren = _propTypes.default.node.isRequired;
    var propTypesSlideRef = _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({ current: _propTypes.default.any })]);
  }
});

// node_modules/@material-tailwind/react/components/Carousel/index.js
var require_Carousel = __commonJS({
  "node_modules/@material-tailwind/react/components/Carousel/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Carousel: function() {
      return Carousel;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _framerMotion = require_cjs2();
    var _react1 = (init_floating_ui_react_esm(), __toCommonJS(floating_ui_react_esm_exports));
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _carousel = require_carousel();
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    var Carousel = _react.default.forwardRef(function(_param, ref) {
      var children = _param.children, prevArrow = _param.prevArrow, nextArrow = _param.nextArrow, navigation = _param.navigation, autoplay = _param.autoplay, autoplayDelay = _param.autoplayDelay, transition = _param.transition, loop = _param.loop, className = _param.className, slideRef = _param.slideRef, rest = _objectWithoutProperties(_param, ["children", "prevArrow", "nextArrow", "navigation", "autoplay", "autoplayDelay", "transition", "loop", "className", "slideRef"]);
      var carousel = (0, _theme.useTheme)().carousel;
      var defaultProps = carousel.defaultProps, base = carousel.styles.base;
      var x = (0, _framerMotion.useMotionValue)(0);
      var containerRef = _react.default.useRef(null);
      var _React_useState = _slicedToArray(_react.default.useState(0), 2), index = _React_useState[0], setIndex = _React_useState[1];
      var childrens = _react.default.Children.toArray(children);
      prevArrow = prevArrow !== null && prevArrow !== void 0 ? prevArrow : defaultProps.prevArrow;
      nextArrow = nextArrow !== null && nextArrow !== void 0 ? nextArrow : defaultProps.nextArrow;
      navigation = navigation !== null && navigation !== void 0 ? navigation : defaultProps.navigation;
      autoplay = autoplay !== null && autoplay !== void 0 ? autoplay : defaultProps.autoplay;
      autoplayDelay = autoplayDelay !== null && autoplayDelay !== void 0 ? autoplayDelay : defaultProps.autoplayDelay;
      transition = transition !== null && transition !== void 0 ? transition : defaultProps.transition;
      loop = loop !== null && loop !== void 0 ? loop : defaultProps.loop;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var carouselClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.carousel)), className);
      var slideClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.slide)));
      var calculateNewX = _react.default.useCallback(function() {
        var _containerRef_current;
        return -index * (((_containerRef_current = containerRef.current) === null || _containerRef_current === void 0 ? void 0 : _containerRef_current.clientWidth) || 0);
      }, [index]);
      var handleNext = _react.default.useCallback(function() {
        var idx = loop ? 0 : index;
        setIndex(index + 1 === childrens.length ? idx : index + 1);
      }, [index, loop, childrens.length]);
      var handlePrev = function() {
        var idx = loop ? childrens.length - 1 : 0;
        setIndex(index - 1 < 0 ? idx : index - 1);
      };
      _react.default.useEffect(function() {
        var controls = (0, _framerMotion.animate)(x, calculateNewX(), transition);
        return controls.stop;
      }, [calculateNewX, index, x, transition]);
      _react.default.useEffect(function() {
        window.addEventListener("resize", function() {
          (0, _framerMotion.animate)(x, calculateNewX(), transition);
        });
      }, [calculateNewX, transition, x]);
      _react.default.useEffect(function() {
        if (!autoplay) {
          return;
        }
        var timer = setInterval(function() {
          return handleNext();
        }, autoplayDelay);
        return function() {
          return clearInterval(timer);
        };
      }, [autoplay, handleNext, autoplayDelay]);
      var mergedRefs = (0, _react1.useMergeRefs)([containerRef, ref]);
      return _react.default.createElement("div", _extends({}, rest, { ref: mergedRefs, className: carouselClasses }), childrens.map(function(child, i) {
        return _react.default.createElement(_framerMotion.LazyMotion, { key: i, features: _framerMotion.domAnimation }, _react.default.createElement(_framerMotion.m.div, { ref: slideRef, className: slideClasses, style: { x, left: "".concat(i * 100, "%"), right: "".concat(i * 100, "%") } }, child));
      }), prevArrow && prevArrow({ loop, handlePrev, activeIndex: index, firstIndex: index === 0 }), nextArrow && nextArrow({ loop, handleNext, activeIndex: index, lastIndex: index === childrens.length - 1 }), navigation && navigation({ setActiveIndex: setIndex, activeIndex: index, length: childrens.length }));
    });
    Carousel.propTypes = { className: _carousel.propTypesClassName, children: _carousel.propTypesChildren, nextArrow: _carousel.propTypesNextArrow, prevArrow: _carousel.propTypesPrevArrow, navigation: _carousel.propTypesNavigation, autoplay: _carousel.propTypesAutoplay, autoplayDelay: _carousel.propTypesAutoplayDelay, transition: _carousel.propTypesTransition, loop: _carousel.propTypesLoop, slideRef: _carousel.propTypesSlideRef };
    Carousel.displayName = "MaterialTailwind.Carousel";
    var _default = Carousel;
  }
});

// node_modules/@material-tailwind/react/types/components/drawer.js
var require_drawer = __commonJS({
  "node_modules/@material-tailwind/react/types/components/drawer.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { propTypesOpen: function() {
      return propTypesOpen;
    }, propTypesSize: function() {
      return propTypesSize;
    }, propTypesOverlay: function() {
      return propTypesOverlay;
    }, propTypesChildren: function() {
      return propTypesChildren;
    }, propTypesPlacement: function() {
      return propTypesPlacement;
    }, propTypesOverlayProps: function() {
      return propTypesOverlayProps;
    }, propTypesClassName: function() {
      return propTypesClassName;
    }, propTypesOnClose: function() {
      return propTypesOnClose;
    }, propTypesDismiss: function() {
      return propTypesDismiss;
    }, propTypesTransition: function() {
      return propTypesTransition;
    }, propTypesOverlayRef: function() {
      return propTypesOverlayRef;
    } });
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _generic = require_generic();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var propTypesOpen = _propTypes.default.bool.isRequired;
    var propTypesSize = _propTypes.default.number;
    var propTypesOverlay = _propTypes.default.bool;
    var propTypesChildren = _propTypes.default.node.isRequired;
    var propTypesPlacement = ["top", "right", "bottom", "left"];
    var propTypesOverlayProps = _propTypes.default.object;
    var propTypesClassName = _propTypes.default.string;
    var propTypesOnClose = _propTypes.default.func;
    var propTypesDismiss = _generic.propTypesDismissType;
    var propTypesTransition = _propTypes.default.object;
    var propTypesOverlayRef = _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.shape({ current: _propTypes.default.any })]);
  }
});

// node_modules/@material-tailwind/react/components/Drawer/index.js
var require_Drawer = __commonJS({
  "node_modules/@material-tailwind/react/components/Drawer/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Drawer: function() {
      return Drawer;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _framerMotion = require_cjs2();
    var _react1 = (init_floating_ui_react_esm(), __toCommonJS(floating_ui_react_esm_exports));
    var _deepmerge = _interopRequireDefault(require_cjs());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _drawer = require_drawer();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Drawer = _react.default.forwardRef(function(_param, ref) {
      var open = _param.open, size = _param.size, overlay = _param.overlay, children = _param.children, placement = _param.placement, overlayProps = _param.overlayProps, className = _param.className, onClose = _param.onClose, dismiss = _param.dismiss, transition = _param.transition, overlayRef = _param.overlayRef, rest = _objectWithoutProperties(_param, ["open", "size", "overlay", "children", "placement", "overlayProps", "className", "onClose", "dismiss", "transition", "overlayRef"]);
      var drawer = (0, _theme.useTheme)().drawer;
      var defaultProps = drawer.defaultProps, base = drawer.styles.base;
      var constrols = (0, _framerMotion.useAnimation)();
      size = size !== null && size !== void 0 ? size : defaultProps.size;
      overlay = overlay !== null && overlay !== void 0 ? overlay : defaultProps.overlay;
      placement = placement !== null && placement !== void 0 ? placement : defaultProps.placement;
      overlayProps = overlayProps !== null && overlayProps !== void 0 ? overlayProps : defaultProps.overlayProps;
      onClose = onClose !== null && onClose !== void 0 ? onClose : defaultProps.onClose;
      var _merge;
      dismiss = (_merge = (0, _deepmerge.default)(defaultProps.dismiss, dismiss || {})) !== null && _merge !== void 0 ? _merge : defaultProps.dismiss;
      transition = transition !== null && transition !== void 0 ? transition : defaultProps.transition;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var drawerClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.drawer), { "top-0 right-0": placement === "right", "bottom-0 left-0": placement === "bottom", "top-0 left-0": placement === "top" || placement === "left" }), className);
      var overlayClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.overlay)), overlayProps === null || overlayProps === void 0 ? void 0 : overlayProps.className);
      var context = (0, _react1.useFloating)({ open, onOpenChange: onClose }).context;
      var getFloatingProps = (0, _react1.useInteractions)([(0, _react1.useDismiss)(context, dismiss)]).getFloatingProps;
      _react.default.useEffect(function() {
        constrols.start(open ? "open" : "close");
      }, [open, constrols, placement]);
      var drawerAnimation = { open: { x: 0, y: 0 }, close: { x: placement === "left" ? -size : placement === "right" ? size : 0, y: placement === "top" ? -size : placement === "bottom" ? size : 0 } };
      var backdropAnimation = { unmount: { opacity: 0, transition: { delay: 0.3 } }, mount: { opacity: 1 } };
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_framerMotion.LazyMotion, { features: _framerMotion.domAnimation }, _react.default.createElement(_framerMotion.AnimatePresence, null, overlay && open && _react.default.createElement(_framerMotion.m.div, { ref: overlayRef, className: overlayClasses, initial: "unmount", exit: "unmount", animate: open ? "mount" : "unmount", variants: backdropAnimation, transition: { duration: 0.3 } })), _react.default.createElement(_framerMotion.m.div, _extends({}, getFloatingProps(_objectSpread({ ref }, rest)), { className: drawerClasses, style: { maxWidth: placement === "left" || placement === "right" ? size : "100%", maxHeight: placement === "top" || placement === "bottom" ? size : "100%", height: placement === "left" || placement === "right" ? "100vh" : "100%" }, initial: "close", animate: constrols, variants: drawerAnimation, transition }), children)));
    });
    Drawer.propTypes = { open: _drawer.propTypesOpen, size: _drawer.propTypesSize, overlay: _drawer.propTypesOverlay, children: _drawer.propTypesChildren, placement: _propTypes.default.oneOf(_drawer.propTypesPlacement), overlayProps: _drawer.propTypesOverlayProps, className: _drawer.propTypesClassName, onClose: _drawer.propTypesOnClose, dismiss: _drawer.propTypesDismiss, transition: _drawer.propTypesTransition, overlayRef: _drawer.propTypesOverlayRef };
    Drawer.displayName = "MaterialTailwind.Drawer";
    var _default = Drawer;
  }
});

// node_modules/@material-tailwind/react/components/Badge/index.js
var require_Badge = __commonJS({
  "node_modules/@material-tailwind/react/components/Badge/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Badge: function() {
      return Badge;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _deepmerge = _interopRequireDefault(require_cjs());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _badge = require_badge();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Badge = _react.default.forwardRef(function(_param, ref) {
      var color = _param.color, invisible = _param.invisible, withBorder = _param.withBorder, overlap = _param.overlap, placement = _param.placement, className = _param.className, content = _param.content, children = _param.children, containerProps = _param.containerProps, containerRef = _param.containerRef, rest = _objectWithoutProperties(_param, ["color", "invisible", "withBorder", "overlap", "placement", "className", "content", "children", "containerProps", "containerRef"]);
      var badge = (0, _theme.useTheme)().badge;
      var valid = badge.valid, defaultProps = badge.defaultProps, styles = badge.styles;
      var base = styles.base, placements = styles.placements, colors = styles.colors;
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      invisible = invisible !== null && invisible !== void 0 ? invisible : defaultProps.invisible;
      withBorder = withBorder !== null && withBorder !== void 0 ? withBorder : defaultProps.withBorder;
      overlap = overlap !== null && overlap !== void 0 ? overlap : defaultProps.overlap;
      placement = placement !== null && placement !== void 0 ? placement : defaultProps.placement;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var _merge;
      containerProps = (_merge = (0, _deepmerge.default)(containerProps, defaultProps.containerProps || {})) !== null && _merge !== void 0 ? _merge : defaultProps.containerProps;
      var badgeInitialClasses = (0, _objectsToString.default)(base.badge.initial);
      var badgeWithBorderClasses = (0, _objectsToString.default)(base.badge.withBorder);
      var badgeWithContentClasses = (0, _objectsToString.default)(base.badge.withContent);
      var badgeColorClasses = (0, _objectsToString.default)(colors[(0, _findMatch.default)(valid.colors, color, "red")]);
      var badgePlacementClasses = (0, _objectsToString.default)(placements[(0, _findMatch.default)(valid.placements, placement, "top-end")][(0, _findMatch.default)(valid.overlaps, overlap, "square")]);
      var _obj;
      var badgeClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)(badgeInitialClasses, badgePlacementClasses, badgeColorClasses, (_obj = {}, _defineProperty(_obj, badgeWithBorderClasses, withBorder), _defineProperty(_obj, badgeWithContentClasses, content), _obj)), className);
      var badgeContainerClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.container), containerProps === null || containerProps === void 0 ? void 0 : containerProps.className));
      return _react.default.createElement("div", _extends({ ref: containerRef }, containerProps, { className: badgeContainerClasses }), children, !invisible && _react.default.createElement("span", _extends({}, rest, { ref, className: badgeClasses }), content));
    });
    Badge.propTypes = { color: _propTypes.default.oneOf(_badge.propTypesColor), invisible: _badge.propTypesInvisible, withBorder: _badge.propTypesWithBorder, overlap: _propTypes.default.oneOf(_badge.propTypesOverlap), className: _badge.propTypesClassName, content: _badge.propTypesContent, children: _badge.propTypesChildren, placement: _propTypes.default.oneOf(_badge.propTypesPlacement), containerProps: _badge.propTypesContainerProps, containerRef: _badge.propTypesContainerRef };
    Badge.displayName = "MaterialTailwind.Badge";
    var _default = Badge;
  }
});

// node_modules/@material-tailwind/react/components/Rating/index.js
var require_Rating = __commonJS({
  "node_modules/@material-tailwind/react/components/Rating/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Rating: function() {
      return Rating;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _rating = require_rating();
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    var Rating = _react.default.forwardRef(function(_param, ref) {
      var count = _param.count, value = _param.value, ratedIcon = _param.ratedIcon, unratedIcon = _param.unratedIcon, ratedColor = _param.ratedColor, unratedColor = _param.unratedColor, className = _param.className, onChange = _param.onChange, readonly = _param.readonly, rest = _objectWithoutProperties(_param, ["count", "value", "ratedIcon", "unratedIcon", "ratedColor", "unratedColor", "className", "onChange", "readonly"]);
      var _ratedIconInstance_props, _unratedIconInstance_props;
      var rating = (0, _theme.useTheme)().rating;
      var valid = rating.valid, defaultProps = rating.defaultProps, styles = rating.styles;
      var base = styles.base, colors = styles.colors;
      count = count !== null && count !== void 0 ? count : defaultProps.count;
      value = value !== null && value !== void 0 ? value : defaultProps.value;
      ratedIcon = ratedIcon !== null && ratedIcon !== void 0 ? ratedIcon : defaultProps.ratedIcon;
      ratedIcon = ratedIcon !== null && ratedIcon !== void 0 ? ratedIcon : defaultProps.ratedIcon;
      unratedIcon = unratedIcon !== null && unratedIcon !== void 0 ? unratedIcon : defaultProps.unratedIcon;
      ratedColor = ratedColor !== null && ratedColor !== void 0 ? ratedColor : defaultProps.ratedColor;
      unratedColor = unratedColor !== null && unratedColor !== void 0 ? unratedColor : defaultProps.unratedColor;
      onChange = onChange !== null && onChange !== void 0 ? onChange : defaultProps.onChange;
      readonly = readonly !== null && readonly !== void 0 ? readonly : defaultProps.readonly;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var _React_useState = _slicedToArray(_react.default.useState(function() {
        return _toConsumableArray(Array(value).fill("rated")).concat(_toConsumableArray(Array(count - value).fill("un_rated")));
      }), 2), ratingValue = _React_useState[0], setRatingValue = _React_useState[1];
      var _React_useState1 = _slicedToArray(_react.default.useState(function() {
        return _toConsumableArray(Array(count).fill("un_rated"));
      }), 2), ratingOnHover = _React_useState1[0], setRatingOnHover = _React_useState1[1];
      var _React_useState2 = _slicedToArray(_react.default.useState(false), 2), isHover = _React_useState2[0], setIsHover = _React_useState2[1];
      var ratedColorClasses = (0, _objectsToString.default)(colors[(0, _findMatch.default)(valid.colors, ratedColor, "yellow")]);
      var unratedColorClasses = (0, _objectsToString.default)(colors[(0, _findMatch.default)(valid.colors, unratedColor, "blue-gray")]);
      var ratingClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.rating), className));
      var ratingIconClasses = (0, _objectsToString.default)(base.icon);
      var ratedIconInstance = ratedIcon;
      var unratedIconInstance = unratedIcon;
      var customRatedIcon = _react.default.isValidElement(ratedIcon) && _react.default.cloneElement(ratedIconInstance, { className: (0, _tailwindMerge.twMerge)((0, _classnames.default)(ratingIconClasses, ratedColorClasses, ratedIconInstance === null || ratedIconInstance === void 0 ? void 0 : (_ratedIconInstance_props = ratedIconInstance.props) === null || _ratedIconInstance_props === void 0 ? void 0 : _ratedIconInstance_props.className)) });
      var customUnratedIcon = _react.default.isValidElement(ratedIcon) && _react.default.cloneElement(unratedIconInstance, { className: (0, _tailwindMerge.twMerge)((0, _classnames.default)(ratingIconClasses, unratedColorClasses, unratedIconInstance === null || unratedIconInstance === void 0 ? void 0 : (_unratedIconInstance_props = unratedIconInstance.props) === null || _unratedIconInstance_props === void 0 ? void 0 : _unratedIconInstance_props.className)) });
      var ratedIconEl = !_react.default.isValidElement(ratedIcon) && _react.default.createElement(ratedIcon, { className: (0, _tailwindMerge.twMerge)((0, _classnames.default)(ratingIconClasses, ratedColorClasses)) });
      var unratedIconEl = !_react.default.isValidElement(ratedIcon) && _react.default.createElement(unratedIcon, { className: (0, _tailwindMerge.twMerge)((0, _classnames.default)(ratingIconClasses, unratedColorClasses)) });
      var renderRating = function(data) {
        return data.map(function(el, index) {
          return _react.default.createElement("span", { key: index, onClick: function() {
            if (readonly) return;
            var nextRating = ratingValue.map(function(el2, i) {
              return i <= index ? "rated" : "un_rated";
            });
            setRatingValue(nextRating);
            onChange && typeof onChange === "function" && onChange(nextRating.filter(function(el2) {
              return el2 === "rated";
            }).length);
          }, onMouseEnter: function() {
            if (readonly) return;
            var nextRating = ratingOnHover.map(function(el2, i) {
              return i <= index ? "rated" : "un_rated";
            });
            setIsHover(true);
            setRatingOnHover(nextRating);
          }, onMouseLeave: function() {
            return !readonly && setIsHover(false);
          } }, _react.default.isValidElement(el === "rated" ? ratedIcon : unratedIcon) ? el === "rated" ? customRatedIcon : customUnratedIcon : el === "rated" ? ratedIconEl : unratedIconEl);
        });
      };
      return _react.default.createElement("div", _extends({}, rest, { ref, className: ratingClasses }), isHover ? renderRating(ratingOnHover) : renderRating(ratingValue));
    });
    Rating.propTypes = { count: _rating.propTypesCount, value: _rating.propTypesValue, ratedIcon: _rating.propTypesRatedIcon, unratedIcon: _rating.propTypesUnratedIcon, ratedColor: _propTypes.default.oneOf(_rating.propTypesColor), unratedColor: _propTypes.default.oneOf(_rating.propTypesColor), className: _rating.propTypesClassName, onChange: _rating.propTypesOnChange, readonly: _rating.propTypesReadonly };
    Rating.displayName = "MaterialTailwind.Rating";
    var _default = Rating;
  }
});

// node_modules/@material-tailwind/react/components/Slider/index.js
var require_Slider = __commonJS({
  "node_modules/@material-tailwind/react/components/Slider/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Slider: function() {
      return Slider;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _deepmerge = _interopRequireDefault(require_cjs());
    var _classnames = _interopRequireDefault(require_classnames());
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _slider = require_slider();
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    var Slider = _react.default.forwardRef(function(_param, ref) {
      var color = _param.color, size = _param.size, className = _param.className, trackClassName = _param.trackClassName, thumbClassName = _param.thumbClassName, barClassName = _param.barClassName, value = _param.value, defaultValue = _param.defaultValue, onChange = _param.onChange, min = _param.min, max = _param.max, step = _param.step, inputRef = _param.inputRef, inputProps = _param.inputProps, rest = _objectWithoutProperties(_param, ["color", "size", "className", "trackClassName", "thumbClassName", "barClassName", "value", "defaultValue", "onChange", "min", "max", "step", "inputRef", "inputProps"]);
      var slider = (0, _theme.useTheme)().slider;
      var valid = slider.valid, defaultProps = slider.defaultProps, styles = slider.styles;
      var base = styles.base, sizes = styles.sizes, colors = styles.colors;
      var _React_useState = _slicedToArray(_react.default.useState(defaultValue || 0), 2), innerValue = _React_useState[0], setInnerValue = _React_useState[1];
      _react.default.useMemo(function() {
        if (defaultValue) setInnerValue(defaultValue);
      }, [defaultValue]);
      color = color !== null && color !== void 0 ? color : defaultProps.color;
      size = size !== null && size !== void 0 ? size : defaultProps.size;
      min = min !== null && min !== void 0 ? min : defaultProps.min;
      max = max !== null && max !== void 0 ? max : defaultProps.max;
      step = step !== null && step !== void 0 ? step : defaultProps.step;
      className = (0, _tailwindMerge.twMerge)(defaultProps.className || "", className);
      var _classnames1;
      thumbClassName = (_classnames1 = (0, _classnames.default)(defaultProps.thumbClassName, thumbClassName)) !== null && _classnames1 !== void 0 ? _classnames1 : defaultProps.thumbClassName;
      var _classnames2;
      trackClassName = (_classnames2 = (0, _classnames.default)(defaultProps.trackClassName, trackClassName)) !== null && _classnames2 !== void 0 ? _classnames2 : defaultProps.trackClassName;
      var _classnames3;
      barClassName = (_classnames3 = (0, _classnames.default)(defaultProps.barClassName, barClassName)) !== null && _classnames3 !== void 0 ? _classnames3 : defaultProps.barClassName;
      var _merge;
      inputProps = (_merge = (0, _deepmerge.default)(inputProps, (defaultProps === null || defaultProps === void 0 ? void 0 : defaultProps.inputProps) || {})) !== null && _merge !== void 0 ? _merge : defaultProps.inputProps;
      var sliderContainerClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.container), (0, _objectsToString.default)(colors[(0, _findMatch.default)(valid.colors, color, "gray")]), (0, _objectsToString.default)(sizes[(0, _findMatch.default)(valid.sizes, size, "md")]["container"]), className));
      var sliderBarClasses = (0, _tailwindMerge.twMerge)((0, _classnames.default)((0, _objectsToString.default)(base.bar), barClassName));
      var sliderTrackClasses = (0, _classnames.default)((0, _objectsToString.default)(base.track), (0, _objectsToString.default)(sizes[(0, _findMatch.default)(valid.sizes, size, "md")]["track"]));
      var sliderThumbClasses = (0, _classnames.default)((0, _objectsToString.default)(base.thumb), (0, _objectsToString.default)(sizes[(0, _findMatch.default)(valid.sizes, size, "md")]["thumb"]));
      var sliderClasses = (0, _classnames.default)((0, _objectsToString.default)(base.slider), (0, _tailwindMerge.twMerge)(sliderTrackClasses, trackClassName), (0, _tailwindMerge.twMerge)(sliderThumbClasses, thumbClassName));
      return _react.default.createElement("div", _extends({}, rest, { ref, className: sliderContainerClasses }), _react.default.createElement("label", { className: sliderBarClasses, style: { width: "".concat(value || innerValue, "%") } }), _react.default.createElement("input", _extends({ ref: inputRef, type: "range", max, min, step, className: sliderClasses }, value ? { value } : null, { defaultValue, onChange: function(e) {
        return onChange ? onChange(e) : setInnerValue(Number(e.target.value));
      } })));
    });
    Slider.propTypes = { color: _propTypes.default.oneOf(_slider.propTypesColor), size: _propTypes.default.oneOf(_slider.propTypesSize), className: _slider.propTypesClassName, trackClassName: _slider.propTypesTrackClassName, thumbClassName: _slider.propTypesThumbClassName, barClassName: _slider.propTypesBarClassName, defaultValue: _slider.propTypesDefaultValue, value: _slider.propTypesValue, onChange: _slider.propTypesOnChange, min: _slider.propTypesMin, max: _slider.propTypesMax, step: _slider.propTypesStep, inputRef: _slider.propTypesInputRef, inputProps: _slider.propTypesInputProps };
    Slider.displayName = "MaterialTailwind.Slider";
    var _default = Slider;
  }
});

// node_modules/@material-tailwind/react/components/Timeline/TimelineItem.js
var require_TimelineItem = __commonJS({
  "node_modules/@material-tailwind/react/components/Timeline/TimelineItem.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { useTimelineItem: function() {
      return useTimelineItem;
    }, TimelineItem: function() {
      return TimelineItem;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _timeline = require_timeline();
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    var TimelineItemContext = _react.default.createContext(0);
    TimelineItemContext.displayName = "MaterialTailwind.TimelineItemContext";
    function useTimelineItem() {
      var context = _react.default.useContext(TimelineItemContext);
      if (!context) {
        throw new Error("useTimelineItemContext() must be used within a TimelineItem. It happens when you use TimelineIcon, TimelineConnector or TimelineBody components outside the TimelineItem component.");
      }
      return context;
    }
    var TimelineItem = _react.default.forwardRef(function(_param, ref) {
      var className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["className", "children"]);
      var timelineItem = (0, _theme.useTheme)().timelineItem;
      var styles = timelineItem.styles;
      var base = styles.base;
      var _React_useState = _slicedToArray(_react.default.useState(0), 2), width = _React_useState[0], setWidth = _React_useState[1];
      var contextValue = _react.default.useMemo(function() {
        return [width, setWidth];
      }, [width, setWidth]);
      var classes = (0, _tailwindMerge.twMerge)((0, _objectsToString.default)(base), className);
      return _react.default.createElement(TimelineItemContext.Provider, { value: contextValue }, _react.default.createElement("li", _extends({ ref }, rest, { className: classes }), children));
    });
    TimelineItem.propTypes = { className: _timeline.propTypeClassName, children: _timeline.propTypeChildren.isRequired };
    TimelineItem.displayName = "MaterialTailwind.TimelineItem";
    var _default = TimelineItem;
  }
});

// node_modules/@material-tailwind/react/components/Timeline/TimelineIcon.js
var require_TimelineIcon = __commonJS({
  "node_modules/@material-tailwind/react/components/Timeline/TimelineIcon.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { TimelineIcon: function() {
      return TimelineIcon;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _react1 = (init_floating_ui_react_esm(), __toCommonJS(floating_ui_react_esm_exports));
    var _tailwindMerge = require_dist();
    var _findMatch = _interopRequireDefault(require_findMatch());
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _timelineItem = require_TimelineItem();
    var _timeline = require_timeline();
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    var TimelineIcon = _react.default.forwardRef(function(_param, ref) {
      var color = _param.color, variant = _param.variant, className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["color", "variant", "className", "children"]);
      var timelineIcon = (0, _theme.useTheme)().timelineIcon;
      var styles = timelineIcon.styles, valid = timelineIcon.valid;
      var base = styles.base, variants = styles.variants;
      var _useTimelineItem = _slicedToArray((0, _timelineItem.useTimelineItem)(), 2), setWidth = _useTimelineItem[1];
      var innerRef = _react.default.useRef(null);
      var mergedRef = (0, _react1.useMergeRefs)([ref, innerRef]);
      _react.default.useEffect(function() {
        var iconElement = innerRef.current;
        if (iconElement) {
          var width = iconElement.getBoundingClientRect().width;
          setWidth(width);
          return function() {
            setWidth(0);
          };
        }
      }, [setWidth, className, children]);
      var variantClasses = (0, _objectsToString.default)(variants[(0, _findMatch.default)(valid.variants, variant, "filled")][(0, _findMatch.default)(valid.colors, color, "gray")]);
      var classes = (0, _tailwindMerge.twMerge)((0, _objectsToString.default)(base), variantClasses, className);
      return _react.default.createElement("span", _extends({ ref: mergedRef }, rest, { className: classes }), children);
    });
    TimelineIcon.propTypes = { children: _timeline.propTypeChildren, className: _timeline.propTypeClassName, color: _propTypes.default.oneOf(_timeline.propTypeColor), variant: _propTypes.default.oneOf(_timeline.propTypeVariant) };
    TimelineIcon.displayName = "MaterialTailwind.TimelineIcon";
    var _default = TimelineIcon;
  }
});

// node_modules/@material-tailwind/react/components/Timeline/TimelineBody.js
var require_TimelineBody = __commonJS({
  "node_modules/@material-tailwind/react/components/Timeline/TimelineBody.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { TimelineHeader: function() {
      return TimelineHeader;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _timelineItem = require_TimelineItem();
    var _timeline = require_timeline();
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    var TimelineHeader = _react.default.forwardRef(function(_param, ref) {
      var className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["className", "children"]);
      var timelineBody = (0, _theme.useTheme)().timelineBody;
      var styles = timelineBody.styles;
      var base = styles.base;
      var _useTimelineItem = _slicedToArray((0, _timelineItem.useTimelineItem)(), 1), width = _useTimelineItem[0];
      var classes = (0, _tailwindMerge.twMerge)((0, _objectsToString.default)(base), className);
      return _react.default.createElement("div", _extends({}, rest, { ref, className: classes }), _react.default.createElement("span", { className: "pointer-events-none invisible h-full flex-shrink-0", style: { width: "".concat(width, "px") } }), _react.default.createElement("div", null, children));
    });
    TimelineHeader.propTypes = { children: _timeline.propTypeChildren, className: _timeline.propTypeClassName };
    TimelineHeader.displayName = "MaterialTailwind.TimelineHeader";
    var _default = TimelineHeader;
  }
});

// node_modules/@material-tailwind/react/components/Timeline/TimelineHeader.js
var require_TimelineHeader = __commonJS({
  "node_modules/@material-tailwind/react/components/Timeline/TimelineHeader.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { TimelineHeader: function() {
      return TimelineHeader;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _timeline = require_timeline();
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var TimelineHeader = _react.default.forwardRef(function(_param, ref) {
      var className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["className", "children"]);
      var timelineHeader = (0, _theme.useTheme)().timelineHeader;
      var styles = timelineHeader.styles;
      var base = styles.base;
      var classes = (0, _tailwindMerge.twMerge)((0, _objectsToString.default)(base), className);
      return _react.default.createElement("div", _extends({}, rest, { ref, className: classes }), children);
    });
    TimelineHeader.propTypes = { children: _timeline.propTypeChildren, className: _timeline.propTypeClassName };
    TimelineHeader.displayName = "MaterialTailwind.TimelineHeader";
    var _default = TimelineHeader;
  }
});

// node_modules/@material-tailwind/react/components/Timeline/TimelineConnector.js
var require_TimelineConnector = __commonJS({
  "node_modules/@material-tailwind/react/components/Timeline/TimelineConnector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { TimelineConnector: function() {
      return TimelineConnector;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _timelineItem = require_TimelineItem();
    var _timeline = require_timeline();
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    var TimelineConnector = _react.default.forwardRef(function(_param, ref) {
      var className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["className", "children"]);
      var _children_props;
      var timelineConnector = (0, _theme.useTheme)().timelineConnector;
      var styles = timelineConnector.styles;
      var base = styles.base;
      var _useTimelineItem = _slicedToArray((0, _timelineItem.useTimelineItem)(), 1), width = _useTimelineItem[0];
      var lineClasses = (0, _objectsToString.default)(base.line);
      var containerClasses = (0, _tailwindMerge.twMerge)((0, _objectsToString.default)(base.container), className);
      return _react.default.createElement("span", _extends({}, rest, { ref, className: containerClasses, style: { top: "".concat(width, "px"), width: "".concat(width, "px"), opacity: width ? 1 : 0, height: "calc(100% - ".concat(width, "px)") } }), children && _react.default.isValidElement(children) ? _react.default.cloneElement(children, { className: (0, _tailwindMerge.twMerge)(lineClasses, (_children_props = children.props) === null || _children_props === void 0 ? void 0 : _children_props.className) }) : _react.default.createElement("span", { className: lineClasses }));
    });
    TimelineConnector.propTypes = { children: _timeline.propTypeChildren, className: _timeline.propTypeClassName };
    TimelineConnector.displayName = "MaterialTailwind.TimelineConnector";
    var _default = TimelineConnector;
  }
});

// node_modules/@material-tailwind/react/components/Timeline/index.js
var require_Timeline = __commonJS({
  "node_modules/@material-tailwind/react/components/Timeline/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Timeline: function() {
      return Timeline;
    }, TimelineItem: function() {
      return _timelineItem.default;
    }, TimelineIcon: function() {
      return _timelineIcon.default;
    }, TimelineBody: function() {
      return _timelineBody.default;
    }, TimelineHeader: function() {
      return _timelineHeader.default;
    }, TimelineConnector: function() {
      return _timelineConnector.default;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _timeline = require_timeline();
    var _timelineItem = _interopRequireDefault(require_TimelineItem());
    var _timelineIcon = _interopRequireDefault(require_TimelineIcon());
    var _timelineBody = _interopRequireDefault(require_TimelineBody());
    var _timelineHeader = _interopRequireDefault(require_TimelineHeader());
    var _timelineConnector = _interopRequireDefault(require_TimelineConnector());
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Timeline = _react.default.forwardRef(function(_param, ref) {
      var className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["className", "children"]);
      var timeline = (0, _theme.useTheme)().timeline;
      var styles = timeline.styles;
      var base = styles.base;
      var classes = (0, _tailwindMerge.twMerge)((0, _objectsToString.default)(base), className);
      return _react.default.createElement("ul", _extends({ ref }, rest, { className: classes }), children);
    });
    Timeline.propTypes = { className: _timeline.propTypeClassName, children: _timeline.propTypeChildren };
    Timeline.displayName = "MaterialTailwind.Timeline";
    var _default = Object.assign(Timeline, { Item: _timelineItem.default, Icon: _timelineIcon.default, Header: _timelineHeader.default, Body: _timelineBody.default, Connector: _timelineConnector.default });
  }
});

// node_modules/@material-tailwind/react/types/components/stepper.js
var require_stepper = __commonJS({
  "node_modules/@material-tailwind/react/types/components/stepper.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { propTypesActiveStep: function() {
      return propTypesActiveStep;
    }, propTypesIsLastStep: function() {
      return propTypesIsLastStep;
    }, propTypesIsFirstStep: function() {
      return propTypesIsFirstStep;
    }, propTypesChildren: function() {
      return propTypesChildren;
    }, propTypesClassName: function() {
      return propTypesClassName;
    } });
    var _propTypes = _interopRequireDefault(require_prop_types());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var propTypesActiveStep = _propTypes.default.number;
    var propTypesIsLastStep = _propTypes.default.func;
    var propTypesIsFirstStep = _propTypes.default.func;
    var propTypesChildren = _propTypes.default.node;
    var propTypesClassName = _propTypes.default.string;
  }
});

// node_modules/@material-tailwind/react/components/Stepper/Step.js
var require_Step = __commonJS({
  "node_modules/@material-tailwind/react/components/Stepper/Step.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Step: function() {
      return Step;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _stepper = require_stepper();
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var Step = _react.default.forwardRef(function(_param, ref) {
      var className = _param.className, activeClassName = _param.activeClassName, completedClassName = _param.completedClassName, children = _param.children, rest = _objectWithoutProperties(_param, ["className", "activeClassName", "completedClassName", "children"]);
      var step = (0, _theme.useTheme)().step;
      var base = step.styles.base;
      var stepClasses = (0, _tailwindMerge.twMerge)((0, _objectsToString.default)(base.initial), className);
      return _react.default.createElement("div", _extends({}, rest, { ref, className: stepClasses }), children);
    });
    Step.propTypes = { className: _stepper.propTypesClassName, activeClassName: _stepper.propTypesClassName, completedClassName: _stepper.propTypesClassName, children: _stepper.propTypesChildren };
    Step.displayName = "MaterialTailwind.Step";
    var _default = Step;
  }
});

// node_modules/@material-tailwind/react/components/Stepper/index.js
var require_Stepper = __commonJS({
  "node_modules/@material-tailwind/react/components/Stepper/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { Stepper: function() {
      return Stepper;
    }, Step: function() {
      return _step.default;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _react1 = (init_floating_ui_react_esm(), __toCommonJS(floating_ui_react_esm_exports));
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _theme = require_theme2();
    var _step = _interopRequireDefault(require_Step());
    var _stepper = require_stepper();
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys2 = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys2.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpreadProps(target, source) {
      source = source != null ? source : {};
      if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    var Stepper = _react.default.forwardRef(function(_param, ref) {
      var activeStep = _param.activeStep, isFirstStep = _param.isFirstStep, isLastStep = _param.isLastStep, className = _param.className, lineClassName = _param.lineClassName, activeLineClassName = _param.activeLineClassName, children = _param.children, rest = _objectWithoutProperties(_param, ["activeStep", "isFirstStep", "isLastStep", "className", "lineClassName", "activeLineClassName", "children"]);
      var _useTheme = (0, _theme.useTheme)(), stepper = _useTheme.stepper, step = _useTheme.step;
      var base = stepper.styles.base;
      var _step_styles = step.styles, stepBase = _step_styles.base;
      var containerRef = _react.default.useRef(null);
      var _React_useState = _slicedToArray(_react.default.useState(0), 2), widthPerStep = _React_useState[0], setWidthPerStep = _React_useState[1];
      var isFirstStepValue = activeStep === 0;
      var isLastStepValue = Array.isArray(children) && activeStep === children.length - 1;
      var isReachEnd = Array.isArray(children) && activeStep > children.length - 1;
      _react.default.useEffect(function() {
        if (containerRef.current) {
          var childrenInstance = children;
          var width2 = containerRef.current.getBoundingClientRect().width;
          var widthPerStepCalc = width2 / (childrenInstance.length - 1);
          setWidthPerStep(widthPerStepCalc);
        }
      }, [children]);
      var width = _react.default.useMemo(function() {
        if (!isReachEnd) {
          return widthPerStep * activeStep;
        }
      }, [activeStep, isReachEnd, widthPerStep]);
      var mergedRef = (0, _react1.useMergeRefs)([ref, containerRef]);
      var stepperClasses = (0, _tailwindMerge.twMerge)((0, _objectsToString.default)(base.stepper), className);
      var lineClasses = (0, _tailwindMerge.twMerge)((0, _objectsToString.default)(base.line.initial), lineClassName);
      var activeLineClasses = (0, _tailwindMerge.twMerge)(lineClasses, (0, _objectsToString.default)(base.line.active), activeLineClassName);
      var activeStepClasses = (0, _objectsToString.default)(stepBase.active);
      var completedStepClasses = (0, _objectsToString.default)(stepBase.completed);
      _react.default.useEffect(function() {
        isLastStep && typeof isLastStep === "function" && isLastStep(isLastStepValue);
        isFirstStep && typeof isFirstStep === "function" && isFirstStep(isFirstStepValue);
      }, [isFirstStep, isFirstStepValue, isLastStep, isLastStepValue]);
      return _react.default.createElement("div", _extends({}, rest, { ref: containerRef, className: stepperClasses }), _react.default.createElement("div", { className: lineClasses }), _react.default.createElement("div", { className: activeLineClasses, style: { width: "".concat(width, "px") } }), Array.isArray(children) ? children.map(function(child, index) {
        var _child_props, _child_props1;
        return _react.default.cloneElement(child, _objectSpreadProps(_objectSpread({ key: index }, child.props), { className: (0, _tailwindMerge.twMerge)(child.props.className, index === activeStep ? (0, _tailwindMerge.twMerge)(activeStepClasses, (_child_props = child.props) === null || _child_props === void 0 ? void 0 : _child_props.activeClassName) : index < activeStep ? (0, _tailwindMerge.twMerge)(completedStepClasses, (_child_props1 = child.props) === null || _child_props1 === void 0 ? void 0 : _child_props1.completedClassName) : "") }));
      }) : children);
    });
    Stepper.propTypes = { activeStep: _stepper.propTypesActiveStep, isFirstStep: _stepper.propTypesIsFirstStep, isLastStep: _stepper.propTypesIsLastStep, className: _stepper.propTypesClassName, lineClassName: _stepper.propTypesClassName, activeLineClassName: _stepper.propTypesClassName, children: _stepper.propTypesChildren };
    Stepper.displayName = "MaterialTailwind.Stepper";
    var _default = Object.assign(Stepper, { Step: _step.default });
  }
});

// node_modules/@material-tailwind/react/types/components/speedDial.js
var require_speedDial = __commonJS({
  "node_modules/@material-tailwind/react/types/components/speedDial.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { propTypesOpen: function() {
      return propTypesOpen;
    }, propTypesHanlder: function() {
      return propTypesHanlder;
    }, propTypesPlacement: function() {
      return propTypesPlacement;
    }, propTypesOffset: function() {
      return propTypesOffset;
    }, propTypesDismiss: function() {
      return propTypesDismiss;
    }, propTypesChildren: function() {
      return propTypesChildren;
    }, propTypesAnimate: function() {
      return propTypesAnimate;
    }, propTypesClassName: function() {
      return propTypesClassName;
    } });
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _generic = require_generic();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    var propTypesOpen = _propTypes.default.bool;
    var propTypesHanlder = _propTypes.default.func;
    var propTypesPlacement = _propTypes.default.oneOf(_generic.propTypesPlacements);
    var propTypesOffset = _generic.propTypesOffsetType;
    var propTypesDismiss = _generic.propTypesDismissType;
    var propTypesChildren = _propTypes.default.node.isRequired;
    var propTypesAnimate = _generic.propTypesAnimation;
    var propTypesClassName = _propTypes.default.string;
  }
});

// node_modules/@material-tailwind/react/components/SpeedDial/SpeedDialHandler.js
var require_SpeedDialHandler = __commonJS({
  "node_modules/@material-tailwind/react/components/SpeedDial/SpeedDialHandler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { SpeedDialHandler: function() {
      return SpeedDialHandler;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _react1 = (init_floating_ui_react_esm(), __toCommonJS(floating_ui_react_esm_exports));
    var _index = require_SpeedDial();
    var _tailwindMerge = require_dist();
    var _speedDial = require_speedDial();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys2 = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys2 = ownKeys2.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys2.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
          symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }
        keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpreadProps(target, source) {
      source = source != null ? source : {};
      if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
      return target;
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var SpeedDialHandler = _react.default.forwardRef(function(_param, ref) {
      var children = _param.children, rest = _objectWithoutProperties(_param, ["children"]);
      var _children_props;
      var _useSpeedDial = (0, _index.useSpeedDial)(), getReferenceProps = _useSpeedDial.getReferenceProps, refs = _useSpeedDial.refs;
      var mergedRef = (0, _react1.useMergeRefs)([ref, refs.setReference]);
      return _react.default.cloneElement(children, _objectSpread({}, getReferenceProps(_objectSpreadProps(_objectSpread({}, rest), { ref: mergedRef, className: (0, _tailwindMerge.twMerge)(children === null || children === void 0 ? void 0 : (_children_props = children.props) === null || _children_props === void 0 ? void 0 : _children_props.className, rest === null || rest === void 0 ? void 0 : rest.className) }))));
    });
    SpeedDialHandler.propTypes = { children: _speedDial.propTypesChildren };
    SpeedDialHandler.displayName = "MaterialTailwind.SpeedDialHandler";
    var _default = SpeedDialHandler;
  }
});

// node_modules/@material-tailwind/react/components/SpeedDial/SpeedDialContent.js
var require_SpeedDialContent = __commonJS({
  "node_modules/@material-tailwind/react/components/SpeedDial/SpeedDialContent.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { SpeedDialContent: function() {
      return SpeedDialContent;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _framerMotion = require_cjs2();
    var _react1 = (init_floating_ui_react_esm(), __toCommonJS(floating_ui_react_esm_exports));
    var _index = require_SpeedDial();
    var _theme = require_theme2();
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _speedDial = require_speedDial();
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var SpeedDialContent = _react.default.forwardRef(function(_param, ref) {
      var children = _param.children, className = _param.className, rest = _objectWithoutProperties(_param, ["children", "className"]);
      var _useTheme = (0, _theme.useTheme)(), styles = _useTheme.speedDialContent.styles;
      var _useSpeedDial = (0, _index.useSpeedDial)(), x = _useSpeedDial.x, y = _useSpeedDial.y, refs = _useSpeedDial.refs, open = _useSpeedDial.open, strategy = _useSpeedDial.strategy, getFloatingProps = _useSpeedDial.getFloatingProps, animation = _useSpeedDial.animation;
      var mergedRefs = (0, _react1.useMergeRefs)([ref, refs.setFloating]);
      var classes = (0, _tailwindMerge.twMerge)((0, _objectsToString.default)(styles), className);
      var NewAnimatePresence = _framerMotion.AnimatePresence;
      return _react.default.createElement(_framerMotion.LazyMotion, { features: _framerMotion.domAnimation }, _react.default.createElement(NewAnimatePresence, null, open && _react.default.createElement("div", _extends({}, rest, { ref: mergedRefs, className: classes, style: { position: strategy, top: y !== null && y !== void 0 ? y : 0, left: x !== null && x !== void 0 ? x : 0 } }, getFloatingProps()), _react.default.Children.map(children, function(child) {
        return _react.default.createElement(_framerMotion.m.div, { initial: "unmount", exit: "unmount", animate: open ? "mount" : "unmount", variants: animation }, child);
      }))));
    });
    SpeedDialContent.propTypes = { children: _speedDial.propTypesChildren, className: _speedDial.propTypesClassName };
    SpeedDialContent.displayName = "MaterialTailwind.SpeedDialContent";
    var _default = SpeedDialContent;
  }
});

// node_modules/@material-tailwind/react/components/SpeedDial/SpeedDialAction.js
var require_SpeedDialAction = __commonJS({
  "node_modules/@material-tailwind/react/components/SpeedDial/SpeedDialAction.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { SpeedDialAction: function() {
      return SpeedDialAction;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _theme = require_theme2();
    var _tailwindMerge = require_dist();
    var _objectsToString = _interopRequireDefault(require_objectsToString());
    var _speedDial = require_speedDial();
    function _extends() {
      _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };
      return _extends.apply(this, arguments);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null) return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0) continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }
      return target;
    }
    var SpeedDialAction = _react.default.forwardRef(function(_param, ref) {
      var className = _param.className, children = _param.children, rest = _objectWithoutProperties(_param, ["className", "children"]);
      var _useTheme = (0, _theme.useTheme)(), styles = _useTheme.speedDialAction.styles;
      var classes = (0, _tailwindMerge.twMerge)((0, _objectsToString.default)(styles), className);
      return _react.default.createElement("button", _extends({}, rest, { ref, className: classes }), children);
    });
    SpeedDialAction.propTypes = { children: _speedDial.propTypesChildren, className: _speedDial.propTypesClassName };
    SpeedDialAction.displayName = "SpeedDialAction";
    var _default = SpeedDialAction;
  }
});

// node_modules/@material-tailwind/react/components/SpeedDial/index.js
var require_SpeedDial = __commonJS({
  "node_modules/@material-tailwind/react/components/SpeedDial/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function _export(target, all) {
      for (var name in all) Object.defineProperty(target, name, { enumerable: true, get: all[name] });
    }
    _export(exports, { SpeedDialContext: function() {
      return SpeedDialContext;
    }, useSpeedDial: function() {
      return useSpeedDial;
    }, SpeedDial: function() {
      return SpeedDial;
    }, SpeedDialHandler: function() {
      return _speedDialHandler.default;
    }, SpeedDialContent: function() {
      return _speedDialContent.default;
    }, SpeedDialAction: function() {
      return _speedDialAction.default;
    }, default: function() {
      return _default;
    } });
    var _react = _interopRequireDefault(require_react());
    var _react1 = (init_floating_ui_react_esm(), __toCommonJS(floating_ui_react_esm_exports));
    var _theme = require_theme2();
    var _deepmerge = _interopRequireDefault(require_cjs());
    var _speedDial = require_speedDial();
    var _speedDialHandler = _interopRequireDefault(require_SpeedDialHandler());
    var _speedDialContent = _interopRequireDefault(require_SpeedDialContent());
    var _speedDialAction = _interopRequireDefault(require_SpeedDialAction());
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { default: obj };
    }
    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;
      var _s, _e;
      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(n);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }
    var SpeedDialContext = _react.default.createContext(null);
    function useSpeedDial() {
      var context = _react.default.useContext(SpeedDialContext);
      if (!context) {
        throw new Error("useSpeedDial must be used within a <SpeedDial />.");
      }
      return context;
    }
    function SpeedDial(param) {
      var open = param.open, handler = param.handler, placement = param.placement, offset = param.offset, dismiss = param.dismiss, animate = param.animate, children = param.children;
      var _useTheme = (0, _theme.useTheme)(), defaultProps = _useTheme.speedDial.defaultProps;
      var _React_useState = _slicedToArray(_react.default.useState(false), 2), internalOpen = _React_useState[0], setInternalOpen = _React_useState[1];
      open = open !== null && open !== void 0 ? open : internalOpen;
      handler = handler !== null && handler !== void 0 ? handler : setInternalOpen;
      placement = placement !== null && placement !== void 0 ? placement : defaultProps.placement;
      offset = offset !== null && offset !== void 0 ? offset : defaultProps.offset;
      dismiss = dismiss !== null && dismiss !== void 0 ? dismiss : defaultProps.dismiss;
      animate = animate !== null && animate !== void 0 ? animate : defaultProps.animate;
      var animation = { unmount: { opacity: 0, transform: "scale(0.5)", transition: { duration: 0.2, times: [0.4, 0, 0.2, 1] } }, mount: { opacity: 1, transform: "scale(1)", transition: { duration: 0.2, times: [0.4, 0, 0.2, 1] } } };
      var appliedAnimation = (0, _deepmerge.default)(animation, animate);
      var nodeId = (0, _react1.useFloatingNodeId)();
      var _useFloating = (0, _react1.useFloating)({ open, nodeId, placement, onOpenChange: handler, whileElementsMounted: _react1.autoUpdate, middleware: [(0, _react1.offset)(offset), (0, _react1.flip)(), (0, _react1.shift)()] }), x = _useFloating.x, y = _useFloating.y, strategy = _useFloating.strategy, refs = _useFloating.refs, context = _useFloating.context;
      var _useInteractions = (0, _react1.useInteractions)([(0, _react1.useHover)(context, { handleClose: (0, _react1.safePolygon)() }), (0, _react1.useDismiss)(context, dismiss)]), getReferenceProps = _useInteractions.getReferenceProps, getFloatingProps = _useInteractions.getFloatingProps;
      var contextValue = _react.default.useMemo(function() {
        return { x, y, strategy, refs, open, context, getReferenceProps, getFloatingProps, animation: appliedAnimation };
      }, [context, getFloatingProps, getReferenceProps, refs, strategy, x, y, open, appliedAnimation]);
      return _react.default.createElement(SpeedDialContext.Provider, { value: contextValue }, _react.default.createElement("div", { className: "group" }, _react.default.createElement(_react1.FloatingNode, { id: nodeId }, children)));
    }
    SpeedDial.propTypes = { open: _speedDial.propTypesOpen, handler: _speedDial.propTypesHanlder, placement: _speedDial.propTypesPlacement, offset: _speedDial.propTypesOffset, dismiss: _speedDial.propTypesDismiss, className: _speedDial.propTypesClassName, children: _speedDial.propTypesChildren, animate: _speedDial.propTypesAnimate };
    SpeedDial.displayName = "MaterialTailwind.SpeedDial";
    var _default = Object.assign(SpeedDial, { Handler: _speedDialHandler.default, Content: _speedDialContent.default, Action: _speedDialAction.default });
  }
});

// node_modules/@material-tailwind/react/index.js
var require_react2 = __commonJS({
  "node_modules/@material-tailwind/react/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    _exportStar(require_Accordion(), exports);
    _exportStar(require_Alert(), exports);
    _exportStar(require_Avatar(), exports);
    _exportStar(require_Breadcrumbs(), exports);
    _exportStar(require_Button(), exports);
    _exportStar(require_Card(), exports);
    _exportStar(require_Checkbox(), exports);
    _exportStar(require_Chip(), exports);
    _exportStar(require_Dialog(), exports);
    _exportStar(require_IconButton(), exports);
    _exportStar(require_Input(), exports);
    _exportStar(require_Menu(), exports);
    _exportStar(require_Navbar(), exports);
    _exportStar(require_Popover(), exports);
    _exportStar(require_Progress(), exports);
    _exportStar(require_Radio(), exports);
    _exportStar(require_Select(), exports);
    _exportStar(require_Switch(), exports);
    _exportStar(require_Tabs(), exports);
    _exportStar(require_Textarea(), exports);
    _exportStar(require_Tooltip(), exports);
    _exportStar(require_Typography(), exports);
    _exportStar(require_Collapse(), exports);
    _exportStar(require_List(), exports);
    _exportStar(require_ButtonGroup(), exports);
    _exportStar(require_Carousel(), exports);
    _exportStar(require_Drawer(), exports);
    _exportStar(require_Badge(), exports);
    _exportStar(require_Rating(), exports);
    _exportStar(require_Slider(), exports);
    _exportStar(require_Spinner(), exports);
    _exportStar(require_Timeline(), exports);
    _exportStar(require_Stepper(), exports);
    _exportStar(require_SpeedDial(), exports);
    _exportStar(require_theme2(), exports);
    _exportStar(require_theme(), exports);
    function _exportStar(from, to) {
      Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) Object.defineProperty(to, k, { enumerable: true, get: function() {
          return from[k];
        } });
      });
      return from;
    }
  }
});
export default require_react2();
//# sourceMappingURL=@material-tailwind_react.js.map
