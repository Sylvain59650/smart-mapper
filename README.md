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

    <script src="node_modules/passthrough-object/distrib/passthrough-object.min.js"></script>
  &lt;script src="./node_modules/smart-mapper/distrib/smart-mapper.min.js"&gt;&lt;/script&gt;
</code>


## How it works
    SmartMapper.mapping(template, entryData);

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


**Notes** [See examples on GitHub](https://github.com/Sylvain59650/smart-mapper/blob/master/docs/index.md)

