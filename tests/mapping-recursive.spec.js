const SmartMapper = require('../sources/smart-mapper');
let entryData = require("./mapping-recursive.json");

let template = {
  mappings: {
    id: "Id",
    title: "Title",
    childs: "Childs"
  },
  childrens: node => node.childs,
  childrenPropertyName: "childrens"
};

let outData = SmartMapper.mapping(template, entryData);
console.log(JSON.stringify(outData));