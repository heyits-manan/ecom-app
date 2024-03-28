import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Extract the host from the request headers
    const host = request.headers.get("host");
    console.log(host);
    let domain = "";

    if (host) {
      // Example simplistic approach to extract the domain
      // This might need adjustments based on your domain structure and to ensure security
      const parts = host.split(".");
      console.log(parts);
      if (parts.length >= 2) {
        domain = `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
        console.log(domain);
      }
    }

    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    // Set cookies with the dynamically determined domain
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      domain: domain, // Use dynamic domain
      path: "/",
    });
    response.cookies.set("firstName", "", {
      httpOnly: true,
      expires: new Date(0),
      domain: domain, // Use dynamic domain
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
