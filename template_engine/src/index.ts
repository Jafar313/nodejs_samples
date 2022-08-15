import 'dotenv/config';
import express from 'express';
import peopleController from './controllers/people.controller'

const app = express();
app.set('view engine','ejs');
app.set('views', __dirname+ "/views");
app.use(express.json());
app.use('/people', peopleController);

app.get("/index", (req, res) => {
    res.render("index");
})

let port = process.env.PORT;
app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
});
