const express = require("express");
const app = express();
const port = 3000;

// Dynamic template instellingen
express()
  .use(express.static("static"))
  .set("view engine", "ejs")
  .set("views", "view");


// Gegevens van de katten
const katten = [
  {
    id: "kat1",
    naam: "Tommy",
    leeftijd: 5,
  },
  {
    id: "kat2",
    naam: "Moomoo",
    leeftijd: 2,
  },
  {
    id: "kat3",
    naam: "Medo",
    leeftijd: 5,
  },
  {
    id: "kat4",
    naam: "Muffin",
    leeftijd: 7,
  },
];

/*De pagina waar je andere katten liked/disliked
(voor nu heb ik de pagina matching.ejs omgeroepen tot home-pagina) */
app.get("/", (req, res) => {
	res.render("matching.ejs", { katten });
  });

// Als ik naar localhost:3000 ga toon dan server.js
app.listen(port, () => {
  console.log(`Server van matching app luisterd naar ${port}`);
});
