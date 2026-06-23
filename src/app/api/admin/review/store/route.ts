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

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(authCookieNames.token)?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please login again." },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { order_id, review, rating } = body;

    if (!order_id || !review || !rating) {
      return NextResponse.json(
        { success: false, message: "order_id, review, and rating are required." },
        { status: 400 },
      );
    }

    const backendUrl = buildApiUrl("/admin/review/store");

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
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        access_token: token,
      },
      body: JSON.stringify({ order_id, review, rating }),
      cache: "no-store",
    });

    const data = await parseJson(backendResponse);

    if (!backendResponse.ok) {
      return NextResponse.json(
        data || { success: false, message: "Failed to submit review." },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("REVIEW STORE ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while submitting review.",
      },
      { status: 500 },
    );
  }
}