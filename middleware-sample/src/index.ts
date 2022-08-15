import dotenv from 'dotenv';
import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
dotenv.config();

const app = express();
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
const port = process.env.PORT;

app.get("/", (req, res) =>{
    return res.send("Hello World");
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})