# Strapi plugin ppt-customfields

**Author**: Sergi Penya Tapia

**Company**: Ping Pong Technologies S.L.

**Version**: 1.0.10

**Last Modified**: March 2023

Strapi Plugin to encapsulate all custom fields we will create.

## Customfields:

### Multiboolean *(v1)*

It allows to create a list of boolean flags, that is saved together in one Json field
You can define the on and off text for the toggleButtons (true-false, Yes-No), and the list of items you want to evaluate.
The Api returns you an array of the ON items.

### Duration *(v1)*

It allows to create a field for duration in hh:mm:ss. Data is saved in seconds, and the seconds field is optional, can be shown or hidden as you want from the advanced options.