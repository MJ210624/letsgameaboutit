require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const mongoose = require("mongoose");
const User = require("./models/User");

async function test() {
    await mongoose.connect(process.env.MONGO_URI);

    const user = await User.create({
        username: "Mauricio",
        email: "mauricio@email.com",
        password: "123456"
    });

    console.log(user);

    process.exit();
}

test();