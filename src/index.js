const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

const shoppingList = [
    {
        id: 1,
        item: "apple",
    },
    {
        id: 2,
        item: "orange",
    },
    {
        id: 2,
        item: "cuccumber",
    },
];
var id = 1;
const port = 3000;

// view engine
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.set("views", path.join(__dirname, "views"));

// body parser
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Method override

app.use(methodOverride("_method"));
// routes

app.get("/", (req, res) => {
    return res.redirect("/item");
});

// Create
app.get("/create", (req, res) => {
    return res.render("add");
});

app.post("/create/post", (req, res) => {
    shoppingList.push(req.body);
    console.log(req.body);
    return res.redirect("/item");
});

// Read

app.get("/item", (req, res) => {
    return res.render("home", { shoppingList });
});

// Update
app.get("/patch/:id", (req, res) => {
    const shop = shoppingList.find((v) => v.id === Number(req.params.id));
    return res.render("update", { shop });
});

app.patch("/patch/edit", (req, res) => {
    const shop = shoppingList.find((elem) => elem.id === Number(req.body.id));
    shop.item = req.body.item;
    console.log(shop.item);
    return res.redirect("/item");
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
