const Sequelize = require('sequelize')
const sequelize = new Sequelize('grading_project_db','Cloudyvelopers','password123',{
	dialect : 'mysql',
	define : {
		timestamps : false
	}
})

//definirea tebelelor
const Project = sequelize.define('project', {
	title : Sequelize.STRING,
	file : Sequelize.TEXT
}, {
	underscored : true //modificarea conditiei pentru id
})

const File = sequelize.define('file', {
	name : Sequelize.STRING,
	type : Sequelize.TEXT
})

Project.hasMany(File)

sequelize.sync()
	.then(() => console.log('created'))
	.catch((error) => console.log(error))