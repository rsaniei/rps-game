import { Users } from "../models/users";
import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  const {name} = req.body;

  const user = await Users.findOne({userName:name});

  if(!user){
    const newUser = await Users.create({
      userName: name,
      score:0
    });
    res.json(newUser)
  }
  else res.json(user)


}
export async function getUsersList(req: Request, res: Response) {
  const users = await Users.find({});
  res.json(users)

}

export async function updateScore(req: Request, res: Response) {
  const {currentUser, score} = req.body;
  await Users.updateOne({userName: currentUser}, {score: score});
  res.json({message: 'ok'})


}
