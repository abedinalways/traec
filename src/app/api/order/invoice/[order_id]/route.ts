import { NextRequest, NextResponse } from "next/server";
import { authCookieNames } from "@/lib/auth/config";

const API_BASE_URL =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";

const buildApiUrl = (path: string) => {
  if (!API_BASE_URL) {
    throw new Error(
      "API_BASE_URL is missing. Please set NEXT_PUBLIC_API_BASE_URL in .env.local",
    );
  }
  return `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ order_id: string }> }
) {
  try {
    const { order_id } = await params;
    const token = request.cookies.get(authCookieNames.token)?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please login again." },
        { status: 401 },
      );
    }

    // Since the API path in Postman is just /order/invoice/, 
    // it's likely they pass the order_id in the URL like /order/invoice/{id} or /order/invoice?order_id={id}
    // We will assume /admin/order/invoice/{id} based on the standard REST pattern
    const backendResponse = await fetch(buildApiUrl(`/order/invoice/${order_id}`), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        access_token: token,
      },
      cache: "no-store",
    });

    if (!backendResponse.ok) {
      
      return NextResponse.json(
        { success: false, message: "Failed to download invoice." },
        { status: backendResponse.status },
      );
    }

    const contentType = backendResponse.headers.get("Content-Type");
    const contentDisposition = backendResponse.headers.get("Content-Disposition");

    const blob = await backendResponse.blob();
    const headers = new Headers();
    if (contentType) headers.set("Content-Type", contentType);
    if (contentDisposition) headers.set("Content-Disposition", contentDisposition);

    return new NextResponse(blob, { status: 200, headers });
  } catch (error) {
    console.error("DOWNLOAD INVOICE ROUTE ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while downloading the invoice.",
      },
      { status: 500 },
    );
  }
}
