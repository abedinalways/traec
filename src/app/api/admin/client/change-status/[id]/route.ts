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
        const body = await request.json();

        const statusUrl = buildApiUrl(`/admin/client/change-status/${id}`);

        if (!statusUrl) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "API_BASE_URL is missing. Please set NEXT_PUBLIC_API_BASE_URL",
                },
                { status: 500 },
            );
        }

        const backendResponse = await fetch(statusUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                access_token: token,
            },
            body: JSON.stringify(body),
            cache: "no-store",
        });

        const data = await parseJson(backendResponse);

        if (!backendResponse.ok) {
            return NextResponse.json(
                data || { success: false, message: "Failed to change status" },
                { status: backendResponse.status },
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("CLIENT STATUS CHANGE API ERROR:", error);
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