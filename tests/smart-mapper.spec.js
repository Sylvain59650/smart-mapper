const JsMapping = require('../sources/smart-mapper');

var rejecteds = [];

let template = {
  mappings: {
    id: "person.id",
    lastname: 'person.lastname',
    firstname: 'person.firstname',
    age: 'person.age',
    job: 'person.jobs',
    nbFriends: 'person.friends',
    address: "person.address"
  },
  rules: [
    { on: "address", execute: address => { if (address != null) return [address.street, address.zip, address.city, address.country.code].join(","); return "inconnue"; } },
    {
      on: 'job',
      execute: jobs => {
        var latest = jobs.find(x => x.type === 'LATEST');
        if (latest != null) return latest.title;
        return "inconnu";
      },
      postCondition: x => x != "inconnu"
    },
    { on: "nbFriends", execute: friends => friends.length }
  ],
  validate: item => { if (item.address === undefined) { rejecteds.push(item); return false } return true }
};


let entryData = [{
    person: {
      id: '1',
      firstname: 'Jean',
      lastname: 'Valjean',
      age: 50,
      jobs: [{ title: 'arboriste', type: 'first' }, { title: "braconnier", type: "after" }, { title: 'maire', type: 'LATEST' }],
      friends: ['Cosette', 'Fauchelevent'],
      address: { street: "rue de l'Ouest", zip: '75006', city: 'Paris', country: { code: 'FR' } }
    }
  },
  {
    person: {
      id: '2',
      firstname: 'Emmanuel',
      lastname: 'Macron',
      age: 40,
      jobs: [{ title: 'President', type: 'LATEST' }, { title: 'Banquier', type: 'first' }],
      friends: ['Castaner', 'Brigitte', "Trump", "Francois", "Matt"],
      address: { street: "Rue de l'Elysée", zip: '59000', city: 'Paris', country: { code: 'FR' } }
    }
  },
  {
    person: {
      id: '3',
      firstname: 'Mario',
      lastname: '',
      age: 35,
      jobs: [{ title: 'Plombier', type: 'first' }],
      friends: ["Luigi", "Sonic"]
    }
  }
];


let outData = JsMapping.mapping(template, entryData);
console.log("outData", outData);
console.log("");
console.log("rejecteds", rejecteds);