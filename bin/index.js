#!/usr/bin/env node
const {
    createServe
} = require('../dist')

createServe().then(({ url }) => {
    console.log(url)
})
