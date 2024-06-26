const express = require("express");
const app = express();
const port = 3000; // luister naar port 3000
const fetch = require("node-fetch");

app
	.use(express.static("static"))
	.set("view engine", "ejs")
	.set("views", "./views");

require("dotenv").config();

// Middleware voor het parsen van JSON-body's
app.use(express.json());

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

let db;
let kattenData;
let userData;

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
	} catch (error) {
		console.error(error);
	}
});

app.get("/match", async (req, res) => {
	try {
		const katten = await kattenData.find({}).toArray();

		console.log(katten);
		res.render("match.ejs", { katten }); // Match pagina met als route /match
	} catch (error) {
		console.error(error);
	}
});

// app.post("/liked", async (req, res) => {
// 	try {
// 		const eersteKat = await kattenData.findOne({ status: "new" }); // Zoekt de eerst volgende kat met status "new"

// 		await kattenData.updateOne(
// 			{ _id: eersteKat._id },
// 			{ $set: { status: "liked" } }
// 		);

// 		res.redirect("/")

// 		console.log(kattenData);
// 	} catch (error) {
// 		console.error(error);
// 	}
// });

// app.post("/liked", async (req, res) => {
// 	try {
// 		const user = await userData.find({}).toArray();
// 		const eersteKat = await kattenData.findOne({ status: "new" }); // Zoekt de eerst volgende kat met status "new"

// 		if (user.likedBy.includes(eersteKat._id))
// 		 {
// 			await kattenData.updateOne(
// 				{ _id: eersteKat._id },
// 				{ $set: { status: "liked" } }
// 			);
// 				res.redirect("/match");
// 		} else {
// 			await kattenData.updateOne(
// 				{ _id: eersteKat._id },
// 				{ $set: { status: "liked" } }
// 			);

// 			res.redirect("/");
// 		}
// 	} catch (error) {
// 		console.error(error);
// 	}
// });

app.post("/liked", async (req, res) => {
	try {
		const user = await userData.findOne({});
		// console.log(user);
		const eersteKat = await kattenData.findOne({ status: "new" });

		if (user.likedBy.includes(eersteKat._id)) {
			await kattenData.updateOne(
				{ _id: eersteKat._id },
				{ $set: { status: "liked" } }
			);
			res.redirect("/match");
		} else {
			await kattenData.updateOne(
				{ _id: eersteKat._id },
				{ $set: { status: "liked" } }
			);
			res.redirect("/");
		}
	} catch (error) {
		console.error(error);
	}
});


app.post("/disliked", async (req, res) => {
	const eersteKat = await kattenData.findOne({ status: "new" });

	await kattenData.updateOne(
		{ _id: eersteKat._id },
		{ $set: { status: "disliked" } }
	);
	res.redirect("/");
});

// Open weathermap api key
const apiKey = process.env.OPENWEATHERMAP_API_KEY;

// Route voor het ophalen van het weer
app.post("/weer", async (req, res) => {
    try {
        const { latitude, longitude, city } = req.body;
        let apiUrl;

        // Bepaalt de url van api
        if (latitude && longitude) {
            apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=nl&appid=${apiKey}`;
        } else if (city) {
            apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=nl&appid=${apiKey}`;
        } else {
            return res.status(400).json({ error: "Geen locatiegegevens verstrekt" });
        }

		// Verzoek sturen om weerdata op te halen
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Er is een fout opgetreden bij het ophalen van het weer" });
    }
});

// Route voor het weergeven van de weerpagina
app.get("/weer", (req, res) => {
    try {
		// Render weer pagina
        res.render("weer.ejs");
    } catch (error) {
        console.error(error);
        res.status(500).send("Er is een fout opgetreden bij het weergeven van de weerpagina");
    }
});

// 404 Error pagina
app.use((req, res) => {
	res.status(404);
	res.render("error.ejs");
});

app.listen(port, () => {
	console.log(`Server van matching app luistert naar ${port}`);
});