import { NextResponse, NextRequest } from 'next/server'
import axios from 'axios' 

export async function POST(req: NextRequest) {
   try {
      const body = await req.json()
      await axios.post(process.env.API_ROUTE + "/admin/signup", body)
   } catch(err) {
      console.log(err)
      return NextResponse.json({ message: "Error", status: 500 })
   }
}