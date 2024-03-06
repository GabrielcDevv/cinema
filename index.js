import express from "express";
import bodyParser  from "body-parser";
import pg from "pg";
import { log } from "console";


const db = new pg.Client({
 user: "postgres",
 host: "localhost",
 database: "films",
 password: "patoduro",
 port: 5432,
});

const app = express();
const port = 3000;

db.connect();

app.use(bodyParser.urlencoded({extended:true }));
app.use(express.static("public"));



app.get("/", async (req, res)=>{
    try{
    const result = await db.query("SELECT * FROM filmes");
    const filmes=result.rows;

    res.render("filmes.ejs",{filmes:filmes, tamanho:filmes.length});
} catch (err) {
log(err);
}
});

app.post("/submit", async (req, res)=>{
    const img = req.body.img;
    const title = req.body.title;
    const descr = req.body.description;
    const note = req.body.nota;
    try{
    await db.query("INSERT INTO filmes img, title, descr, note VALUES ($1, $2, $3, $4)"[img, title, descr, note]);
    res.render("index.ejs");
    } catch(err) {
        console.log(err)
    }
});
app.get("/submit", (req, res)=>{
 res.render("index.ejs")
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

