# yrs
>Yarn registry switch tool

## Features
Compatible with Node.js 4.0 or higher

## Requirements

- [Yarn](https://yarnpkg.com)

## Install

```
yarn global add yrs
```
OR

```
 npm install -g yrs
```

## Example
```
yrs ls

name       registry                             home                             
npm        https://registry.npmjs.org           https://www.npmjs.org            
cnpm       http://r.cnpmjs.org                  http://cnpmjs.org                
taobao     https://registry.npm.taobao.org      https://npm.taobao.org           
nj         https://registry.nodejitsu.com       https://www.nodejitsu.com        
rednpm     http://registry.mirror.cqupt.edu.cn  http://npm.mirror.cqupt.edu.cn/  
npmMirror  https://skimdb.npmjs.com/registry    https://skimdb.npmjs.com/        
edunpm     http://registry.enpmjs.org           http://www.enpmjs.org 

```

```
yrs use taobao

yarn config v0.17.6
success Set "registry" to "https://registry.npm.taobao.org".
Done in 0.03s. 

```


## Usage

```

  Usage: yrs [options] [command]


  Commands:

    current                          Show current registry name
    ls                               List all the registries
    use <registryName>               Change registry to registry
    add <registryName> <url> [home]  Add one custom registry
    del <registryName>               Delete one custom registry
    *                              

  Options:

    -h, --help     output usage information
    -V, --version  output the version number


```
## Contributing

#### Registry

- Add registry to registeries.json

#### TODO

- [ ] Test
- [ ] travis CI


#### Development environment
   - [Eslint](http://eslint.org/)
   - [Babel](http://babeljs.io/)
   - [Gulp](http://gulpjs.com/)
   - [Jest](https://facebook.github.io/jest/) 
   - [Flow](https://flowtype.org/)
