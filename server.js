// const express = require("express");
// const app = express();
// const port = 3000;

// // Dynamic template instellingen
// express()
// 	.use(express.static("static"))
// 	.set("view engine", "ejs")
// 	.set("views", "view");

// let katNummer = 0;
// // Gegevens van de katten
// const katten = [
// 	{
// 		id: "kat1",
// 		naam: "Tommy",
// 		leeftijd: 5,
// 		status: "new",
// 	},
// 	{
// 		id: "kat2",
// 		naam: "Moomoo",
// 		leeftijd: 2,
// 		status: "liked",
// 	},
// 	{
// 		id: "kat3",
// 		naam: "Medo - gelukt",
// 		leeftijd: 5,
// 		status: "new",
// 	},
// 	{
// 		id: "kat4",
// 		naam: "Muffin",
// 		leeftijd: 7,
// 		status: "new",
// 	},
// ];

// /*De pagina waar je andere katten liked/disliked
// (voor nu heb ik de pagina matching.ejs omgeroepen tot home-pagina) */
// app.get("/", (req, res) => {
// 	res.render("matching.ejs", { katten, katNummer });
// });

// // app.post("/liked", (req, res) => {
// //   if(katten.status === "new") {
// //     res.render("matching.ejs", { katten, katNummer });
// //   } else {
// //   res.render("matching.ejs", { katten, katNummer });
// //   katNummer += 1; //<<< volgende kat ongeacht status
// //   } FOR EACH LOOP MOET DIT WORDEN!
// // res.send ('bedankt voor het invullen!');
// // res.render("matching.ejs", { katten, katNummer });
// // });

// // app.post("/liked", (req, res) => {
// // 	katNummer += 1; //<<< volgende kat ongeacht status
// // 	res.render("matching.ejs", { katten, katNummer });
// // });

// // app.post("/liked", (req, res) => {
// // 	// Voor elke kat in de array katten
// // 	katten.forEach((kat, index) => {
// // 		if (kat.status === "liked") {
// // 		katNummer += 1;
// // 	  } else {
// // 		res.render("matching.ejs", { katten: kat, katNummer });
// // 	  }
// // 	});
// //   });
// const likedKat = katten.find((kat) => kat.status === "liked");
// const newKat = katten.find((kat) => kat.status === "new");

// app.post("/liked", (req, res) => {
// 	katten.forEach((kat) => {
// 		if (newKat) {
// 			kat.status = "liked";
// 		}
// 		// Zoek de eerste kat met status "liked"
// 		if (likedKat) {
// 			katNummer += 1;
// 			res.redirect("/"); // Stuur terug naar de hoofdpagina om de volgende kat te tonen
// 		} else {
// 			// Als er geen katten meer zijn met status "liked", toon dan "matching.ejs"
// 			res.render("matching.ejs", { kat: newKat, katNummer });
// 		}
// 	});
// });

// // Als ik naar localhost:3000 ga toon dan server.js
// app.listen(port, () => {
// 	console.log(`Server van matching app luisterd naar ${port}`);
// });

const express = require("express");
const app = express();
const port = 3000;

app
	.use(express.static("static"))
	.set("view engine", "ejs")
	.set("views", "view");


// const user = {
// 	name: 'enis',
// 	age: 22,
// 	likedBy: [0, 4, 5]
// }

// const katten = [
// 	{
// 		id: 0,
// 		naam: "Tommy",
// 		leeftijd: 5,
// 		status: "new",
// 	},
// 	{
// 		id: 1,
// 		naam: "Moomoo",
// 		leeftijd: 2,
// 		status: "liked",
// 	},
// 	{
// 		id: 2,
// 		naam: "Medo - gelukt",
// 		leeftijd: 5,
// 		status: "new",
// 	},
// 	{
// 		id: 3,
// 		naam: "Muffin",
// 		leeftijd: 7,
// 		status: "new",
// 	},
// 	{
// 		id: 4,
// 		naam: "Muffin is geskipt",
// 		leeftijd: 7,
// 		status: "new",
// 	}
// ];

// import katten from 'data/katten.json';
// import user from 'data/user.json';

const katten = require('./data/katten.json');
const user = require('./data/user.json');

// Route voor de hoofdpagina
// app.get("/", (req, res) => {
// 	const eersteKat = katten.find((kat) => kat.status === 'new');
// 	res.render("matching.ejs", { eersteKat });
// 	console.log("get: ", eersteKat)
// });

// app.get("/nocats", (req, res) => {
// 	res.render("nocats.ejs", { katten });
// });

app.get("/", (req, res) => {
	const eersteKat = katten.find((kat) => kat.status === 'new');
		res.render("matching.ejs", {eersteKat});
});

// Zo werkt een static pagina (even voor mezelf)
app.get('/match', (req, res) => {
	res.sendFile(__dirname + '/html/pagina-test.html');
  });

// app.post("/liked", (req, res) => {
//  	katNummer += 1; //<<< volgende kat ongeacht status
// 	res.redirect("/");
// });
// app.post("/liked", (req, res) => {
// 	katten.forEach(kat => {
// 		if (kat.status === "new") {
// 			kat.status = "liked";
// 		}
// 	
// 	katNummer += 1; // ga naar de volgende kat
// 	res.redirect("/");
// });

// app.post("/liked", (req, res) => {
// let newKatten = katten.filter((kat) => kat.status === "new");
// newKatten[katNummer].status = "liked"
// console.log(katNummer);
// console.log(katten);
//  res.redirect("/");
// });

app.post("/liked", (req, res) => {
	const eersteKat = katten.find((kat) => kat.status === 'new');

	if (user.likedBy.includes(eersteKat.id)) {
		// Er is een match!
		console.log('Match gevonden!');
		eersteKat.status = 'liked'; 
		res.redirect('/match');
		console.log(katten);
	  } else {
	eersteKat.status = 'liked'; 
	res.redirect('/');
	console.log(katten);
	  }
  })


  app.post("/disliked", (req, res) => {
	const eersteKat = katten.find((kat) => kat.status === 'new');
	eersteKat.status = 'disliked'; 
	 res.redirect('/');
	console.log(katten);
});

app.listen(port, () => {
	console.log(`Server van matching app luistert naar ${port}`);
});
