const SmartMapper = require('../sources/smart-mapper');

var persons = [
  { name: 'Matt', age: 30 },
  { name: 'Edouard', age: 28 },
  { name: 'Guillaume', age: 29 },
  { name: 'Roger', age: 51 }
];
var template = { mappings: { FirstName: 'name' } };

let outData = SmartMapper.mapping(template, persons);
console.log(outData);