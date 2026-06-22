import { NextRequest, NextResponse } from "next/server";
import { authCookieNames } from "@/lib/auth/config";
import { buildApiUrl } from "@/lib/apiUrl";

const parseJson = async (response: Response) => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    const token = request.cookies.get(authCookieNames.token)?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please login again." },
        { status: 401 },
      );
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Order id is required." },
        { status: 400 },
      );
    }

    const orderUrl = buildApiUrl(`/admin/order/show/${id}`);

    if (!orderUrl) {
      return NextResponse.json(
        {
          success: false,
          message:
            "API_BASE_URL is missing. Please set NEXT_PUBLIC_API_BASE_URL",
        },
        { status: 500 },
      );
    }

    const backendResponse = await fetch(orderUrl,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          access_token: token,
        },
        cache: "no-store",
      },
    );

    const data = await parseJson(backendResponse);

    if (!backendResponse.ok) {
      return NextResponse.json(
        data || { success: false, message: "Failed to load order details." },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("ADMIN ORDER SHOW ROUTE ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while loading order details.",
      },
      { status: 500 },
    );
  }
}
