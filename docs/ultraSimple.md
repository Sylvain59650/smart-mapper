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
