import { NextResponse } from "next/server";
import connectDB from "./config";
import Users from "./model";

connectDB();
export async function GET(req: Request, res: Response) {
  const allUsers = await Users.find({});
  console.log(allUsers);
  return NextResponse.json(allUsers);
}
