import dotenv from "dotenv";
import users from "./data/users";
import products from "./data/products";
import { User, Product, Order } from "./models/";
import { UserDocument, Review } from "./types/";
import connectDB from "./config/db";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser: UserDocument = createdUsers[0]._id;

    const sampleProducts = products.map((p) => {
      return { ...p, user: adminUser._id };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!");

    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

process.argv[2] === "-d" ? destroyData() : importData();