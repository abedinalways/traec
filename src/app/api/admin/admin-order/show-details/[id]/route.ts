// import { NextRequest, NextResponse } from "next/server";
// import { authCookieNames } from "@/lib/auth/config";

// const API_BASE_URL =
//     process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";

// const buildApiUrl = (path: string) => {
//     if (!API_BASE_URL) {
//         throw new Error(
//             "API_BASE_URL is missing. Please set NEXT_PUBLIC_API_BASE_URL",
//         );
//     }
//     return `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
// };

// interface RouteParams {
//     params: Promise<{ id: string }> | { id: string };
// }

// export async function GET(request: NextRequest, { params }: RouteParams) {
//     try {
//         const token = request.cookies.get(authCookieNames.token)?.value;

//         if (!token) {
//             return NextResponse.json(
//                 { success: false, message: "Unauthorized" },
//                 { status: 401 },
//             );
//         }

//         const resolvedParams = await params;
//         const id = resolvedParams.id;

//         const backendResponse = await fetch(
//             buildApiUrl(`/admin/admin-order/show-details/${id}`),
//             {
//                 method: "GET",
//                 headers: {
//                     Accept: "application/json",
//                     Authorization: `Bearer ${token}`,
//                     access_token: token,
//                 },
//                 cache: "no-store",
//             },
//         );

//         const data = await backendResponse.json().catch(() => null);

//         if (!backendResponse.ok) {
//             return NextResponse.json(
//                 data || { success: false, message: "Failed to load order details" },
//                 { status: backendResponse.status },
//             );
//         }

//         return NextResponse.json(data, { status: 200 });
//     } catch (error) {
//         console.error("ADMIN ORDER DETAILS API ERROR:", error);
//         return NextResponse.json(
//             {
//                 success: false,
//                 message: error instanceof Error ? error.message : "Something went wrong while loading order details",
//             },
//             { status: 500 },
//         );
//     }
// }

import { NextRequest, NextResponse } from "next/server";
import { authCookieNames } from "@/lib/auth/config";

const API_BASE_URL =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";

const buildApiUrl = (path: string) => {
  if (!API_BASE_URL) {
    throw new Error(
      "API_BASE_URL is missing. Please set NEXT_PUBLIC_API_BASE_URL",
    );
  }
  return `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const token = request.cookies.get(authCookieNames.token)?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;

    const backendResponse = await fetch(
      buildApiUrl(`/admin/admin-order/show-details/${id}`),
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

    const data = await backendResponse.json().catch(() => null);

    if (!backendResponse.ok) {
      return NextResponse.json(
        data || { success: false, message: "Failed to load order details" },
        { status: backendResponse.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("ADMIN ORDER DETAILS API ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while loading order details",
      },
      { status: 500 },
    );
  }
}