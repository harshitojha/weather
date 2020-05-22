const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();
console.log(__dirname);
//define paths for express config
const direct_name = path.join(__dirname, "../public");
console.log(direct_name);
//set handlebars engine
app.set("view engine", "hbs");
views_path = path.join(__dirname, "../public/templates/views");
partials_path = path.join(__dirname, "../public/templates/partials");

app.set("views", views_path);
hbs.registerPartials(partials_path);
//serve static pages
app.use(express.static(direct_name));
app.get("", (req, res) => {
  res.render("index", {
    name: "harshit ojha",
    title: "Weather",
  });
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send("enter the search query");
  }
  console.log(req.query.search);
  res.send({ products: [] });
});
// app.get("/weather", (req, res) => {
//   //rendering index.hbs file template files for dynamic rendering
//   res.render("index", {
//     name: "harshit ojha",
//     title: "Weather",
//   });
// });
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("<h1>please enter an address</h1>");
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send({ error });
        res.send({
          forecast: forecastData,
          latitude,
          longitude,
          location,
        });
      });
    }
  );
  // res.send({
  //   location: "new york",
  //   forecast: "it is snowing",
  //   address: req.query.address,
  // });
});
app.get("/about", (req, res) => {
  res.render("about", {
    name: "harshit ojha",
    title: "About ",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "harshit ojha",
    title: "Help ",
  });
});
app.get("/help/*", (req, res) => {
  res.send("help article not found");
});
app.get("*", (req, res) => {
  res.send("my 404 page");
});

app.listen(3000, () => {
  console.log("listening at port 3000,server is on");
});
