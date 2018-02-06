/**
 * @license
 * smart-mapper  0.0.9
 * Copyright Sylvain Longepee
 * Released under MIT license
 */

;
(function(moduleName, root, factory) {
  if (typeof define === 'function' && define.amd) {} else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.SmartMapper = factory();
  }
}("SmartMapperModule", this, function() {
  'use strict';

  var SmartMapper = {};

  function isObject(anything) {
    return anything !== null && typeof anything === "object";
  }

  SmartMapper.get = get;

  function get(object, path, defaultValue) {
    path = path.replace("[", ".").replace("]", "");
    if (path.startsWith(".")) path = path.substr(1);
    var ps = path.split(".");
    let i = 0;
    const length = ps.length;
    while (object != null && i < length) {
      object = object[ps[i]];
      i++;
    }
    if (object == null) return defaultValue;
    return object;
  }

  function mappingObject(compiles, item, array, index) {
    var target = {};
    for (var compile of compiles) {
      var value = get(item, compile.relateTo, null);
      if (compile.operate && value != null) {
        value = compile.operate.execute(value, item, array, index);
      }
      target[compile.key] = value;
    }
    return target;
  }

  function compile(template) {
    var compiles = [];
    for (var key in template.mappings) {
      var compile = {
        key: key,
        relateTo: template.mappings[key],
        operate: (template.rules != null) ? template.rules.find(x => x.on === key) : null
      };
      compiles.push(compile);
    }
    return compiles;
  }

  /*
   * @param {json} - template:json object that contain 2 arrays:
   *                        mappings: json object that contain in keys the destination, and in values the path in the specific object to extract
   *                        rules: json object that contains methods to execute on a particular field during the transformation
   * @param {json} - data : data to transform
   */
  SmartMapper.mapping = function(template, data) {
    var compiles = compile(template);
    if (Array.isArray(data)) {
      var target = [];
      for (var i = 0; i < data.length; i++) {
        target.push(mappingObject(compiles, data[i], data, i));
      }
      return target;
    }
    return mappingObject(compiles, data, data, -1);
  }


  return SmartMapper;
}));