import { NextRequest, NextResponse } from "next/server";
import axios from 'axios' 
import { API_ROUTE, COOKIE_NAME } from "@/../constants";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
   try {
      // -------------------
      // Move this code into a separate file (inside utils folder) and import it here (same in the other routes)
      const APIRoute = process.env.API_ROUTE ? process.env.API_ROUTE : API_ROUTE
      const cookieStore = cookies()
      const cookie = cookieStore.get(COOKIE_NAME)
      var secret_token = cookie ? cookie.value : ""
      // -------------------

      const products = (await axios.get(APIRoute + "/product",
      { params: { secret_token } }
      )).data
      return NextResponse.json({ message: "Success", status: 200, products})
   } catch(err) {
      console.log(err)
      return NextResponse.json({ message: "Error", status: 500, err })
   }
}