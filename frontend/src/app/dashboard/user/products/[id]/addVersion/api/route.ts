import { NextRequest, NextResponse } from "next/server";
import axios from 'axios' 
import { API_ROUTE, COOKIE_NAME } from "@/../constants";
import { cookies } from "next/headers";
import { useParams } from 'next/navigation'

export async function POST(req: NextRequest) {
   try {
      const {version, productId} = await req.json();
      const APIRoute = process.env.API_ROUTE ? process.env.API_ROUTE : API_ROUTE
      const cookieStore = cookies()
      const cookie = cookieStore.get(COOKIE_NAME)
      var secret_token = cookie ? cookie.value : ""
      const newVersion = (await axios.post(APIRoute + "/product/" + productId + "/versions", version,
         { params: { secret_token } }
      )).data
      return NextResponse.json({ message: "Success", status: 200})
   } catch(err) {
      console.log(err)
      return NextResponse.json({ message: "Error", status: 500 })
   }
}

