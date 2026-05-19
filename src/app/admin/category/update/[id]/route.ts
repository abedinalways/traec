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
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = request.cookies.get(authCookieNames.token)?.value;
    const { id } = await params;

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

    const backendResponse = await fetch(
      buildApiUrl(`/admin/category/update/${id}`),
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
          message: "Failed to update category.",
        },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("CATEGORY UPDATE ROUTE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while updating category.",
      },
      { status: 500 },
    );
  }
}
