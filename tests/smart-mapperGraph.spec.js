var data = require("./graph.json");
const JsMapping = require('../sources/smart-mapper');
var util = require('util');


var template = {
  mappings: {
    id: "id",
    x: "x",
    y: "y",
    uid: "data.Uid",
    parentUid: "data.ParentUid",
    title: "data.Title"
  },
  rules: []
};

let outData = JsMapping.mapping(template, data.nodes);
console.log(outData);