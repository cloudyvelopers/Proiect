var db = require('./backend/models/index');

db.sequelize.sync({force:true}).then(async () => {
    console.log('tables created')

    let student = await db.Students.create({
        name: 'Ciuverca Ciubuc Lebada',
        githubProfile: 'https://github.com/cloudyvelopers',
        githubUsername: 'cloudyvelopers'
    })

    let team = await db.Teams.create({
        name: 'Teams',
        projectRepo: 'https://github.com/cloudyvelopers/Proiect'
    })

    await db.TeamMembers.create({
        studentId: student.id,
        teamId: team.id
    })
}).catch(() => {
    console.log('could not create tables')
})