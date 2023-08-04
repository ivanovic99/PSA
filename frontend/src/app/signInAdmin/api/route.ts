import { NextResponse, NextRequest } from 'next/server'
import axios from 'axios' 

export async function POST(req: Request) {
   try {
      const body = await req.json()
      const APIRoute = process.env.API_ROUTE ? process.env.API_ROUTE : "http://localhost:8080/api"
      const { token, id } = (await axios.post(APIRoute + "/admin/login", body)).data

      const tokenMaxAge = /*parseInt(JWT_EXPIRES_IN) **/ 100;
      const cookieOptions = {
         name: "token",
         value: token,
         httpOnly: true,
         path: "/",
         secure: process.env.NODE_ENV !== "development",
         maxAge: tokenMaxAge,
      };

      const response = new NextResponse(
         JSON.stringify({
         status: "success",
         token,
         }),
         {
         status: 200,
         headers: { "Content-Type": "application/json" },
         }
      );

      await Promise.all([
      response.cookies.set(cookieOptions),
      response.cookies.set({
         name: "logged-in",
         value: "true",
         maxAge: tokenMaxAge,
         }),
      ]);

    return response;
   } catch(err) {
      console.log(err)
      return NextResponse.json({ message: "Error", status: 500 })
   }
}