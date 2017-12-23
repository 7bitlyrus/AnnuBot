const Datastore = require('nedb-promise')

const db = new Datastore({ filename: 'db.db', autoload: true })

db.ensureIDExists = (id) => new Promise(async function(resolve, reject) {
	let docs = await db.find({id: id})
	if(docs.length) return resolve(docs[0])

	let newDoc = db.insert({id: id})
	if(newDoc) return resolve(newDoc)

	reject()
})

module.exports = db
