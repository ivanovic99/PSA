import { NextResponse  } from 'next/server'
import { serialize } from 'cookie'
import { COOKIE_NAME } from '../../../../../constants'

export const dynamic = 'force-dynamic';

export async function GET() {
   
   const seralized = serialize(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
      
    });

   const response = new NextResponse(
      JSON.stringify({
      status: "success",
      }),
      {
      status: 200,
      headers: { "Set-Cookie": seralized },
      }
   );

 return response;
}