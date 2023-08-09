import { NextRequest, NextResponse } from "next/server";
import axios from 'axios' 
import { API_ROUTE } from "../../../../../../../constants";

export async function PUT(req: NextRequest) {
   try {
      const updatedData = await req.json();
      const APIRoute = process.env.API_ROUTE ? process.env.API_ROUTE : API_ROUTE
      const updatedAdmin = await axios.put(APIRoute + "/admin/" + updatedData.id, updatedData)
      return NextResponse.json({ message: "Success", status: 200, updatedAdmin: updatedAdmin.data })
   } catch(err) {
      console.log(err)
      return NextResponse.json({ message: "Error", status: 500 })
   }
}