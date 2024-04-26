import mongoose from "mongoose";
import chalk from "chalk";

function connectDB() {
    return mongoose
        .connect(process.env.MONGO_URI)
        .then((res) => {
            if (res) {
                console.log(
                    chalk.bgGreenBright.underline.bold(
                        "connected to " + res.connection.host
                    )
                );
                return new Promise(() => 1);
            }
        })
        .catch((e) => console.log(chalk.bgRedBright.underline.bold(e.message)));
}

export default connectDB;
