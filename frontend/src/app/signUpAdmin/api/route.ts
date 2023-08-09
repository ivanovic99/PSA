import { NextResponse, NextRequest } from 'next/server'
import axios from 'axios' 
import { API_ROUTE } from '../../../../constants'

export async function POST(req: Request) {
   try {
      const body = await req.json()
      const APIRoute = process.env.API_ROUTE ? process.env.API_ROUTE : API_ROUTE
      await axios.post(APIRoute + "/admin/signup", body)
      return NextResponse.json({ message: "Success", status: 200 })
   } catch(err) {
      console.log(err)
      return NextResponse.json({ message: "Error", status: 500 })
   }
}