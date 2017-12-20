const Datastore = require('nedb')

const db = new Datastore({ filename: 'db.db', autoload: true });

module.exports = db
