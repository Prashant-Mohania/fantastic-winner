import express from "express";
import { router } from "./routes/routes";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.port || 3000;

app.set("port", port);

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`API is working at ${port} port`)
})