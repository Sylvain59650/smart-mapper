const SmartMapper = require('../sources/smart-mapper');
let entryData = require("./benchmark.json");

let template = {
  mappings: {
    latitude: "Latitude",
    longitude: "Longitude",
    time: "Time"
  },
  rules: [{
    on: "latitude",
    execute: (latitude, item, array, index) => {
      if (!array.min) { array.min = latitude } else {
        if (array.min > latitude) array.min = latitude;
      }
      return latitude;
    }
  }]
};

var before = new Date();
let outData = SmartMapper.mapping(template, entryData.Run.AcquisitionsModel);
var after = new Date();
console.log("duration", after - before);
console.log("min latitude", entryData.Run.AcquisitionsModel.min);
//console.log(outData);