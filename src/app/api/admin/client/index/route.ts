import { NextRequest, NextResponse } from "next/server";
import { authCookieNames } from "@/lib/auth/config";
import { buildApiUrl } from "@/lib/apiUrl";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get(authCookieNames.token)?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 },
            );
        }

        const { searchParams } = request.nextUrl;
        const search = searchParams.get("search") ?? "";
        const status = searchParams.get("status") ?? "";
        const period = searchParams.get("period") ?? "";
        const page = searchParams.get("page") ?? "1";
        const per_page = searchParams.get("per_page") ?? "10";

        const backendUrl = buildApiUrl(
            `/admin/client/index?search=${search}&status=${status}&period=${period}&page=${page}&per_page=${per_page}`,
        );

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
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
                access_token: token,
            },
            cache: "no-store",
        });

        const data = await backendResponse.json().catch(() => null);

        if (!backendResponse.ok) {
            return NextResponse.json(
                data || { success: false, message: "Failed to load clients" },
                { status: backendResponse.status },
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("CLIENT MANAGEMENT API ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error ? error.message : "Something went wrong",
            },
            { status: 500 },
        );
    }
}