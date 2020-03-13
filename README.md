---
[![npm version](https://badge.fury.io/js/malta-browserify.svg)](http://badge.fury.io/js/malta-browserify)
[![npm downloads](https://img.shields.io/npm/dt/malta-browserify.svg)](https://npmjs.org/package/malta-browserify)
[![npm downloads](https://img.shields.io/npm/dm/malta-browserify.svg)](https://npmjs.org/package/malta-browserify)  
---  

This plugin can be used on: **.js** files

`browserify` needs to be globally available (`yarn global add browserify`)


**Options** : You can pass the options using an `options` parameter to the plugin. Do not use the `-o` parameter cause _malta-browserify_ adds it automatically with the right outfilename. 

Sample usage:  
``` shell
malta app/source/home.js public/js -plugins=malta-browserify[options:[\"--dg\",\"-ig\",\"--deps\"]]
# remember that options cannot contain spaces
```
or in the .json file :
``` json
"app/source/home.js" : "public/js -plugins=malta-browserify[options:[\"--dg\",\"-ig\",\"--deps\"]]"
```
or in a script : 
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/home.js',
    'public/js',
    '-plugins=malta-browserify[options:[\"--dg\",\"-ig\",\"--deps\"]]',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```
