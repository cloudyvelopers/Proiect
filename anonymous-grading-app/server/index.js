const express = require("express");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const cors = require("cors");

//conexiune la baza de date
const sequelize = new Sequelize(
  "grading_project_db",
  "Cloudyvelopers",
  "password123",
  {
    dialect: "mysql",
    define: {
      timestamps: false
    }
  }
);

//verificare conexiune la baza de date
sequelize
  .authenticate()
  .then(() => console.log("connected to database"))
  .catch(error => console.log(error));

//definirea tebelelor
const Teacher = sequelize.define(
  "teacher",
  {
    email: Sequelize.STRING,
    password: Sequelize.TEXT
  },
  {
    underscored: true //modificarea conditiei pentru id
  }
);

const Student = sequelize.define(
  "student",
  {
    email: Sequelize.STRING,
    password: Sequelize.TEXT
  },
  {
    underscored: true //modificarea conditiei pentru id
  }
);

const Project = sequelize.define(
  "project",
  {
    title: Sequelize.STRING,
    file: Sequelize.TEXT
    // grade: Sequelize.FLOAT
  },
  {
    underscored: true //modificarea conditiei pentru id
  }
);

const File = sequelize.define("file", {
  name: Sequelize.STRING,
  type: Sequelize.TEXT
});

//legaturi intre tabele
Project.hasMany(File);
// Student.hasMany(Project)
Teacher.hasMany(Student);
Student.hasMany(Project);

sequelize
  .sync()
  .then(() => console.log("created"))
  .catch(error => console.log(error));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("../frontend/build"));

