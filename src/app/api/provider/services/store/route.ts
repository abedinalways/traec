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
        {
          success: false,
          message: "Unauthorized. Please login again.",
        },
        { status: 401 },
      );
    }

    const formData = await request.formData();

    const storeUrl = buildApiUrl("/provider/services/store");

    if (!storeUrl) {
      return NextResponse.json(
        {
          success: false,
          message:
            "API_BASE_URL is missing. Please set NEXT_PUBLIC_API_BASE_URL",
        },
        { status: 500 },
      );
    }

    const backendResponse = await fetch(storeUrl,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          access_token: token,
        },
        body: formData,
        cache: "no-store",
      },
    );

    const data = await parseJson(backendResponse);

    if (!backendResponse.ok) {
      return NextResponse.json(
        data || {
          success: false,
          message: "Service create failed.",
        },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("PROVIDER SERVICE STORE ROUTE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while creating service.",
      },
      { status: 500 },
    );
  }
}
