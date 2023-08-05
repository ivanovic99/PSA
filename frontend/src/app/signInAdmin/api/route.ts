import { NextResponse, NextRequest } from 'next/server'
import { serialize } from "cookie";
import axios from 'axios' 
import { COOKIE_NAME } from '../../../../constants';

export async function POST(req: Request) {
   try {
      const body = await req.json()
      const APIRoute = process.env.API_ROUTE ? process.env.API_ROUTE : "http://localhost:8080/api"
      const { token, id } = (await axios.post(APIRoute + "/admin/login", body)).data

      const tokenMaxAge = /*parseInt(JWT_EXPIRES_IN) **/ 100;

      const seralized = serialize(COOKIE_NAME, token, {
         httpOnly: true,
         secure: process.env.NODE_ENV !== "development",
         sameSite: "strict",
         maxAge: tokenMaxAge,
         path: "/",
       });

      const response = new NextResponse(
         JSON.stringify({
         status: "success",
         token,
         }),
         {
         status: 200,
         headers: { "Set-Cookie": seralized },
         }
      );

    return response;
   } catch(err) {
      console.log(err)
      return NextResponse.json({ message: "Error", status: 500 })
   }
}