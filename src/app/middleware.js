import { NextResponse } from "next/server";
import { decodedToken } from "./utils/tokenDecoder"; // Assuming you have a token decoder utility
import { IUserRole } from "./types"; // Assuming you have a types file defining IUserRole

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  const cookie = request.cookies.get(process.env.TOKEN);
  const token = cookie ? cookie.value : null;

  if (token) {
    const user = decodedToken(token);
    
    // If token is expired, redirect to login page
    if (user.exp < Date.now() / 1000) {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }

    // Define routes based on user role
    const allowedRoutes = {
      Driver: ["/driver", "/driver/history", "/driver/driver-location2"],
      Customer: ["/", "/location2", "/userpage", "/userpage/history", "/userpage/reserve"]
    };

    // Check if the current route is allowed for the user's role
    if (!allowedRoutes[user.role]?.includes(pathname)) {
      url.pathname = "/not-found";
      return NextResponse.redirect(url);
    }
  } else {
    // If cookies are null, access NoAuth routes
    const noAuthRoutes = ["/", "/login", "/register"];
    if (!noAuthRoutes.includes(pathname)) {
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }
}
