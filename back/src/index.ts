import { AppDataSource } from "./config/data-source";
import { PORT } from "./config/envs";

import server from "./server";
import "reflect-metadata"

AppDataSource.initialize()
    .then(() => {
        console.log("Database connection successful");
        server.listen(PORT, () => {
            console.log(`Server runing on port ${PORT}`);
        })
    })
    .catch(error => console.log(error));