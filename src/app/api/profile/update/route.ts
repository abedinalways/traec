import { NextRequest, NextResponse } from "next/server";
import { authCookieNames } from "@/lib/auth/config";
import { buildApiUrl } from "@/lib/apiUrl";

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get(authCookieNames.token)?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Please login again." },
        { status: 401 },
      );
    }

    const contentType = req.headers.get("content-type") || "";
    const isMultipart = contentType.includes("multipart/form-data");

    const headers: HeadersInit = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    let body: BodyInit;

    if (isMultipart) {
      const formData = await req.formData();

      // 🔍 Debug: Log what's in the FormData
      console.log("FormData entries:");
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(
            `  ${key}: File (${value.name}, ${value.size} bytes, ${value.type})`,
          );
        } else {
          console.log(`  ${key}: ${value}`);
        }
      }

      // ✅ Use the original FormData directly
      body = formData;
    } else {
      const jsonBody = await req.json();
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(jsonBody);
    }

    // Send request to backend API
    const profileUrl = buildApiUrl("/profile/update");

    if (!profileUrl) {
      return NextResponse.json(
        {
          success: false,
          message:
            "API_BASE_URL is missing. Please set NEXT_PUBLIC_API_BASE_URL",
        },
        { status: 500 },
      );
    }

    const backendResponse = await fetch(profileUrl, {
      method: "PUT",
      headers,
      body,
      cache: "no-store",
    });

    const data = await backendResponse.json().catch(() => null);

    console.log("Backend response status:", backendResponse.status);
    console.log("Backend response data:", data);

    if (!backendResponse.ok) {
      return NextResponse.json(
        data || { success: false, message: "Profile update failed." },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("PROFILE UPDATE ROUTE ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while updating profile.",
      },
      { status: 500 },
    );
  }
}
