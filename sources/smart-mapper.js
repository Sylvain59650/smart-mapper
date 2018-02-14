/**
 * @license
 * smart-mapper  0.9.0
 * Copyright Sylvain Longepee
 * Released under MIT license
 */

;
(function(moduleName, root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["passthrough-object"], factory);
  } else if (typeof exports === 'object') {
    var Path = require("passthrough-object");
    module.exports = factory(Path);
  } else {
    window.SmartMapper = factory(root.Path);
  }
}("SmartMapperModule", this, function(Path) {
  'use strict';

  var SmartMapper = {};

  function isObject(anything) {
    return anything !== null && typeof anything === "object";
  }

  function mappingObject(compiles, item, array, index) {
    var target = {};
    for (var compile of compiles) {
      var value = Path.get(item, compile.relateTo, null);
      if (compile.operate && value != null) {
        value = compile.operate.execute(value, item, array, index);
      }
      if (value != null) {
        if (compile.operate && compile.operate.postCondition) {
          if (compile.operate.postCondition(value) === true) {
            target[compile.key] = value;
          }
        } else {
          target[compile.key] = value;
        }
      }
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
    var validate = template.validate || function(x) { return true };
    var childrenPropertyName = template.childrenPropertyName || "childs";
    var compiles = compile(template);
    if (Array.isArray(data)) {
      var target = [];
      for (var i = 0; i < data.length; i++) {
        var m = mappingObject(compiles, data[i], data, i);
        if (template.childrens) {
          var childrens = template.childrens(m);
          if (childrens) {
            m[childrenPropertyName] = SmartMapper.mapping(template, childrens);
          }
        }

        if (m != null && validate(m)) {
          target.push(m);
        }
      }
      return target;
    }
    return mappingObject(compiles, data, data, -1);
  }


  return SmartMapper;
}));