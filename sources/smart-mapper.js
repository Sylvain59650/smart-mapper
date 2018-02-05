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


  function get(object, path, defaultValue) {
    var ps = path.split(".");
    let i = 0;
    const length = ps.length;
    while (object != null && i < length) {
      object = object[ps[i]];
      i++;
    }
    return object || defaultValue;
  }


  function mappingObject(mappings, rules, data) {
    var target = {};
    for (var key in mappings) {
      var mkey = mappings[key];
      if (!isObject(mkey)) {
        let value = get(data, mkey, null);
        let operate = null;
        if (rules != null) {
          operate = rules.find(x => x.on === key);
        }
        target[key] = operate ? operate.execute(value) : value;
      } else {
        target[key] = mappingObject(mkey, rules, data);
      }
    }
    return target;

  }

  /*
   * @param {json} - template:json object that contain 2 arrays:
   *                        mappings: json object that contain in keys the destination, and in values the path in the specific object to extract
   *                        rules: json object that contains methods to execute on a particular field during the transformation
   * @param {json} - data : data to transform
   */
  SmartMapper.mapping = function(template, data) {
    if (Array.isArray(data)) {
      return data.reduce((target, item) => {
        if (isObject(item)) {
          target.push(mappingObject(template.mappings, template.rules, item));
        }
        return target;
      }, []);
    }
    return mappingObject(template.mappings, template.rules, data);
  }


  return SmartMapper;
}));