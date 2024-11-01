import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { generateToken } from "@/lib/auth";
import connectDB from "@/config/db";
import Admin from "@/models/admin";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody; // Changed from username to email
    const user = await Admin.findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }
    
    const isValid = await bcryptjs.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid Credentials", success: false },
        { status: 401 }
      );
    }
    
    const token = await generateToken(
      { email },
      process.env.ACCESS_SECRET_KEY!
    );
    
    const res = NextResponse.json({
      message: "Logged in Successfully",
      success: true,
    });
    
    res.cookies.set("adminToken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    });
    
    return res;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      { status: 500 }
    );
  }
}
