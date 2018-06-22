const SmartMapper = require("../distrib/smart-mapper.min.js");

var persons = [
  { name: "Matt", age: 30 },
  { name: "Edouard", age: 28 },
  { name: "Guillaume", age: 29 },
  { name: "Roger", age: 51 }
];
var template = { mappings: { FirstName: "name" } };

let outData = SmartMapper.mapping(template, persons);
console.log(JSON.stringify(outData));