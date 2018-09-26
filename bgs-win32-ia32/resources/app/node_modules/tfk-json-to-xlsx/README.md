[![Build Status](https://travis-ci.org/telemark/tfk-json-to-xlsx.svg?branch=master)](https://travis-ci.org/telemark/tfk-json-to-xlsx)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# tfk-json-to-xlsx

[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/tfk-json-to-xlsx.svg)](https://greenkeeper.io/)
Write an xlsx file from json data.

This is basically just the compiled source from [node-xlsx-writestream](https://github.com/STRML/node-xlsx-writestream) with an updated version of [https://github.com/archiverjs/node-archiver](https://github.com/archiverjs/node-archiver)

## Usage

```JavaScript
'use strict'

const xlsx = require('tfk-json-to-xlsx')

const data = [
  {
    'Name': 'Bob',
    'Location': 'Sweden'
  },
  {
    'Name': 'Alice',
    'Location': 'France'
  }
]

xlsx.write('mySpreadsheet.xlsx', data, function (error) {
  // Error handling here
  if (error) {
    console.error(error)
  }
})
```

## License
[MIT](LICENSE)