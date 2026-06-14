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

// Next.js 16 এ params একটি Promise টাইপ হিসেবে ডিফাইন করতে হয়
export async function PATCH(
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

        // রিকোয়েস্ট ৪MD৪ হওয়া আটকাতে params কে অবশ্যই await করতে হবে
        const resolvedParams = await context.params;
        const { id } = resolvedParams;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "Missing required ID parameter" },
                { status: 400 },
            );
        }

        const body = await request.json().catch(() => ({}));

        const backendResponse = await fetch(
            buildApiUrl(`/admin/client/change-status/${id}`),
            {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                    access_token: token, // আপনার ব্যাকএন্ড যেভাবে টোকেন এক্সপেক্ট করে
                },
                body: JSON.stringify(body),
            },
        );

        const data = await backendResponse.json().catch(() => null);

        if (!backendResponse.ok) {
            return NextResponse.json(
                data || { success: false, message: "Failed to update status" },
                { status: backendResponse.status },
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("CHANGE STATUS API ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : "Something went wrong",
            },
            { status: 500 },
        );
    }
}