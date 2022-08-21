import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import express from "express"
import { insertPerson } from "./services/user-service";
import bodyParser from "body-parser";
AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(bodyParser.json());

    app.get("/", async (req, res) =>{
        let result = await insertPerson(req.body);
        return res.send(result);
    })

    app.post("/", (req, res) =>{

    })

    app.listen(3000, ()=>{
        console.log("listening on port 3000");
    })
}).catch(error => console.log(error))

