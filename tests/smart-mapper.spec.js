const _ = require('lodash');

const JsMapping = require('../sources/smart-mapper');

let givenTemplate = {
  mappings: {
    id: "identity.id",
    lastname: 'identity.lastname',
    firstname: 'identity.firstname',
    age: 'identity.age',
    goodlooking: 'identity.goodlooking',
    job: 'identity.jobs',
    missingField: 'identity.doesnotexist',
    friends: 'identity.friends',
    address: {
      streetLine: 'identity.address.streetLine',
      zipPostalCode: 'identity.address.zipPostalCode',
      locality: 'identity.address.locality',
      countryCode: 'identity.address.country.code'
    }
  },
  rules: [
    { on: 'job', execute: jobs => jobs.find(x => x.type == 'LATEST').label }
  ]
};


let entryData = [{
    identity: {
      id: '1',
      lastname: 'Bon',
      firstname: 'Jean',
      age: 30,
      superflu: 'superflu',
      goodlooking: true,
      jobs: [{ label: 'Developper', type: 'LATEST' }],
      friends: ['anne', 'ines'],
      address: { streetLine: 'Rue de la boucherie', zipPostalCode: '59000', locality: 'Les Weppes', country: { code: 'FR' } }
    }
  },
  {
    identity: {
      id: '2',
      lastname: 'Verger',
      firstname: 'Framboise',
      age: 99,
      superflu: 'superflu',
      goodlooking: false,
      jobs: [{ label: 'BigBoss', type: 'LATEST' }, { label: 'Director', type: 'OTHER' }],
      friends: ['anne', 'ines', 'Jean Bon'],
      address: { streetLine: 'Rue de la vieillesse', zipPostalCode: '59000', locality: 'Les Weppes', country: { code: 'FR' } }
    }
  }
];


let outData = JsMapping.mapping(givenTemplate, entryData);
console.log(outData);

// let dd = JsMapping.mapping(givenTemplate, { identity: { id: 1 } });
// console.log(dd);