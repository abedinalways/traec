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

export async function POST(
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

    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { success: false, message: "Status is required." },
        { status: 400 },
      );
    }

    const backendUrl = buildApiUrl(`/admin/order/update-status/${id}`);

    if (!backendUrl) {
      return NextResponse.json(
        {
          success: false,
          message:
            "API_BASE_URL is missing. Please set NEXT_PUBLIC_API_BASE_URL",
        },
        { status: 500 },
      );
    }

    const backendResponse = await fetch(backendUrl, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        access_token: token,
      },
      body: JSON.stringify({ status }),
      cache: "no-store",
    });

    const data = await parseJson(backendResponse);

    if (!backendResponse.ok) {
      return NextResponse.json(
        data || { success: false, message: "Failed to update order status." },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("ORDER UPDATE STATUS ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while updating order status.",
      },
      { status: 500 },
    );
  }
}