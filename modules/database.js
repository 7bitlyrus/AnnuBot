const Datastore = require('nedb')
const util      = require('util');

// I tried to promisify database functions-- it really didn't like anything I tried. 
const db = new Datastore({ filename: 'db.db', autoload: true })

db.ensureIDExists = (id) => new Promise((resolve, reject) => {
	db.find({id: id}, (err, docs) => {
		if(err) return reject(err)
		if(docs.length) return resolve(docs)

		db.insert({id: id}, (err, newDoc) => {
			if(err) return reject(err)
			if(newDoc) return resolve([newDoc])
		})
	})
})

module.exports = db
