const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/convert-mp3", async (req, res) => {
  const VedioId = req.body.VedioID;

  if (!VedioId) {
    return res.render("index", {
      success: false,
      message: "Please enter a video ID",
    });
  } else {
    try {
      const fetchAPI = await fetch(`https://youtube-mp36.p.rapidapi.com/dl?id=${VedioId}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": process.env.API_KEY,
          "x-rapidapi-host": process.env.API_HOST,
        },
      });

      const response = await fetchAPI.json();
      console.log(response.thumbnail);

      if (response.status === "ok") {
        res.render("index", {
          success: true,
          song_title: response.title,
          song_link: response.link,
          thumbnail_url: response.thumbnail,
          message: "Conversion successful",
        });
      } else {
        res.render("index", {
          success: false,
          message: "Conversion failed",
        });
      }
    } catch (error) {
      res.render("index", {
        success: false,
        message: "An error occurred. Please try again.",
      });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
