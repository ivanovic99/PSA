// import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { COOKIE_NAME } from "./constants";

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//    try {
//       const token = request.cookies.get(COOKIE_NAME)
//       if (!token) {
//          return NextResponse.redirect(new URL('/', request.url));
//       }
//       const { value } = token;
//       return new Response(JSON.stringify({ token: value, message: "OK" }), {
//          status: 200,
//       });

//    } catch (e) {
//       return NextResponse.json(
//          {
//             message: "Something went wrong",
//             error: e,
//          },
//          {
//             status: 400,
//          },
//       );
//    }
// }
 
// export const config = {
//   matcher: '/dashboard/:path*',
// }

export function middleware(request: NextRequest) {}