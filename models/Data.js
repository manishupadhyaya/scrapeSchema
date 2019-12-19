const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    scraped: String
})

module.exports = mongoose.model('Data', DataSchema)