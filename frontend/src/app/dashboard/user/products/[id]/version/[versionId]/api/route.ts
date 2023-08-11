import { NextRequest, NextResponse } from "next/server";
import axios from 'axios' 
import { API_ROUTE, COOKIE_NAME } from "@/../constants";
import { cookies } from "next/headers";

export async function GET(req: NextRequest, context: { params: any }) {
   try {
      const APIRoute = process.env.API_ROUTE ? process.env.API_ROUTE : API_ROUTE
      const cookieStore = cookies()
      const cookie = cookieStore.get(COOKIE_NAME)
      var secret_token = cookie ? cookie.value : ""
      const { id, versionId } = context.params
      const version = (await axios.get(APIRoute + "/product/" + id + "/versions/" + versionId,
      { params: { secret_token } }
      )).data
      return NextResponse.json({ message: "Success", status: 200, version})
   } catch(err) {
      console.log(err)
      return NextResponse.json({ message: "Error", status: 500 })
   }
}

export async function PUT(req: NextRequest, context: { params: any }) {
   try {
      const version = await req.json();
      const productId = context.params.id
      const APIRoute = process.env.API_ROUTE ? process.env.API_ROUTE : API_ROUTE
      const cookieStore = cookies()
      const cookie = cookieStore.get(COOKIE_NAME)
      var secret_token = cookie ? cookie.value : ""
      const updatedVersion = (await axios.put(APIRoute + "/product/" + productId + "/versions/" + version._id, version,
         { params: { secret_token } }
      )).data
      return NextResponse.json({ message: "Success", status: 200, updatedVersion})
   } catch(err) {
      console.log(err)
      return NextResponse.json({ message: "Error", status: 500 })
   }
}