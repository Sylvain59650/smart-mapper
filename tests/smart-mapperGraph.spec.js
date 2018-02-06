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
  rules: [
    { on: "parentUid", execute: parentUid => parentUid.replace("EB_", "") },
    { on: "uid", execute: uid => uid.replace("EB_", "") },
    { on: "x", execute: x => parseInt(x) },
    { on: "y", execute: y => parseInt(y) }
  ]
};

let outData = JsMapping.mapping(template, data.nodes);
console.log(outData);