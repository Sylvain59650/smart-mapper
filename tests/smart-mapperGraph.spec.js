import { nodes } from "./graph.json";
import { mapping } from "../sources/smart-mapper";


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
    { on: "parentUid", execute: parentUid => parentUid.replace("EB_", "") },
    { on: "uid", execute: uid => uid.replace("EB_", "") },
    { on: "x", execute: x => parseInt(x, 10) },
    { on: "y", execute: y => parseInt(y, 10) }
  ]
};

let outData = mapping(template, nodes);
console.log(outData);