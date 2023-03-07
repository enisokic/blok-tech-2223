// ES6 ! => ipv function
// Variabele
const express = require("express");
const app = express();
const port = 3000;

// Dynamic Temaplte
express()
	.use(express.static("static"))
	.set("view engine", "ejs")
	.set("views", "view");

// Fake database (d.m.v. object)
const katten = [
	{
		id: "kat1",
		naam: "Tommy",
		leeftijd: 3,
	},
	{
		id: "kat2",
		naam: "Max",
		leeftijd: 5,
	},
	{
		id: "kat3",
		naam: "Medo",
		leeftijd: 4,
	},
	{
		id: "kat4",
		naam: "Muffin",
		leeftijd: 8,
	},
	{
		id: "kat5",
		naam: "MooMoo",
		leeftijd: 5,
	},
];

// Home pagina
app.get("/", (req, res) => {
	res.send("Hello World!");
});

// Pagina waar je andere katten liked en/of disliked
app.get("/match", (req, res) => {
	res.render("matching.ejs", { katten });
});

// app.post("/match", (req, res) => {
// 	res.render("matching.ejs", { katten });
// })

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

// Deze code was wat langer dan nieuwe code //
// 	.get('/match', kat)

// function kat(req, res) {
// 	res.render("matching.ejs", { katten });
// 	console.log("functie kat uitgevoerd");
// }