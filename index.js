import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const PORT = 3000;
const BASE_URL = " https://v6.exchangerate-api.com/v6/82ed90b1610d9b921739e28e/pair/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/", async (req, res) => {
    const response = await axios.get(`${BASE_URL}${req.body.From}/${req.body.To}/${req.body.amount}`);
    const result = response.data;
    console.log(result);
    var params = {
        amount: req.body.amount,
        result: result
    }
    res.render("index.ejs", { data: params });
});

app.listen(PORT, () => {
    console.log(`Server listening to PORT ${PORT}...`);
});