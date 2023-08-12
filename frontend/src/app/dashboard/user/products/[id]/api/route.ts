import { NextRequest, NextResponse } from "next/server";
import axios from 'axios' 
import { API_ROUTE, COOKIE_NAME } from "@/../constants";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest) {
   try {
      const product = await req.json();
      const APIRoute = process.env.API_ROUTE ? process.env.API_ROUTE : API_ROUTE
      const cookieStore = cookies()
      const cookie = cookieStore.get(COOKIE_NAME)
      var secret_token = cookie ? cookie.value : ""
      const updatedProduct = (await axios.put(APIRoute + "/product/" + product._id, product,
         { params: { secret_token } }
      )).data
      return NextResponse.json({ message: "Success", status: 200, updatedProduct})
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
      const product = (await axios.get(APIRoute + "/product/" + paramId,
      { params: { secret_token } }
      )).data
      return NextResponse.json({ message: "Success", status: 200, product})
   } catch(err) {
      console.log(err)
      return NextResponse.json({ message: "Error", status: 500 })
   }
}