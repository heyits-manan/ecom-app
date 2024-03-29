import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Extract the host from the request headers
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    // Set cookies with the dynamically determined domain
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true, // Ensure cookies are sent over HTTPS
      sameSite: "strict",
      path: "/",
    });
    response.cookies.set("firstName", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true, // Ensure cookies are sent over HTTPS
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
