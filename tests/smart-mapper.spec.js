require("passthrough-object");
var SmartMapper = require("../distrib/smart-mapper.min.js");

var rejecteds = [];

function isDef(value) { return value !== null && typeof value !== "undefined"; }

let template = {
  mappings: {
    id: "person.id",
    lastname: "person.lastname",
    firstname: "person.firstname",
    age: "person.age",
    job: "person.jobs",
    nbFriends: "person.friends",
    address: "person.address"
  },
  rules: [{
      on: "address",
      execute: address => {
        if (isDef(address)) { return [address.street, address.zip, address.city, address.country.code].join(","); }
        return "inconnue";
      }
    },
    {
      on: "job",
      execute: jobs => {
        var latest = jobs.find(x => x.type === "LATEST");
        if (isDef(latest)) { return latest.title; }
        return "inconnu";
      },
      postCondition: x => x !== "inconnu"
    },
    { on: "nbFriends", execute: friends => friends.length }
  ],
  validate: item => { if (isDef(item.address)) { rejecteds.push(item); return false } return true }
};


let entryData = [{
    person: {
      id: "1",
      firstname: "Jean",
      lastname: "Valjean",
      age: 50,
      jobs: [{ title: "arboriste", type: "first" }, { title: "braconnier", type: "after" }, { title: "maire", type: "LATEST" }],
      friends: ["Cosette", "Fauchelevent"],
      address: { street: "rue de l'Ouest", zip: "75006", city: "Paris", country: { code: "FR" } }
    }
  },
  {
    person: {
      id: "2",
      firstname: "Emmanuel",
      lastname: "Macron",
      age: 40,
      jobs: [{ title: "President", type: "LATEST" }, { title: "Banquier", type: "first" }],
      friends: ["Castaner", "Brigitte", "Trump", "Francois", "Matt"],
      address: { street: "Rue de l'Elysée", zip: "59000", city: "Paris", country: { code: "FR" } }
    }
  },
  {
    person: {
      id: "3",
      firstname: "Mario",
      lastname: "",
      age: 35,
      jobs: [{ title: "Plombier", type: "first" }],
      friends: ["Luigi", "Sonic"]
    }
  }
];

let outData = SmartMapper.mapping(template, entryData);
console.log("outData", JSON.stringify(outData));
console.log("");
console.log("rejecteds", JSON.stringify(rejecteds));