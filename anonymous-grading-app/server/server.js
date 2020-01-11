// 'use strict'
// require('dotenv').config({silent:true})

const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const cors = require('cors')



//conexiune la baza de date
const sequelize = new Sequelize('grading_project_db','Cloudyvelopers','password123',{
	dialect : 'mysql',
	define : {
		timestamps : false
	}
})

//verificare conexiune la baza de date
sequelize.authenticate()
    .then(()=>console.log('connected to database'))
    .catch((error)=>console.log(error))


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

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('../redux-app/build'))

app.get('/create', async (req, res) => {
	try{
		await sequelize.sync({force : true})
		res.status(201).json({message : 'created'})
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/projects', async (req, res) => {
	try{
		let projects = await Project.findAll()
		res.status(200).json(projects)
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})


app.post('/projects', async (req, res) => {
	try{
		if (req.query.bulk && req.query.bulk == 'on'){
			await Project.bulkCreate(req.body)
			res.status(201).json({message : 'created'})
		}
		else{
			await Project.create(req.body)
			res.status(201).json({message : 'created'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/projects/:id', async (req, res) => {
	try{
		let project = await Project.findById(req.params.id)
		if (project){
			res.status(200).json(project)
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.put('/projects/:id', async (req, res) => {
	try{
		let project = await Project.findById(req.params.id)
		if (project){
			await project.update(req.body)
			res.status(202).json({message : 'accepted'})
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.delete('/projects/:id', async (req, res) => {
	try{
		let project = await Project.findById(req.params.id)
		if (project){
			await project.destroy()
			res.status(202).json({message : 'accepted'})
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/projects/:pid/files', async (req, res) => {
	try{
		let project = await Project.findById(req.params.pid)
		if (project){
			let files = await project.getFiles()
			res.status(200).json(files)
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/projects/:pid/files/:fid', async (req, res) => {
	try{
		let project = await Project.findById(req.params.pid)
		if (project){
			let files = await project.getFiles({where : {id : req.params.fid}})
			res.status(200).json(files.shift())
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.post('/projects/:pid/files', async (req, res) => {
	try{
		let project = await Project.findById(req.params.pid)
		if (project){
			let file = req.body
			file.project_id = project.id
			await File.create(file)
			res.status(201).json({message : 'created'})
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.put('/projects/:pid/files/:fid', async (req, res) => {
	try{
		let project = await Project.findById(req.params.pid)
		if (project){
			let files = await project.getFiles({where : {id : req.params.fid}})
			let file = files.shift()
			if (file){
				await file.update(req.body)
				res.status(202).json({message : 'accepted'})
			}
			else{
				res.status(404).json({message : 'not found'})
			}
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.delete('/projects/:pid/files/:fid', async (req, res) => {
	try{
		let project = await Project.findById(req.params.pid)
		if (project){
			let files = await project.getFiles({where : {id : req.params.fid}})
			let file = files.shift()
			if (file){
				await file.destroy(req.body)
				res.status(202).json({message : 'accepted'})
			}
			else{
				res.status(404).json({message : 'not found'})
			}
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.listen(3000)