app.get("/create", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "created" });
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});
////////////////////////////
app.get("/projects", async (req, res) => {
  try {
    let projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

///////////////////////////
app.get("/students", async (req, res) => {
  try {
    let students = await Student.findAll();
    res.status(200).json(students);
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

///////////////////////////
app.get("/teachers", async (req, res) => {
  try {
    let teachers = await Teacher.findAll();
    res.status(200).json(teachers);
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});
/////////////////////////////////

app.post("/projects", async (req, res) => {
  try {
    if (req.query.bulk && req.query.bulk == "on") {
      await Project.bulkCreate(req.body);
      res.status(201).json({ message: "created" });
    } else {
      await Project.create(req.body);
      res.status(201).json({ message: "created" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});
////////////////////////////////////////////////
app.post("/students", async (req, res) => {
  try {
    if (req.query.bulk && req.query.bulk == "on") {
      await Student.bulkCreate(req.body);
      res.status(201).json({ message: "created" });
    } else {
      await Student.create(req.body);
      res.status(201).json({ message: "created" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

////////////////////////////////////////////////
app.post("/teachers", async (req, res) => {
  try {
    if (req.query.bulk && req.query.bulk == "on") {
      await Teacher.bulkCreate(req.body);
      res.status(201).json({ message: "created" });
    } else {
      await Teacher.create(req.body);
      res.status(201).json({ message: "created" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

/////////////////////////////////////////////////
app.get("/projects/:id", async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});
///////////////////////////////////////////
app.get("/students/:id", async (req, res) => {
  try {
    let student = await Project.findById(req.params.id);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});
///////////////////////////////////////////
app.get("/teachers/:id", async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.params.id);
    if (teacher) {
      res.status(200).json(teacher);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

/////////////////////////////////////////
app.put("/projects/:id", async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (project) {
      await project.update(req.body);
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});
/////////////////////////////
app.put("/students/:id", async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);
    if (student) {
      await student.update(req.body);
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

/////////////////////////////
app.put("/teachers/:id", async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.params.id);
    if (teacher) {
      await teacher.update(req.body);
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});
///////////////////////////////////

app.delete("/projects/:id", async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (project) {
      await project.destroy();
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

/////////////////////////////////////////
app.delete("/students/:id", async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);
    if (student) {
      await student.destroy();
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

/////////////////////////////////////////
app.delete("/teachers/:id", async (req, res) => {
  try {
    let teacher = await Project.findById(req.params.id);
    if (teacher) {
      await teacher.destroy();
      res.status(202).json({ message: "accepted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

///////////////////////////////////////

app.get("/projects/:pid/files", async (req, res) => {
  try {
    let project = await Project.findById(req.params.pid);
    if (project) {
      let files = await project.getFiles();
      res.status(200).json(files);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

///////////////////////////////
app.get("/students/:sid/projects", async (req, res) => {
  try {
    let student = await Student.findById(req.params.sid);
    if (student) {
      let projects = await student.getProjects();
      res.status(200).json(projects);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

///////////////////////////////
app.get("/teachers/:prid/students", async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.params.prid);
    if (teacher) {
      let students = await teacher.getStudents();
      res.status(200).json(students);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});
////////////////////////////////
app.get("/projects/:pid/files/:fid", async (req, res) => {
  try {
    let project = await Project.findById(req.params.pid);
    if (project) {
      let files = await project.getFiles({ where: { id: req.params.fid } });
      res.status(200).json(files.shift());
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

/////////////////////////////////
app.get("/students/:sid/projects/:pid", async (req, res) => {
  try {
    let student = await Student.findById(req.params.pid);
    if (student) {
      let projects = await student.getProjects({
        where: { id: req.params.pid }
      });
      res.status(200).json(files.shift());
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

/////////////////////////////////
app.get("/teachers/:prid/students/:sid", async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.params.prid);
    if (teacher) {
      let students = await teacher.getStudents({
        where: { id: req.params.sid }
      });
      res.status(200).json(files.shift());
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

/////////////////
app.post("/projects/:pid/files", async (req, res) => {
  try {
    let project = await Project.findById(req.params.pid);
    if (project) {
      let file = req.body;
      file.project_id = project.id;
      await File.create(file);
      res.status(201).json({ message: "created" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});
/////////////////////
app.post("/students/:sid/projects", async (req, res) => {
  try {
    let student = await Student.findById(req.params.sid);
    if (student) {
      let project = req.body;
      project.student_id = student.id;
      await Project.create(project);
      res.status(201).json({ message: "created" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});
/////////////////////
app.post("/teachers/:prid/students", async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.params.prid);
    if (teacher) {
      let student = req.body;
      student.teacher_id = teacher.id;
      await Student.create(student);
      res.status(201).json({ message: "created" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});
///////////////////////////////////

app.put("/projects/:pid/files/:fid", async (req, res) => {
  try {
    let project = await Project.findById(req.params.pid);
    if (project) {
      let files = await project.getFiles({ where: { id: req.params.fid } });
      let file = files.shift();
      if (file) {
        await file.update(req.body);
        res.status(202).json({ message: "accepted" });
      } else {
        res.status(404).json({ message: "not found" });
      }
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

///////////////////////////
app.put("/students/:sid/projects/:pid", async (req, res) => {
  try {
    let student = await Student.findById(req.params.sid);
    if (student) {
      let projects = await student.getProjects({
        where: { id: req.params.pid }
      });
      let project = projects.shift();
      if (project) {
        await project.update(req.body);
        res.status(202).json({ message: "accepted" });
      } else {
        res.status(404).json({ message: "not found" });
      }
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

///////////////////////////
app.put("/teachers/:prid/students/:sid", async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.params.prid);
    if (teacher) {
      let students = await teacher.getStudents({
        where: { id: req.params.sid }
      });
      let student = students.shift();
      if (student) {
        await student.update(req.body);
        res.status(202).json({ message: "accepted" });
      } else {
        res.status(404).json({ message: "not found" });
      }
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

///////////////////////////////////////////////

app.delete("/projects/:pid/files/:fid", async (req, res) => {
  try {
    let project = await Project.findById(req.params.pid);
    if (project) {
      let files = await project.getFiles({ where: { id: req.params.fid } });
      let file = files.shift();
      if (file) {
        await file.destroy(req.body);
        res.status(202).json({ message: "accepted" });
      } else {
        res.status(404).json({ message: "not found" });
      }
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});
/////////////////////////////////////////////
app.delete("/students/:sid/projects/:pid", async (req, res) => {
  try {
    let student = await Student.findById(req.params.sid);
    if (student) {
      let projects = await student.getProjects({
        where: { id: req.params.pid }
      });
      let project = projects.shift();
      if (project) {
        await project.destroy(req.body);
        res.status(202).json({ message: "accepted" });
      } else {
        res.status(404).json({ message: "not found" });
      }
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});
/////////////////////////////////////////////
app.delete("/teachers/:prid/students/:sid", async (req, res) => {
  try {
    let teacher = await Teacher.findById(req.params.prid);
    if (teacher) {
      let students = await teacher.getStudents({
        where: { id: req.params.sid }
      });
      let student = students.shift();
      if (student) {
        await student.destroy(req.body);
        res.status(202).json({ message: "accepted" });
      } else {
        res.status(404).json({ message: "not found" });
      }
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});


// join ca sa afli toate fisierele ale tuturor proiectelor ale tuturor studentilor

app.get("/:teacher_id/getfilesandstudents", async (req, res) => {
  try {

	  const students = await Student.findAll({
		  where: {
			  id: req.params.teacher_id
		  },
		  include: [{
			  model: Project,
			  required: false,
			  include: [{
				  model: File,
				  required: false
			  }]
		  }]
	  })
    res.status(200).json(students);
  } catch (e) {
    console.warn(e);
    res.status(500).json({ message: "server error" });
  }
});

app.get("/getteacher/:teacher_id", async (req, res) => {
	try {
		const teacher = await Teacher.findOne({
			where: { id: teacher_id}
		})

		res.status(200).json(teacher);
	} catch (e) {
		console.warn(e);
		res.status(500).json({ message: "server error" });
	}
})


app.listen(3000)
