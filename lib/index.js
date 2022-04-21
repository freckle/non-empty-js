"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.flattenOnNonEmpty = flattenOnNonEmpty;
exports.headOnNonEmpty = headOnNonEmpty;
exports.initOnNonEmpty = initOnNonEmpty;
exports.lastOnNonEmpty = lastOnNonEmpty;
exports.mapOnNonEmpty = mapOnNonEmpty;
exports.mkNonEmpty = mkNonEmpty;
exports.mkNonEmptyFromHead = mkNonEmptyFromHead;
exports.mkNonEmptyFromJust = mkNonEmptyFromJust;
exports.mkNonEmptyFromLast = mkNonEmptyFromLast;
exports.mkNonEmptySingleton = mkNonEmptySingleton;
exports.nonEmptyToArray = nonEmptyToArray;
exports.tailOnNonEmpty = tailOnNonEmpty;
exports.unconsOnNonEmpty = unconsOnNonEmpty;

var _first = _interopRequireDefault(require("lodash/first"));

var _last = _interopRequireDefault(require("lodash/last"));

var _map = _interopRequireDefault(require("lodash/map"));

var _flatten = _interopRequireDefault(require("lodash/flatten"));

var _maybe = require("@freckle/maybe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NonEmpty = /*#__PURE__*/_createClass(function NonEmpty() {
  _classCallCheck(this, NonEmpty);
});

function mkNonEmpty(array) {
  return array.length === 0 ? null : array;
}

function mkNonEmptyFromJust(array) {
  return (0, _maybe.fromJust)(mkNonEmpty(array), 'Array that should have been non-empty was empty');
}

function mkNonEmptySingleton(elem) {
  return (0, _maybe.fromJust)(mkNonEmpty([elem]), "This definitely shouldn't happen! We created a non empty array from an element");
}

function mkNonEmptyFromHead(head, tail) {
  return (0, _maybe.fromJust)(mkNonEmpty([head].concat(tail)), "This definitely shouldn't happen! We created a non empty array from the head element and an array");
}

function mkNonEmptyFromLast(init, last) {
  return (0, _maybe.fromJust)(mkNonEmpty(init.concat([last])), "This definitely shouldn't happen! We created a non empty array from the last element and an array");
}

function mapOnNonEmpty(nonEmpty, f) {
  return (0, _maybe.fromJust)(mkNonEmpty((0, _map["default"])(nonEmpty, f)), 'Array that should have been non-empty was empty');
}

function lastOnNonEmpty(array) {
  var lastElem = (0, _last["default"])(array);

  if (lastElem === null || lastElem === undefined) {
    throw new TypeError("This definitely shouldn't happen! The types declare this array to be non-empty");
  } else {
    return lastElem;
  }
}

function headOnNonEmpty(array) {
  var firstElem = (0, _first["default"])(array);

  if (firstElem === null || firstElem === undefined) {
    throw new TypeError("This definitely shouldn't happen! The types declare this array to be non-empty");
  } else {
    return firstElem;
  }
}

function tailOnNonEmpty(array) {
  return array.slice(1);
}

function initOnNonEmpty(array) {
  return array.slice(0, -1);
}

function nonEmptyToArray(array) {
  return array;
}

function unconsOnNonEmpty(array) {
  return [headOnNonEmpty(array), tailOnNonEmpty(array)];
}

function flattenOnNonEmpty(array) {
  return (0, _maybe.fromJust)(mkNonEmpty((0, _flatten["default"])(nonEmptyToArray(array))), 'Array that should have been non-empty was empty');
}

var _default = {
  mkNonEmpty: mkNonEmpty,
  mkNonEmptySingleton: mkNonEmptySingleton,
  mkNonEmptyFromHead: mkNonEmptyFromHead,
  mkNonEmptyFromLast: mkNonEmptyFromLast,
  lastOnNonEmpty: lastOnNonEmpty,
  headOnNonEmpty: headOnNonEmpty,
  tailOnNonEmpty: tailOnNonEmpty,
  unconsOnNonEmpty: unconsOnNonEmpty,
  initOnNonEmpty: initOnNonEmpty,
  nonEmptyToArray: nonEmptyToArray
};
exports["default"] = _default;
