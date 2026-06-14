import { NextRequest, NextResponse } from "next/server";
import { authCookieNames } from "@/lib/auth/config";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get(authCookieNames.token)?.value;
        if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

        const backendResponse = await fetch(`${process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL}/admin/promotions/index`, {
            method: "GET",
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
            cache: "no-store",
        });
        const data = await backendResponse.json().catch(() => null);
        return NextResponse.json(data, { status: backendResponse.status });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}