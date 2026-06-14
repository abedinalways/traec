import { NextRequest, NextResponse } from "next/server";
import { authCookieNames } from "@/lib/auth/config";

export async function DELETE(request: NextRequest, { params }: { params: any }) {
    try {
        const token = request.cookies.get(authCookieNames.token)?.value;
        if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

        const { id } = await params;
        const backendResponse = await fetch(`${process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL}/admin/plan/delete/${id}`, {
            method: "DELETE",
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });
        const data = await backendResponse.json().catch(() => null);
        return NextResponse.json(data, { status: backendResponse.status });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}