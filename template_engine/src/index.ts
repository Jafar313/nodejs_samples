import 'dotenv/config';
import express from 'express';
import peopleController from './controllers/people.controller'

const app = express();
app.use(express.json());
app.use('/people', peopleController);

app.get("/people", (req, res) => {
    console.log("omad inja");
})

let port = process.env.PORT;
app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
});
