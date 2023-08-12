import { cookies } from "next/headers";
import { COOKIE_NAME } from "../../../../../constants";
import { NextResponse } from "next/server";

export async function GET() {
   try {
      const cookieStore = cookies()
      const token = cookieStore.get(COOKIE_NAME)
      if (!token) {
         return NextResponse.json(
            {
               message: "Unauthorized",
            },
            {
               status: 401,
            }
         );
      }
      const { value } = token;
      return new Response(JSON.stringify({ token: value, message: "OK" }), {
         status: 200,
      });

      } catch (e) {
      return NextResponse.json(
         {
            message: "Something went wrong",
         },
         {
            status: 400,
         }
      );
   }
}
