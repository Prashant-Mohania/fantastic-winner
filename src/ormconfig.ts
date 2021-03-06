import { join } from "path";
import { ConnectionOptions } from "typeorm";

import dotenv from "dotenv";
import { UserEntity } from "./db/entity/user_entity";

dotenv.config();

export const connections: ConnectionOptions = {
    type: "postgres",
    host: process.env.Host || "localhost",
    port: 5432,
    username: process.env.User || "postgres",
    password: process.env.DB_Password || "root",
    database: process.env.Database || "watersupply",
    synchronize: !process.env.DB_NO_SYNC,
    logging: !process.env.DB_NO_LOGS,
    entities: [UserEntity],
    dropSchema: false,
    migrationsRun: true,
    logger: "debug",
    migrations: [join(__dirname, "src/migration/**/*.ts")],
};