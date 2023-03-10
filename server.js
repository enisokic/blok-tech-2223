const express = require("express");
const app = express();
const port = 3000; // luister naar port 3000

app
	.use(express.static("static"))
	.set("view enige", "ejs")
	.set("views", "./views");

const katten = require("./data/katten.json"); // Json bestand met data geimporteerd die nu de naam katten heeft zodat ik deze data kan gebruiken in mijn code
const user = require("./data/user");

app.get("/", (req, res) => { // Home pagina routing
	const eersteKat = katten.find((kat) => kat.status === "new"); // Zoekt de eerst volgende kat met status "new"

	res.render("verkennen.ejs", { eersteKat }); // Toont de pagina verkennen met de juiste data
});

app.get("/match", (req, res) => {
	res.render("match.ejs", { katten }); // Match pagina met als route /match
});

app.post("/liked", (req, res) => {
	const eersteKat = katten.find((kat) => kat.status === "new"); // katten.find etc. in elke app.post/.get waar nodig is zodat eersteKat elke keer wordt uitgevoerd.

	if (user.likedBy.includes(eersteKat.id)) {
		eersteKat.status = "liked"; // De kat status veranderd naar "liked"
		res.redirect("/match"); // Alleen als de kat de user ook heeft geliked wordt de user doorgestuurd naar /match (match pagina)
	} else {
		eersteKat.status = "liked";
		res.redirect("/"); // De user wordt doorgestuurd naar home (refresh want de user is al op home)
	}
});

app.post("/disliked", (req, res) => {
	const eersteKat = katten.find((kat) => kat.status === "new");

	eersteKat.status = "disliked";
	res.redirect("/");
});

app.listen(port, () => {
	console.log(`Server van matching app luistert naar ${port}`);
});