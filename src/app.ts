import express from "express";
import { ConnectionOptions, createConnection } from "typeorm";
import { router } from "./routes/routes";
const app = express();
import { connections } from "./ormconfig";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.port || 3000;

app.set("port", port);

createConnection(connections as ConnectionOptions)
  .then((connections) => {
    if (connections.isConnected) {
      console.log("Connected");
    }
    app.use("/", router);

    app.listen(app.get("port"), () => {
      console.log(`API is working at ${port} port`);
    });
  })
  .catch((err: Error) => {
    console.log(err.message);
  });
