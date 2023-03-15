const express = require("express");
const app = express();
const port = 3000; // luister naar port 3000

app
	.use(express.static("static"))
	.set("view enige", "ejs")
	.set("views", "./views");

require("dotenv").config();

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.MONGODB_URI;
console.log(uri);

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

// const client = new MongoClient(uri);

client.connect((err) => {
	console.log("it connects");
	if (err) {
		throw err;
	}
});


let db
let kattenData
let userData

async function run() {
	try {
	  await client.connect();
	  console.log("hi");
	  // database and collection code goes here    
	  db = client.db("catmatch-data");
	  kattenData = db.collection("katten");
	  userData = db.collection("user");


	} catch (error) {
	  console.log(error);
	}
  }
  run();


// const katten = require("./data/katten.json"); // Json bestand met data geimporteerd die nu de naam katten heeft zodat ik deze data kan gebruiken in mijn code
// const user = require("./data/user");

 app.get("/", async (req, res) => {
	// Home pagina routing
	try {
		const eersteKat = await kattenData.findOne({ status: "new" }); // Zoekt de eerst volgende kat met status "new"
		
		res.render("verkennen.ejs", { eersteKat }); // Toont de pagina verkennen met de juist data

		console.log(katten);
	} catch (error) {
		console.error(error);
	}
});

app.get("/match", async (req, res) => {
	try {
		res.render("match.ejs", { katten }); // Match pagina met als route /match
	} catch (error) {
		console.error(error);
	}
});

app.post("/liked", async (req, res) => {
	try {
		const user = await userData.find({}).toArray();
		const eersteKat = await kattenData.findOne({status: "new"}); // Zoekt de eerst volgende kat met status "new"
	
		console.log(user);
		if(user.likedBy.includes(eersteKat._id)) {
			kattenData.updateOne({_id: eersteKat_id}, {$set: {status: "liked"}})
			res.redirect('/matched')
		  } else {
			kattenData.updateOne({_id: eersteKat_id}, {$set: {status: "liked"}})
			res.redirect("/"); // De user wordt doorgestuurd naar home (refresh want de user is al op home)
		}
	} catch (error) {
		console.error(error);
	}	
});

app.post("/disliked", (req, res) => {
	const eersteKat = katten.find((kat) => kat.status === "new");

	eersteKat.status = "disliked";
	res.redirect("/");
});

// 404 Error pagina
app.use((req, res) => {
	res.status(404);
	res.render("error.ejs");
});

app.listen(port, () => {
	console.log(`Server van matching app luistert naar ${port}`);
});
