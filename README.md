# Strapi plugin ppt-customfields


Strapi Plugin to encapsulate custom fields created by Ping Pong Technologies.


**Company**: Ping Pong Technologies S.L.

**Version**: 1.0.17

**Last Modified**: March 2023

**Author**: Sergi Penya Tapia




## Features

The characteristics are detailed below for each custom field individually.
You can configure them from the field options. The configuration parameters are shown below.

### Multiboolean *(v1)*

It allows to create a list of boolean flags, that is saved together in one Json field
You can define the on and off text for the toggleButtons (true-false, Yes-No), and the list of items you want to evaluate.
The Api returns you an array of the ON items.



#### Configuration

| property       | type (default)   | description                                                                                                    |
| -------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------|
| `on_text`      | string (`null`)  | Text for the off-state                                                                                         |
| `off_text`     | string (`null`)  | Text for the off-state                                                                                         |               
| `list`         | array  (`{}`)    | Array of strings textarea-enum, with every boolean name we want to check                                       |



### Duration *(v1)*

It allows to create a field for duration in hh:mm or hh:mm:ss. Data is saved in seconds, and the seconds field is optional, can be shown or hidden as you want from the advanced options.

#### Configuration

| property       | type (default)   | description                                                                                                    |
| -------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------|
| `withSeconds`  | boolean (`false`)| If you want it as hh:mm or hh:mm:ss                                                                            |




## Installation

To install this plugin, you need to add an NPM dependency to your Strapi application.

```sh
# Using Yarn
yarn add strapi-plugin-ppt-customfields

# Or using NPM
npm install strapi-plugin-ppt-customfields
```

