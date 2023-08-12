import { NextResponse } from 'next/server'
import { serialize } from "cookie";
import axios from 'axios' 
import { API_ROUTE, COOKIE_NAME, MAX_AGE } from '../../../../constants';

export async function POST(req: Request) {
   try {
      const body = await req.json()
      const APIRoute = process.env.API_ROUTE ? process.env.API_ROUTE : API_ROUTE
      const { token, user } = (await axios.post(APIRoute + "/admin/login", body)).data
      const seralized = serialize(COOKIE_NAME, token, {
         httpOnly: true,
         secure: process.env.NODE_ENV !== "development",
         sameSite: "strict",
         maxAge: MAX_AGE,
         path: "/",
         
       });

      const response = new NextResponse(
         JSON.stringify({
         status: "success",
         user,
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