import express, { Request, Response } from "express";
import schemas from "../models/schemas";

const router = express.Router();

router.delete("/users/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const deletedUser = await schemas.Users.findOneAndDelete({ _id: userId });

    if (deletedUser) {
      res.send(JSON.stringify(deletedUser));
    } else {
      res.send({ error: "User not found" });
    }
  } catch (error) {
    res.send({ error: "An error occurred while deleting the user." });
  }
  res.end();
});

router.put("/users/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { name, email, city, address } = req.body;

  const updatedUserData = { name, email, address: { city, ...address } };

  try {
    const updatedUser = await schemas.Users.findByIdAndUpdate(
      userId,
      updatedUserData,
      { new: true }
    );

    if (updatedUser) {
      res.send(JSON.stringify(updatedUser));
    } else {
      res.send("User not found or failed to update.");
    }
  } catch (error) {
    res.send({ error: "An error occurred while updating the user." });
  }

  res.end();
});

router.post("/users", async (req: Request, res: Response) => {
  const { name, email, city, address } = req.body;

  const userData = { name: name, email: email, city: city, address: address };

  const newUser = new schemas.Users(userData);
  const savedUser = await newUser.save();

  if (savedUser) {
    res.send(JSON.stringify(userData));
  } else {
    res.send({ error: "An error occurred while adding the user." });
  }

  res.end();
});

router.get("/users/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  const userData = await schemas.Users.findOne({ _id: userId }).exec();

  if (userData) {
    res.send(JSON.stringify(userData));
  } else {
    res.send({ error: `User ${userId} not found` });
  }

  res.end();
});

router.get("/users", async (req: Request, res: Response) => {
  const users = schemas.Users;

  const userList = await users.find({}).exec();
  if (userList) {
    res.send(JSON.stringify(userList));
  } else {
    res.send({ error: "An error occurred while fetching users" });
  }

  res.end();
});

export default router;
