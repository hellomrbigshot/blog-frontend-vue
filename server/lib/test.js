const User = require('./schema')

function insert() {
	let user = new User({
		username: 'YeaChan',
		userpwd: 'abcd',
		userage: 37,
		logindate: new Date()
	})
	user.save((err, res) => {
		if (err) {
			console.log(`Error: ${err}`)
		} else {
			console.log(`Res: ${res}`)
		}
	})
}

insert()