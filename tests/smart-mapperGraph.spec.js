const nodes = require("./graph.json").nodes;
const SmartMapper = require("../distrib/smart-mapper.min.js");

function isDef(obj) {
  return obj !== null && typeof obj !== "undefined";
}

const template = {
  mappings: {
    id: "id",
    x: "x",
    y: "y",
    uid: "data.Uid",
    parentUid: "data.ParentUid",
    title: "data.Title"
  },
  rules: [
    { on: "parentUid", execute: parentUid => isDef(parentUid) ? parentUid.replace("EB_", "") : null },
    { on: "uid", execute: uid => isDef(uid) ? uid.replace("EB_", "") : null },
    { on: "x", execute: x => parseInt(x, 10) },
    { on: "y", execute: y => parseInt(y, 10) }
  ]
};

let outData = SmartMapper.mapping(template, nodes);
console.log(JSON.stringify(outData));