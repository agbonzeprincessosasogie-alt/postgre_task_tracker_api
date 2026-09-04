require("dotenv").config();
const app = require("./app");
const AppDataSource = require("./config/data-source");

AppDataSource.initialize()
    .then(() => {
        console.log("Database Connected");

        app.listen(process.env.PORT, () => {
            console.log("Database Connected");
            `Server running on port ${process.env.PORT}`
        });

    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });