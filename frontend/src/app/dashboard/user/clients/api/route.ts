import { NextRequest, NextResponse } from "next/server";
import axios from 'axios' 
import { API_ROUTE, COOKIE_NAME } from "@/../constants";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
   try {
      const APIRoute = process.env.API_ROUTE ? process.env.API_ROUTE : API_ROUTE
      const cookieStore = cookies()
      const cookie = cookieStore.get(COOKIE_NAME)
      var secret_token = cookie ? cookie.value : ""
      const clients = (await axios.get(APIRoute + "/client",
      { params: { secret_token } }
      )).data
      return NextResponse.json({ message: "Success", status: 200, clients})
   } catch(err) {
      console.log(err)
      return NextResponse.json({ message: "Error", status: 500, err })
   }
}