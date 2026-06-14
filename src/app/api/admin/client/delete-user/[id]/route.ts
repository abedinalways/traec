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

// Next.js dynamic routes handle context typing explicitly
export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> | { id: string } }
) {
    try {
        const token = request.cookies.get(authCookieNames.token)?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 },
            );
        }

        // Resolves compatibility issues across different Next.js versions (e.g. Next.js 14 vs 15+)
        const resolvedParams = 'then' in context.params ? await context.params : context.params;
        const { id } = resolvedParams;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Missing user ID parameter" },
                { status: 400 },
            );
        }

        const backendResponse = await fetch(
            buildApiUrl(`/admin/client/delete-user/${id}`),
            {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    access_token: token,
                },
            },
        );

        const data = await backendResponse.json().catch(() => null);

        if (!backendResponse.ok) {
            return NextResponse.json(
                data || { success: false, message: "Failed to delete user" },
                { status: backendResponse.status },
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("DELETE USER API ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : "Something went wrong",
            },
            { status: 500 },
        );
    }
}