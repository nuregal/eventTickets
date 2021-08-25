const lowdb = require('lowdb');
const fileSync = require('lowdb/adapters/FileSync');
const adapter = new fileSync('database.json');
const database = lowdb(adapter);

module.exports = database;