import { NextRequest, NextResponse } from "next/server";
import axios from 'axios' 
import { API_ROUTE, COOKIE_NAME } from "@/../constants";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest) {
   try {
      const client = await req.json();
      const APIRoute = process.env.API_ROUTE ? process.env.API_ROUTE : API_ROUTE
      const cookieStore = cookies()
      const cookie = cookieStore.get(COOKIE_NAME)
      var secret_token = cookie ? cookie.value : ""
      const updatedClient = (await axios.put(APIRoute + "/client/" + client._id, client,
         { params: { secret_token } }
      )).data
      return NextResponse.json({ message: "Success", status: 200, updatedClient})
   } catch(err) {
      console.log(err)
      return NextResponse.json({ message: "Error", status: 500 })
   }
}

export async function GET(req: NextRequest, context: { params: any }) {
   try {
      const APIRoute = process.env.API_ROUTE ? process.env.API_ROUTE : API_ROUTE
      const cookieStore = cookies()
      const cookie = cookieStore.get(COOKIE_NAME)
      var secret_token = cookie ? cookie.value : ""
      const paramId = context.params.id
      const client = (await axios.get(APIRoute + "/client/" + paramId,
      { params: { secret_token } }
      )).data
      return NextResponse.json({ message: "Success", status: 200, client})
   } catch(err) {
      console.log(err)
      return NextResponse.json({ message: "Error", status: 500 })
   }
}