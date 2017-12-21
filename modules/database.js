const Datastore = require('nedb')
const util      = require('util');

const db = {}
db.datastore = new Datastore({ filename: 'db.db', autoload: true });

// const db.x = util.promisify(db.datastore.x);

module.exports = db
