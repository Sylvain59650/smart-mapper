
 <h1 class="title">smart-mapper</h1>
    <div style="display:inline">
      <a target="_blank" title="build" href="https://travis-ci.org/Sylvain59650/smart-mapper"><img src="https://travis-ci.org/Sylvain59650/smart-mapper.png?branch=master" /></a>
      <a target="_blank" title="version" href="https://www.npmjs.com/package/smart-mapper"><img src="https://img.shields.io/npm/v/smart-mapper.svg" /></a>
      <a target="_blank" title="package" href="https://github.com/Sylvain59650/smart-mapper"><img src="https://img.shields.io/github/package-json/v/Sylvain59650/smart-mapper.svg" /></a>
      <a target="_blank" title="dependencies" href="https://david-dm.org/Sylvain59650/smart-mapper"><img src="https://img.shields.io/david/Sylvain59650/smart-mapper.svg" /></a>
      <a target="_blank" title="dependencies graph" href="https://npm.anvaka.com/#/view/2d/smart-mapper"><img src="https://img.shields.io/badge/dependencies-graph-blue.svg" /></a>
      <img src="https://img.shields.io/bundlephobia/min/smart-mapper.svg" />
      <img src="https://img.shields.io/badge/eslint-ok-blue.svg" />
      <a target="_blank" title="tests" href="https://sylvain59650.github.io/smart-mapper/"><img src="https://img.shields.io/badge/tests-passing-brightgreen.svg" /></a>
        <a target="_blank" title="downloads" href="https://www.jsdelivr.com/package/npm/smart-mapper"><img src="https://data.jsdelivr.com/v1/package/npm/smart-mapper/badge" /></a>
    <a target="_blank" title="cdn" href="https://cdn.jsdelivr.net/npm/smart-mapper/distrib/smart-mapper.min.js"><img src="https://img.shields.io/badge/cdn-jsdeliv-black.svg" /></a>
      <img src="https://img.shields.io/npm/l/smart-mapper.svg" />
      <img src="https://hits.dwyl.com/Sylvain59650/smart-mapper.svg" />
    </div>

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

## Without installation
```html
    <script src="https://cdn.jsdelivr.net/npm/smart-mapper/distrib/smart-mapper.min.js"></script>
```

## References for Nodejs
```html
    const SmartMapper = require('smart-mapper');
```

## References in browser 
```html
    <script src="node_modules/passthrough-object/distrib/passthrough-object.min.js"></script>
    <script src="./node_modules/smart-mapper/distrib/smart-mapper.min.js"><script>;
```


## How it works
```html
    SmartMapper.mapping(template, entryData);
```

Arguments

    entryData: json data to transform

    template: json object contain this structure :
        mappings: json object that contain in keys the destination, and in values the path in   the specific object to extract
        rules: array that contains methods to execute on a particular field during the transformation.
        rules is an optional value in the template object.
        validate: predicate called before insert item, only insert if predicate is true. Optional parameter.
        childrenPropertyName : name of property to map children
        
        each rule is composed of the "on" , "execute"  and postCondition properties.
        
        The value of the "on" property is the name of a field in the object mapping.
        
        The value of the "execute" property is a function that can take up to 4 parameters: (value, item, array, index) where:

    value: value extracted from the field value
    item: the current object in the table
    array: the entire array
    index; the position of the current item in the table
    
    the value of the "postCondition" is a function with 1 parameter :(the current transformed key). If the function return false, the transformed key is not insert in the curernt item.

Returns

    json data tranformed

## Usage

See <a href="https://sylvain59650.github.io/smart-mapper/">API & DEMO</a>


