import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { commonjsGlobal, getDefaultExportFromCjs, distExports } from "./index.js";
import React__default from "react";
var immutable, hasRequiredImmutable;
function requireImmutable() {
  if (hasRequiredImmutable) return immutable;
  hasRequiredImmutable = 1, immutable = extend;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function extend() {
    for (var target2 = {}, i = 0; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source)
        hasOwnProperty.call(source, key) && (target2[key] = source[key]);
    }
    return target2;
  }
  return immutable;
}
var schema, hasRequiredSchema;
function requireSchema() {
  if (hasRequiredSchema) return schema;
  hasRequiredSchema = 1, schema = Schema;
  var proto = Schema.prototype;
  proto.space = null, proto.normal = {}, proto.property = {};
  function Schema(property, normal, space) {
    this.property = property, this.normal = normal, space && (this.space = space);
  }
  return schema;
}
var merge_1, hasRequiredMerge;
function requireMerge() {
  if (hasRequiredMerge) return merge_1;
  hasRequiredMerge = 1;
  var xtend = requireImmutable(), Schema = requireSchema();
  merge_1 = merge;
  function merge(definitions) {
    for (var length = definitions.length, property = [], normal = [], index = -1, info2, space; ++index < length; )
      info2 = definitions[index], property.push(info2.property), normal.push(info2.normal), space = info2.space;
    return new Schema(
      xtend.apply(null, property),
      xtend.apply(null, normal),
      space
    );
  }
  return merge_1;
}
var normalize_1, hasRequiredNormalize;
function requireNormalize() {
  if (hasRequiredNormalize) return normalize_1;
  hasRequiredNormalize = 1, normalize_1 = normalize;
  function normalize(value) {
    return value.toLowerCase();
  }
  return normalize_1;
}
var info, hasRequiredInfo;
function requireInfo() {
  if (hasRequiredInfo) return info;
  hasRequiredInfo = 1, info = Info;
  var proto = Info.prototype;
  proto.space = null, proto.attribute = null, proto.property = null, proto.boolean = !1, proto.booleanish = !1, proto.overloadedBoolean = !1, proto.number = !1, proto.commaSeparated = !1, proto.spaceSeparated = !1, proto.commaOrSpaceSeparated = !1, proto.mustUseProperty = !1, proto.defined = !1;
  function Info(property, attribute) {
    this.property = property, this.attribute = attribute;
  }
  return info;
}
var types = {}, hasRequiredTypes;
function requireTypes() {
  if (hasRequiredTypes) return types;
  hasRequiredTypes = 1;
  var powers = 0;
  types.boolean = increment(), types.booleanish = increment(), types.overloadedBoolean = increment(), types.number = increment(), types.spaceSeparated = increment(), types.commaSeparated = increment(), types.commaOrSpaceSeparated = increment();
  function increment() {
    return Math.pow(2, ++powers);
  }
  return types;
}
var definedInfo, hasRequiredDefinedInfo;
function requireDefinedInfo() {
  if (hasRequiredDefinedInfo) return definedInfo;
  hasRequiredDefinedInfo = 1;
  var Info = requireInfo(), types2 = requireTypes();
  definedInfo = DefinedInfo, DefinedInfo.prototype = new Info(), DefinedInfo.prototype.defined = !0;
  var checks = [
    "boolean",
    "booleanish",
    "overloadedBoolean",
    "number",
    "commaSeparated",
    "spaceSeparated",
    "commaOrSpaceSeparated"
  ], checksLength = checks.length;
  function DefinedInfo(property, attribute, mask, space) {
    var index = -1, check2;
    for (mark(this, "space", space), Info.call(this, property, attribute); ++index < checksLength; )
      check2 = checks[index], mark(this, check2, (mask & types2[check2]) === types2[check2]);
  }
  function mark(values, key, value) {
    value && (values[key] = value);
  }
  return definedInfo;
}
var create_1, hasRequiredCreate;
function requireCreate() {
  if (hasRequiredCreate) return create_1;
  hasRequiredCreate = 1;
  var normalize = requireNormalize(), Schema = requireSchema(), DefinedInfo = requireDefinedInfo();
  create_1 = create;
  function create(definition) {
    var space = definition.space, mustUseProperty = definition.mustUseProperty || [], attributes = definition.attributes || {}, props = definition.properties, transform = definition.transform, property = {}, normal = {}, prop2, info2;
    for (prop2 in props)
      info2 = new DefinedInfo(
        prop2,
        transform(attributes, prop2),
        props[prop2],
        space
      ), mustUseProperty.indexOf(prop2) !== -1 && (info2.mustUseProperty = !0), property[prop2] = info2, normal[normalize(prop2)] = prop2, normal[normalize(info2.attribute)] = prop2;
    return new Schema(property, normal, space);
  }
  return create_1;
}
var xlink, hasRequiredXlink;
function requireXlink() {
  if (hasRequiredXlink) return xlink;
  hasRequiredXlink = 1;
  var create = requireCreate();
  xlink = create({
    space: "xlink",
    transform: xlinkTransform,
    properties: {
      xLinkActuate: null,
      xLinkArcRole: null,
      xLinkHref: null,
      xLinkRole: null,
      xLinkShow: null,
      xLinkTitle: null,
      xLinkType: null
    }
  });
  function xlinkTransform(_, prop2) {
    return "xlink:" + prop2.slice(5).toLowerCase();
  }
  return xlink;
}
var xml, hasRequiredXml;
function requireXml() {
  if (hasRequiredXml) return xml;
  hasRequiredXml = 1;
  var create = requireCreate();
  xml = create({
    space: "xml",
    transform: xmlTransform,
    properties: {
      xmlLang: null,
      xmlBase: null,
      xmlSpace: null
    }
  });
  function xmlTransform(_, prop2) {
    return "xml:" + prop2.slice(3).toLowerCase();
  }
  return xml;
}
var caseSensitiveTransform_1, hasRequiredCaseSensitiveTransform;
function requireCaseSensitiveTransform() {
  if (hasRequiredCaseSensitiveTransform) return caseSensitiveTransform_1;
  hasRequiredCaseSensitiveTransform = 1, caseSensitiveTransform_1 = caseSensitiveTransform;
  function caseSensitiveTransform(attributes, attribute) {
    return attribute in attributes ? attributes[attribute] : attribute;
  }
  return caseSensitiveTransform_1;
}
var caseInsensitiveTransform_1, hasRequiredCaseInsensitiveTransform;
function requireCaseInsensitiveTransform() {
  if (hasRequiredCaseInsensitiveTransform) return caseInsensitiveTransform_1;
  hasRequiredCaseInsensitiveTransform = 1;
  var caseSensitiveTransform = requireCaseSensitiveTransform();
  caseInsensitiveTransform_1 = caseInsensitiveTransform;
  function caseInsensitiveTransform(attributes, property) {
    return caseSensitiveTransform(attributes, property.toLowerCase());
  }
  return caseInsensitiveTransform_1;
}
var xmlns, hasRequiredXmlns;
function requireXmlns() {
  if (hasRequiredXmlns) return xmlns;
  hasRequiredXmlns = 1;
  var create = requireCreate(), caseInsensitiveTransform = requireCaseInsensitiveTransform();
  return xmlns = create({
    space: "xmlns",
    attributes: {
      xmlnsxlink: "xmlns:xlink"
    },
    transform: caseInsensitiveTransform,
    properties: {
      xmlns: null,
      xmlnsXLink: null
    }
  }), xmlns;
}
var aria, hasRequiredAria;
function requireAria() {
  if (hasRequiredAria) return aria;
  hasRequiredAria = 1;
  var types2 = requireTypes(), create = requireCreate(), booleanish = types2.booleanish, number = types2.number, spaceSeparated = types2.spaceSeparated;
  aria = create({
    transform: ariaTransform,
    properties: {
      ariaActiveDescendant: null,
      ariaAtomic: booleanish,
      ariaAutoComplete: null,
      ariaBusy: booleanish,
      ariaChecked: booleanish,
      ariaColCount: number,
      ariaColIndex: number,
      ariaColSpan: number,
      ariaControls: spaceSeparated,
      ariaCurrent: null,
      ariaDescribedBy: spaceSeparated,
      ariaDetails: null,
      ariaDisabled: booleanish,
      ariaDropEffect: spaceSeparated,
      ariaErrorMessage: null,
      ariaExpanded: booleanish,
      ariaFlowTo: spaceSeparated,
      ariaGrabbed: booleanish,
      ariaHasPopup: null,
      ariaHidden: booleanish,
      ariaInvalid: null,
      ariaKeyShortcuts: null,
      ariaLabel: null,
      ariaLabelledBy: spaceSeparated,
      ariaLevel: number,
      ariaLive: null,
      ariaModal: booleanish,
      ariaMultiLine: booleanish,
      ariaMultiSelectable: booleanish,
      ariaOrientation: null,
      ariaOwns: spaceSeparated,
      ariaPlaceholder: null,
      ariaPosInSet: number,
      ariaPressed: booleanish,
      ariaReadOnly: booleanish,
      ariaRelevant: null,
      ariaRequired: booleanish,
      ariaRoleDescription: spaceSeparated,
      ariaRowCount: number,
      ariaRowIndex: number,
      ariaRowSpan: number,
      ariaSelected: booleanish,
      ariaSetSize: number,
      ariaSort: null,
      ariaValueMax: number,
      ariaValueMin: number,
      ariaValueNow: number,
      ariaValueText: null,
      role: null
    }
  });
  function ariaTransform(_, prop2) {
    return prop2 === "role" ? prop2 : "aria-" + prop2.slice(4).toLowerCase();
  }
  return aria;
}
var html, hasRequiredHtml$2;
function requireHtml$2() {
  if (hasRequiredHtml$2) return html;
  hasRequiredHtml$2 = 1;
  var types2 = requireTypes(), create = requireCreate(), caseInsensitiveTransform = requireCaseInsensitiveTransform(), boolean = types2.boolean, overloadedBoolean = types2.overloadedBoolean, booleanish = types2.booleanish, number = types2.number, spaceSeparated = types2.spaceSeparated, commaSeparated = types2.commaSeparated;
  return html = create({
    space: "html",
    attributes: {
      acceptcharset: "accept-charset",
      classname: "class",
      htmlfor: "for",
      httpequiv: "http-equiv"
    },
    transform: caseInsensitiveTransform,
    mustUseProperty: ["checked", "multiple", "muted", "selected"],
    properties: {
      // Standard Properties.
      abbr: null,
      accept: commaSeparated,
      acceptCharset: spaceSeparated,
      accessKey: spaceSeparated,
      action: null,
      allow: null,
      allowFullScreen: boolean,
      allowPaymentRequest: boolean,
      allowUserMedia: boolean,
      alt: null,
      as: null,
      async: boolean,
      autoCapitalize: null,
      autoComplete: spaceSeparated,
      autoFocus: boolean,
      autoPlay: boolean,
      capture: boolean,
      charSet: null,
      checked: boolean,
      cite: null,
      className: spaceSeparated,
      cols: number,
      colSpan: null,
      content: null,
      contentEditable: booleanish,
      controls: boolean,
      controlsList: spaceSeparated,
      coords: number | commaSeparated,
      crossOrigin: null,
      data: null,
      dateTime: null,
      decoding: null,
      default: boolean,
      defer: boolean,
      dir: null,
      dirName: null,
      disabled: boolean,
      download: overloadedBoolean,
      draggable: booleanish,
      encType: null,
      enterKeyHint: null,
      form: null,
      formAction: null,
      formEncType: null,
      formMethod: null,
      formNoValidate: boolean,
      formTarget: null,
      headers: spaceSeparated,
      height: number,
      hidden: boolean,
      high: number,
      href: null,
      hrefLang: null,
      htmlFor: spaceSeparated,
      httpEquiv: spaceSeparated,
      id: null,
      imageSizes: null,
      imageSrcSet: commaSeparated,
      inputMode: null,
      integrity: null,
      is: null,
      isMap: boolean,
      itemId: null,
      itemProp: spaceSeparated,
      itemRef: spaceSeparated,
      itemScope: boolean,
      itemType: spaceSeparated,
      kind: null,
      label: null,
      lang: null,
      language: null,
      list: null,
      loading: null,
      loop: boolean,
      low: number,
      manifest: null,
      max: null,
      maxLength: number,
      media: null,
      method: null,
      min: null,
      minLength: number,
      multiple: boolean,
      muted: boolean,
      name: null,
      nonce: null,
      noModule: boolean,
      noValidate: boolean,
      onAbort: null,
      onAfterPrint: null,
      onAuxClick: null,
      onBeforePrint: null,
      onBeforeUnload: null,
      onBlur: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onContextMenu: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFormData: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLanguageChange: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadEnd: null,
      onLoadStart: null,
      onMessage: null,
      onMessageError: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRejectionHandled: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onSecurityPolicyViolation: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onSlotChange: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnhandledRejection: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onWheel: null,
      open: boolean,
      optimum: number,
      pattern: null,
      ping: spaceSeparated,
      placeholder: null,
      playsInline: boolean,
      poster: null,
      preload: null,
      readOnly: boolean,
      referrerPolicy: null,
      rel: spaceSeparated,
      required: boolean,
      reversed: boolean,
      rows: number,
      rowSpan: number,
      sandbox: spaceSeparated,
      scope: null,
      scoped: boolean,
      seamless: boolean,
      selected: boolean,
      shape: null,
      size: number,
      sizes: null,
      slot: null,
      span: number,
      spellCheck: booleanish,
      src: null,
      srcDoc: null,
      srcLang: null,
      srcSet: commaSeparated,
      start: number,
      step: null,
      style: null,
      tabIndex: number,
      target: null,
      title: null,
      translate: null,
      type: null,
      typeMustMatch: boolean,
      useMap: null,
      value: booleanish,
      width: number,
      wrap: null,
      // Legacy.
      // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
      align: null,
      // Several. Use CSS `text-align` instead,
      aLink: null,
      // `<body>`. Use CSS `a:active {color}` instead
      archive: spaceSeparated,
      // `<object>`. List of URIs to archives
      axis: null,
      // `<td>` and `<th>`. Use `scope` on `<th>`
      background: null,
      // `<body>`. Use CSS `background-image` instead
      bgColor: null,
      // `<body>` and table elements. Use CSS `background-color` instead
      border: number,
      // `<table>`. Use CSS `border-width` instead,
      borderColor: null,
      // `<table>`. Use CSS `border-color` instead,
      bottomMargin: number,
      // `<body>`
      cellPadding: null,
      // `<table>`
      cellSpacing: null,
      // `<table>`
      char: null,
      // Several table elements. When `align=char`, sets the character to align on
      charOff: null,
      // Several table elements. When `char`, offsets the alignment
      classId: null,
      // `<object>`
      clear: null,
      // `<br>`. Use CSS `clear` instead
      code: null,
      // `<object>`
      codeBase: null,
      // `<object>`
      codeType: null,
      // `<object>`
      color: null,
      // `<font>` and `<hr>`. Use CSS instead
      compact: boolean,
      // Lists. Use CSS to reduce space between items instead
      declare: boolean,
      // `<object>`
      event: null,
      // `<script>`
      face: null,
      // `<font>`. Use CSS instead
      frame: null,
      // `<table>`
      frameBorder: null,
      // `<iframe>`. Use CSS `border` instead
      hSpace: number,
      // `<img>` and `<object>`
      leftMargin: number,
      // `<body>`
      link: null,
      // `<body>`. Use CSS `a:link {color: *}` instead
      longDesc: null,
      // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
      lowSrc: null,
      // `<img>`. Use a `<picture>`
      marginHeight: number,
      // `<body>`
      marginWidth: number,
      // `<body>`
      noResize: boolean,
      // `<frame>`
      noHref: boolean,
      // `<area>`. Use no href instead of an explicit `nohref`
      noShade: boolean,
      // `<hr>`. Use background-color and height instead of borders
      noWrap: boolean,
      // `<td>` and `<th>`
      object: null,
      // `<applet>`
      profile: null,
      // `<head>`
      prompt: null,
      // `<isindex>`
      rev: null,
      // `<link>`
      rightMargin: number,
      // `<body>`
      rules: null,
      // `<table>`
      scheme: null,
      // `<meta>`
      scrolling: booleanish,
      // `<frame>`. Use overflow in the child context
      standby: null,
      // `<object>`
      summary: null,
      // `<table>`
      text: null,
      // `<body>`. Use CSS `color` instead
      topMargin: number,
      // `<body>`
      valueType: null,
      // `<param>`
      version: null,
      // `<html>`. Use a doctype.
      vAlign: null,
      // Several. Use CSS `vertical-align` instead
      vLink: null,
      // `<body>`. Use CSS `a:visited {color}` instead
      vSpace: number,
      // `<img>` and `<object>`
      // Non-standard Properties.
      allowTransparency: null,
      autoCorrect: null,
      autoSave: null,
      disablePictureInPicture: boolean,
      disableRemotePlayback: boolean,
      prefix: null,
      property: null,
      results: number,
      security: null,
      unselectable: null
    }
  }), html;
}
var html_1$1, hasRequiredHtml$1;
function requireHtml$1() {
  if (hasRequiredHtml$1) return html_1$1;
  hasRequiredHtml$1 = 1;
  var merge = requireMerge(), xlink2 = requireXlink(), xml2 = requireXml(), xmlns2 = requireXmlns(), aria2 = requireAria(), html2 = requireHtml$2();
  return html_1$1 = merge([xml2, xlink2, xmlns2, aria2, html2]), html_1$1;
}
var find_1, hasRequiredFind;
function requireFind() {
  if (hasRequiredFind) return find_1;
  hasRequiredFind = 1;
  var normalize = requireNormalize(), DefinedInfo = requireDefinedInfo(), Info = requireInfo(), data = "data";
  find_1 = find;
  var valid = /^data[-\w.:]+$/i, dash2 = /-[a-z]/g, cap2 = /[A-Z]/g;
  function find(schema2, value) {
    var normal = normalize(value), prop2 = value, Type = Info;
    return normal in schema2.normal ? schema2.property[schema2.normal[normal]] : (normal.length > 4 && normal.slice(0, 4) === data && valid.test(value) && (value.charAt(4) === "-" ? prop2 = datasetToProperty(value) : value = datasetToAttribute(value), Type = DefinedInfo), new Type(prop2, value));
  }
  function datasetToProperty(attribute) {
    var value = attribute.slice(5).replace(dash2, camelcase);
    return data + value.charAt(0).toUpperCase() + value.slice(1);
  }
  function datasetToAttribute(property) {
    var value = property.slice(4);
    return dash2.test(value) ? property : (value = value.replace(cap2, kebab), value.charAt(0) !== "-" && (value = "-" + value), data + value);
  }
  function kebab($0) {
    return "-" + $0.toLowerCase();
  }
  function camelcase($0) {
    return $0.charAt(1).toUpperCase();
  }
  return find_1;
}
var hastUtilParseSelector, hasRequiredHastUtilParseSelector;
function requireHastUtilParseSelector() {
  if (hasRequiredHastUtilParseSelector) return hastUtilParseSelector;
  hasRequiredHastUtilParseSelector = 1, hastUtilParseSelector = parse;
  var search = /[#.]/g;
  function parse(selector, defaultTagName) {
    for (var value = selector || "", name = defaultTagName || "div", props = {}, start = 0, subvalue, previous, match; start < value.length; )
      search.lastIndex = start, match = search.exec(value), subvalue = value.slice(start, match ? match.index : value.length), subvalue && (previous ? previous === "#" ? props.id = subvalue : props.className ? props.className.push(subvalue) : props.className = [subvalue] : name = subvalue, start += subvalue.length), match && (previous = match[0], start++);
    return { type: "element", tagName: name, properties: props, children: [] };
  }
  return hastUtilParseSelector;
}
var spaceSeparatedTokens = {}, hasRequiredSpaceSeparatedTokens;
function requireSpaceSeparatedTokens() {
  if (hasRequiredSpaceSeparatedTokens) return spaceSeparatedTokens;
  hasRequiredSpaceSeparatedTokens = 1, spaceSeparatedTokens.parse = parse, spaceSeparatedTokens.stringify = stringify;
  var empty2 = "", space = " ", whiteSpace = /[ \t\n\r\f]+/g;
  function parse(value) {
    var input = String(value || empty2).trim();
    return input === empty2 ? [] : input.split(whiteSpace);
  }
  function stringify(values) {
    return values.join(space).trim();
  }
  return spaceSeparatedTokens;
}
var commaSeparatedTokens = {}, hasRequiredCommaSeparatedTokens;
function requireCommaSeparatedTokens() {
  if (hasRequiredCommaSeparatedTokens) return commaSeparatedTokens;
  hasRequiredCommaSeparatedTokens = 1, commaSeparatedTokens.parse = parse, commaSeparatedTokens.stringify = stringify;
  var comma2 = ",", space = " ", empty2 = "";
  function parse(value) {
    for (var values = [], input = String(value || empty2), index = input.indexOf(comma2), lastIndex = 0, end = !1, val; !end; )
      index === -1 && (index = input.length, end = !0), val = input.slice(lastIndex, index).trim(), (val || !end) && values.push(val), lastIndex = index + 1, index = input.indexOf(comma2, lastIndex);
    return values;
  }
  function stringify(values, options) {
    var settings = options || {}, left = settings.padLeft === !1 ? empty2 : space, right = settings.padRight ? space : empty2;
    return values[values.length - 1] === empty2 && (values = values.concat(empty2)), values.join(right + comma2 + left).trim();
  }
  return commaSeparatedTokens;
}
var factory_1, hasRequiredFactory;
function requireFactory() {
  if (hasRequiredFactory) return factory_1;
  hasRequiredFactory = 1;
  var find = requireFind(), normalize = requireNormalize(), parseSelector = requireHastUtilParseSelector(), spaces = requireSpaceSeparatedTokens().parse, commas = requireCommaSeparatedTokens().parse;
  factory_1 = factory;
  var own = {}.hasOwnProperty;
  function factory(schema2, defaultTagName, caseSensitive) {
    var adjust = caseSensitive ? createAdjustMap(caseSensitive) : null;
    return h;
    function h(selector, properties) {
      var node = parseSelector(selector, defaultTagName), children = Array.prototype.slice.call(arguments, 2), name = node.tagName.toLowerCase(), property;
      if (node.tagName = adjust && own.call(adjust, name) ? adjust[name] : name, properties && isChildren(properties, node) && (children.unshift(properties), properties = null), properties)
        for (property in properties)
          addProperty(node.properties, property, properties[property]);
      return addChild(node.children, children), node.tagName === "template" && (node.content = { type: "root", children: node.children }, node.children = []), node;
    }
    function addProperty(properties, key, value) {
      var info2, property, result;
      value == null || value !== value || (info2 = find(schema2, key), property = info2.property, result = value, typeof result == "string" && (info2.spaceSeparated ? result = spaces(result) : info2.commaSeparated ? result = commas(result) : info2.commaOrSpaceSeparated && (result = spaces(commas(result).join(" ")))), property === "style" && typeof value != "string" && (result = style(result)), property === "className" && properties.className && (result = properties.className.concat(result)), properties[property] = parsePrimitives(info2, property, result));
    }
  }
  function isChildren(value, node) {
    return typeof value == "string" || "length" in value || isNode(node.tagName, value);
  }
  function isNode(tagName, value) {
    var type = value.type;
    return tagName === "input" || !type || typeof type != "string" ? !1 : typeof value.children == "object" && "length" in value.children ? !0 : (type = type.toLowerCase(), tagName === "button" ? type !== "menu" && type !== "submit" && type !== "reset" && type !== "button" : "value" in value);
  }
  function addChild(nodes, value) {
    var index, length;
    if (typeof value == "string" || typeof value == "number") {
      nodes.push({ type: "text", value: String(value) });
      return;
    }
    if (typeof value == "object" && "length" in value) {
      for (index = -1, length = value.length; ++index < length; )
        addChild(nodes, value[index]);
      return;
    }
    if (typeof value != "object" || !("type" in value))
      throw new Error("Expected node, nodes, or string, got `" + value + "`");
    nodes.push(value);
  }
  function parsePrimitives(info2, name, value) {
    var index, length, result;
    if (typeof value != "object" || !("length" in value))
      return parsePrimitive(info2, name, value);
    for (length = value.length, index = -1, result = []; ++index < length; )
      result[index] = parsePrimitive(info2, name, value[index]);
    return result;
  }
  function parsePrimitive(info2, name, value) {
    var result = value;
    return info2.number || info2.positiveNumber ? !isNaN(result) && result !== "" && (result = Number(result)) : (info2.boolean || info2.overloadedBoolean) && typeof result == "string" && (result === "" || normalize(value) === normalize(name)) && (result = !0), result;
  }
  function style(value) {
    var result = [], key;
    for (key in value)
      result.push([key, value[key]].join(": "));
    return result.join("; ");
  }
  function createAdjustMap(values) {
    for (var length = values.length, index = -1, result = {}, value; ++index < length; )
      value = values[index], result[value.toLowerCase()] = value;
    return result;
  }
  return factory_1;
}
var html_1, hasRequiredHtml;
function requireHtml() {
  if (hasRequiredHtml) return html_1;
  hasRequiredHtml = 1;
  var schema2 = requireHtml$1(), factory = requireFactory(), html2 = factory(schema2, "div");
  return html2.displayName = "html", html_1 = html2, html_1;
}
var hastscript, hasRequiredHastscript;
function requireHastscript() {
  return hasRequiredHastscript || (hasRequiredHastscript = 1, hastscript = requireHtml()), hastscript;
}
var AElig$1 = "\xC6", AMP$1 = "&", Aacute$1 = "\xC1", Acirc$1 = "\xC2", Agrave$1 = "\xC0", Aring$1 = "\xC5", Atilde$1 = "\xC3", Auml$1 = "\xC4", COPY$1 = "\xA9", Ccedil$1 = "\xC7", ETH$1 = "\xD0", Eacute$1 = "\xC9", Ecirc$1 = "\xCA", Egrave$1 = "\xC8", Euml$1 = "\xCB", GT$1 = ">", Iacute$1 = "\xCD", Icirc$1 = "\xCE", Igrave$1 = "\xCC", Iuml$1 = "\xCF", LT$1 = "<", Ntilde$1 = "\xD1", Oacute$1 = "\xD3", Ocirc$1 = "\xD4", Ograve$1 = "\xD2", Oslash$1 = "\xD8", Otilde$1 = "\xD5", Ouml$1 = "\xD6", QUOT$1 = '"', REG$1 = "\xAE", THORN$1 = "\xDE", Uacute$1 = "\xDA", Ucirc$1 = "\xDB", Ugrave$1 = "\xD9", Uuml$1 = "\xDC", Yacute$1 = "\xDD", aacute$1 = "\xE1", acirc$1 = "\xE2", acute$1 = "\xB4", aelig$1 = "\xE6", agrave$1 = "\xE0", amp$1 = "&", aring$1 = "\xE5", atilde$1 = "\xE3", auml$1 = "\xE4", brvbar$1 = "\xA6", ccedil$1 = "\xE7", cedil$1 = "\xB8", cent$1 = "\xA2", copy$1 = "\xA9", curren$1 = "\xA4", deg$1 = "\xB0", divide$1 = "\xF7", eacute$1 = "\xE9", ecirc$1 = "\xEA", egrave$1 = "\xE8", eth$1 = "\xF0", euml$1 = "\xEB", frac12$1 = "\xBD", frac14$1 = "\xBC", frac34$1 = "\xBE", gt$1 = ">", iacute$1 = "\xED", icirc$1 = "\xEE", iexcl$1 = "\xA1", igrave$1 = "\xEC", iquest$1 = "\xBF", iuml$1 = "\xEF", laquo$1 = "\xAB", lt$1 = "<", macr$1 = "\xAF", micro$1 = "\xB5", middot$1 = "\xB7", nbsp$1 = "\xA0", not$1 = "\xAC", ntilde$1 = "\xF1", oacute$1 = "\xF3", ocirc$1 = "\xF4", ograve$1 = "\xF2", ordf$1 = "\xAA", ordm$1 = "\xBA", oslash$1 = "\xF8", otilde$1 = "\xF5", ouml$1 = "\xF6", para$1 = "\xB6", plusmn$1 = "\xB1", pound$1 = "\xA3", quot$1 = '"', raquo$1 = "\xBB", reg$1 = "\xAE", sect$1 = "\xA7", shy$1 = "\xAD", sup1$1 = "\xB9", sup2$1 = "\xB2", sup3$1 = "\xB3", szlig$1 = "\xDF", thorn$1 = "\xFE", times$1 = "\xD7", uacute$1 = "\xFA", ucirc$1 = "\xFB", ugrave$1 = "\xF9", uml$1 = "\xA8", uuml$1 = "\xFC", yacute$1 = "\xFD", yen$1 = "\xA5", yuml$1 = "\xFF", require$$0$1 = {
  AElig: AElig$1,
  AMP: AMP$1,
  Aacute: Aacute$1,
  Acirc: Acirc$1,
  Agrave: Agrave$1,
  Aring: Aring$1,
  Atilde: Atilde$1,
  Auml: Auml$1,
  COPY: COPY$1,
  Ccedil: Ccedil$1,
  ETH: ETH$1,
  Eacute: Eacute$1,
  Ecirc: Ecirc$1,
  Egrave: Egrave$1,
  Euml: Euml$1,
  GT: GT$1,
  Iacute: Iacute$1,
  Icirc: Icirc$1,
  Igrave: Igrave$1,
  Iuml: Iuml$1,
  LT: LT$1,
  Ntilde: Ntilde$1,
  Oacute: Oacute$1,
  Ocirc: Ocirc$1,
  Ograve: Ograve$1,
  Oslash: Oslash$1,
  Otilde: Otilde$1,
  Ouml: Ouml$1,
  QUOT: QUOT$1,
  REG: REG$1,
  THORN: THORN$1,
  Uacute: Uacute$1,
  Ucirc: Ucirc$1,
  Ugrave: Ugrave$1,
  Uuml: Uuml$1,
  Yacute: Yacute$1,
  aacute: aacute$1,
  acirc: acirc$1,
  acute: acute$1,
  aelig: aelig$1,
  agrave: agrave$1,
  amp: amp$1,
  aring: aring$1,
  atilde: atilde$1,
  auml: auml$1,
  brvbar: brvbar$1,
  ccedil: ccedil$1,
  cedil: cedil$1,
  cent: cent$1,
  copy: copy$1,
  curren: curren$1,
  deg: deg$1,
  divide: divide$1,
  eacute: eacute$1,
  ecirc: ecirc$1,
  egrave: egrave$1,
  eth: eth$1,
  euml: euml$1,
  frac12: frac12$1,
  frac14: frac14$1,
  frac34: frac34$1,
  gt: gt$1,
  iacute: iacute$1,
  icirc: icirc$1,
  iexcl: iexcl$1,
  igrave: igrave$1,
  iquest: iquest$1,
  iuml: iuml$1,
  laquo: laquo$1,
  lt: lt$1,
  macr: macr$1,
  micro: micro$1,
  middot: middot$1,
  nbsp: nbsp$1,
  not: not$1,
  ntilde: ntilde$1,
  oacute: oacute$1,
  ocirc: ocirc$1,
  ograve: ograve$1,
  ordf: ordf$1,
  ordm: ordm$1,
  oslash: oslash$1,
  otilde: otilde$1,
  ouml: ouml$1,
  para: para$1,
  plusmn: plusmn$1,
  pound: pound$1,
  quot: quot$1,
  raquo: raquo$1,
  reg: reg$1,
  sect: sect$1,
  shy: shy$1,
  sup1: sup1$1,
  sup2: sup2$1,
  sup3: sup3$1,
  szlig: szlig$1,
  thorn: thorn$1,
  times: times$1,
  uacute: uacute$1,
  ucirc: ucirc$1,
  ugrave: ugrave$1,
  uml: uml$1,
  uuml: uuml$1,
  yacute: yacute$1,
  yen: yen$1,
  yuml: yuml$1
}, require$$1 = {
  0: "\uFFFD",
  128: "\u20AC",
  130: "\u201A",
  131: "\u0192",
  132: "\u201E",
  133: "\u2026",
  134: "\u2020",
  135: "\u2021",
  136: "\u02C6",
  137: "\u2030",
  138: "\u0160",
  139: "\u2039",
  140: "\u0152",
  142: "\u017D",
  145: "\u2018",
  146: "\u2019",
  147: "\u201C",
  148: "\u201D",
  149: "\u2022",
  150: "\u2013",
  151: "\u2014",
  152: "\u02DC",
  153: "\u2122",
  154: "\u0161",
  155: "\u203A",
  156: "\u0153",
  158: "\u017E",
  159: "\u0178"
}, isDecimal, hasRequiredIsDecimal;
function requireIsDecimal() {
  if (hasRequiredIsDecimal) return isDecimal;
  hasRequiredIsDecimal = 1, isDecimal = decimal;
  function decimal(character) {
    var code = typeof character == "string" ? character.charCodeAt(0) : character;
    return code >= 48 && code <= 57;
  }
  return isDecimal;
}
var isHexadecimal, hasRequiredIsHexadecimal;
function requireIsHexadecimal() {
  if (hasRequiredIsHexadecimal) return isHexadecimal;
  hasRequiredIsHexadecimal = 1, isHexadecimal = hexadecimal;
  function hexadecimal(character) {
    var code = typeof character == "string" ? character.charCodeAt(0) : character;
    return code >= 97 && code <= 102 || code >= 65 && code <= 70 || code >= 48 && code <= 57;
  }
  return isHexadecimal;
}
var isAlphabetical, hasRequiredIsAlphabetical;
function requireIsAlphabetical() {
  if (hasRequiredIsAlphabetical) return isAlphabetical;
  hasRequiredIsAlphabetical = 1, isAlphabetical = alphabetical;
  function alphabetical(character) {
    var code = typeof character == "string" ? character.charCodeAt(0) : character;
    return code >= 97 && code <= 122 || code >= 65 && code <= 90;
  }
  return isAlphabetical;
}
var isAlphanumerical, hasRequiredIsAlphanumerical;
function requireIsAlphanumerical() {
  if (hasRequiredIsAlphanumerical) return isAlphanumerical;
  hasRequiredIsAlphanumerical = 1;
  var alphabetical = requireIsAlphabetical(), decimal = requireIsDecimal();
  isAlphanumerical = alphanumerical;
  function alphanumerical(character) {
    return alphabetical(character) || decimal(character);
  }
  return isAlphanumerical;
}
var AEli = "\xC6", AElig = "\xC6", AM = "&", AMP = "&", Aacut = "\xC1", Aacute = "\xC1", Abreve = "\u0102", Acir = "\xC2", Acirc = "\xC2", Acy = "\u0410", Afr = "\u{1D504}", Agrav = "\xC0", Agrave = "\xC0", Alpha = "\u0391", Amacr = "\u0100", And = "\u2A53", Aogon = "\u0104", Aopf = "\u{1D538}", ApplyFunction = "\u2061", Arin = "\xC5", Aring = "\xC5", Ascr = "\u{1D49C}", Assign = "\u2254", Atild = "\xC3", Atilde = "\xC3", Aum = "\xC4", Auml = "\xC4", Backslash = "\u2216", Barv = "\u2AE7", Barwed = "\u2306", Bcy = "\u0411", Because = "\u2235", Bernoullis = "\u212C", Beta = "\u0392", Bfr = "\u{1D505}", Bopf = "\u{1D539}", Breve = "\u02D8", Bscr = "\u212C", Bumpeq = "\u224E", CHcy = "\u0427", COP = "\xA9", COPY = "\xA9", Cacute = "\u0106", Cap = "\u22D2", CapitalDifferentialD = "\u2145", Cayleys = "\u212D", Ccaron = "\u010C", Ccedi = "\xC7", Ccedil = "\xC7", Ccirc = "\u0108", Cconint = "\u2230", Cdot = "\u010A", Cedilla = "\xB8", CenterDot = "\xB7", Cfr = "\u212D", Chi = "\u03A7", CircleDot = "\u2299", CircleMinus = "\u2296", CirclePlus = "\u2295", CircleTimes = "\u2297", ClockwiseContourIntegral = "\u2232", CloseCurlyDoubleQuote = "\u201D", CloseCurlyQuote = "\u2019", Colon = "\u2237", Colone = "\u2A74", Congruent = "\u2261", Conint = "\u222F", ContourIntegral = "\u222E", Copf = "\u2102", Coproduct = "\u2210", CounterClockwiseContourIntegral = "\u2233", Cross = "\u2A2F", Cscr = "\u{1D49E}", Cup = "\u22D3", CupCap = "\u224D", DD = "\u2145", DDotrahd = "\u2911", DJcy = "\u0402", DScy = "\u0405", DZcy = "\u040F", Dagger = "\u2021", Darr = "\u21A1", Dashv = "\u2AE4", Dcaron = "\u010E", Dcy = "\u0414", Del = "\u2207", Delta = "\u0394", Dfr = "\u{1D507}", DiacriticalAcute = "\xB4", DiacriticalDot = "\u02D9", DiacriticalDoubleAcute = "\u02DD", DiacriticalGrave = "`", DiacriticalTilde = "\u02DC", Diamond = "\u22C4", DifferentialD = "\u2146", Dopf = "\u{1D53B}", Dot = "\xA8", DotDot = "\u20DC", DotEqual = "\u2250", DoubleContourIntegral = "\u222F", DoubleDot = "\xA8", DoubleDownArrow = "\u21D3", DoubleLeftArrow = "\u21D0", DoubleLeftRightArrow = "\u21D4", DoubleLeftTee = "\u2AE4", DoubleLongLeftArrow = "\u27F8", DoubleLongLeftRightArrow = "\u27FA", DoubleLongRightArrow = "\u27F9", DoubleRightArrow = "\u21D2", DoubleRightTee = "\u22A8", DoubleUpArrow = "\u21D1", DoubleUpDownArrow = "\u21D5", DoubleVerticalBar = "\u2225", DownArrow = "\u2193", DownArrowBar = "\u2913", DownArrowUpArrow = "\u21F5", DownBreve = "\u0311", DownLeftRightVector = "\u2950", DownLeftTeeVector = "\u295E", DownLeftVector = "\u21BD", DownLeftVectorBar = "\u2956", DownRightTeeVector = "\u295F", DownRightVector = "\u21C1", DownRightVectorBar = "\u2957", DownTee = "\u22A4", DownTeeArrow = "\u21A7", Downarrow = "\u21D3", Dscr = "\u{1D49F}", Dstrok = "\u0110", ENG = "\u014A", ET = "\xD0", ETH = "\xD0", Eacut = "\xC9", Eacute = "\xC9", Ecaron = "\u011A", Ecir = "\xCA", Ecirc = "\xCA", Ecy = "\u042D", Edot = "\u0116", Efr = "\u{1D508}", Egrav = "\xC8", Egrave = "\xC8", Element = "\u2208", Emacr = "\u0112", EmptySmallSquare = "\u25FB", EmptyVerySmallSquare = "\u25AB", Eogon = "\u0118", Eopf = "\u{1D53C}", Epsilon = "\u0395", Equal = "\u2A75", EqualTilde = "\u2242", Equilibrium = "\u21CC", Escr = "\u2130", Esim = "\u2A73", Eta = "\u0397", Eum = "\xCB", Euml = "\xCB", Exists = "\u2203", ExponentialE = "\u2147", Fcy = "\u0424", Ffr = "\u{1D509}", FilledSmallSquare = "\u25FC", FilledVerySmallSquare = "\u25AA", Fopf = "\u{1D53D}", ForAll = "\u2200", Fouriertrf = "\u2131", Fscr = "\u2131", GJcy = "\u0403", G = ">", GT = ">", Gamma = "\u0393", Gammad = "\u03DC", Gbreve = "\u011E", Gcedil = "\u0122", Gcirc = "\u011C", Gcy = "\u0413", Gdot = "\u0120", Gfr = "\u{1D50A}", Gg = "\u22D9", Gopf = "\u{1D53E}", GreaterEqual = "\u2265", GreaterEqualLess = "\u22DB", GreaterFullEqual = "\u2267", GreaterGreater = "\u2AA2", GreaterLess = "\u2277", GreaterSlantEqual = "\u2A7E", GreaterTilde = "\u2273", Gscr = "\u{1D4A2}", Gt = "\u226B", HARDcy = "\u042A", Hacek = "\u02C7", Hat = "^", Hcirc = "\u0124", Hfr = "\u210C", HilbertSpace = "\u210B", Hopf = "\u210D", HorizontalLine = "\u2500", Hscr = "\u210B", Hstrok = "\u0126", HumpDownHump = "\u224E", HumpEqual = "\u224F", IEcy = "\u0415", IJlig = "\u0132", IOcy = "\u0401", Iacut = "\xCD", Iacute = "\xCD", Icir = "\xCE", Icirc = "\xCE", Icy = "\u0418", Idot = "\u0130", Ifr = "\u2111", Igrav = "\xCC", Igrave = "\xCC", Im = "\u2111", Imacr = "\u012A", ImaginaryI = "\u2148", Implies = "\u21D2", Int = "\u222C", Integral = "\u222B", Intersection = "\u22C2", InvisibleComma = "\u2063", InvisibleTimes = "\u2062", Iogon = "\u012E", Iopf = "\u{1D540}", Iota = "\u0399", Iscr = "\u2110", Itilde = "\u0128", Iukcy = "\u0406", Ium = "\xCF", Iuml = "\xCF", Jcirc = "\u0134", Jcy = "\u0419", Jfr = "\u{1D50D}", Jopf = "\u{1D541}", Jscr = "\u{1D4A5}", Jsercy = "\u0408", Jukcy = "\u0404", KHcy = "\u0425", KJcy = "\u040C", Kappa = "\u039A", Kcedil = "\u0136", Kcy = "\u041A", Kfr = "\u{1D50E}", Kopf = "\u{1D542}", Kscr = "\u{1D4A6}", LJcy = "\u0409", L = "<", LT = "<", Lacute = "\u0139", Lambda = "\u039B", Lang = "\u27EA", Laplacetrf = "\u2112", Larr = "\u219E", Lcaron = "\u013D", Lcedil = "\u013B", Lcy = "\u041B", LeftAngleBracket = "\u27E8", LeftArrow = "\u2190", LeftArrowBar = "\u21E4", LeftArrowRightArrow = "\u21C6", LeftCeiling = "\u2308", LeftDoubleBracket = "\u27E6", LeftDownTeeVector = "\u2961", LeftDownVector = "\u21C3", LeftDownVectorBar = "\u2959", LeftFloor = "\u230A", LeftRightArrow = "\u2194", LeftRightVector = "\u294E", LeftTee = "\u22A3", LeftTeeArrow = "\u21A4", LeftTeeVector = "\u295A", LeftTriangle = "\u22B2", LeftTriangleBar = "\u29CF", LeftTriangleEqual = "\u22B4", LeftUpDownVector = "\u2951", LeftUpTeeVector = "\u2960", LeftUpVector = "\u21BF", LeftUpVectorBar = "\u2958", LeftVector = "\u21BC", LeftVectorBar = "\u2952", Leftarrow = "\u21D0", Leftrightarrow = "\u21D4", LessEqualGreater = "\u22DA", LessFullEqual = "\u2266", LessGreater = "\u2276", LessLess = "\u2AA1", LessSlantEqual = "\u2A7D", LessTilde = "\u2272", Lfr = "\u{1D50F}", Ll = "\u22D8", Lleftarrow = "\u21DA", Lmidot = "\u013F", LongLeftArrow = "\u27F5", LongLeftRightArrow = "\u27F7", LongRightArrow = "\u27F6", Longleftarrow = "\u27F8", Longleftrightarrow = "\u27FA", Longrightarrow = "\u27F9", Lopf = "\u{1D543}", LowerLeftArrow = "\u2199", LowerRightArrow = "\u2198", Lscr = "\u2112", Lsh = "\u21B0", Lstrok = "\u0141", Lt = "\u226A", Mcy = "\u041C", MediumSpace = "\u205F", Mellintrf = "\u2133", Mfr = "\u{1D510}", MinusPlus = "\u2213", Mopf = "\u{1D544}", Mscr = "\u2133", Mu = "\u039C", NJcy = "\u040A", Nacute = "\u0143", Ncaron = "\u0147", Ncedil = "\u0145", Ncy = "\u041D", NegativeMediumSpace = "\u200B", NegativeThickSpace = "\u200B", NegativeThinSpace = "\u200B", NegativeVeryThinSpace = "\u200B", NestedGreaterGreater = "\u226B", NestedLessLess = "\u226A", NewLine = `
`, Nfr = "\u{1D511}", NoBreak = "\u2060", NonBreakingSpace = "\xA0", Nopf = "\u2115", Not = "\u2AEC", NotCongruent = "\u2262", NotCupCap = "\u226D", NotDoubleVerticalBar = "\u2226", NotElement = "\u2209", NotEqual = "\u2260", NotEqualTilde = "\u2242\u0338", NotExists = "\u2204", NotGreater = "\u226F", NotGreaterEqual = "\u2271", NotGreaterFullEqual = "\u2267\u0338", NotGreaterGreater = "\u226B\u0338", NotGreaterLess = "\u2279", NotGreaterSlantEqual = "\u2A7E\u0338", NotGreaterTilde = "\u2275", NotHumpDownHump = "\u224E\u0338", NotHumpEqual = "\u224F\u0338", NotLeftTriangle = "\u22EA", NotLeftTriangleBar = "\u29CF\u0338", NotLeftTriangleEqual = "\u22EC", NotLess = "\u226E", NotLessEqual = "\u2270", NotLessGreater = "\u2278", NotLessLess = "\u226A\u0338", NotLessSlantEqual = "\u2A7D\u0338", NotLessTilde = "\u2274", NotNestedGreaterGreater = "\u2AA2\u0338", NotNestedLessLess = "\u2AA1\u0338", NotPrecedes = "\u2280", NotPrecedesEqual = "\u2AAF\u0338", NotPrecedesSlantEqual = "\u22E0", NotReverseElement = "\u220C", NotRightTriangle = "\u22EB", NotRightTriangleBar = "\u29D0\u0338", NotRightTriangleEqual = "\u22ED", NotSquareSubset = "\u228F\u0338", NotSquareSubsetEqual = "\u22E2", NotSquareSuperset = "\u2290\u0338", NotSquareSupersetEqual = "\u22E3", NotSubset = "\u2282\u20D2", NotSubsetEqual = "\u2288", NotSucceeds = "\u2281", NotSucceedsEqual = "\u2AB0\u0338", NotSucceedsSlantEqual = "\u22E1", NotSucceedsTilde = "\u227F\u0338", NotSuperset = "\u2283\u20D2", NotSupersetEqual = "\u2289", NotTilde = "\u2241", NotTildeEqual = "\u2244", NotTildeFullEqual = "\u2247", NotTildeTilde = "\u2249", NotVerticalBar = "\u2224", Nscr = "\u{1D4A9}", Ntild = "\xD1", Ntilde = "\xD1", Nu = "\u039D", OElig = "\u0152", Oacut = "\xD3", Oacute = "\xD3", Ocir = "\xD4", Ocirc = "\xD4", Ocy = "\u041E", Odblac = "\u0150", Ofr = "\u{1D512}", Ograv = "\xD2", Ograve = "\xD2", Omacr = "\u014C", Omega = "\u03A9", Omicron = "\u039F", Oopf = "\u{1D546}", OpenCurlyDoubleQuote = "\u201C", OpenCurlyQuote = "\u2018", Or = "\u2A54", Oscr = "\u{1D4AA}", Oslas = "\xD8", Oslash = "\xD8", Otild = "\xD5", Otilde = "\xD5", Otimes = "\u2A37", Oum = "\xD6", Ouml = "\xD6", OverBar = "\u203E", OverBrace = "\u23DE", OverBracket = "\u23B4", OverParenthesis = "\u23DC", PartialD = "\u2202", Pcy = "\u041F", Pfr = "\u{1D513}", Phi = "\u03A6", Pi = "\u03A0", PlusMinus = "\xB1", Poincareplane = "\u210C", Popf = "\u2119", Pr = "\u2ABB", Precedes = "\u227A", PrecedesEqual = "\u2AAF", PrecedesSlantEqual = "\u227C", PrecedesTilde = "\u227E", Prime = "\u2033", Product = "\u220F", Proportion = "\u2237", Proportional = "\u221D", Pscr = "\u{1D4AB}", Psi = "\u03A8", QUO = '"', QUOT = '"', Qfr = "\u{1D514}", Qopf = "\u211A", Qscr = "\u{1D4AC}", RBarr = "\u2910", RE = "\xAE", REG = "\xAE", Racute = "\u0154", Rang = "\u27EB", Rarr = "\u21A0", Rarrtl = "\u2916", Rcaron = "\u0158", Rcedil = "\u0156", Rcy = "\u0420", Re = "\u211C", ReverseElement = "\u220B", ReverseEquilibrium = "\u21CB", ReverseUpEquilibrium = "\u296F", Rfr = "\u211C", Rho = "\u03A1", RightAngleBracket = "\u27E9", RightArrow = "\u2192", RightArrowBar = "\u21E5", RightArrowLeftArrow = "\u21C4", RightCeiling = "\u2309", RightDoubleBracket = "\u27E7", RightDownTeeVector = "\u295D", RightDownVector = "\u21C2", RightDownVectorBar = "\u2955", RightFloor = "\u230B", RightTee = "\u22A2", RightTeeArrow = "\u21A6", RightTeeVector = "\u295B", RightTriangle = "\u22B3", RightTriangleBar = "\u29D0", RightTriangleEqual = "\u22B5", RightUpDownVector = "\u294F", RightUpTeeVector = "\u295C", RightUpVector = "\u21BE", RightUpVectorBar = "\u2954", RightVector = "\u21C0", RightVectorBar = "\u2953", Rightarrow = "\u21D2", Ropf = "\u211D", RoundImplies = "\u2970", Rrightarrow = "\u21DB", Rscr = "\u211B", Rsh = "\u21B1", RuleDelayed = "\u29F4", SHCHcy = "\u0429", SHcy = "\u0428", SOFTcy = "\u042C", Sacute = "\u015A", Sc = "\u2ABC", Scaron = "\u0160", Scedil = "\u015E", Scirc = "\u015C", Scy = "\u0421", Sfr = "\u{1D516}", ShortDownArrow = "\u2193", ShortLeftArrow = "\u2190", ShortRightArrow = "\u2192", ShortUpArrow = "\u2191", Sigma = "\u03A3", SmallCircle = "\u2218", Sopf = "\u{1D54A}", Sqrt = "\u221A", Square = "\u25A1", SquareIntersection = "\u2293", SquareSubset = "\u228F", SquareSubsetEqual = "\u2291", SquareSuperset = "\u2290", SquareSupersetEqual = "\u2292", SquareUnion = "\u2294", Sscr = "\u{1D4AE}", Star = "\u22C6", Sub = "\u22D0", Subset = "\u22D0", SubsetEqual = "\u2286", Succeeds = "\u227B", SucceedsEqual = "\u2AB0", SucceedsSlantEqual = "\u227D", SucceedsTilde = "\u227F", SuchThat = "\u220B", Sum = "\u2211", Sup = "\u22D1", Superset = "\u2283", SupersetEqual = "\u2287", Supset = "\u22D1", THOR = "\xDE", THORN = "\xDE", TRADE = "\u2122", TSHcy = "\u040B", TScy = "\u0426", Tab = "	", Tau = "\u03A4", Tcaron = "\u0164", Tcedil = "\u0162", Tcy = "\u0422", Tfr = "\u{1D517}", Therefore = "\u2234", Theta = "\u0398", ThickSpace = "\u205F\u200A", ThinSpace = "\u2009", Tilde = "\u223C", TildeEqual = "\u2243", TildeFullEqual = "\u2245", TildeTilde = "\u2248", Topf = "\u{1D54B}", TripleDot = "\u20DB", Tscr = "\u{1D4AF}", Tstrok = "\u0166", Uacut = "\xDA", Uacute = "\xDA", Uarr = "\u219F", Uarrocir = "\u2949", Ubrcy = "\u040E", Ubreve = "\u016C", Ucir = "\xDB", Ucirc = "\xDB", Ucy = "\u0423", Udblac = "\u0170", Ufr = "\u{1D518}", Ugrav = "\xD9", Ugrave = "\xD9", Umacr = "\u016A", UnderBar = "_", UnderBrace = "\u23DF", UnderBracket = "\u23B5", UnderParenthesis = "\u23DD", Union = "\u22C3", UnionPlus = "\u228E", Uogon = "\u0172", Uopf = "\u{1D54C}", UpArrow = "\u2191", UpArrowBar = "\u2912", UpArrowDownArrow = "\u21C5", UpDownArrow = "\u2195", UpEquilibrium = "\u296E", UpTee = "\u22A5", UpTeeArrow = "\u21A5", Uparrow = "\u21D1", Updownarrow = "\u21D5", UpperLeftArrow = "\u2196", UpperRightArrow = "\u2197", Upsi = "\u03D2", Upsilon = "\u03A5", Uring = "\u016E", Uscr = "\u{1D4B0}", Utilde = "\u0168", Uum = "\xDC", Uuml = "\xDC", VDash = "\u22AB", Vbar = "\u2AEB", Vcy = "\u0412", Vdash = "\u22A9", Vdashl = "\u2AE6", Vee = "\u22C1", Verbar = "\u2016", Vert = "\u2016", VerticalBar = "\u2223", VerticalLine = "|", VerticalSeparator = "\u2758", VerticalTilde = "\u2240", VeryThinSpace = "\u200A", Vfr = "\u{1D519}", Vopf = "\u{1D54D}", Vscr = "\u{1D4B1}", Vvdash = "\u22AA", Wcirc = "\u0174", Wedge = "\u22C0", Wfr = "\u{1D51A}", Wopf = "\u{1D54E}", Wscr = "\u{1D4B2}", Xfr = "\u{1D51B}", Xi = "\u039E", Xopf = "\u{1D54F}", Xscr = "\u{1D4B3}", YAcy = "\u042F", YIcy = "\u0407", YUcy = "\u042E", Yacut = "\xDD", Yacute = "\xDD", Ycirc = "\u0176", Ycy = "\u042B", Yfr = "\u{1D51C}", Yopf = "\u{1D550}", Yscr = "\u{1D4B4}", Yuml = "\u0178", ZHcy = "\u0416", Zacute = "\u0179", Zcaron = "\u017D", Zcy = "\u0417", Zdot = "\u017B", ZeroWidthSpace = "\u200B", Zeta = "\u0396", Zfr = "\u2128", Zopf = "\u2124", Zscr = "\u{1D4B5}", aacut = "\xE1", aacute = "\xE1", abreve = "\u0103", ac = "\u223E", acE = "\u223E\u0333", acd = "\u223F", acir = "\xE2", acirc = "\xE2", acut = "\xB4", acute = "\xB4", acy = "\u0430", aeli = "\xE6", aelig = "\xE6", af = "\u2061", afr = "\u{1D51E}", agrav = "\xE0", agrave = "\xE0", alefsym = "\u2135", aleph = "\u2135", alpha = "\u03B1", amacr = "\u0101", amalg = "\u2A3F", am = "&", amp = "&", and = "\u2227", andand = "\u2A55", andd = "\u2A5C", andslope = "\u2A58", andv = "\u2A5A", ang = "\u2220", ange = "\u29A4", angle = "\u2220", angmsd = "\u2221", angmsdaa = "\u29A8", angmsdab = "\u29A9", angmsdac = "\u29AA", angmsdad = "\u29AB", angmsdae = "\u29AC", angmsdaf = "\u29AD", angmsdag = "\u29AE", angmsdah = "\u29AF", angrt = "\u221F", angrtvb = "\u22BE", angrtvbd = "\u299D", angsph = "\u2222", angst = "\xC5", angzarr = "\u237C", aogon = "\u0105", aopf = "\u{1D552}", ap = "\u2248", apE = "\u2A70", apacir = "\u2A6F", ape = "\u224A", apid = "\u224B", apos = "'", approx = "\u2248", approxeq = "\u224A", arin = "\xE5", aring = "\xE5", ascr = "\u{1D4B6}", ast = "*", asymp = "\u2248", asympeq = "\u224D", atild = "\xE3", atilde = "\xE3", aum = "\xE4", auml = "\xE4", awconint = "\u2233", awint = "\u2A11", bNot = "\u2AED", backcong = "\u224C", backepsilon = "\u03F6", backprime = "\u2035", backsim = "\u223D", backsimeq = "\u22CD", barvee = "\u22BD", barwed = "\u2305", barwedge = "\u2305", bbrk = "\u23B5", bbrktbrk = "\u23B6", bcong = "\u224C", bcy = "\u0431", bdquo = "\u201E", becaus = "\u2235", because = "\u2235", bemptyv = "\u29B0", bepsi = "\u03F6", bernou = "\u212C", beta = "\u03B2", beth = "\u2136", between = "\u226C", bfr = "\u{1D51F}", bigcap = "\u22C2", bigcirc = "\u25EF", bigcup = "\u22C3", bigodot = "\u2A00", bigoplus = "\u2A01", bigotimes = "\u2A02", bigsqcup = "\u2A06", bigstar = "\u2605", bigtriangledown = "\u25BD", bigtriangleup = "\u25B3", biguplus = "\u2A04", bigvee = "\u22C1", bigwedge = "\u22C0", bkarow = "\u290D", blacklozenge = "\u29EB", blacksquare = "\u25AA", blacktriangle = "\u25B4", blacktriangledown = "\u25BE", blacktriangleleft = "\u25C2", blacktriangleright = "\u25B8", blank = "\u2423", blk12 = "\u2592", blk14 = "\u2591", blk34 = "\u2593", block = "\u2588", bne = "=\u20E5", bnequiv = "\u2261\u20E5", bnot = "\u2310", bopf = "\u{1D553}", bot = "\u22A5", bottom = "\u22A5", bowtie = "\u22C8", boxDL = "\u2557", boxDR = "\u2554", boxDl = "\u2556", boxDr = "\u2553", boxH = "\u2550", boxHD = "\u2566", boxHU = "\u2569", boxHd = "\u2564", boxHu = "\u2567", boxUL = "\u255D", boxUR = "\u255A", boxUl = "\u255C", boxUr = "\u2559", boxV = "\u2551", boxVH = "\u256C", boxVL = "\u2563", boxVR = "\u2560", boxVh = "\u256B", boxVl = "\u2562", boxVr = "\u255F", boxbox = "\u29C9", boxdL = "\u2555", boxdR = "\u2552", boxdl = "\u2510", boxdr = "\u250C", boxh = "\u2500", boxhD = "\u2565", boxhU = "\u2568", boxhd = "\u252C", boxhu = "\u2534", boxminus = "\u229F", boxplus = "\u229E", boxtimes = "\u22A0", boxuL = "\u255B", boxuR = "\u2558", boxul = "\u2518", boxur = "\u2514", boxv = "\u2502", boxvH = "\u256A", boxvL = "\u2561", boxvR = "\u255E", boxvh = "\u253C", boxvl = "\u2524", boxvr = "\u251C", bprime = "\u2035", breve = "\u02D8", brvba = "\xA6", brvbar = "\xA6", bscr = "\u{1D4B7}", bsemi = "\u204F", bsim = "\u223D", bsime = "\u22CD", bsol = "\\", bsolb = "\u29C5", bsolhsub = "\u27C8", bull = "\u2022", bullet = "\u2022", bump = "\u224E", bumpE = "\u2AAE", bumpe = "\u224F", bumpeq = "\u224F", cacute = "\u0107", cap = "\u2229", capand = "\u2A44", capbrcup = "\u2A49", capcap = "\u2A4B", capcup = "\u2A47", capdot = "\u2A40", caps = "\u2229\uFE00", caret = "\u2041", caron = "\u02C7", ccaps = "\u2A4D", ccaron = "\u010D", ccedi = "\xE7", ccedil = "\xE7", ccirc = "\u0109", ccups = "\u2A4C", ccupssm = "\u2A50", cdot = "\u010B", cedi = "\xB8", cedil = "\xB8", cemptyv = "\u29B2", cen = "\xA2", cent = "\xA2", centerdot = "\xB7", cfr = "\u{1D520}", chcy = "\u0447", check = "\u2713", checkmark = "\u2713", chi = "\u03C7", cir = "\u25CB", cirE = "\u29C3", circ = "\u02C6", circeq = "\u2257", circlearrowleft = "\u21BA", circlearrowright = "\u21BB", circledR = "\xAE", circledS = "\u24C8", circledast = "\u229B", circledcirc = "\u229A", circleddash = "\u229D", cire = "\u2257", cirfnint = "\u2A10", cirmid = "\u2AEF", cirscir = "\u29C2", clubs = "\u2663", clubsuit = "\u2663", colon = ":", colone = "\u2254", coloneq = "\u2254", comma = ",", commat = "@", comp = "\u2201", compfn = "\u2218", complement = "\u2201", complexes = "\u2102", cong = "\u2245", congdot = "\u2A6D", conint = "\u222E", copf = "\u{1D554}", coprod = "\u2210", cop = "\xA9", copy = "\xA9", copysr = "\u2117", crarr = "\u21B5", cross = "\u2717", cscr = "\u{1D4B8}", csub = "\u2ACF", csube = "\u2AD1", csup = "\u2AD0", csupe = "\u2AD2", ctdot = "\u22EF", cudarrl = "\u2938", cudarrr = "\u2935", cuepr = "\u22DE", cuesc = "\u22DF", cularr = "\u21B6", cularrp = "\u293D", cup = "\u222A", cupbrcap = "\u2A48", cupcap = "\u2A46", cupcup = "\u2A4A", cupdot = "\u228D", cupor = "\u2A45", cups = "\u222A\uFE00", curarr = "\u21B7", curarrm = "\u293C", curlyeqprec = "\u22DE", curlyeqsucc = "\u22DF", curlyvee = "\u22CE", curlywedge = "\u22CF", curre = "\xA4", curren = "\xA4", curvearrowleft = "\u21B6", curvearrowright = "\u21B7", cuvee = "\u22CE", cuwed = "\u22CF", cwconint = "\u2232", cwint = "\u2231", cylcty = "\u232D", dArr = "\u21D3", dHar = "\u2965", dagger = "\u2020", daleth = "\u2138", darr = "\u2193", dash = "\u2010", dashv = "\u22A3", dbkarow = "\u290F", dblac = "\u02DD", dcaron = "\u010F", dcy = "\u0434", dd = "\u2146", ddagger = "\u2021", ddarr = "\u21CA", ddotseq = "\u2A77", de = "\xB0", deg = "\xB0", delta = "\u03B4", demptyv = "\u29B1", dfisht = "\u297F", dfr = "\u{1D521}", dharl = "\u21C3", dharr = "\u21C2", diam = "\u22C4", diamond = "\u22C4", diamondsuit = "\u2666", diams = "\u2666", die = "\xA8", digamma = "\u03DD", disin = "\u22F2", div = "\xF7", divid = "\xF7", divide = "\xF7", divideontimes = "\u22C7", divonx = "\u22C7", djcy = "\u0452", dlcorn = "\u231E", dlcrop = "\u230D", dollar = "$", dopf = "\u{1D555}", dot = "\u02D9", doteq = "\u2250", doteqdot = "\u2251", dotminus = "\u2238", dotplus = "\u2214", dotsquare = "\u22A1", doublebarwedge = "\u2306", downarrow = "\u2193", downdownarrows = "\u21CA", downharpoonleft = "\u21C3", downharpoonright = "\u21C2", drbkarow = "\u2910", drcorn = "\u231F", drcrop = "\u230C", dscr = "\u{1D4B9}", dscy = "\u0455", dsol = "\u29F6", dstrok = "\u0111", dtdot = "\u22F1", dtri = "\u25BF", dtrif = "\u25BE", duarr = "\u21F5", duhar = "\u296F", dwangle = "\u29A6", dzcy = "\u045F", dzigrarr = "\u27FF", eDDot = "\u2A77", eDot = "\u2251", eacut = "\xE9", eacute = "\xE9", easter = "\u2A6E", ecaron = "\u011B", ecir = "\xEA", ecirc = "\xEA", ecolon = "\u2255", ecy = "\u044D", edot = "\u0117", ee = "\u2147", efDot = "\u2252", efr = "\u{1D522}", eg = "\u2A9A", egrav = "\xE8", egrave = "\xE8", egs = "\u2A96", egsdot = "\u2A98", el = "\u2A99", elinters = "\u23E7", ell = "\u2113", els = "\u2A95", elsdot = "\u2A97", emacr = "\u0113", empty = "\u2205", emptyset = "\u2205", emptyv = "\u2205", emsp13 = "\u2004", emsp14 = "\u2005", emsp = "\u2003", eng = "\u014B", ensp = "\u2002", eogon = "\u0119", eopf = "\u{1D556}", epar = "\u22D5", eparsl = "\u29E3", eplus = "\u2A71", epsi = "\u03B5", epsilon = "\u03B5", epsiv = "\u03F5", eqcirc = "\u2256", eqcolon = "\u2255", eqsim = "\u2242", eqslantgtr = "\u2A96", eqslantless = "\u2A95", equals = "=", equest = "\u225F", equiv = "\u2261", equivDD = "\u2A78", eqvparsl = "\u29E5", erDot = "\u2253", erarr = "\u2971", escr = "\u212F", esdot = "\u2250", esim = "\u2242", eta = "\u03B7", et = "\xF0", eth = "\xF0", eum = "\xEB", euml = "\xEB", euro = "\u20AC", excl = "!", exist = "\u2203", expectation = "\u2130", exponentiale = "\u2147", fallingdotseq = "\u2252", fcy = "\u0444", female = "\u2640", ffilig = "\uFB03", fflig = "\uFB00", ffllig = "\uFB04", ffr = "\u{1D523}", filig = "\uFB01", fjlig = "fj", flat = "\u266D", fllig = "\uFB02", fltns = "\u25B1", fnof = "\u0192", fopf = "\u{1D557}", forall = "\u2200", fork = "\u22D4", forkv = "\u2AD9", fpartint = "\u2A0D", frac1 = "\xBC", frac12 = "\xBD", frac13 = "\u2153", frac14 = "\xBC", frac15 = "\u2155", frac16 = "\u2159", frac18 = "\u215B", frac23 = "\u2154", frac25 = "\u2156", frac3 = "\xBE", frac34 = "\xBE", frac35 = "\u2157", frac38 = "\u215C", frac45 = "\u2158", frac56 = "\u215A", frac58 = "\u215D", frac78 = "\u215E", frasl = "\u2044", frown = "\u2322", fscr = "\u{1D4BB}", gE = "\u2267", gEl = "\u2A8C", gacute = "\u01F5", gamma = "\u03B3", gammad = "\u03DD", gap = "\u2A86", gbreve = "\u011F", gcirc = "\u011D", gcy = "\u0433", gdot = "\u0121", ge = "\u2265", gel = "\u22DB", geq = "\u2265", geqq = "\u2267", geqslant = "\u2A7E", ges = "\u2A7E", gescc = "\u2AA9", gesdot = "\u2A80", gesdoto = "\u2A82", gesdotol = "\u2A84", gesl = "\u22DB\uFE00", gesles = "\u2A94", gfr = "\u{1D524}", gg = "\u226B", ggg = "\u22D9", gimel = "\u2137", gjcy = "\u0453", gl = "\u2277", glE = "\u2A92", gla = "\u2AA5", glj = "\u2AA4", gnE = "\u2269", gnap = "\u2A8A", gnapprox = "\u2A8A", gne = "\u2A88", gneq = "\u2A88", gneqq = "\u2269", gnsim = "\u22E7", gopf = "\u{1D558}", grave = "`", gscr = "\u210A", gsim = "\u2273", gsime = "\u2A8E", gsiml = "\u2A90", g = ">", gt = ">", gtcc = "\u2AA7", gtcir = "\u2A7A", gtdot = "\u22D7", gtlPar = "\u2995", gtquest = "\u2A7C", gtrapprox = "\u2A86", gtrarr = "\u2978", gtrdot = "\u22D7", gtreqless = "\u22DB", gtreqqless = "\u2A8C", gtrless = "\u2277", gtrsim = "\u2273", gvertneqq = "\u2269\uFE00", gvnE = "\u2269\uFE00", hArr = "\u21D4", hairsp = "\u200A", half = "\xBD", hamilt = "\u210B", hardcy = "\u044A", harr = "\u2194", harrcir = "\u2948", harrw = "\u21AD", hbar = "\u210F", hcirc = "\u0125", hearts = "\u2665", heartsuit = "\u2665", hellip = "\u2026", hercon = "\u22B9", hfr = "\u{1D525}", hksearow = "\u2925", hkswarow = "\u2926", hoarr = "\u21FF", homtht = "\u223B", hookleftarrow = "\u21A9", hookrightarrow = "\u21AA", hopf = "\u{1D559}", horbar = "\u2015", hscr = "\u{1D4BD}", hslash = "\u210F", hstrok = "\u0127", hybull = "\u2043", hyphen = "\u2010", iacut = "\xED", iacute = "\xED", ic = "\u2063", icir = "\xEE", icirc = "\xEE", icy = "\u0438", iecy = "\u0435", iexc = "\xA1", iexcl = "\xA1", iff = "\u21D4", ifr = "\u{1D526}", igrav = "\xEC", igrave = "\xEC", ii = "\u2148", iiiint = "\u2A0C", iiint = "\u222D", iinfin = "\u29DC", iiota = "\u2129", ijlig = "\u0133", imacr = "\u012B", image = "\u2111", imagline = "\u2110", imagpart = "\u2111", imath = "\u0131", imof = "\u22B7", imped = "\u01B5", incare = "\u2105", infin = "\u221E", infintie = "\u29DD", inodot = "\u0131", int = "\u222B", intcal = "\u22BA", integers = "\u2124", intercal = "\u22BA", intlarhk = "\u2A17", intprod = "\u2A3C", iocy = "\u0451", iogon = "\u012F", iopf = "\u{1D55A}", iota = "\u03B9", iprod = "\u2A3C", iques = "\xBF", iquest = "\xBF", iscr = "\u{1D4BE}", isin = "\u2208", isinE = "\u22F9", isindot = "\u22F5", isins = "\u22F4", isinsv = "\u22F3", isinv = "\u2208", it = "\u2062", itilde = "\u0129", iukcy = "\u0456", ium = "\xEF", iuml = "\xEF", jcirc = "\u0135", jcy = "\u0439", jfr = "\u{1D527}", jmath = "\u0237", jopf = "\u{1D55B}", jscr = "\u{1D4BF}", jsercy = "\u0458", jukcy = "\u0454", kappa = "\u03BA", kappav = "\u03F0", kcedil = "\u0137", kcy = "\u043A", kfr = "\u{1D528}", kgreen = "\u0138", khcy = "\u0445", kjcy = "\u045C", kopf = "\u{1D55C}", kscr = "\u{1D4C0}", lAarr = "\u21DA", lArr = "\u21D0", lAtail = "\u291B", lBarr = "\u290E", lE = "\u2266", lEg = "\u2A8B", lHar = "\u2962", lacute = "\u013A", laemptyv = "\u29B4", lagran = "\u2112", lambda = "\u03BB", lang = "\u27E8", langd = "\u2991", langle = "\u27E8", lap = "\u2A85", laqu = "\xAB", laquo = "\xAB", larr = "\u2190", larrb = "\u21E4", larrbfs = "\u291F", larrfs = "\u291D", larrhk = "\u21A9", larrlp = "\u21AB", larrpl = "\u2939", larrsim = "\u2973", larrtl = "\u21A2", lat = "\u2AAB", latail = "\u2919", late = "\u2AAD", lates = "\u2AAD\uFE00", lbarr = "\u290C", lbbrk = "\u2772", lbrace = "{", lbrack = "[", lbrke = "\u298B", lbrksld = "\u298F", lbrkslu = "\u298D", lcaron = "\u013E", lcedil = "\u013C", lceil = "\u2308", lcub = "{", lcy = "\u043B", ldca = "\u2936", ldquo = "\u201C", ldquor = "\u201E", ldrdhar = "\u2967", ldrushar = "\u294B", ldsh = "\u21B2", le = "\u2264", leftarrow = "\u2190", leftarrowtail = "\u21A2", leftharpoondown = "\u21BD", leftharpoonup = "\u21BC", leftleftarrows = "\u21C7", leftrightarrow = "\u2194", leftrightarrows = "\u21C6", leftrightharpoons = "\u21CB", leftrightsquigarrow = "\u21AD", leftthreetimes = "\u22CB", leg = "\u22DA", leq = "\u2264", leqq = "\u2266", leqslant = "\u2A7D", les = "\u2A7D", lescc = "\u2AA8", lesdot = "\u2A7F", lesdoto = "\u2A81", lesdotor = "\u2A83", lesg = "\u22DA\uFE00", lesges = "\u2A93", lessapprox = "\u2A85", lessdot = "\u22D6", lesseqgtr = "\u22DA", lesseqqgtr = "\u2A8B", lessgtr = "\u2276", lesssim = "\u2272", lfisht = "\u297C", lfloor = "\u230A", lfr = "\u{1D529}", lg = "\u2276", lgE = "\u2A91", lhard = "\u21BD", lharu = "\u21BC", lharul = "\u296A", lhblk = "\u2584", ljcy = "\u0459", ll = "\u226A", llarr = "\u21C7", llcorner = "\u231E", llhard = "\u296B", lltri = "\u25FA", lmidot = "\u0140", lmoust = "\u23B0", lmoustache = "\u23B0", lnE = "\u2268", lnap = "\u2A89", lnapprox = "\u2A89", lne = "\u2A87", lneq = "\u2A87", lneqq = "\u2268", lnsim = "\u22E6", loang = "\u27EC", loarr = "\u21FD", lobrk = "\u27E6", longleftarrow = "\u27F5", longleftrightarrow = "\u27F7", longmapsto = "\u27FC", longrightarrow = "\u27F6", looparrowleft = "\u21AB", looparrowright = "\u21AC", lopar = "\u2985", lopf = "\u{1D55D}", loplus = "\u2A2D", lotimes = "\u2A34", lowast = "\u2217", lowbar = "_", loz = "\u25CA", lozenge = "\u25CA", lozf = "\u29EB", lpar = "(", lparlt = "\u2993", lrarr = "\u21C6", lrcorner = "\u231F", lrhar = "\u21CB", lrhard = "\u296D", lrm = "\u200E", lrtri = "\u22BF", lsaquo = "\u2039", lscr = "\u{1D4C1}", lsh = "\u21B0", lsim = "\u2272", lsime = "\u2A8D", lsimg = "\u2A8F", lsqb = "[", lsquo = "\u2018", lsquor = "\u201A", lstrok = "\u0142", l = "<", lt = "<", ltcc = "\u2AA6", ltcir = "\u2A79", ltdot = "\u22D6", lthree = "\u22CB", ltimes = "\u22C9", ltlarr = "\u2976", ltquest = "\u2A7B", ltrPar = "\u2996", ltri = "\u25C3", ltrie = "\u22B4", ltrif = "\u25C2", lurdshar = "\u294A", luruhar = "\u2966", lvertneqq = "\u2268\uFE00", lvnE = "\u2268\uFE00", mDDot = "\u223A", mac = "\xAF", macr = "\xAF", male = "\u2642", malt = "\u2720", maltese = "\u2720", map$1 = "\u21A6", mapsto = "\u21A6", mapstodown = "\u21A7", mapstoleft = "\u21A4", mapstoup = "\u21A5", marker = "\u25AE", mcomma = "\u2A29", mcy = "\u043C", mdash = "\u2014", measuredangle = "\u2221", mfr = "\u{1D52A}", mho = "\u2127", micr = "\xB5", micro = "\xB5", mid = "\u2223", midast = "*", midcir = "\u2AF0", middo = "\xB7", middot = "\xB7", minus = "\u2212", minusb = "\u229F", minusd = "\u2238", minusdu = "\u2A2A", mlcp = "\u2ADB", mldr = "\u2026", mnplus = "\u2213", models = "\u22A7", mopf = "\u{1D55E}", mp = "\u2213", mscr = "\u{1D4C2}", mstpos = "\u223E", mu = "\u03BC", multimap = "\u22B8", mumap = "\u22B8", nGg = "\u22D9\u0338", nGt = "\u226B\u20D2", nGtv = "\u226B\u0338", nLeftarrow = "\u21CD", nLeftrightarrow = "\u21CE", nLl = "\u22D8\u0338", nLt = "\u226A\u20D2", nLtv = "\u226A\u0338", nRightarrow = "\u21CF", nVDash = "\u22AF", nVdash = "\u22AE", nabla = "\u2207", nacute = "\u0144", nang = "\u2220\u20D2", nap = "\u2249", napE = "\u2A70\u0338", napid = "\u224B\u0338", napos = "\u0149", napprox = "\u2249", natur = "\u266E", natural = "\u266E", naturals = "\u2115", nbs = "\xA0", nbsp = "\xA0", nbump = "\u224E\u0338", nbumpe = "\u224F\u0338", ncap = "\u2A43", ncaron = "\u0148", ncedil = "\u0146", ncong = "\u2247", ncongdot = "\u2A6D\u0338", ncup = "\u2A42", ncy = "\u043D", ndash = "\u2013", ne = "\u2260", neArr = "\u21D7", nearhk = "\u2924", nearr = "\u2197", nearrow = "\u2197", nedot = "\u2250\u0338", nequiv = "\u2262", nesear = "\u2928", nesim = "\u2242\u0338", nexist = "\u2204", nexists = "\u2204", nfr = "\u{1D52B}", ngE = "\u2267\u0338", nge = "\u2271", ngeq = "\u2271", ngeqq = "\u2267\u0338", ngeqslant = "\u2A7E\u0338", nges = "\u2A7E\u0338", ngsim = "\u2275", ngt = "\u226F", ngtr = "\u226F", nhArr = "\u21CE", nharr = "\u21AE", nhpar = "\u2AF2", ni = "\u220B", nis = "\u22FC", nisd = "\u22FA", niv = "\u220B", njcy = "\u045A", nlArr = "\u21CD", nlE = "\u2266\u0338", nlarr = "\u219A", nldr = "\u2025", nle = "\u2270", nleftarrow = "\u219A", nleftrightarrow = "\u21AE", nleq = "\u2270", nleqq = "\u2266\u0338", nleqslant = "\u2A7D\u0338", nles = "\u2A7D\u0338", nless = "\u226E", nlsim = "\u2274", nlt = "\u226E", nltri = "\u22EA", nltrie = "\u22EC", nmid = "\u2224", nopf = "\u{1D55F}", no = "\xAC", not = "\xAC", notin = "\u2209", notinE = "\u22F9\u0338", notindot = "\u22F5\u0338", notinva = "\u2209", notinvb = "\u22F7", notinvc = "\u22F6", notni = "\u220C", notniva = "\u220C", notnivb = "\u22FE", notnivc = "\u22FD", npar = "\u2226", nparallel = "\u2226", nparsl = "\u2AFD\u20E5", npart = "\u2202\u0338", npolint = "\u2A14", npr = "\u2280", nprcue = "\u22E0", npre = "\u2AAF\u0338", nprec = "\u2280", npreceq = "\u2AAF\u0338", nrArr = "\u21CF", nrarr = "\u219B", nrarrc = "\u2933\u0338", nrarrw = "\u219D\u0338", nrightarrow = "\u219B", nrtri = "\u22EB", nrtrie = "\u22ED", nsc = "\u2281", nsccue = "\u22E1", nsce = "\u2AB0\u0338", nscr = "\u{1D4C3}", nshortmid = "\u2224", nshortparallel = "\u2226", nsim = "\u2241", nsime = "\u2244", nsimeq = "\u2244", nsmid = "\u2224", nspar = "\u2226", nsqsube = "\u22E2", nsqsupe = "\u22E3", nsub = "\u2284", nsubE = "\u2AC5\u0338", nsube = "\u2288", nsubset = "\u2282\u20D2", nsubseteq = "\u2288", nsubseteqq = "\u2AC5\u0338", nsucc = "\u2281", nsucceq = "\u2AB0\u0338", nsup = "\u2285", nsupE = "\u2AC6\u0338", nsupe = "\u2289", nsupset = "\u2283\u20D2", nsupseteq = "\u2289", nsupseteqq = "\u2AC6\u0338", ntgl = "\u2279", ntild = "\xF1", ntilde = "\xF1", ntlg = "\u2278", ntriangleleft = "\u22EA", ntrianglelefteq = "\u22EC", ntriangleright = "\u22EB", ntrianglerighteq = "\u22ED", nu = "\u03BD", num = "#", numero = "\u2116", numsp = "\u2007", nvDash = "\u22AD", nvHarr = "\u2904", nvap = "\u224D\u20D2", nvdash = "\u22AC", nvge = "\u2265\u20D2", nvgt = ">\u20D2", nvinfin = "\u29DE", nvlArr = "\u2902", nvle = "\u2264\u20D2", nvlt = "<\u20D2", nvltrie = "\u22B4\u20D2", nvrArr = "\u2903", nvrtrie = "\u22B5\u20D2", nvsim = "\u223C\u20D2", nwArr = "\u21D6", nwarhk = "\u2923", nwarr = "\u2196", nwarrow = "\u2196", nwnear = "\u2927", oS = "\u24C8", oacut = "\xF3", oacute = "\xF3", oast = "\u229B", ocir = "\xF4", ocirc = "\xF4", ocy = "\u043E", odash = "\u229D", odblac = "\u0151", odiv = "\u2A38", odot = "\u2299", odsold = "\u29BC", oelig = "\u0153", ofcir = "\u29BF", ofr = "\u{1D52C}", ogon = "\u02DB", ograv = "\xF2", ograve = "\xF2", ogt = "\u29C1", ohbar = "\u29B5", ohm = "\u03A9", oint = "\u222E", olarr = "\u21BA", olcir = "\u29BE", olcross = "\u29BB", oline = "\u203E", olt = "\u29C0", omacr = "\u014D", omega = "\u03C9", omicron = "\u03BF", omid = "\u29B6", ominus = "\u2296", oopf = "\u{1D560}", opar = "\u29B7", operp = "\u29B9", oplus = "\u2295", or = "\u2228", orarr = "\u21BB", ord = "\xBA", order = "\u2134", orderof = "\u2134", ordf = "\xAA", ordm = "\xBA", origof = "\u22B6", oror = "\u2A56", orslope = "\u2A57", orv = "\u2A5B", oscr = "\u2134", oslas = "\xF8", oslash = "\xF8", osol = "\u2298", otild = "\xF5", otilde = "\xF5", otimes = "\u2297", otimesas = "\u2A36", oum = "\xF6", ouml = "\xF6", ovbar = "\u233D", par = "\xB6", para = "\xB6", parallel = "\u2225", parsim = "\u2AF3", parsl = "\u2AFD", part = "\u2202", pcy = "\u043F", percnt = "%", period = ".", permil = "\u2030", perp = "\u22A5", pertenk = "\u2031", pfr = "\u{1D52D}", phi = "\u03C6", phiv = "\u03D5", phmmat = "\u2133", phone = "\u260E", pi = "\u03C0", pitchfork = "\u22D4", piv = "\u03D6", planck = "\u210F", planckh = "\u210E", plankv = "\u210F", plus = "+", plusacir = "\u2A23", plusb = "\u229E", pluscir = "\u2A22", plusdo = "\u2214", plusdu = "\u2A25", pluse = "\u2A72", plusm = "\xB1", plusmn = "\xB1", plussim = "\u2A26", plustwo = "\u2A27", pm = "\xB1", pointint = "\u2A15", popf = "\u{1D561}", poun = "\xA3", pound = "\xA3", pr = "\u227A", prE = "\u2AB3", prap = "\u2AB7", prcue = "\u227C", pre = "\u2AAF", prec = "\u227A", precapprox = "\u2AB7", preccurlyeq = "\u227C", preceq = "\u2AAF", precnapprox = "\u2AB9", precneqq = "\u2AB5", precnsim = "\u22E8", precsim = "\u227E", prime = "\u2032", primes = "\u2119", prnE = "\u2AB5", prnap = "\u2AB9", prnsim = "\u22E8", prod = "\u220F", profalar = "\u232E", profline = "\u2312", profsurf = "\u2313", prop = "\u221D", propto = "\u221D", prsim = "\u227E", prurel = "\u22B0", pscr = "\u{1D4C5}", psi = "\u03C8", puncsp = "\u2008", qfr = "\u{1D52E}", qint = "\u2A0C", qopf = "\u{1D562}", qprime = "\u2057", qscr = "\u{1D4C6}", quaternions = "\u210D", quatint = "\u2A16", quest = "?", questeq = "\u225F", quo = '"', quot = '"', rAarr = "\u21DB", rArr = "\u21D2", rAtail = "\u291C", rBarr = "\u290F", rHar = "\u2964", race = "\u223D\u0331", racute = "\u0155", radic = "\u221A", raemptyv = "\u29B3", rang = "\u27E9", rangd = "\u2992", range = "\u29A5", rangle = "\u27E9", raqu = "\xBB", raquo = "\xBB", rarr = "\u2192", rarrap = "\u2975", rarrb = "\u21E5", rarrbfs = "\u2920", rarrc = "\u2933", rarrfs = "\u291E", rarrhk = "\u21AA", rarrlp = "\u21AC", rarrpl = "\u2945", rarrsim = "\u2974", rarrtl = "\u21A3", rarrw = "\u219D", ratail = "\u291A", ratio = "\u2236", rationals = "\u211A", rbarr = "\u290D", rbbrk = "\u2773", rbrace = "}", rbrack = "]", rbrke = "\u298C", rbrksld = "\u298E", rbrkslu = "\u2990", rcaron = "\u0159", rcedil = "\u0157", rceil = "\u2309", rcub = "}", rcy = "\u0440", rdca = "\u2937", rdldhar = "\u2969", rdquo = "\u201D", rdquor = "\u201D", rdsh = "\u21B3", real = "\u211C", realine = "\u211B", realpart = "\u211C", reals = "\u211D", rect = "\u25AD", re = "\xAE", reg = "\xAE", rfisht = "\u297D", rfloor = "\u230B", rfr = "\u{1D52F}", rhard = "\u21C1", rharu = "\u21C0", rharul = "\u296C", rho = "\u03C1", rhov = "\u03F1", rightarrow = "\u2192", rightarrowtail = "\u21A3", rightharpoondown = "\u21C1", rightharpoonup = "\u21C0", rightleftarrows = "\u21C4", rightleftharpoons = "\u21CC", rightrightarrows = "\u21C9", rightsquigarrow = "\u219D", rightthreetimes = "\u22CC", ring = "\u02DA", risingdotseq = "\u2253", rlarr = "\u21C4", rlhar = "\u21CC", rlm = "\u200F", rmoust = "\u23B1", rmoustache = "\u23B1", rnmid = "\u2AEE", roang = "\u27ED", roarr = "\u21FE", robrk = "\u27E7", ropar = "\u2986", ropf = "\u{1D563}", roplus = "\u2A2E", rotimes = "\u2A35", rpar = ")", rpargt = "\u2994", rppolint = "\u2A12", rrarr = "\u21C9", rsaquo = "\u203A", rscr = "\u{1D4C7}", rsh = "\u21B1", rsqb = "]", rsquo = "\u2019", rsquor = "\u2019", rthree = "\u22CC", rtimes = "\u22CA", rtri = "\u25B9", rtrie = "\u22B5", rtrif = "\u25B8", rtriltri = "\u29CE", ruluhar = "\u2968", rx = "\u211E", sacute = "\u015B", sbquo = "\u201A", sc = "\u227B", scE = "\u2AB4", scap = "\u2AB8", scaron = "\u0161", sccue = "\u227D", sce = "\u2AB0", scedil = "\u015F", scirc = "\u015D", scnE = "\u2AB6", scnap = "\u2ABA", scnsim = "\u22E9", scpolint = "\u2A13", scsim = "\u227F", scy = "\u0441", sdot = "\u22C5", sdotb = "\u22A1", sdote = "\u2A66", seArr = "\u21D8", searhk = "\u2925", searr = "\u2198", searrow = "\u2198", sec = "\xA7", sect = "\xA7", semi = ";", seswar = "\u2929", setminus = "\u2216", setmn = "\u2216", sext = "\u2736", sfr = "\u{1D530}", sfrown = "\u2322", sharp = "\u266F", shchcy = "\u0449", shcy = "\u0448", shortmid = "\u2223", shortparallel = "\u2225", sh = "\xAD", shy = "\xAD", sigma = "\u03C3", sigmaf = "\u03C2", sigmav = "\u03C2", sim = "\u223C", simdot = "\u2A6A", sime = "\u2243", simeq = "\u2243", simg = "\u2A9E", simgE = "\u2AA0", siml = "\u2A9D", simlE = "\u2A9F", simne = "\u2246", simplus = "\u2A24", simrarr = "\u2972", slarr = "\u2190", smallsetminus = "\u2216", smashp = "\u2A33", smeparsl = "\u29E4", smid = "\u2223", smile = "\u2323", smt = "\u2AAA", smte = "\u2AAC", smtes = "\u2AAC\uFE00", softcy = "\u044C", sol = "/", solb = "\u29C4", solbar = "\u233F", sopf = "\u{1D564}", spades = "\u2660", spadesuit = "\u2660", spar = "\u2225", sqcap = "\u2293", sqcaps = "\u2293\uFE00", sqcup = "\u2294", sqcups = "\u2294\uFE00", sqsub = "\u228F", sqsube = "\u2291", sqsubset = "\u228F", sqsubseteq = "\u2291", sqsup = "\u2290", sqsupe = "\u2292", sqsupset = "\u2290", sqsupseteq = "\u2292", squ = "\u25A1", square = "\u25A1", squarf = "\u25AA", squf = "\u25AA", srarr = "\u2192", sscr = "\u{1D4C8}", ssetmn = "\u2216", ssmile = "\u2323", sstarf = "\u22C6", star = "\u2606", starf = "\u2605", straightepsilon = "\u03F5", straightphi = "\u03D5", strns = "\xAF", sub = "\u2282", subE = "\u2AC5", subdot = "\u2ABD", sube = "\u2286", subedot = "\u2AC3", submult = "\u2AC1", subnE = "\u2ACB", subne = "\u228A", subplus = "\u2ABF", subrarr = "\u2979", subset = "\u2282", subseteq = "\u2286", subseteqq = "\u2AC5", subsetneq = "\u228A", subsetneqq = "\u2ACB", subsim = "\u2AC7", subsub = "\u2AD5", subsup = "\u2AD3", succ = "\u227B", succapprox = "\u2AB8", succcurlyeq = "\u227D", succeq = "\u2AB0", succnapprox = "\u2ABA", succneqq = "\u2AB6", succnsim = "\u22E9", succsim = "\u227F", sum = "\u2211", sung = "\u266A", sup = "\u2283", sup1 = "\xB9", sup2 = "\xB2", sup3 = "\xB3", supE = "\u2AC6", supdot = "\u2ABE", supdsub = "\u2AD8", supe = "\u2287", supedot = "\u2AC4", suphsol = "\u27C9", suphsub = "\u2AD7", suplarr = "\u297B", supmult = "\u2AC2", supnE = "\u2ACC", supne = "\u228B", supplus = "\u2AC0", supset = "\u2283", supseteq = "\u2287", supseteqq = "\u2AC6", supsetneq = "\u228B", supsetneqq = "\u2ACC", supsim = "\u2AC8", supsub = "\u2AD4", supsup = "\u2AD6", swArr = "\u21D9", swarhk = "\u2926", swarr = "\u2199", swarrow = "\u2199", swnwar = "\u292A", szli = "\xDF", szlig = "\xDF", target = "\u2316", tau = "\u03C4", tbrk = "\u23B4", tcaron = "\u0165", tcedil = "\u0163", tcy = "\u0442", tdot = "\u20DB", telrec = "\u2315", tfr = "\u{1D531}", there4 = "\u2234", therefore = "\u2234", theta = "\u03B8", thetasym = "\u03D1", thetav = "\u03D1", thickapprox = "\u2248", thicksim = "\u223C", thinsp = "\u2009", thkap = "\u2248", thksim = "\u223C", thor = "\xFE", thorn = "\xFE", tilde = "\u02DC", time = "\xD7", times = "\xD7", timesb = "\u22A0", timesbar = "\u2A31", timesd = "\u2A30", tint = "\u222D", toea = "\u2928", top = "\u22A4", topbot = "\u2336", topcir = "\u2AF1", topf = "\u{1D565}", topfork = "\u2ADA", tosa = "\u2929", tprime = "\u2034", trade = "\u2122", triangle = "\u25B5", triangledown = "\u25BF", triangleleft = "\u25C3", trianglelefteq = "\u22B4", triangleq = "\u225C", triangleright = "\u25B9", trianglerighteq = "\u22B5", tridot = "\u25EC", trie = "\u225C", triminus = "\u2A3A", triplus = "\u2A39", trisb = "\u29CD", tritime = "\u2A3B", trpezium = "\u23E2", tscr = "\u{1D4C9}", tscy = "\u0446", tshcy = "\u045B", tstrok = "\u0167", twixt = "\u226C", twoheadleftarrow = "\u219E", twoheadrightarrow = "\u21A0", uArr = "\u21D1", uHar = "\u2963", uacut = "\xFA", uacute = "\xFA", uarr = "\u2191", ubrcy = "\u045E", ubreve = "\u016D", ucir = "\xFB", ucirc = "\xFB", ucy = "\u0443", udarr = "\u21C5", udblac = "\u0171", udhar = "\u296E", ufisht = "\u297E", ufr = "\u{1D532}", ugrav = "\xF9", ugrave = "\xF9", uharl = "\u21BF", uharr = "\u21BE", uhblk = "\u2580", ulcorn = "\u231C", ulcorner = "\u231C", ulcrop = "\u230F", ultri = "\u25F8", umacr = "\u016B", um = "\xA8", uml = "\xA8", uogon = "\u0173", uopf = "\u{1D566}", uparrow = "\u2191", updownarrow = "\u2195", upharpoonleft = "\u21BF", upharpoonright = "\u21BE", uplus = "\u228E", upsi = "\u03C5", upsih = "\u03D2", upsilon = "\u03C5", upuparrows = "\u21C8", urcorn = "\u231D", urcorner = "\u231D", urcrop = "\u230E", uring = "\u016F", urtri = "\u25F9", uscr = "\u{1D4CA}", utdot = "\u22F0", utilde = "\u0169", utri = "\u25B5", utrif = "\u25B4", uuarr = "\u21C8", uum = "\xFC", uuml = "\xFC", uwangle = "\u29A7", vArr = "\u21D5", vBar = "\u2AE8", vBarv = "\u2AE9", vDash = "\u22A8", vangrt = "\u299C", varepsilon = "\u03F5", varkappa = "\u03F0", varnothing = "\u2205", varphi = "\u03D5", varpi = "\u03D6", varpropto = "\u221D", varr = "\u2195", varrho = "\u03F1", varsigma = "\u03C2", varsubsetneq = "\u228A\uFE00", varsubsetneqq = "\u2ACB\uFE00", varsupsetneq = "\u228B\uFE00", varsupsetneqq = "\u2ACC\uFE00", vartheta = "\u03D1", vartriangleleft = "\u22B2", vartriangleright = "\u22B3", vcy = "\u0432", vdash = "\u22A2", vee = "\u2228", veebar = "\u22BB", veeeq = "\u225A", vellip = "\u22EE", verbar = "|", vert = "|", vfr = "\u{1D533}", vltri = "\u22B2", vnsub = "\u2282\u20D2", vnsup = "\u2283\u20D2", vopf = "\u{1D567}", vprop = "\u221D", vrtri = "\u22B3", vscr = "\u{1D4CB}", vsubnE = "\u2ACB\uFE00", vsubne = "\u228A\uFE00", vsupnE = "\u2ACC\uFE00", vsupne = "\u228B\uFE00", vzigzag = "\u299A", wcirc = "\u0175", wedbar = "\u2A5F", wedge = "\u2227", wedgeq = "\u2259", weierp = "\u2118", wfr = "\u{1D534}", wopf = "\u{1D568}", wp = "\u2118", wr = "\u2240", wreath = "\u2240", wscr = "\u{1D4CC}", xcap = "\u22C2", xcirc = "\u25EF", xcup = "\u22C3", xdtri = "\u25BD", xfr = "\u{1D535}", xhArr = "\u27FA", xharr = "\u27F7", xi = "\u03BE", xlArr = "\u27F8", xlarr = "\u27F5", xmap = "\u27FC", xnis = "\u22FB", xodot = "\u2A00", xopf = "\u{1D569}", xoplus = "\u2A01", xotime = "\u2A02", xrArr = "\u27F9", xrarr = "\u27F6", xscr = "\u{1D4CD}", xsqcup = "\u2A06", xuplus = "\u2A04", xutri = "\u25B3", xvee = "\u22C1", xwedge = "\u22C0", yacut = "\xFD", yacute = "\xFD", yacy = "\u044F", ycirc = "\u0177", ycy = "\u044B", ye = "\xA5", yen = "\xA5", yfr = "\u{1D536}", yicy = "\u0457", yopf = "\u{1D56A}", yscr = "\u{1D4CE}", yucy = "\u044E", yum = "\xFF", yuml = "\xFF", zacute = "\u017A", zcaron = "\u017E", zcy = "\u0437", zdot = "\u017C", zeetrf = "\u2128", zeta = "\u03B6", zfr = "\u{1D537}", zhcy = "\u0436", zigrarr = "\u21DD", zopf = "\u{1D56B}", zscr = "\u{1D4CF}", zwj = "\u200D", zwnj = "\u200C", require$$0 = {
  AEli,
  AElig,
  AM,
  AMP,
  Aacut,
  Aacute,
  Abreve,
  Acir,
  Acirc,
  Acy,
  Afr,
  Agrav,
  Agrave,
  Alpha,
  Amacr,
  And,
  Aogon,
  Aopf,
  ApplyFunction,
  Arin,
  Aring,
  Ascr,
  Assign,
  Atild,
  Atilde,
  Aum,
  Auml,
  Backslash,
  Barv,
  Barwed,
  Bcy,
  Because,
  Bernoullis,
  Beta,
  Bfr,
  Bopf,
  Breve,
  Bscr,
  Bumpeq,
  CHcy,
  COP,
  COPY,
  Cacute,
  Cap,
  CapitalDifferentialD,
  Cayleys,
  Ccaron,
  Ccedi,
  Ccedil,
  Ccirc,
  Cconint,
  Cdot,
  Cedilla,
  CenterDot,
  Cfr,
  Chi,
  CircleDot,
  CircleMinus,
  CirclePlus,
  CircleTimes,
  ClockwiseContourIntegral,
  CloseCurlyDoubleQuote,
  CloseCurlyQuote,
  Colon,
  Colone,
  Congruent,
  Conint,
  ContourIntegral,
  Copf,
  Coproduct,
  CounterClockwiseContourIntegral,
  Cross,
  Cscr,
  Cup,
  CupCap,
  DD,
  DDotrahd,
  DJcy,
  DScy,
  DZcy,
  Dagger,
  Darr,
  Dashv,
  Dcaron,
  Dcy,
  Del,
  Delta,
  Dfr,
  DiacriticalAcute,
  DiacriticalDot,
  DiacriticalDoubleAcute,
  DiacriticalGrave,
  DiacriticalTilde,
  Diamond,
  DifferentialD,
  Dopf,
  Dot,
  DotDot,
  DotEqual,
  DoubleContourIntegral,
  DoubleDot,
  DoubleDownArrow,
  DoubleLeftArrow,
  DoubleLeftRightArrow,
  DoubleLeftTee,
  DoubleLongLeftArrow,
  DoubleLongLeftRightArrow,
  DoubleLongRightArrow,
  DoubleRightArrow,
  DoubleRightTee,
  DoubleUpArrow,
  DoubleUpDownArrow,
  DoubleVerticalBar,
  DownArrow,
  DownArrowBar,
  DownArrowUpArrow,
  DownBreve,
  DownLeftRightVector,
  DownLeftTeeVector,
  DownLeftVector,
  DownLeftVectorBar,
  DownRightTeeVector,
  DownRightVector,
  DownRightVectorBar,
  DownTee,
  DownTeeArrow,
  Downarrow,
  Dscr,
  Dstrok,
  ENG,
  ET,
  ETH,
  Eacut,
  Eacute,
  Ecaron,
  Ecir,
  Ecirc,
  Ecy,
  Edot,
  Efr,
  Egrav,
  Egrave,
  Element,
  Emacr,
  EmptySmallSquare,
  EmptyVerySmallSquare,
  Eogon,
  Eopf,
  Epsilon,
  Equal,
  EqualTilde,
  Equilibrium,
  Escr,
  Esim,
  Eta,
  Eum,
  Euml,
  Exists,
  ExponentialE,
  Fcy,
  Ffr,
  FilledSmallSquare,
  FilledVerySmallSquare,
  Fopf,
  ForAll,
  Fouriertrf,
  Fscr,
  GJcy,
  G,
  GT,
  Gamma,
  Gammad,
  Gbreve,
  Gcedil,
  Gcirc,
  Gcy,
  Gdot,
  Gfr,
  Gg,
  Gopf,
  GreaterEqual,
  GreaterEqualLess,
  GreaterFullEqual,
  GreaterGreater,
  GreaterLess,
  GreaterSlantEqual,
  GreaterTilde,
  Gscr,
  Gt,
  HARDcy,
  Hacek,
  Hat,
  Hcirc,
  Hfr,
  HilbertSpace,
  Hopf,
  HorizontalLine,
  Hscr,
  Hstrok,
  HumpDownHump,
  HumpEqual,
  IEcy,
  IJlig,
  IOcy,
  Iacut,
  Iacute,
  Icir,
  Icirc,
  Icy,
  Idot,
  Ifr,
  Igrav,
  Igrave,
  Im,
  Imacr,
  ImaginaryI,
  Implies,
  Int,
  Integral,
  Intersection,
  InvisibleComma,
  InvisibleTimes,
  Iogon,
  Iopf,
  Iota,
  Iscr,
  Itilde,
  Iukcy,
  Ium,
  Iuml,
  Jcirc,
  Jcy,
  Jfr,
  Jopf,
  Jscr,
  Jsercy,
  Jukcy,
  KHcy,
  KJcy,
  Kappa,
  Kcedil,
  Kcy,
  Kfr,
  Kopf,
  Kscr,
  LJcy,
  L,
  LT,
  Lacute,
  Lambda,
  Lang,
  Laplacetrf,
  Larr,
  Lcaron,
  Lcedil,
  Lcy,
  LeftAngleBracket,
  LeftArrow,
  LeftArrowBar,
  LeftArrowRightArrow,
  LeftCeiling,
  LeftDoubleBracket,
  LeftDownTeeVector,
  LeftDownVector,
  LeftDownVectorBar,
  LeftFloor,
  LeftRightArrow,
  LeftRightVector,
  LeftTee,
  LeftTeeArrow,
  LeftTeeVector,
  LeftTriangle,
  LeftTriangleBar,
  LeftTriangleEqual,
  LeftUpDownVector,
  LeftUpTeeVector,
  LeftUpVector,
  LeftUpVectorBar,
  LeftVector,
  LeftVectorBar,
  Leftarrow,
  Leftrightarrow,
  LessEqualGreater,
  LessFullEqual,
  LessGreater,
  LessLess,
  LessSlantEqual,
  LessTilde,
  Lfr,
  Ll,
  Lleftarrow,
  Lmidot,
  LongLeftArrow,
  LongLeftRightArrow,
  LongRightArrow,
  Longleftarrow,
  Longleftrightarrow,
  Longrightarrow,
  Lopf,
  LowerLeftArrow,
  LowerRightArrow,
  Lscr,
  Lsh,
  Lstrok,
  Lt,
  Map: "\u2905",
  Mcy,
  MediumSpace,
  Mellintrf,
  Mfr,
  MinusPlus,
  Mopf,
  Mscr,
  Mu,
  NJcy,
  Nacute,
  Ncaron,
  Ncedil,
  Ncy,
  NegativeMediumSpace,
  NegativeThickSpace,
  NegativeThinSpace,
  NegativeVeryThinSpace,
  NestedGreaterGreater,
  NestedLessLess,
  NewLine,
  Nfr,
  NoBreak,
  NonBreakingSpace,
  Nopf,
  Not,
  NotCongruent,
  NotCupCap,
  NotDoubleVerticalBar,
  NotElement,
  NotEqual,
  NotEqualTilde,
  NotExists,
  NotGreater,
  NotGreaterEqual,
  NotGreaterFullEqual,
  NotGreaterGreater,
  NotGreaterLess,
  NotGreaterSlantEqual,
  NotGreaterTilde,
  NotHumpDownHump,
  NotHumpEqual,
  NotLeftTriangle,
  NotLeftTriangleBar,
  NotLeftTriangleEqual,
  NotLess,
  NotLessEqual,
  NotLessGreater,
  NotLessLess,
  NotLessSlantEqual,
  NotLessTilde,
  NotNestedGreaterGreater,
  NotNestedLessLess,
  NotPrecedes,
  NotPrecedesEqual,
  NotPrecedesSlantEqual,
  NotReverseElement,
  NotRightTriangle,
  NotRightTriangleBar,
  NotRightTriangleEqual,
  NotSquareSubset,
  NotSquareSubsetEqual,
  NotSquareSuperset,
  NotSquareSupersetEqual,
  NotSubset,
  NotSubsetEqual,
  NotSucceeds,
  NotSucceedsEqual,
  NotSucceedsSlantEqual,
  NotSucceedsTilde,
  NotSuperset,
  NotSupersetEqual,
  NotTilde,
  NotTildeEqual,
  NotTildeFullEqual,
  NotTildeTilde,
  NotVerticalBar,
  Nscr,
  Ntild,
  Ntilde,
  Nu,
  OElig,
  Oacut,
  Oacute,
  Ocir,
  Ocirc,
  Ocy,
  Odblac,
  Ofr,
  Ograv,
  Ograve,
  Omacr,
  Omega,
  Omicron,
  Oopf,
  OpenCurlyDoubleQuote,
  OpenCurlyQuote,
  Or,
  Oscr,
  Oslas,
  Oslash,
  Otild,
  Otilde,
  Otimes,
  Oum,
  Ouml,
  OverBar,
  OverBrace,
  OverBracket,
  OverParenthesis,
  PartialD,
  Pcy,
  Pfr,
  Phi,
  Pi,
  PlusMinus,
  Poincareplane,
  Popf,
  Pr,
  Precedes,
  PrecedesEqual,
  PrecedesSlantEqual,
  PrecedesTilde,
  Prime,
  Product,
  Proportion,
  Proportional,
  Pscr,
  Psi,
  QUO,
  QUOT,
  Qfr,
  Qopf,
  Qscr,
  RBarr,
  RE,
  REG,
  Racute,
  Rang,
  Rarr,
  Rarrtl,
  Rcaron,
  Rcedil,
  Rcy,
  Re,
  ReverseElement,
  ReverseEquilibrium,
  ReverseUpEquilibrium,
  Rfr,
  Rho,
  RightAngleBracket,
  RightArrow,
  RightArrowBar,
  RightArrowLeftArrow,
  RightCeiling,
  RightDoubleBracket,
  RightDownTeeVector,
  RightDownVector,
  RightDownVectorBar,
  RightFloor,
  RightTee,
  RightTeeArrow,
  RightTeeVector,
  RightTriangle,
  RightTriangleBar,
  RightTriangleEqual,
  RightUpDownVector,
  RightUpTeeVector,
  RightUpVector,
  RightUpVectorBar,
  RightVector,
  RightVectorBar,
  Rightarrow,
  Ropf,
  RoundImplies,
  Rrightarrow,
  Rscr,
  Rsh,
  RuleDelayed,
  SHCHcy,
  SHcy,
  SOFTcy,
  Sacute,
  Sc,
  Scaron,
  Scedil,
  Scirc,
  Scy,
  Sfr,
  ShortDownArrow,
  ShortLeftArrow,
  ShortRightArrow,
  ShortUpArrow,
  Sigma,
  SmallCircle,
  Sopf,
  Sqrt,
  Square,
  SquareIntersection,
  SquareSubset,
  SquareSubsetEqual,
  SquareSuperset,
  SquareSupersetEqual,
  SquareUnion,
  Sscr,
  Star,
  Sub,
  Subset,
  SubsetEqual,
  Succeeds,
  SucceedsEqual,
  SucceedsSlantEqual,
  SucceedsTilde,
  SuchThat,
  Sum,
  Sup,
  Superset,
  SupersetEqual,
  Supset,
  THOR,
  THORN,
  TRADE,
  TSHcy,
  TScy,
  Tab,
  Tau,
  Tcaron,
  Tcedil,
  Tcy,
  Tfr,
  Therefore,
  Theta,
  ThickSpace,
  ThinSpace,
  Tilde,
  TildeEqual,
  TildeFullEqual,
  TildeTilde,
  Topf,
  TripleDot,
  Tscr,
  Tstrok,
  Uacut,
  Uacute,
  Uarr,
  Uarrocir,
  Ubrcy,
  Ubreve,
  Ucir,
  Ucirc,
  Ucy,
  Udblac,
  Ufr,
  Ugrav,
  Ugrave,
  Umacr,
  UnderBar,
  UnderBrace,
  UnderBracket,
  UnderParenthesis,
  Union,
  UnionPlus,
  Uogon,
  Uopf,
  UpArrow,
  UpArrowBar,
  UpArrowDownArrow,
  UpDownArrow,
  UpEquilibrium,
  UpTee,
  UpTeeArrow,
  Uparrow,
  Updownarrow,
  UpperLeftArrow,
  UpperRightArrow,
  Upsi,
  Upsilon,
  Uring,
  Uscr,
  Utilde,
  Uum,
  Uuml,
  VDash,
  Vbar,
  Vcy,
  Vdash,
  Vdashl,
  Vee,
  Verbar,
  Vert,
  VerticalBar,
  VerticalLine,
  VerticalSeparator,
  VerticalTilde,
  VeryThinSpace,
  Vfr,
  Vopf,
  Vscr,
  Vvdash,
  Wcirc,
  Wedge,
  Wfr,
  Wopf,
  Wscr,
  Xfr,
  Xi,
  Xopf,
  Xscr,
  YAcy,
  YIcy,
  YUcy,
  Yacut,
  Yacute,
  Ycirc,
  Ycy,
  Yfr,
  Yopf,
  Yscr,
  Yuml,
  ZHcy,
  Zacute,
  Zcaron,
  Zcy,
  Zdot,
  ZeroWidthSpace,
  Zeta,
  Zfr,
  Zopf,
  Zscr,
  aacut,
  aacute,
  abreve,
  ac,
  acE,
  acd,
  acir,
  acirc,
  acut,
  acute,
  acy,
  aeli,
  aelig,
  af,
  afr,
  agrav,
  agrave,
  alefsym,
  aleph,
  alpha,
  amacr,
  amalg,
  am,
  amp,
  and,
  andand,
  andd,
  andslope,
  andv,
  ang,
  ange,
  angle,
  angmsd,
  angmsdaa,
  angmsdab,
  angmsdac,
  angmsdad,
  angmsdae,
  angmsdaf,
  angmsdag,
  angmsdah,
  angrt,
  angrtvb,
  angrtvbd,
  angsph,
  angst,
  angzarr,
  aogon,
  aopf,
  ap,
  apE,
  apacir,
  ape,
  apid,
  apos,
  approx,
  approxeq,
  arin,
  aring,
  ascr,
  ast,
  asymp,
  asympeq,
  atild,
  atilde,
  aum,
  auml,
  awconint,
  awint,
  bNot,
  backcong,
  backepsilon,
  backprime,
  backsim,
  backsimeq,
  barvee,
  barwed,
  barwedge,
  bbrk,
  bbrktbrk,
  bcong,
  bcy,
  bdquo,
  becaus,
  because,
  bemptyv,
  bepsi,
  bernou,
  beta,
  beth,
  between,
  bfr,
  bigcap,
  bigcirc,
  bigcup,
  bigodot,
  bigoplus,
  bigotimes,
  bigsqcup,
  bigstar,
  bigtriangledown,
  bigtriangleup,
  biguplus,
  bigvee,
  bigwedge,
  bkarow,
  blacklozenge,
  blacksquare,
  blacktriangle,
  blacktriangledown,
  blacktriangleleft,
  blacktriangleright,
  blank,
  blk12,
  blk14,
  blk34,
  block,
  bne,
  bnequiv,
  bnot,
  bopf,
  bot,
  bottom,
  bowtie,
  boxDL,
  boxDR,
  boxDl,
  boxDr,
  boxH,
  boxHD,
  boxHU,
  boxHd,
  boxHu,
  boxUL,
  boxUR,
  boxUl,
  boxUr,
  boxV,
  boxVH,
  boxVL,
  boxVR,
  boxVh,
  boxVl,
  boxVr,
  boxbox,
  boxdL,
  boxdR,
  boxdl,
  boxdr,
  boxh,
  boxhD,
  boxhU,
  boxhd,
  boxhu,
  boxminus,
  boxplus,
  boxtimes,
  boxuL,
  boxuR,
  boxul,
  boxur,
  boxv,
  boxvH,
  boxvL,
  boxvR,
  boxvh,
  boxvl,
  boxvr,
  bprime,
  breve,
  brvba,
  brvbar,
  bscr,
  bsemi,
  bsim,
  bsime,
  bsol,
  bsolb,
  bsolhsub,
  bull,
  bullet,
  bump,
  bumpE,
  bumpe,
  bumpeq,
  cacute,
  cap,
  capand,
  capbrcup,
  capcap,
  capcup,
  capdot,
  caps,
  caret,
  caron,
  ccaps,
  ccaron,
  ccedi,
  ccedil,
  ccirc,
  ccups,
  ccupssm,
  cdot,
  cedi,
  cedil,
  cemptyv,
  cen,
  cent,
  centerdot,
  cfr,
  chcy,
  check,
  checkmark,
  chi,
  cir,
  cirE,
  circ,
  circeq,
  circlearrowleft,
  circlearrowright,
  circledR,
  circledS,
  circledast,
  circledcirc,
  circleddash,
  cire,
  cirfnint,
  cirmid,
  cirscir,
  clubs,
  clubsuit,
  colon,
  colone,
  coloneq,
  comma,
  commat,
  comp,
  compfn,
  complement,
  complexes,
  cong,
  congdot,
  conint,
  copf,
  coprod,
  cop,
  copy,
  copysr,
  crarr,
  cross,
  cscr,
  csub,
  csube,
  csup,
  csupe,
  ctdot,
  cudarrl,
  cudarrr,
  cuepr,
  cuesc,
  cularr,
  cularrp,
  cup,
  cupbrcap,
  cupcap,
  cupcup,
  cupdot,
  cupor,
  cups,
  curarr,
  curarrm,
  curlyeqprec,
  curlyeqsucc,
  curlyvee,
  curlywedge,
  curre,
  curren,
  curvearrowleft,
  curvearrowright,
  cuvee,
  cuwed,
  cwconint,
  cwint,
  cylcty,
  dArr,
  dHar,
  dagger,
  daleth,
  darr,
  dash,
  dashv,
  dbkarow,
  dblac,
  dcaron,
  dcy,
  dd,
  ddagger,
  ddarr,
  ddotseq,
  de,
  deg,
  delta,
  demptyv,
  dfisht,
  dfr,
  dharl,
  dharr,
  diam,
  diamond,
  diamondsuit,
  diams,
  die,
  digamma,
  disin,
  div,
  divid,
  divide,
  divideontimes,
  divonx,
  djcy,
  dlcorn,
  dlcrop,
  dollar,
  dopf,
  dot,
  doteq,
  doteqdot,
  dotminus,
  dotplus,
  dotsquare,
  doublebarwedge,
  downarrow,
  downdownarrows,
  downharpoonleft,
  downharpoonright,
  drbkarow,
  drcorn,
  drcrop,
  dscr,
  dscy,
  dsol,
  dstrok,
  dtdot,
  dtri,
  dtrif,
  duarr,
  duhar,
  dwangle,
  dzcy,
  dzigrarr,
  eDDot,
  eDot,
  eacut,
  eacute,
  easter,
  ecaron,
  ecir,
  ecirc,
  ecolon,
  ecy,
  edot,
  ee,
  efDot,
  efr,
  eg,
  egrav,
  egrave,
  egs,
  egsdot,
  el,
  elinters,
  ell,
  els,
  elsdot,
  emacr,
  empty,
  emptyset,
  emptyv,
  emsp13,
  emsp14,
  emsp,
  eng,
  ensp,
  eogon,
  eopf,
  epar,
  eparsl,
  eplus,
  epsi,
  epsilon,
  epsiv,
  eqcirc,
  eqcolon,
  eqsim,
  eqslantgtr,
  eqslantless,
  equals,
  equest,
  equiv,
  equivDD,
  eqvparsl,
  erDot,
  erarr,
  escr,
  esdot,
  esim,
  eta,
  et,
  eth,
  eum,
  euml,
  euro,
  excl,
  exist,
  expectation,
  exponentiale,
  fallingdotseq,
  fcy,
  female,
  ffilig,
  fflig,
  ffllig,
  ffr,
  filig,
  fjlig,
  flat,
  fllig,
  fltns,
  fnof,
  fopf,
  forall,
  fork,
  forkv,
  fpartint,
  frac1,
  frac12,
  frac13,
  frac14,
  frac15,
  frac16,
  frac18,
  frac23,
  frac25,
  frac3,
  frac34,
  frac35,
  frac38,
  frac45,
  frac56,
  frac58,
  frac78,
  frasl,
  frown,
  fscr,
  gE,
  gEl,
  gacute,
  gamma,
  gammad,
  gap,
  gbreve,
  gcirc,
  gcy,
  gdot,
  ge,
  gel,
  geq,
  geqq,
  geqslant,
  ges,
  gescc,
  gesdot,
  gesdoto,
  gesdotol,
  gesl,
  gesles,
  gfr,
  gg,
  ggg,
  gimel,
  gjcy,
  gl,
  glE,
  gla,
  glj,
  gnE,
  gnap,
  gnapprox,
  gne,
  gneq,
  gneqq,
  gnsim,
  gopf,
  grave,
  gscr,
  gsim,
  gsime,
  gsiml,
  g,
  gt,
  gtcc,
  gtcir,
  gtdot,
  gtlPar,
  gtquest,
  gtrapprox,
  gtrarr,
  gtrdot,
  gtreqless,
  gtreqqless,
  gtrless,
  gtrsim,
  gvertneqq,
  gvnE,
  hArr,
  hairsp,
  half,
  hamilt,
  hardcy,
  harr,
  harrcir,
  harrw,
  hbar,
  hcirc,
  hearts,
  heartsuit,
  hellip,
  hercon,
  hfr,
  hksearow,
  hkswarow,
  hoarr,
  homtht,
  hookleftarrow,
  hookrightarrow,
  hopf,
  horbar,
  hscr,
  hslash,
  hstrok,
  hybull,
  hyphen,
  iacut,
  iacute,
  ic,
  icir,
  icirc,
  icy,
  iecy,
  iexc,
  iexcl,
  iff,
  ifr,
  igrav,
  igrave,
  ii,
  iiiint,
  iiint,
  iinfin,
  iiota,
  ijlig,
  imacr,
  image,
  imagline,
  imagpart,
  imath,
  imof,
  imped,
  in: "\u2208",
  incare,
  infin,
  infintie,
  inodot,
  int,
  intcal,
  integers,
  intercal,
  intlarhk,
  intprod,
  iocy,
  iogon,
  iopf,
  iota,
  iprod,
  iques,
  iquest,
  iscr,
  isin,
  isinE,
  isindot,
  isins,
  isinsv,
  isinv,
  it,
  itilde,
  iukcy,
  ium,
  iuml,
  jcirc,
  jcy,
  jfr,
  jmath,
  jopf,
  jscr,
  jsercy,
  jukcy,
  kappa,
  kappav,
  kcedil,
  kcy,
  kfr,
  kgreen,
  khcy,
  kjcy,
  kopf,
  kscr,
  lAarr,
  lArr,
  lAtail,
  lBarr,
  lE,
  lEg,
  lHar,
  lacute,
  laemptyv,
  lagran,
  lambda,
  lang,
  langd,
  langle,
  lap,
  laqu,
  laquo,
  larr,
  larrb,
  larrbfs,
  larrfs,
  larrhk,
  larrlp,
  larrpl,
  larrsim,
  larrtl,
  lat,
  latail,
  late,
  lates,
  lbarr,
  lbbrk,
  lbrace,
  lbrack,
  lbrke,
  lbrksld,
  lbrkslu,
  lcaron,
  lcedil,
  lceil,
  lcub,
  lcy,
  ldca,
  ldquo,
  ldquor,
  ldrdhar,
  ldrushar,
  ldsh,
  le,
  leftarrow,
  leftarrowtail,
  leftharpoondown,
  leftharpoonup,
  leftleftarrows,
  leftrightarrow,
  leftrightarrows,
  leftrightharpoons,
  leftrightsquigarrow,
  leftthreetimes,
  leg,
  leq,
  leqq,
  leqslant,
  les,
  lescc,
  lesdot,
  lesdoto,
  lesdotor,
  lesg,
  lesges,
  lessapprox,
  lessdot,
  lesseqgtr,
  lesseqqgtr,
  lessgtr,
  lesssim,
  lfisht,
  lfloor,
  lfr,
  lg,
  lgE,
  lhard,
  lharu,
  lharul,
  lhblk,
  ljcy,
  ll,
  llarr,
  llcorner,
  llhard,
  lltri,
  lmidot,
  lmoust,
  lmoustache,
  lnE,
  lnap,
  lnapprox,
  lne,
  lneq,
  lneqq,
  lnsim,
  loang,
  loarr,
  lobrk,
  longleftarrow,
  longleftrightarrow,
  longmapsto,
  longrightarrow,
  looparrowleft,
  looparrowright,
  lopar,
  lopf,
  loplus,
  lotimes,
  lowast,
  lowbar,
  loz,
  lozenge,
  lozf,
  lpar,
  lparlt,
  lrarr,
  lrcorner,
  lrhar,
  lrhard,
  lrm,
  lrtri,
  lsaquo,
  lscr,
  lsh,
  lsim,
  lsime,
  lsimg,
  lsqb,
  lsquo,
  lsquor,
  lstrok,
  l,
  lt,
  ltcc,
  ltcir,
  ltdot,
  lthree,
  ltimes,
  ltlarr,
  ltquest,
  ltrPar,
  ltri,
  ltrie,
  ltrif,
  lurdshar,
  luruhar,
  lvertneqq,
  lvnE,
  mDDot,
  mac,
  macr,
  male,
  malt,
  maltese,
  map: map$1,
  mapsto,
  mapstodown,
  mapstoleft,
  mapstoup,
  marker,
  mcomma,
  mcy,
  mdash,
  measuredangle,
  mfr,
  mho,
  micr,
  micro,
  mid,
  midast,
  midcir,
  middo,
  middot,
  minus,
  minusb,
  minusd,
  minusdu,
  mlcp,
  mldr,
  mnplus,
  models,
  mopf,
  mp,
  mscr,
  mstpos,
  mu,
  multimap,
  mumap,
  nGg,
  nGt,
  nGtv,
  nLeftarrow,
  nLeftrightarrow,
  nLl,
  nLt,
  nLtv,
  nRightarrow,
  nVDash,
  nVdash,
  nabla,
  nacute,
  nang,
  nap,
  napE,
  napid,
  napos,
  napprox,
  natur,
  natural,
  naturals,
  nbs,
  nbsp,
  nbump,
  nbumpe,
  ncap,
  ncaron,
  ncedil,
  ncong,
  ncongdot,
  ncup,
  ncy,
  ndash,
  ne,
  neArr,
  nearhk,
  nearr,
  nearrow,
  nedot,
  nequiv,
  nesear,
  nesim,
  nexist,
  nexists,
  nfr,
  ngE,
  nge,
  ngeq,
  ngeqq,
  ngeqslant,
  nges,
  ngsim,
  ngt,
  ngtr,
  nhArr,
  nharr,
  nhpar,
  ni,
  nis,
  nisd,
  niv,
  njcy,
  nlArr,
  nlE,
  nlarr,
  nldr,
  nle,
  nleftarrow,
  nleftrightarrow,
  nleq,
  nleqq,
  nleqslant,
  nles,
  nless,
  nlsim,
  nlt,
  nltri,
  nltrie,
  nmid,
  nopf,
  no,
  not,
  notin,
  notinE,
  notindot,
  notinva,
  notinvb,
  notinvc,
  notni,
  notniva,
  notnivb,
  notnivc,
  npar,
  nparallel,
  nparsl,
  npart,
  npolint,
  npr,
  nprcue,
  npre,
  nprec,
  npreceq,
  nrArr,
  nrarr,
  nrarrc,
  nrarrw,
  nrightarrow,
  nrtri,
  nrtrie,
  nsc,
  nsccue,
  nsce,
  nscr,
  nshortmid,
  nshortparallel,
  nsim,
  nsime,
  nsimeq,
  nsmid,
  nspar,
  nsqsube,
  nsqsupe,
  nsub,
  nsubE,
  nsube,
  nsubset,
  nsubseteq,
  nsubseteqq,
  nsucc,
  nsucceq,
  nsup,
  nsupE,
  nsupe,
  nsupset,
  nsupseteq,
  nsupseteqq,
  ntgl,
  ntild,
  ntilde,
  ntlg,
  ntriangleleft,
  ntrianglelefteq,
  ntriangleright,
  ntrianglerighteq,
  nu,
  num,
  numero,
  numsp,
  nvDash,
  nvHarr,
  nvap,
  nvdash,
  nvge,
  nvgt,
  nvinfin,
  nvlArr,
  nvle,
  nvlt,
  nvltrie,
  nvrArr,
  nvrtrie,
  nvsim,
  nwArr,
  nwarhk,
  nwarr,
  nwarrow,
  nwnear,
  oS,
  oacut,
  oacute,
  oast,
  ocir,
  ocirc,
  ocy,
  odash,
  odblac,
  odiv,
  odot,
  odsold,
  oelig,
  ofcir,
  ofr,
  ogon,
  ograv,
  ograve,
  ogt,
  ohbar,
  ohm,
  oint,
  olarr,
  olcir,
  olcross,
  oline,
  olt,
  omacr,
  omega,
  omicron,
  omid,
  ominus,
  oopf,
  opar,
  operp,
  oplus,
  or,
  orarr,
  ord,
  order,
  orderof,
  ordf,
  ordm,
  origof,
  oror,
  orslope,
  orv,
  oscr,
  oslas,
  oslash,
  osol,
  otild,
  otilde,
  otimes,
  otimesas,
  oum,
  ouml,
  ovbar,
  par,
  para,
  parallel,
  parsim,
  parsl,
  part,
  pcy,
  percnt,
  period,
  permil,
  perp,
  pertenk,
  pfr,
  phi,
  phiv,
  phmmat,
  phone,
  pi,
  pitchfork,
  piv,
  planck,
  planckh,
  plankv,
  plus,
  plusacir,
  plusb,
  pluscir,
  plusdo,
  plusdu,
  pluse,
  plusm,
  plusmn,
  plussim,
  plustwo,
  pm,
  pointint,
  popf,
  poun,
  pound,
  pr,
  prE,
  prap,
  prcue,
  pre,
  prec,
  precapprox,
  preccurlyeq,
  preceq,
  precnapprox,
  precneqq,
  precnsim,
  precsim,
  prime,
  primes,
  prnE,
  prnap,
  prnsim,
  prod,
  profalar,
  profline,
  profsurf,
  prop,
  propto,
  prsim,
  prurel,
  pscr,
  psi,
  puncsp,
  qfr,
  qint,
  qopf,
  qprime,
  qscr,
  quaternions,
  quatint,
  quest,
  questeq,
  quo,
  quot,
  rAarr,
  rArr,
  rAtail,
  rBarr,
  rHar,
  race,
  racute,
  radic,
  raemptyv,
  rang,
  rangd,
  range,
  rangle,
  raqu,
  raquo,
  rarr,
  rarrap,
  rarrb,
  rarrbfs,
  rarrc,
  rarrfs,
  rarrhk,
  rarrlp,
  rarrpl,
  rarrsim,
  rarrtl,
  rarrw,
  ratail,
  ratio,
  rationals,
  rbarr,
  rbbrk,
  rbrace,
  rbrack,
  rbrke,
  rbrksld,
  rbrkslu,
  rcaron,
  rcedil,
  rceil,
  rcub,
  rcy,
  rdca,
  rdldhar,
  rdquo,
  rdquor,
  rdsh,
  real,
  realine,
  realpart,
  reals,
  rect,
  re,
  reg,
  rfisht,
  rfloor,
  rfr,
  rhard,
  rharu,
  rharul,
  rho,
  rhov,
  rightarrow,
  rightarrowtail,
  rightharpoondown,
  rightharpoonup,
  rightleftarrows,
  rightleftharpoons,
  rightrightarrows,
  rightsquigarrow,
  rightthreetimes,
  ring,
  risingdotseq,
  rlarr,
  rlhar,
  rlm,
  rmoust,
  rmoustache,
  rnmid,
  roang,
  roarr,
  robrk,
  ropar,
  ropf,
  roplus,
  rotimes,
  rpar,
  rpargt,
  rppolint,
  rrarr,
  rsaquo,
  rscr,
  rsh,
  rsqb,
  rsquo,
  rsquor,
  rthree,
  rtimes,
  rtri,
  rtrie,
  rtrif,
  rtriltri,
  ruluhar,
  rx,
  sacute,
  sbquo,
  sc,
  scE,
  scap,
  scaron,
  sccue,
  sce,
  scedil,
  scirc,
  scnE,
  scnap,
  scnsim,
  scpolint,
  scsim,
  scy,
  sdot,
  sdotb,
  sdote,
  seArr,
  searhk,
  searr,
  searrow,
  sec,
  sect,
  semi,
  seswar,
  setminus,
  setmn,
  sext,
  sfr,
  sfrown,
  sharp,
  shchcy,
  shcy,
  shortmid,
  shortparallel,
  sh,
  shy,
  sigma,
  sigmaf,
  sigmav,
  sim,
  simdot,
  sime,
  simeq,
  simg,
  simgE,
  siml,
  simlE,
  simne,
  simplus,
  simrarr,
  slarr,
  smallsetminus,
  smashp,
  smeparsl,
  smid,
  smile,
  smt,
  smte,
  smtes,
  softcy,
  sol,
  solb,
  solbar,
  sopf,
  spades,
  spadesuit,
  spar,
  sqcap,
  sqcaps,
  sqcup,
  sqcups,
  sqsub,
  sqsube,
  sqsubset,
  sqsubseteq,
  sqsup,
  sqsupe,
  sqsupset,
  sqsupseteq,
  squ,
  square,
  squarf,
  squf,
  srarr,
  sscr,
  ssetmn,
  ssmile,
  sstarf,
  star,
  starf,
  straightepsilon,
  straightphi,
  strns,
  sub,
  subE,
  subdot,
  sube,
  subedot,
  submult,
  subnE,
  subne,
  subplus,
  subrarr,
  subset,
  subseteq,
  subseteqq,
  subsetneq,
  subsetneqq,
  subsim,
  subsub,
  subsup,
  succ,
  succapprox,
  succcurlyeq,
  succeq,
  succnapprox,
  succneqq,
  succnsim,
  succsim,
  sum,
  sung,
  sup,
  sup1,
  sup2,
  sup3,
  supE,
  supdot,
  supdsub,
  supe,
  supedot,
  suphsol,
  suphsub,
  suplarr,
  supmult,
  supnE,
  supne,
  supplus,
  supset,
  supseteq,
  supseteqq,
  supsetneq,
  supsetneqq,
  supsim,
  supsub,
  supsup,
  swArr,
  swarhk,
  swarr,
  swarrow,
  swnwar,
  szli,
  szlig,
  target,
  tau,
  tbrk,
  tcaron,
  tcedil,
  tcy,
  tdot,
  telrec,
  tfr,
  there4,
  therefore,
  theta,
  thetasym,
  thetav,
  thickapprox,
  thicksim,
  thinsp,
  thkap,
  thksim,
  thor,
  thorn,
  tilde,
  time,
  times,
  timesb,
  timesbar,
  timesd,
  tint,
  toea,
  top,
  topbot,
  topcir,
  topf,
  topfork,
  tosa,
  tprime,
  trade,
  triangle,
  triangledown,
  triangleleft,
  trianglelefteq,
  triangleq,
  triangleright,
  trianglerighteq,
  tridot,
  trie,
  triminus,
  triplus,
  trisb,
  tritime,
  trpezium,
  tscr,
  tscy,
  tshcy,
  tstrok,
  twixt,
  twoheadleftarrow,
  twoheadrightarrow,
  uArr,
  uHar,
  uacut,
  uacute,
  uarr,
  ubrcy,
  ubreve,
  ucir,
  ucirc,
  ucy,
  udarr,
  udblac,
  udhar,
  ufisht,
  ufr,
  ugrav,
  ugrave,
  uharl,
  uharr,
  uhblk,
  ulcorn,
  ulcorner,
  ulcrop,
  ultri,
  umacr,
  um,
  uml,
  uogon,
  uopf,
  uparrow,
  updownarrow,
  upharpoonleft,
  upharpoonright,
  uplus,
  upsi,
  upsih,
  upsilon,
  upuparrows,
  urcorn,
  urcorner,
  urcrop,
  uring,
  urtri,
  uscr,
  utdot,
  utilde,
  utri,
  utrif,
  uuarr,
  uum,
  uuml,
  uwangle,
  vArr,
  vBar,
  vBarv,
  vDash,
  vangrt,
  varepsilon,
  varkappa,
  varnothing,
  varphi,
  varpi,
  varpropto,
  varr,
  varrho,
  varsigma,
  varsubsetneq,
  varsubsetneqq,
  varsupsetneq,
  varsupsetneqq,
  vartheta,
  vartriangleleft,
  vartriangleright,
  vcy,
  vdash,
  vee,
  veebar,
  veeeq,
  vellip,
  verbar,
  vert,
  vfr,
  vltri,
  vnsub,
  vnsup,
  vopf,
  vprop,
  vrtri,
  vscr,
  vsubnE,
  vsubne,
  vsupnE,
  vsupne,
  vzigzag,
  wcirc,
  wedbar,
  wedge,
  wedgeq,
  weierp,
  wfr,
  wopf,
  wp,
  wr,
  wreath,
  wscr,
  xcap,
  xcirc,
  xcup,
  xdtri,
  xfr,
  xhArr,
  xharr,
  xi,
  xlArr,
  xlarr,
  xmap,
  xnis,
  xodot,
  xopf,
  xoplus,
  xotime,
  xrArr,
  xrarr,
  xscr,
  xsqcup,
  xuplus,
  xutri,
  xvee,
  xwedge,
  yacut,
  yacute,
  yacy,
  ycirc,
  ycy,
  ye,
  yen,
  yfr,
  yicy,
  yopf,
  yscr,
  yucy,
  yum,
  yuml,
  zacute,
  zcaron,
  zcy,
  zdot,
  zeetrf,
  zeta,
  zfr,
  zhcy,
  zigrarr,
  zopf,
  zscr,
  zwj,
  zwnj
}, decodeEntity_1, hasRequiredDecodeEntity;
function requireDecodeEntity() {
  if (hasRequiredDecodeEntity) return decodeEntity_1;
  hasRequiredDecodeEntity = 1;
  var characterEntities = require$$0;
  decodeEntity_1 = decodeEntity;
  var own = {}.hasOwnProperty;
  function decodeEntity(characters) {
    return own.call(characterEntities, characters) ? characterEntities[characters] : !1;
  }
  return decodeEntity_1;
}
var parseEntities_1, hasRequiredParseEntities;
function requireParseEntities() {
  if (hasRequiredParseEntities) return parseEntities_1;
  hasRequiredParseEntities = 1;
  var legacy = require$$0$1, invalid = require$$1, decimal = requireIsDecimal(), hexadecimal = requireIsHexadecimal(), alphanumerical = requireIsAlphanumerical(), decodeEntity = requireDecodeEntity();
  parseEntities_1 = parseEntities;
  var own = {}.hasOwnProperty, fromCharCode = String.fromCharCode, noop = Function.prototype, defaults = {
    warning: null,
    reference: null,
    text: null,
    warningContext: null,
    referenceContext: null,
    textContext: null,
    position: {},
    additional: null,
    attribute: !1,
    nonTerminated: !0
  }, tab = 9, lineFeed = 10, formFeed = 12, space = 32, ampersand = 38, semicolon = 59, lessThan = 60, equalsTo = 61, numberSign = 35, uppercaseX = 88, lowercaseX = 120, replacementCharacter = 65533, name = "named", hexa = "hexadecimal", deci = "decimal", bases = {};
  bases[hexa] = 16, bases[deci] = 10;
  var tests = {};
  tests[name] = alphanumerical, tests[deci] = decimal, tests[hexa] = hexadecimal;
  var namedNotTerminated = 1, numericNotTerminated = 2, namedEmpty = 3, numericEmpty = 4, namedUnknown = 5, numericDisallowed = 6, numericProhibited = 7, messages = {};
  messages[namedNotTerminated] = "Named character references must be terminated by a semicolon", messages[numericNotTerminated] = "Numeric character references must be terminated by a semicolon", messages[namedEmpty] = "Named character references cannot be empty", messages[numericEmpty] = "Numeric character references cannot be empty", messages[namedUnknown] = "Named character references must be known", messages[numericDisallowed] = "Numeric character references cannot be disallowed", messages[numericProhibited] = "Numeric character references cannot be outside the permissible Unicode range";
  function parseEntities(value, options) {
    var settings = {}, option, key;
    options || (options = {});
    for (key in defaults)
      option = options[key], settings[key] = option ?? defaults[key];
    return (settings.position.indent || settings.position.start) && (settings.indent = settings.position.indent || [], settings.position = settings.position.start), parse(value, settings);
  }
  function parse(value, settings) {
    var additional = settings.additional, nonTerminated = settings.nonTerminated, handleText = settings.text, handleReference = settings.reference, handleWarning = settings.warning, textContext = settings.textContext, referenceContext = settings.referenceContext, warningContext = settings.warningContext, pos = settings.position, indent = settings.indent || [], length = value.length, index = 0, lines = -1, column = pos.column || 1, line = pos.line || 1, queue = "", result = [], entityCharacters, namedEntity, terminated, characters, character, reference, following, warning, reason, output, entity, begin, start, type, test, prev, next, diff, end;
    for (typeof additional == "string" && (additional = additional.charCodeAt(0)), prev = now(), warning = handleWarning ? parseError : noop, index--, length++; ++index < length; )
      if (character === lineFeed && (column = indent[lines] || 1), character = value.charCodeAt(index), character === ampersand) {
        if (following = value.charCodeAt(index + 1), following === tab || following === lineFeed || following === formFeed || following === space || following === ampersand || following === lessThan || following !== following || additional && following === additional) {
          queue += fromCharCode(character), column++;
          continue;
        }
        for (start = index + 1, begin = start, end = start, following === numberSign ? (end = ++begin, following = value.charCodeAt(end), following === uppercaseX || following === lowercaseX ? (type = hexa, end = ++begin) : type = deci) : type = name, entityCharacters = "", entity = "", characters = "", test = tests[type], end--; ++end < length && (following = value.charCodeAt(end), !!test(following)); )
          characters += fromCharCode(following), type === name && own.call(legacy, characters) && (entityCharacters = characters, entity = legacy[characters]);
        terminated = value.charCodeAt(end) === semicolon, terminated && (end++, namedEntity = type === name ? decodeEntity(characters) : !1, namedEntity && (entityCharacters = characters, entity = namedEntity)), diff = 1 + end - start, !terminated && !nonTerminated || (characters ? type === name ? (terminated && !entity ? warning(namedUnknown, 1) : (entityCharacters !== characters && (end = begin + entityCharacters.length, diff = 1 + end - begin, terminated = !1), terminated || (reason = entityCharacters ? namedNotTerminated : namedEmpty, settings.attribute ? (following = value.charCodeAt(end), following === equalsTo ? (warning(reason, diff), entity = null) : alphanumerical(following) ? entity = null : warning(reason, diff)) : warning(reason, diff))), reference = entity) : (terminated || warning(numericNotTerminated, diff), reference = parseInt(characters, bases[type]), prohibited(reference) ? (warning(numericProhibited, diff), reference = fromCharCode(replacementCharacter)) : reference in invalid ? (warning(numericDisallowed, diff), reference = invalid[reference]) : (output = "", disallowed(reference) && warning(numericDisallowed, diff), reference > 65535 && (reference -= 65536, output += fromCharCode(reference >>> 10 | 55296), reference = 56320 | reference & 1023), reference = output + fromCharCode(reference))) : type !== name && warning(numericEmpty, diff)), reference ? (flush(), prev = now(), index = end - 1, column += end - start + 1, result.push(reference), next = now(), next.offset++, handleReference && handleReference.call(
          referenceContext,
          reference,
          { start: prev, end: next },
          value.slice(start - 1, end)
        ), prev = next) : (characters = value.slice(start - 1, end), queue += characters, column += characters.length, index = end - 1);
      } else
        character === 10 && (line++, lines++, column = 0), character === character ? (queue += fromCharCode(character), column++) : flush();
    return result.join("");
    function now() {
      return {
        line,
        column,
        offset: index + (pos.offset || 0)
      };
    }
    function parseError(code, offset) {
      var position = now();
      position.column += offset, position.offset += offset, handleWarning.call(warningContext, messages[code], position, code);
    }
    function flush() {
      queue && (result.push(queue), handleText && handleText.call(textContext, queue, { start: prev, end: now() }), queue = "");
    }
  }
  function prohibited(code) {
    return code >= 55296 && code <= 57343 || code > 1114111;
  }
  function disallowed(code) {
    return code >= 1 && code <= 8 || code === 11 || code >= 13 && code <= 31 || code >= 127 && code <= 159 || code >= 64976 && code <= 65007 || (code & 65535) === 65535 || (code & 65535) === 65534;
  }
  return parseEntities_1;
}
var prismCore = { exports: {} }, hasRequiredPrismCore;
function requirePrismCore() {
  return hasRequiredPrismCore || (hasRequiredPrismCore = 1, function(module) {
    var _self = typeof window < "u" ? window : typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope ? self : {};
    /**
     * Prism: Lightweight, robust, elegant syntax highlighting
     *
     * @license MIT <https://opensource.org/licenses/MIT>
     * @author Lea Verou <https://lea.verou.me>
     * @namespace
     * @public
     */
    var Prism = function(_self2) {
      var lang2 = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i, uniqueId = 0, plainTextGrammar = {}, _ = {
        /**
         * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
         * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
         * additional languages or plugins yourself.
         *
         * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
         *
         * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.manual = true;
         * // add a new <script> to load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        manual: _self2.Prism && _self2.Prism.manual,
        /**
         * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
         * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
         * own worker, you don't want it to do this.
         *
         * By setting this value to `true`, Prism will not add its own listeners to the worker.
         *
         * You obviously have to change this value before Prism executes. To do this, you can add an
         * empty Prism object into the global scope before loading the Prism script like this:
         *
         * ```js
         * window.Prism = window.Prism || {};
         * Prism.disableWorkerMessageHandler = true;
         * // Load Prism's script
         * ```
         *
         * @default false
         * @type {boolean}
         * @memberof Prism
         * @public
         */
        disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
        /**
         * A namespace for utility methods.
         *
         * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
         * change or disappear at any time.
         *
         * @namespace
         * @memberof Prism
         */
        util: {
          encode: function encode(tokens) {
            return tokens instanceof Token ? new Token(tokens.type, encode(tokens.content), tokens.alias) : Array.isArray(tokens) ? tokens.map(encode) : tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
          },
          /**
           * Returns the name of the type of the given value.
           *
           * @param {any} o
           * @returns {string}
           * @example
           * type(null)      === 'Null'
           * type(undefined) === 'Undefined'
           * type(123)       === 'Number'
           * type('foo')     === 'String'
           * type(true)      === 'Boolean'
           * type([1, 2])    === 'Array'
           * type({})        === 'Object'
           * type(String)    === 'Function'
           * type(/abc+/)    === 'RegExp'
           */
          type: function(o) {
            return Object.prototype.toString.call(o).slice(8, -1);
          },
          /**
           * Returns a unique number for the given object. Later calls will still return the same number.
           *
           * @param {Object} obj
           * @returns {number}
           */
          objId: function(obj) {
            return obj.__id || Object.defineProperty(obj, "__id", { value: ++uniqueId }), obj.__id;
          },
          /**
           * Creates a deep clone of the given object.
           *
           * The main intended use of this function is to clone language definitions.
           *
           * @param {T} o
           * @param {Record<number, any>} [visited]
           * @returns {T}
           * @template T
           */
          clone: function deepClone(o, visited) {
            visited = visited || {};
            var clone, id;
            switch (_.util.type(o)) {
              case "Object":
                if (id = _.util.objId(o), visited[id])
                  return visited[id];
                clone = /** @type {Record<string, any>} */
                {}, visited[id] = clone;
                for (var key in o)
                  o.hasOwnProperty(key) && (clone[key] = deepClone(o[key], visited));
                return (
                  /** @type {any} */
                  clone
                );
              case "Array":
                return id = _.util.objId(o), visited[id] ? visited[id] : (clone = [], visited[id] = clone, /** @type {Array} */
                /** @type {any} */
                o.forEach(function(v, i) {
                  clone[i] = deepClone(v, visited);
                }), /** @type {any} */
                clone);
              default:
                return o;
            }
          },
          /**
           * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
           *
           * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
           *
           * @param {Element} element
           * @returns {string}
           */
          getLanguage: function(element) {
            for (; element; ) {
              var m = lang2.exec(element.className);
              if (m)
                return m[1].toLowerCase();
              element = element.parentElement;
            }
            return "none";
          },
          /**
           * Sets the Prism `language-xxxx` class of the given element.
           *
           * @param {Element} element
           * @param {string} language
           * @returns {void}
           */
          setLanguage: function(element, language) {
            element.className = element.className.replace(RegExp(lang2, "gi"), ""), element.classList.add("language-" + language);
          },
          /**
           * Returns the script element that is currently executing.
           *
           * This does __not__ work for line script element.
           *
           * @returns {HTMLScriptElement | null}
           */
          currentScript: function() {
            if (typeof document > "u")
              return null;
            if ("currentScript" in document)
              return (
                /** @type {any} */
                document.currentScript
              );
            try {
              throw new Error();
            } catch (err) {
              var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
              if (src) {
                var scripts = document.getElementsByTagName("script");
                for (var i in scripts)
                  if (scripts[i].src == src)
                    return scripts[i];
              }
              return null;
            }
          },
          /**
           * Returns whether a given class is active for `element`.
           *
           * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
           * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
           * given class is just the given class with a `no-` prefix.
           *
           * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
           * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
           * ancestors have the given class or the negated version of it, then the default activation will be returned.
           *
           * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
           * version of it, the class is considered active.
           *
           * @param {Element} element
           * @param {string} className
           * @param {boolean} [defaultActivation=false]
           * @returns {boolean}
           */
          isActive: function(element, className, defaultActivation) {
            for (var no2 = "no-" + className; element; ) {
              var classList = element.classList;
              if (classList.contains(className))
                return !0;
              if (classList.contains(no2))
                return !1;
              element = element.parentElement;
            }
            return !!defaultActivation;
          }
        },
        /**
         * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
         *
         * @namespace
         * @memberof Prism
         * @public
         */
        languages: {
          /**
           * The grammar for plain, unformatted text.
           */
          plain: plainTextGrammar,
          plaintext: plainTextGrammar,
          text: plainTextGrammar,
          txt: plainTextGrammar,
          /**
           * Creates a deep copy of the language with the given id and appends the given tokens.
           *
           * If a token in `redef` also appears in the copied language, then the existing token in the copied language
           * will be overwritten at its original position.
           *
           * ## Best practices
           *
           * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
           * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
           * understand the language definition because, normally, the order of tokens matters in Prism grammars.
           *
           * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
           * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
           *
           * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
           * @param {Grammar} redef The new tokens to append.
           * @returns {Grammar} The new language created.
           * @public
           * @example
           * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
           *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
           *     // at its original position
           *     'comment': { ... },
           *     // CSS doesn't have a 'color' token, so this token will be appended
           *     'color': /\b(?:red|green|blue)\b/
           * });
           */
          extend: function(id, redef) {
            var lang3 = _.util.clone(_.languages[id]);
            for (var key in redef)
              lang3[key] = redef[key];
            return lang3;
          },
          /**
           * Inserts tokens _before_ another token in a language definition or any other grammar.
           *
           * ## Usage
           *
           * This helper method makes it easy to modify existing languages. For example, the CSS language definition
           * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
           * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
           * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
           * this:
           *
           * ```js
           * Prism.languages.markup.style = {
           *     // token
           * };
           * ```
           *
           * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
           * before existing tokens. For the CSS example above, you would use it like this:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'cdata', {
           *     'style': {
           *         // token
           *     }
           * });
           * ```
           *
           * ## Special cases
           *
           * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
           * will be ignored.
           *
           * This behavior can be used to insert tokens after `before`:
           *
           * ```js
           * Prism.languages.insertBefore('markup', 'comment', {
           *     'comment': Prism.languages.markup.comment,
           *     // tokens after 'comment'
           * });
           * ```
           *
           * ## Limitations
           *
           * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
           * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
           * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
           * deleting properties which is necessary to insert at arbitrary positions.
           *
           * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
           * Instead, it will create a new object and replace all references to the target object with the new one. This
           * can be done without temporarily deleting properties, so the iteration order is well-defined.
           *
           * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
           * you hold the target object in a variable, then the value of the variable will not change.
           *
           * ```js
           * var oldMarkup = Prism.languages.markup;
           * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
           *
           * assert(oldMarkup !== Prism.languages.markup);
           * assert(newMarkup === Prism.languages.markup);
           * ```
           *
           * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
           * object to be modified.
           * @param {string} before The key to insert before.
           * @param {Grammar} insert An object containing the key-value pairs to be inserted.
           * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
           * object to be modified.
           *
           * Defaults to `Prism.languages`.
           * @returns {Grammar} The new grammar object.
           * @public
           */
          insertBefore: function(inside, before, insert, root) {
            root = root || /** @type {any} */
            _.languages;
            var grammar = root[inside], ret = {};
            for (var token in grammar)
              if (grammar.hasOwnProperty(token)) {
                if (token == before)
                  for (var newToken in insert)
                    insert.hasOwnProperty(newToken) && (ret[newToken] = insert[newToken]);
                insert.hasOwnProperty(token) || (ret[token] = grammar[token]);
              }
            var old = root[inside];
            return root[inside] = ret, _.languages.DFS(_.languages, function(key, value) {
              value === old && key != inside && (this[key] = ret);
            }), ret;
          },
          // Traverse a language definition with Depth First Search
          DFS: function DFS(o, callback, type, visited) {
            visited = visited || {};
            var objId = _.util.objId;
            for (var i in o)
              if (o.hasOwnProperty(i)) {
                callback.call(o, i, o[i], type || i);
                var property = o[i], propertyType = _.util.type(property);
                propertyType === "Object" && !visited[objId(property)] ? (visited[objId(property)] = !0, DFS(property, callback, null, visited)) : propertyType === "Array" && !visited[objId(property)] && (visited[objId(property)] = !0, DFS(property, callback, i, visited));
              }
          }
        },
        plugins: {},
        /**
         * This is the most high-level function in Prism’s API.
         * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
         * each one of them.
         *
         * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
         *
         * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
         * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
         * @memberof Prism
         * @public
         */
        highlightAll: function(async, callback) {
          _.highlightAllUnder(document, async, callback);
        },
        /**
         * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
         * {@link Prism.highlightElement} on each one of them.
         *
         * The following hooks will be run:
         * 1. `before-highlightall`
         * 2. `before-all-elements-highlight`
         * 3. All hooks of {@link Prism.highlightElement} for each element.
         *
         * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
         * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
         * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
         * @memberof Prism
         * @public
         */
        highlightAllUnder: function(container, async, callback) {
          var env = {
            callback,
            container,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          _.hooks.run("before-highlightall", env), env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector)), _.hooks.run("before-all-elements-highlight", env);
          for (var i = 0, element; element = env.elements[i++]; )
            _.highlightElement(element, async === !0, env.callback);
        },
        /**
         * Highlights the code inside a single element.
         *
         * The following hooks will be run:
         * 1. `before-sanity-check`
         * 2. `before-highlight`
         * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
         * 4. `before-insert`
         * 5. `after-highlight`
         * 6. `complete`
         *
         * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
         * the element's language.
         *
         * @param {Element} element The element containing the code.
         * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
         * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
         * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
         * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
         *
         * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
         * asynchronous highlighting to work. You can build your own bundle on the
         * [Download page](https://prismjs.com/download.html).
         * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
         * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
         * @memberof Prism
         * @public
         */
        highlightElement: function(element, async, callback) {
          var language = _.util.getLanguage(element), grammar = _.languages[language];
          _.util.setLanguage(element, language);
          var parent = element.parentElement;
          parent && parent.nodeName.toLowerCase() === "pre" && _.util.setLanguage(parent, language);
          var code = element.textContent, env = {
            element,
            language,
            grammar,
            code
          };
          function insertHighlightedCode(highlightedCode) {
            env.highlightedCode = highlightedCode, _.hooks.run("before-insert", env), env.element.innerHTML = env.highlightedCode, _.hooks.run("after-highlight", env), _.hooks.run("complete", env), callback && callback.call(env.element);
          }
          if (_.hooks.run("before-sanity-check", env), parent = env.element.parentElement, parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex") && parent.setAttribute("tabindex", "0"), !env.code) {
            _.hooks.run("complete", env), callback && callback.call(env.element);
            return;
          }
          if (_.hooks.run("before-highlight", env), !env.grammar) {
            insertHighlightedCode(_.util.encode(env.code));
            return;
          }
          if (async && _self2.Worker) {
            var worker = new Worker(_.filename);
            worker.onmessage = function(evt) {
              insertHighlightedCode(evt.data);
            }, worker.postMessage(JSON.stringify({
              language: env.language,
              code: env.code,
              immediateClose: !0
            }));
          } else
            insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
        },
        /**
         * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
         * and the language definitions to use, and returns a string with the HTML produced.
         *
         * The following hooks will be run:
         * 1. `before-tokenize`
         * 2. `after-tokenize`
         * 3. `wrap`: On each {@link Token}.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @param {string} language The name of the language definition passed to `grammar`.
         * @returns {string} The highlighted HTML.
         * @memberof Prism
         * @public
         * @example
         * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
         */
        highlight: function(text, grammar, language) {
          var env = {
            code: text,
            grammar,
            language
          };
          if (_.hooks.run("before-tokenize", env), !env.grammar)
            throw new Error('The language "' + env.language + '" has no grammar.');
          return env.tokens = _.tokenize(env.code, env.grammar), _.hooks.run("after-tokenize", env), Token.stringify(_.util.encode(env.tokens), env.language);
        },
        /**
         * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
         * and the language definitions to use, and returns an array with the tokenized code.
         *
         * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
         *
         * This method could be useful in other contexts as well, as a very crude parser.
         *
         * @param {string} text A string with the code to be highlighted.
         * @param {Grammar} grammar An object containing the tokens to use.
         *
         * Usually a language definition like `Prism.languages.markup`.
         * @returns {TokenStream} An array of strings and tokens, a token stream.
         * @memberof Prism
         * @public
         * @example
         * let code = `var foo = 0;`;
         * let tokens = Prism.tokenize(code, Prism.languages.javascript);
         * tokens.forEach(token => {
         *     if (token instanceof Prism.Token && token.type === 'number') {
         *         console.log(`Found numeric literal: ${token.content}`);
         *     }
         * });
         */
        tokenize: function(text, grammar) {
          var rest = grammar.rest;
          if (rest) {
            for (var token in rest)
              grammar[token] = rest[token];
            delete grammar.rest;
          }
          var tokenList = new LinkedList();
          return addAfter(tokenList, tokenList.head, text), matchGrammar(text, tokenList, grammar, tokenList.head, 0), toArray(tokenList);
        },
        /**
         * @namespace
         * @memberof Prism
         * @public
         */
        hooks: {
          all: {},
          /**
           * Adds the given callback to the list of callbacks for the given hook.
           *
           * The callback will be invoked when the hook it is registered for is run.
           * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
           *
           * One callback function can be registered to multiple hooks and the same hook multiple times.
           *
           * @param {string} name The name of the hook.
           * @param {HookCallback} callback The callback function which is given environment variables.
           * @public
           */
          add: function(name, callback) {
            var hooks = _.hooks.all;
            hooks[name] = hooks[name] || [], hooks[name].push(callback);
          },
          /**
           * Runs a hook invoking all registered callbacks with the given environment variables.
           *
           * Callbacks will be invoked synchronously and in the order in which they were registered.
           *
           * @param {string} name The name of the hook.
           * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
           * @public
           */
          run: function(name, env) {
            var callbacks = _.hooks.all[name];
            if (!(!callbacks || !callbacks.length))
              for (var i = 0, callback; callback = callbacks[i++]; )
                callback(env);
          }
        },
        Token
      };
      _self2.Prism = _;
      function Token(type, content, alias, matchedStr) {
        this.type = type, this.content = content, this.alias = alias, this.length = (matchedStr || "").length | 0;
      }
      Token.stringify = function stringify(o, language) {
        if (typeof o == "string")
          return o;
        if (Array.isArray(o)) {
          var s = "";
          return o.forEach(function(e) {
            s += stringify(e, language);
          }), s;
        }
        var env = {
          type: o.type,
          content: stringify(o.content, language),
          tag: "span",
          classes: ["token", o.type],
          attributes: {},
          language
        }, aliases = o.alias;
        aliases && (Array.isArray(aliases) ? Array.prototype.push.apply(env.classes, aliases) : env.classes.push(aliases)), _.hooks.run("wrap", env);
        var attributes = "";
        for (var name in env.attributes)
          attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
        return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
      };
      function matchPattern(pattern, pos, text, lookbehind) {
        pattern.lastIndex = pos;
        var match = pattern.exec(text);
        if (match && lookbehind && match[1]) {
          var lookbehindLength = match[1].length;
          match.index += lookbehindLength, match[0] = match[0].slice(lookbehindLength);
        }
        return match;
      }
      function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
        for (var token in grammar)
          if (!(!grammar.hasOwnProperty(token) || !grammar[token])) {
            var patterns = grammar[token];
            patterns = Array.isArray(patterns) ? patterns : [patterns];
            for (var j = 0; j < patterns.length; ++j) {
              if (rematch && rematch.cause == token + "," + j)
                return;
              var patternObj = patterns[j], inside = patternObj.inside, lookbehind = !!patternObj.lookbehind, greedy = !!patternObj.greedy, alias = patternObj.alias;
              if (greedy && !patternObj.pattern.global) {
                var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
                patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
              }
              for (var pattern = patternObj.pattern || patternObj, currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail && !(rematch && pos >= rematch.reach); pos += currentNode.value.length, currentNode = currentNode.next) {
                var str = currentNode.value;
                if (tokenList.length > text.length)
                  return;
                if (!(str instanceof Token)) {
                  var removeCount = 1, match;
                  if (greedy) {
                    if (match = matchPattern(pattern, pos, text, lookbehind), !match || match.index >= text.length)
                      break;
                    var from = match.index, to = match.index + match[0].length, p = pos;
                    for (p += currentNode.value.length; from >= p; )
                      currentNode = currentNode.next, p += currentNode.value.length;
                    if (p -= currentNode.value.length, pos = p, currentNode.value instanceof Token)
                      continue;
                    for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value == "string"); k = k.next)
                      removeCount++, p += k.value.length;
                    removeCount--, str = text.slice(pos, p), match.index -= pos;
                  } else if (match = matchPattern(pattern, 0, str, lookbehind), !match)
                    continue;
                  var from = match.index, matchStr = match[0], before = str.slice(0, from), after = str.slice(from + matchStr.length), reach = pos + str.length;
                  rematch && reach > rematch.reach && (rematch.reach = reach);
                  var removeFrom = currentNode.prev;
                  before && (removeFrom = addAfter(tokenList, removeFrom, before), pos += before.length), removeRange(tokenList, removeFrom, removeCount);
                  var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
                  if (currentNode = addAfter(tokenList, removeFrom, wrapped), after && addAfter(tokenList, currentNode, after), removeCount > 1) {
                    var nestedRematch = {
                      cause: token + "," + j,
                      reach
                    };
                    matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch), rematch && nestedRematch.reach > rematch.reach && (rematch.reach = nestedRematch.reach);
                  }
                }
              }
            }
          }
      }
      function LinkedList() {
        var head = { value: null, prev: null, next: null }, tail = { value: null, prev: head, next: null };
        head.next = tail, this.head = head, this.tail = tail, this.length = 0;
      }
      function addAfter(list, node, value) {
        var next = node.next, newNode = { value, prev: node, next };
        return node.next = newNode, next.prev = newNode, list.length++, newNode;
      }
      function removeRange(list, node, count) {
        for (var next = node.next, i = 0; i < count && next !== list.tail; i++)
          next = next.next;
        node.next = next, next.prev = node, list.length -= i;
      }
      function toArray(list) {
        for (var array = [], node = list.head.next; node !== list.tail; )
          array.push(node.value), node = node.next;
        return array;
      }
      if (!_self2.document)
        return _self2.addEventListener && (_.disableWorkerMessageHandler || _self2.addEventListener("message", function(evt) {
          var message = JSON.parse(evt.data), lang3 = message.language, code = message.code, immediateClose = message.immediateClose;
          _self2.postMessage(_.highlight(code, _.languages[lang3], lang3)), immediateClose && _self2.close();
        }, !1)), _;
      var script = _.util.currentScript();
      script && (_.filename = script.src, script.hasAttribute("data-manual") && (_.manual = !0));
      function highlightAutomaticallyCallback() {
        _.manual || _.highlightAll();
      }
      if (!_.manual) {
        var readyState = document.readyState;
        readyState === "loading" || readyState === "interactive" && script && script.defer ? document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback) : window.requestAnimationFrame ? window.requestAnimationFrame(highlightAutomaticallyCallback) : window.setTimeout(highlightAutomaticallyCallback, 16);
      }
      return _;
    }(_self);
    module.exports && (module.exports = Prism), typeof commonjsGlobal < "u" && (commonjsGlobal.Prism = Prism);
  }(prismCore)), prismCore.exports;
}
var markup_1, hasRequiredMarkup;
function requireMarkup() {
  if (hasRequiredMarkup) return markup_1;
  hasRequiredMarkup = 1, markup_1 = markup, markup.displayName = "markup", markup.aliases = ["html", "mathml", "svg", "xml", "ssml", "atom", "rss"];
  function markup(Prism) {
    Prism.languages.markup = {
      comment: {
        pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
        greedy: !0
      },
      prolog: {
        pattern: /<\?[\s\S]+?\?>/,
        greedy: !0
      },
      doctype: {
        // https://www.w3.org/TR/xml/#NT-doctypedecl
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: {
          "internal-subset": {
            pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
            lookbehind: !0,
            greedy: !0,
            inside: null
            // see below
          },
          string: {
            pattern: /"[^"]*"|'[^']*'/,
            greedy: !0
          },
          punctuation: /^<!|>$|[[\]]/,
          "doctype-tag": /^DOCTYPE/i,
          name: /[^\s<>'"]+/
        }
      },
      cdata: {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        greedy: !0
      },
      tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
          tag: {
            pattern: /^<\/?[^\s>\/]+/,
            inside: {
              punctuation: /^<\/?/,
              namespace: /^[^\s>\/:]+:/
            }
          },
          "special-attr": [],
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
            inside: {
              punctuation: [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                /"|'/
              ]
            }
          },
          punctuation: /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: {
              namespace: /^[^\s>\/:]+:/
            }
          }
        }
      },
      entity: [
        {
          pattern: /&[\da-z]{1,8};/i,
          alias: "named-entity"
        },
        /&#x?[\da-f]{1,8};/i
      ]
    }, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup, Prism.hooks.add("wrap", function(env) {
      env.type === "entity" && (env.attributes.title = env.content.value.replace(/&amp;/, "&"));
    }), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
      /**
       * Adds an inlined language to markup.
       *
       * An example of an inlined language is CSS with `<style>` tags.
       *
       * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addInlined('style', 'css');
       */
      value: function(tagName, lang2) {
        var includedCdataInside = {};
        includedCdataInside["language-" + lang2] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: !0,
          inside: Prism.languages[lang2]
        }, includedCdataInside.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var inside = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: includedCdataInside
          }
        };
        inside["language-" + lang2] = {
          pattern: /[\s\S]+/,
          inside: Prism.languages[lang2]
        };
        var def = {};
        def[tagName] = {
          pattern: RegExp(
            /(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(
              /__/g,
              function() {
                return tagName;
              }
            ),
            "i"
          ),
          lookbehind: !0,
          greedy: !0,
          inside
        }, Prism.languages.insertBefore("markup", "cdata", def);
      }
    }), Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
      /**
       * Adds an pattern to highlight languages embedded in HTML attributes.
       *
       * An example of an inlined language is CSS with `style` attributes.
       *
       * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
       * case insensitive.
       * @param {string} lang The language key.
       * @example
       * addAttribute('style', 'css');
       */
      value: function(attrName, lang2) {
        Prism.languages.markup.tag.inside["special-attr"].push({
          pattern: RegExp(
            /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
            "i"
          ),
          lookbehind: !0,
          inside: {
            "attr-name": /^[^\s=]+/,
            "attr-value": {
              pattern: /=[\s\S]+/,
              inside: {
                value: {
                  pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                  lookbehind: !0,
                  alias: [lang2, "language-" + lang2],
                  inside: Prism.languages[lang2]
                },
                punctuation: [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  /"|'/
                ]
              }
            }
          }
        });
      }
    }), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.ssml = Prism.languages.xml, Prism.languages.atom = Prism.languages.xml, Prism.languages.rss = Prism.languages.xml;
  }
  return markup_1;
}
var css_1, hasRequiredCss;
function requireCss() {
  if (hasRequiredCss) return css_1;
  hasRequiredCss = 1, css_1 = css, css.displayName = "css", css.aliases = [];
  function css(Prism) {
    (function(Prism2) {
      var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
      Prism2.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
          pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
          inside: {
            rule: /^@[\w-]+/,
            "selector-function-argument": {
              pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
              lookbehind: !0,
              alias: "selector"
            },
            keyword: {
              pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
              lookbehind: !0
            }
            // See rest below
          }
        },
        url: {
          // https://drafts.csswg.org/css-values-3/#urls
          pattern: RegExp(
            "\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)",
            "i"
          ),
          greedy: !0,
          inside: {
            function: /^url/i,
            punctuation: /^\(|\)$/,
            string: {
              pattern: RegExp("^" + string.source + "$"),
              alias: "url"
            }
          }
        },
        selector: {
          pattern: RegExp(
            `(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"
          ),
          lookbehind: !0
        },
        string: {
          pattern: string,
          greedy: !0
        },
        property: {
          pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          lookbehind: !0
        },
        important: /!important\b/i,
        function: {
          pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
          lookbehind: !0
        },
        punctuation: /[(){};:,]/
      }, Prism2.languages.css.atrule.inside.rest = Prism2.languages.css;
      var markup = Prism2.languages.markup;
      markup && (markup.tag.addInlined("style", "css"), markup.tag.addAttribute("style", "css"));
    })(Prism);
  }
  return css_1;
}
var clike_1, hasRequiredClike;
function requireClike() {
  if (hasRequiredClike) return clike_1;
  hasRequiredClike = 1, clike_1 = clike, clike.displayName = "clike", clike.aliases = [];
  function clike(Prism) {
    Prism.languages.clike = {
      comment: [
        {
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: !0,
          greedy: !0
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: !0,
          greedy: !0
        }
      ],
      string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
      },
      "class-name": {
        pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: !0,
        inside: {
          punctuation: /[.\\]/
        }
      },
      keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
      boolean: /\b(?:false|true)\b/,
      function: /\b\w+(?=\()/,
      number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
      punctuation: /[{}[\];(),.:]/
    };
  }
  return clike_1;
}
var javascript_1, hasRequiredJavascript;
function requireJavascript() {
  if (hasRequiredJavascript) return javascript_1;
  hasRequiredJavascript = 1, javascript_1 = javascript, javascript.displayName = "javascript", javascript.aliases = ["js"];
  function javascript(Prism) {
    Prism.languages.javascript = Prism.languages.extend("clike", {
      "class-name": [
        Prism.languages.clike["class-name"],
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
          lookbehind: !0
        }
      ],
      keyword: [
        {
          pattern: /((?:^|\})\s*)catch\b/,
          lookbehind: !0
        },
        {
          pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: !0
        }
      ],
      // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
      function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      number: {
        pattern: RegExp(
          /(^|[^\w$])/.source + "(?:" + // constant
          (/NaN|Infinity/.source + "|" + // binary integer
          /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
          /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
          /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
          /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
          /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
        ),
        lookbehind: !0
      },
      operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    }), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
      regex: {
        // eslint-disable-next-line regexp/no-dupe-characters-character-class
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
        lookbehind: !0,
        greedy: !0,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: !0,
            alias: "language-regex",
            inside: Prism.languages.regex
          },
          "regex-delimiter": /^\/|\/$/,
          "regex-flags": /^[a-z]+$/
        }
      },
      // This must be declared before keyword because we use "function" inside the look-forward
      "function-variable": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function"
      },
      parameter: [
        {
          pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
          lookbehind: !0,
          inside: Prism.languages.javascript
        },
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          lookbehind: !0,
          inside: Prism.languages.javascript
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: !0,
          inside: Prism.languages.javascript
        },
        {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: !0,
          inside: Prism.languages.javascript
        }
      ],
      constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    }), Prism.languages.insertBefore("javascript", "string", {
      hashbang: {
        pattern: /^#!.*/,
        greedy: !0,
        alias: "comment"
      },
      "template-string": {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: !0,
        inside: {
          "template-punctuation": {
            pattern: /^`|`$/,
            alias: "string"
          },
          interpolation: {
            pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
            lookbehind: !0,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation"
              },
              rest: Prism.languages.javascript
            }
          },
          string: /[\s\S]+/
        }
      },
      "string-property": {
        pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
        lookbehind: !0,
        greedy: !0,
        alias: "property"
      }
    }), Prism.languages.insertBefore("javascript", "operator", {
      "literal-property": {
        pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
        lookbehind: !0,
        alias: "property"
      }
    }), Prism.languages.markup && (Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.markup.tag.addAttribute(
      /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
      "javascript"
    )), Prism.languages.js = Prism.languages.javascript;
  }
  return javascript_1;
}
var core, hasRequiredCore;
function requireCore() {
  if (hasRequiredCore) return core;
  hasRequiredCore = 1;
  var ctx = typeof globalThis == "object" ? globalThis : typeof self == "object" ? self : typeof window == "object" ? window : typeof commonjsGlobal == "object" ? commonjsGlobal : {}, restore = capture();
  ctx.Prism = { manual: !0, disableWorkerMessageHandler: !0 };
  var h = requireHastscript(), decode = requireParseEntities(), Prism = requirePrismCore(), markup = requireMarkup(), css = requireCss(), clike = requireClike(), js = requireJavascript();
  restore();
  var own = {}.hasOwnProperty;
  function Refractor2() {
  }
  Refractor2.prototype = Prism;
  var refract = new Refractor2();
  core = refract, refract.highlight = highlight, refract.register = register, refract.alias = alias, refract.registered = registered, refract.listLanguages = listLanguages, register(markup), register(css), register(clike), register(js), refract.util.encode = encode, refract.Token.stringify = stringify;
  function register(grammar) {
    if (typeof grammar != "function" || !grammar.displayName)
      throw new Error("Expected `function` for `grammar`, got `" + grammar + "`");
    refract.languages[grammar.displayName] === void 0 && grammar(refract);
  }
  function alias(name, alias2) {
    var languages = refract.languages, map2 = name, key, list, length, index;
    alias2 && (map2 = {}, map2[name] = alias2);
    for (key in map2)
      for (list = map2[key], list = typeof list == "string" ? [list] : list, length = list.length, index = -1; ++index < length; )
        languages[list[index]] = languages[key];
  }
  function highlight(value, name) {
    var sup4 = Prism.highlight, grammar;
    if (typeof value != "string")
      throw new Error("Expected `string` for `value`, got `" + value + "`");
    if (refract.util.type(name) === "Object")
      grammar = name, name = null;
    else {
      if (typeof name != "string")
        throw new Error("Expected `string` for `name`, got `" + name + "`");
      if (own.call(refract.languages, name))
        grammar = refract.languages[name];
      else
        throw new Error("Unknown language: `" + name + "` is not registered");
    }
    return sup4.call(this, value, grammar, name);
  }
  function registered(language) {
    if (typeof language != "string")
      throw new Error("Expected `string` for `language`, got `" + language + "`");
    return own.call(refract.languages, language);
  }
  function listLanguages() {
    var languages = refract.languages, list = [], language;
    for (language in languages)
      own.call(languages, language) && typeof languages[language] == "object" && list.push(language);
    return list;
  }
  function stringify(value, language, parent) {
    var env;
    return typeof value == "string" ? { type: "text", value } : refract.util.type(value) === "Array" ? stringifyAll(value, language) : (env = {
      type: value.type,
      content: refract.Token.stringify(value.content, language, parent),
      tag: "span",
      classes: ["token", value.type],
      attributes: {},
      language,
      parent
    }, value.alias && (env.classes = env.classes.concat(value.alias)), refract.hooks.run("wrap", env), h(
      env.tag + "." + env.classes.join("."),
      attributes(env.attributes),
      env.content
    ));
  }
  function stringifyAll(values, language) {
    for (var result = [], length = values.length, index = -1, value; ++index < length; )
      value = values[index], value !== "" && value !== null && value !== void 0 && result.push(value);
    for (index = -1, length = result.length; ++index < length; )
      value = result[index], result[index] = refract.Token.stringify(value, language, result);
    return result;
  }
  function encode(tokens) {
    return tokens;
  }
  function attributes(attrs) {
    var key;
    for (key in attrs)
      attrs[key] = decode(attrs[key]);
    return attrs;
  }
  function capture() {
    var defined = "Prism" in ctx, current = defined ? ctx.Prism : void 0;
    return restore2;
    function restore2() {
      defined ? ctx.Prism = current : delete ctx.Prism, defined = void 0, current = void 0;
    }
  }
  return core;
}
var mapChildren = {}, hasRequiredMapChildren;
function requireMapChildren() {
  if (hasRequiredMapChildren) return mapChildren;
  hasRequiredMapChildren = 1;
  var React = React__default;
  function mapChild(child, i, depth) {
    if (child.tagName) {
      var className = child.properties && Array.isArray(child.properties.className) ? child.properties.className.join(" ") : child.properties.className;
      return React.createElement(child.tagName, Object.assign({
        key: "fract-".concat(depth, "-").concat(i)
      }, child.properties, {
        className
      }), child.children && child.children.map(mapWithDepth(depth + 1)));
    }
    return child.value;
  }
  function mapWithDepth(depth) {
    return function(child, i) {
      return mapChild(child, i, depth);
    };
  }
  return mapChildren.depth = mapWithDepth, mapChildren;
}
var convert_1, hasRequiredConvert;
function requireConvert() {
  if (hasRequiredConvert) return convert_1;
  hasRequiredConvert = 1, convert_1 = convert;
  function convert(test) {
    if (test == null)
      return ok;
    if (typeof test == "string")
      return typeFactory(test);
    if (typeof test == "object")
      return "length" in test ? anyFactory(test) : allFactory(test);
    if (typeof test == "function")
      return test;
    throw new Error("Expected function, string, or object as test");
  }
  function allFactory(test) {
    return all;
    function all(node) {
      var key;
      for (key in test)
        if (node[key] !== test[key]) return !1;
      return !0;
    }
  }
  function anyFactory(tests) {
    for (var checks = [], index = -1; ++index < tests.length; )
      checks[index] = convert(tests[index]);
    return any;
    function any() {
      for (var index2 = -1; ++index2 < checks.length; )
        if (checks[index2].apply(this, arguments))
          return !0;
      return !1;
    }
  }
  function typeFactory(test) {
    return type;
    function type(node) {
      return !!(node && node.type === test);
    }
  }
  function ok() {
    return !0;
  }
  return convert_1;
}
var unistUtilFilter, hasRequiredUnistUtilFilter;
function requireUnistUtilFilter() {
  if (hasRequiredUnistUtilFilter) return unistUtilFilter;
  hasRequiredUnistUtilFilter = 1;
  var convert = requireConvert();
  unistUtilFilter = filter;
  var own = {}.hasOwnProperty;
  function filter(tree, options, test) {
    var is = convert(test || options), cascade = options.cascade == null ? !0 : options.cascade;
    return preorder(tree, null, null);
    function preorder(node, index, parent) {
      var children, childIndex, result, next, key;
      if (!is(node, index, parent)) return null;
      if (node.children) {
        for (children = [], childIndex = -1; ++childIndex < node.children.length; )
          result = preorder(node.children[childIndex], childIndex, node), result && children.push(result);
        if (cascade && node.children.length && !children.length) return null;
      }
      next = {};
      for (key in node)
        own.call(node, key) && (next[key] = key === "children" ? children : node[key]);
      return next;
    }
  }
  return unistUtilFilter;
}
var color_1, hasRequiredColor;
function requireColor() {
  if (hasRequiredColor) return color_1;
  hasRequiredColor = 1, color_1 = color;
  function color(d) {
    return "\x1B[33m" + d + "\x1B[39m";
  }
  return color_1;
}
var unistUtilVisitParents, hasRequiredUnistUtilVisitParents;
function requireUnistUtilVisitParents() {
  if (hasRequiredUnistUtilVisitParents) return unistUtilVisitParents;
  hasRequiredUnistUtilVisitParents = 1, unistUtilVisitParents = visitParents;
  var convert = requireConvert(), color = requireColor(), CONTINUE = !0, SKIP = "skip", EXIT = !1;
  visitParents.CONTINUE = CONTINUE, visitParents.SKIP = SKIP, visitParents.EXIT = EXIT;
  function visitParents(tree, test, visitor, reverse) {
    var step, is;
    typeof test == "function" && typeof visitor != "function" && (reverse = visitor, visitor = test, test = null), is = convert(test), step = reverse ? -1 : 1, factory(tree, null, [])();
    function factory(node, index, parents) {
      var value = typeof node == "object" && node !== null ? node : {}, name;
      return typeof value.type == "string" && (name = typeof value.tagName == "string" ? value.tagName : typeof value.name == "string" ? value.name : void 0, visit.displayName = "node (" + color(value.type + (name ? "<" + name + ">" : "")) + ")"), visit;
      function visit() {
        var grandparents = parents.concat(node), result = [], subresult, offset;
        if ((!test || is(node, index, parents[parents.length - 1] || null)) && (result = toResult(visitor(node, parents)), result[0] === EXIT))
          return result;
        if (node.children && result[0] !== SKIP)
          for (offset = (reverse ? node.children.length : -1) + step; offset > -1 && offset < node.children.length; ) {
            if (subresult = factory(node.children[offset], offset, grandparents)(), subresult[0] === EXIT)
              return subresult;
            offset = typeof subresult[1] == "number" ? subresult[1] : offset + step;
          }
        return result;
      }
    }
  }
  function toResult(value) {
    return value !== null && typeof value == "object" && "length" in value ? value : typeof value == "number" ? [CONTINUE, value] : [value];
  }
  return unistUtilVisitParents;
}
var map, hasRequiredMap;
function requireMap() {
  if (hasRequiredMap) return map;
  hasRequiredMap = 1, map = typeof WeakMap == "function" ? HappyMap : SadMap;
  function HappyMap() {
    this.map = /* @__PURE__ */ new WeakMap();
  }
  HappyMap.prototype.has = function(key) {
    return this.map.has(key);
  }, HappyMap.prototype.set = function(key, value) {
    return this.map.set(key, value), this;
  }, HappyMap.prototype.get = function(key) {
    return this.map.get(key);
  }, HappyMap.prototype.clear = function() {
  };
  function SadMap() {
    this.keys = [], this.values = [];
  }
  return SadMap.prototype.has = function(key) {
    return this.keys.indexOf(key) !== -1;
  }, SadMap.prototype.set = function(key, value) {
    var index = this.keys.indexOf(key);
    return index === -1 ? (this.keys.push(key), this.values.push(value)) : this.values[index] = value, this;
  }, SadMap.prototype.get = function(key) {
    var index = this.keys.indexOf(key);
    return index === -1 ? void 0 : this.values[index];
  }, SadMap.prototype.clear = function() {
    this.keys = [], this.values = [];
  }, map;
}
var addMarkers_1, hasRequiredAddMarkers;
function requireAddMarkers() {
  if (hasRequiredAddMarkers) return addMarkers_1;
  hasRequiredAddMarkers = 1;
  var filter = requireUnistUtilFilter(), visit = requireUnistUtilVisitParents(), NodeMap = requireMap();
  function lineNumberify(ast2) {
    var context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      lineNumber: 1
    };
    return ast2.reduce(function(result, node) {
      var lineStart = context.lineNumber;
      if (node.type === "text") {
        if (node.value.indexOf(`
`) === -1)
          return node.lineStart = lineStart, node.lineEnd = lineStart, result.nodes.push(node), result;
        for (var lines = node.value.split(`
`), i = 0; i < lines.length; i++) {
          var lineNum = i === 0 ? context.lineNumber : ++context.lineNumber;
          result.nodes.push({
            type: "text",
            value: i === lines.length - 1 ? lines[i] : "".concat(lines[i], `
`),
            lineStart: lineNum,
            lineEnd: lineNum
          });
        }
        return result.lineNumber = context.lineNumber, result;
      }
      if (node.children) {
        var processed = lineNumberify(node.children, context), firstChild = processed.nodes[0], lastChild = processed.nodes[processed.nodes.length - 1];
        return node.lineStart = firstChild ? firstChild.lineStart : lineStart, node.lineEnd = lastChild ? lastChild.lineEnd : lineStart, node.children = processed.nodes, result.lineNumber = processed.lineNumber, result.nodes.push(node), result;
      }
      return result.nodes.push(node), result;
    }, {
      nodes: [],
      lineNumber: context.lineNumber
    });
  }
  function unwrapLine(markerLine, nodes) {
    var tree = {
      type: "root",
      children: nodes
    }, headMap = new NodeMap(), lineMap = new NodeMap(), tailMap = new NodeMap(), cloned = [];
    function addCopy(map2, node, ancestors) {
      cloned.push(node), ancestors.forEach(function(ancestor2) {
        map2.has(ancestor2) || (map2.set(ancestor2, Object.assign({}, ancestor2, {
          children: []
        })), ancestor2 !== tree && cloned.push(ancestor2));
      });
      for (var i = ancestors.length; i--; ) {
        var ancestor = map2.get(ancestors[i]), child = ancestors[i + 1], leaf = map2.get(child) || node;
        ancestor.children.indexOf(leaf) === -1 && ancestor.children.push(leaf);
      }
    }
    visit(tree, function(node, ancestors) {
      if (!node.children) {
        if (node.lineStart < markerLine) {
          addCopy(headMap, node, ancestors);
          return;
        }
        if (node.lineStart === markerLine) {
          addCopy(lineMap, node, ancestors);
          return;
        }
        node.lineEnd > markerLine && cloned.some(function(clone) {
          return ancestors.indexOf(clone) !== -1;
        }) && addCopy(tailMap, node, ancestors);
      }
    });
    var filtered = filter(tree, function(node) {
      return cloned.indexOf(node) === -1;
    }), getChildren = function(map2) {
      var rootNode = map2.get(tree);
      return rootNode ? (visit(rootNode, function(leaf, ancestors) {
        if (leaf.children) {
          leaf.lineStart = 0, leaf.lineEnd = 0;
          return;
        }
        ancestors.forEach(function(ancestor) {
          ancestor.lineStart = Math.max(ancestor.lineStart, leaf.lineStart), ancestor.lineEnd = Math.max(ancestor.lineEnd, leaf.lineEnd);
        });
      }), rootNode.children) : [];
    }, merged = [].concat(getChildren(headMap), getChildren(lineMap), getChildren(tailMap), filtered ? filtered.children : []);
    return headMap.clear(), lineMap.clear(), tailMap.clear(), merged;
  }
  function wrapBatch(children, marker2, options) {
    var className = marker2.className || "refractor-marker";
    return {
      type: "element",
      tagName: marker2.component || "div",
      properties: marker2.component ? Object.assign({}, options, {
        className
      }) : {
        className
      },
      children,
      lineStart: marker2.line,
      lineEnd: children[children.length - 1].lineEnd,
      isMarker: !0
    };
  }
  function wrapLines(treeNodes, markers, options) {
    if (markers.length === 0 || treeNodes.length === 0)
      return treeNodes;
    for (var ast2 = markers.reduce(function(acc, marker3) {
      return unwrapLine(marker3.line, acc);
    }, treeNodes), wrapped = [], astIndex = 0, m = 0; m < markers.length; m++) {
      for (var marker2 = markers[m], node = ast2[astIndex]; node && node.lineEnd < marker2.line; node = ast2[++astIndex])
        wrapped.push(node);
      for (var batch = [], _node = ast2[astIndex]; _node && _node.lineEnd === marker2.line; _node = ast2[++astIndex])
        batch.push(_node);
      batch.length > 0 && wrapped.push(wrapBatch(batch, marker2, options));
    }
    for (; astIndex < ast2.length; )
      wrapped.push(ast2[astIndex++]);
    return wrapped;
  }
  function addMarkers(ast2, options) {
    var markers = options.markers.map(function(marker2) {
      return marker2.line ? marker2 : {
        line: marker2
      };
    }).sort(function(nodeA, nodeB) {
      return nodeA.line - nodeB.line;
    }), numbered = lineNumberify(ast2).nodes;
    return wrapLines(numbered, markers, options);
  }
  return addMarkers_1 = addMarkers, addMarkers_1;
}
var Refractor_1, hasRequiredRefractor;
function requireRefractor() {
  if (hasRequiredRefractor) return Refractor_1;
  hasRequiredRefractor = 1;
  var React = React__default, fract = requireCore(), mapChildren2 = requireMapChildren(), addMarkers = requireAddMarkers(), h = React.createElement;
  function Refractor2(props) {
    process.env.NODE_ENV !== "production" && (fract.registered(props.language) || console.warn('No language definitions for "'.concat(props.language, '" seems to be registered, did you forget to call `Refractor.registerLanguage()`?')));
    var langClassName = "language-".concat(props.language), codeProps = {
      className: langClassName
    }, preProps = {
      className: [props.className || "refractor", langClassName].filter(Boolean).join(" ")
    };
    props.inline && (codeProps.style = {
      display: "inline"
    }, codeProps.className = props.className || "refractor");
    var ast2 = fract.highlight(props.value, props.language);
    props.markers && props.markers.length > 0 && (ast2 = addMarkers(ast2, {
      markers: props.markers
    }));
    var value = ast2.length === 0 ? props.value : ast2.map(mapChildren2.depth(0)), code = h("code", codeProps, value);
    return props.inline ? code : h("pre", preProps, code);
  }
  return Refractor2.registerLanguage = function(lang2) {
    return fract.register(lang2);
  }, Refractor2.hasLanguage = function(lang2) {
    return fract.registered(lang2);
  }, Refractor_1 = Refractor2, Refractor_1;
}
var RefractorExports = requireRefractor(), Refractor = /* @__PURE__ */ getDefaultExportFromCjs(RefractorExports);
function LazyRefractor(props) {
  const $ = distExports.c(13), {
    language: languageProp,
    value
  } = props, language = typeof languageProp == "string" ? languageProp : void 0;
  let t0;
  $[0] !== language ? (t0 = language ? Refractor.hasLanguage(language) : !1, $[0] = language, $[1] = t0) : t0 = $[1];
  const registered = t0;
  let t1;
  $[2] !== language || $[3] !== registered || $[4] !== value ? (t1 = !(language && registered) && /* @__PURE__ */ jsx("code", { children: value }), $[2] = language, $[3] = registered, $[4] = value, $[5] = t1) : t1 = $[5];
  let t2;
  $[6] !== language || $[7] !== registered || $[8] !== value ? (t2 = language && registered && /* @__PURE__ */ jsx(Refractor, { inline: !0, language, value: String(value) }), $[6] = language, $[7] = registered, $[8] = value, $[9] = t2) : t2 = $[9];
  let t3;
  return $[10] !== t1 || $[11] !== t2 ? (t3 = /* @__PURE__ */ jsxs(Fragment, { children: [
    t1,
    t2
  ] }), $[10] = t1, $[11] = t2, $[12] = t3) : t3 = $[12], t3;
}
LazyRefractor.displayName = "LazyRefractor";
export {
  LazyRefractor as default
};
//# sourceMappingURL=refractor.js.map
