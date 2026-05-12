// import { NextRequest, NextResponse } from "next/server";
// import { authCookieNames } from "@/lib/auth/config";

// const API_BASE_URL =
//   process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";

// const buildApiUrl = (path: string) => {
//   if (!API_BASE_URL) {
//     throw new Error(
//       "API_BASE_URL is missing. Please set NEXT_PUBLIC_API_BASE_URL in .env.local",
//     );
//   }

//   return `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
// };

// export async function PUT(request: NextRequest) {
//   try {
//     const token = request.cookies.get(authCookieNames.token)?.value;

//     if (!token) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Unauthorized. Please login again.",
//         },
//         { status: 401 },
//       );
//     }

//     const body = await request.json();

//     const backendResponse = await fetch(buildApiUrl("/profile/update"), {
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//         access_token: token,
//       },
//       body: JSON.stringify(body),
//       cache: "no-store",
//     });

//     const data = await backendResponse.json().catch(() => null);

//     if (!backendResponse.ok) {
//       return NextResponse.json(
//         data || {
//           success: false,
//           message: "Profile update failed.",
//         },
//         { status: backendResponse.status },
//       );
//     }

//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     console.error("PROFILE UPDATE ROUTE ERROR:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message:
//           error instanceof Error
//             ? error.message
//             : "Something went wrong while updating profile.",
//       },
//       { status: 500 },
//     );
//   }
// }

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

export async function PUT(request: NextRequest) {
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

    const contentType = request.headers.get("content-type") || "";
    const isMultipart = contentType.includes("multipart/form-data");

    const headers: HeadersInit = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      access_token: token,
    };

    let body: BodyInit;

    if (isMultipart) {
      body = await request.formData();

     
    } else {
      const jsonBody = await request.json();

      headers["Content-Type"] = "application/json";
      body = JSON.stringify(jsonBody);
    }

    const backendResponse = await fetch(buildApiUrl("/profile/update"), {
      method: "PUT",
      headers,
      body,
      cache: "no-store",
    });

    const data = await backendResponse.json().catch(() => null);

    if (!backendResponse.ok) {
      return NextResponse.json(
        data || {
          success: false,
          message: "Profile update failed.",
        },
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