import { NextRequest, NextResponse } from "next/server";
import { authCookieNames } from "@/lib/auth/config";

const API_BASE_URL =
    process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";

const buildApiUrl = (path: string) => {
    if (!API_BASE_URL) {
        throw new Error("API_BASE_URL is missing. Please set NEXT_PUBLIC_API_BASE_URL");
    }
    return `${API_BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> },
) {
    try {
        const token = request.cookies.get(authCookieNames.token)?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 },
            );
        }

        const resolvedParams = await context.params;
        const { id } = resolvedParams;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Missing required ID parameter" },
                { status: 400 },
            );
        }

        const backendResponse = await fetch(
            buildApiUrl(`/admin/client/show-details/${id}`),
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
                data || { success: false, message: "Failed to fetch user details" },
                { status: backendResponse.status },
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("SHOW DETAILS API ERROR:", error);
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : "Something went wrong",
            },
            { status: 500 },
        );
    }
}