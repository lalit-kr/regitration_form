const express = require("express");
require("./db/connect");
const path = require("path");
const hbs = require("hbs");
const Register = require("./models/registers");
const { urlencoded } = require("express");
const bcrypt=require('bcryptjs');

const app = express();

const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialPath);

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", async (req, res) => {
  try {
    let password=req.body.password;
    password=await bcrypt.hash(password,10);
    const registerEmp = new Register({
      name: req.body.name,
      email: req.body.email,
      password: password,
    });
    let data = await registerEmp.save();
    res.status(201).render("index");
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email,password);
    const userEmail = await Register.findOne({ email: email });
    const checkPassword= await bcrypt.compare(password,userEmail.password)
    if (checkPassword) {
      res.status(201).render("index");
    } else {
      res.send("Wrong Credentials!!!");
    }
  } catch (err) {
    res.status(400).send("User Not Found!!! Please Register First");
    
  }
});

app.listen(4000);
