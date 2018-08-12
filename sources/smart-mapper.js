/* global Path */

function isDef(obj) {
  return (obj !== null && typeof obj !== "undefined");
}

function mappingObject(compiles, item, array, index) {
  var target = {};
  for (var c of compiles) {
    var value = Path.get(item, c.relateTo, null);
    if (c.operate && value !== null) {
      value = c.operate.execute(value, item, array, index);
    }
    if (value !== null) {
      if (c.operate && c.operate.postCondition) {
        if (c.operate.postCondition(value) === true) {
          target[c.key] = value;
        }
      } else {
        target[c.key] = value;
      }
    }
  }
  return target;
}

function compile(template) {
  var compiles = [];
  for (var key in template.mappings) {
    let c = {
      key: key,
      relateTo: template.mappings[key],
      operate: isDef(template.rules) ? template.rules.find(x => x.on === key) : null
    };
    compiles.push(c);
  }
  return compiles;
}

/*
 * @param {json} - template:json object that contain 2 arrays:
 *                        mappings: json object that contain in keys the destination, 
 *                                  and in values the path in the specific object to extract
 *                        rules: json object that contains methods to execute on a particular field during the transformation
 * @param {json} - data : data to transform
 */
function mapping(template, data) {
  var validate = template.validate || function() { return true };
  var childrenPropertyName = template.childrenPropertyName || "childs";
  var compiles = compile(template);
  if (Array.isArray(data)) {
    var target = [];
    for (var i = 0; i < data.length; i++) {
      var m = mappingObject(compiles, data[i], data, i);
      if (template.childrens) {
        var childrens = template.childrens(m);
        if (childrens) {
          m[childrenPropertyName] = mapping(template, childrens);
        }
      }

      if (m !== null && validate(m)) {
        target.push(m);
      }
    }
    return target;
  }
  return mappingObject(compiles, data, data, -1);
}


export { mapping };