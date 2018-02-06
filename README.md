# Smart Mapper

Smart Mapper is useful when you want transform data that you have received.


 <div class="Note" style="color:orange;font-style:italic">
 
The lastest version of this document is available on [Github > smart-mapper](https://github.com/Sylvain59650/smart-mapper/blob/master/README.md)
</div>


## Installation

<code>

  npm install smart-mapper --save

OR

  yarn add smart-mapper --save
</code>

## References for Nodejs
const SmartMapper = require('smart-mapper');

## References in browser 
<code>

  &lt;script src="./node_modules/smart-mapper/distrib/smart-mapper.min.js"&gt;&lt;/script&gt;
</code>


## How it works
    SmartMapper.mapping(template, entryData);

Arguments

    entryData: json data to transform

    template: json object contain 2 arrays
        mappings: json object that contain in keys the destination, and in values the path in   the specific object to extract
        rules: array that contains methods to execute on a particular field during the transformation.
        rules is an optional value in the template object.

each rule is composed of the "on" and "execute" properties.

The value of the "on" property is the name of a field in the object mapping.

The value of the "execute" property is a function that can take up to 4 parameters: (value, item, array, index) where:

    value: value extracted from the field value
    item: the current object in the table
    array: the entire array
    index; the position of the current item in the table


Returns

    json data tranformed

Example 1 : Ultra simple

Given an array of people with name and age properties, we want to get a table with these people but with the FirstName property instead of name and without the age property.

    const SmartMapper = require('smart-mapper');

    var persons = [
    { name: 'Matt', age: 30 },
    { name: 'Edouard', age: 28 },
    { name: 'Guillaume', age: 29 },
    { name: 'Roger', age: 51 }
    ];
    var template = { mappings: { FirstName: 'name' } };

    let outData = SmartMapper.mapping(template, persons);
    console.log(outData);

    /*    
        [ { FirstName: 'Matt' },
        { FirstName: 'Edouard' },
        { FirstName: 'Guillaume' },
        { FirstName: 'Roger' } ]
    */



Example 2
  
    let entryData = [{
    person: {
      id: '1',
      firstname: 'Jean',
      lastname: 'Valjean',
      age: 50,
      jobs: [
          { title: 'arboriste', type: 'first' },
          { title: "braconnier", type: "after" }, 
          { title: 'maire', type: 'LATEST' }],
      friends: ['Cosette', 'Fauchelevent'],
      address: { street: "rue de l'Ouest", zip: '75006', 
                city: 'Paris', country: { code: 'FR' } }
    }
    },{
    person: {
      id: '2',
      firstname: 'Emmanuel',
      lastname: 'Macron',
      age: 40,
      jobs: [
          { title: 'President', type: 'LATEST' },
          { title: 'Banquier', type: 'first' }],
      friends: [
          'Castaner', 
          'Brigitte', 
          "Trump", 
          "Francois", 
          "Matt"
        ],
      address: { street: "Rue de l'Elysée", zip: '59000', 
                city: 'Paris', country: { code: 'FR' } }
    }
    },{
    person: {
      id: '3',
      firstname: 'Mario',
      lastname: '',
      age: 35,
      jobs: [{ title: 'Plombier', type: 'first' }],
      friends: ["Luigi", "Sonic"]
    } }];

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
            {
                 on: "address", execute: address => { 
                     if (address != null) return 
                        [   address.street, 
                            address.zip, 
                            address.city, 
                            address.country.code
                        ].join(","); return "inconnue"; } 
            },
            {
                on: 'job',
                execute: jobs => {
                    var latest = jobs.find(x => x.type === 'LATEST');
                    if (latest != null) return latest.title;
                    return "inconnu";
                }
            },
            { 
                on: "nbFriends", 
                execute: friends => friends.length 
            }
        ]};




    let outData = SmartMapper.mapping(template, entryData);


<table border="1" style="min-width:1280px">
<tr><td>before</td><td>after</td></tr>
<tr>
<td>
<pre>
    [{
        person: {
        id: '1',
        firstname: 'Jean',
        lastname: 'Valjean',
        age: 50,
        jobs: [
            { title: 'arboriste', type: 'first' },
            { title: "braconnier", type: "after" }, 
            { title: 'maire', type: 'LATEST' }],
        friends: ['Cosette', 'Fauchelevent'],
        address: { street: "rue de l'Ouest", zip: '75006', 
                    city: 'Paris', country: { code: 'FR' } }
        }
    },
    {
        person: {
        id: '2',
        firstname: 'Emmanuel',
        lastname: 'Macron',
        age: 40,
        jobs: [
            { title: 'President', type: 'LATEST' },
            { title: 'Banquier', type: 'first' }],
        friends: [
            'Castaner', 
            'Brigitte', 
            "Trump", 
            "Francois", 
            "Matt"
        ],
        address: { street: "Rue de l'Elysée", 
                zip: '59000', city: 'Paris', country: { code: 'FR' } }
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
    ]
</pre>
</td>
<td>
<pre>
    [ { id: '1',
        lastname: 'Valjean',
        firstname: 'Jean',
        age: 50,
        job: 'maire',
        nbFriends: 2,
        address: 'rue de l\'Ouest,75006,Paris,FR' },
    { id: '2',
        lastname: 'Macron',
        firstname: 'Emmanuel',
        age: 40,
        job: 'President',
        nbFriends: 5,
        address: 'Rue de l\'Elysée,59000,Paris,FR' },
    { id: '3',
        lastname: null,
        firstname: 'Mario',
        age: 35,
        job: 'inconnu',
        nbFriends: 2,
        address: 'inconnue' } ]
</pre>
</td>
</tr>
</table>

With the following template

    {
        mappings: {
            id: "person.id",
            lastname: 'person.lastname',
            firstname: 'person.firstname',
            age: 'person.age',
            job: 'person.jobs',
            nbFriends: 'person.friends',
            address: "person.address"
        },
        rules: 
        [
            { 
                on: "address", execute: address => { 
                    if (address != null) return [
                        address.street, 
                        address.zip, 
                        address.city, 
                        address.country.code
                        ].join(","); 
                    return "inconnue"; } },
            {
                on: 'job',
                execute: jobs => {
                    var latest = jobs.find(x => x.type === 'LATEST');
                    if (latest != null) return latest.title;
                    return "inconnu";
                }
            },
            { 
                on: "nbFriends", execute: friends => friends.length
            }
        ]
    }