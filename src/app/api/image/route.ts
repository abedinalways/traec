import { NextRequest, NextResponse } from "next/server";
import { authCookieNames } from "@/lib/auth/config";

const API_BASE_URL =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";

const FALLBACK_BACKEND_ORIGIN = "https://traec.apphero.agency";
const FALLBACK_API_BASE = "https://traec.apphero.agency/api";

const normalizeUrl = (url: string) => url.replace(/([^:]\/)\/+/g, "$1");

const getBackendConfig = () => {
  const apiBase = API_BASE_URL || FALLBACK_API_BASE;

  try {
    const normalizedApiBase = apiBase.startsWith("http")
      ? apiBase
      : `https://${apiBase}`;

    const url = new URL(normalizedApiBase);

    return {
      origin: `${url.protocol}//${url.host}`,
      apiBase: normalizedApiBase.replace(/\/$/, ""),
    };
  } catch {
    return {
      origin: FALLBACK_BACKEND_ORIGIN,
      apiBase: FALLBACK_API_BASE,
    };
  }
};

const isValidImageResponse = (contentType: string) => {
  return (
    contentType.startsWith("image/") || contentType.includes("octet-stream")
  );
};

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(authCookieNames.token)?.value;
    const imagePath = request.nextUrl.searchParams.get("path");

    if (!imagePath) {
      return NextResponse.json(
        {
          success: false,
          message: "Image path is required.",
        },
        { status: 400 },
      );
    }

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      const imageResponse = await fetch(imagePath, {
        method: "GET",
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
              access_token: token,
            }
          : {},
        cache: "no-store",
      });

      const contentType = imageResponse.headers.get("content-type") || "";

      if (imageResponse.ok && isValidImageResponse(contentType)) {
        const imageBuffer = await imageResponse.arrayBuffer();

        return new NextResponse(imageBuffer, {
          status: 200,
          headers: {
            "Content-Type": contentType || "image/jpeg",
            "Cache-Control": "no-store, max-age=0",
          },
        });
      }
    }

    const cleanPath = imagePath.replace(/^\/+/, "");
    const { origin, apiBase } = getBackendConfig();

    const possibleUrls = Array.from(
      new Set(
        [
          `${origin}/${cleanPath}`,
          `${origin}/storage/${cleanPath}`,
          `${origin}/public/${cleanPath}`,
          `${origin}/api/${cleanPath}`,
          `${origin}/api/storage/${cleanPath}`,
          `${apiBase}/${cleanPath}`,
          `${apiBase}/storage/${cleanPath}`,
          `${apiBase}/public/${cleanPath}`,
        ].map(normalizeUrl),
      ),
    );

    const tried: {
      url: string;
      status?: number;
      contentType?: string;
      error?: string;
    }[] = [];

    for (const url of possibleUrls) {
      try {
        const imageResponse = await fetch(url, {
          method: "GET",
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
                access_token: token,
              }
            : {},
          cache: "no-store",
        });

        const contentType = imageResponse.headers.get("content-type") || "";

        tried.push({
          url,
          status: imageResponse.status,
          contentType,
        });

        if (imageResponse.ok && isValidImageResponse(contentType)) {
          const imageBuffer = await imageResponse.arrayBuffer();

          return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
              "Content-Type": contentType || "image/jpeg",
              "Cache-Control": "no-store, max-age=0",
            },
          });
        }
      } catch (error) {
        tried.push({
          url,
          error: error instanceof Error ? error.message : "Fetch failed",
        });
      }
    }

    return NextResponse.json(
      {
        success: false,
        message:
          "Image file not found or backend did not return image content.",
        imagePath,
        tried,
      },
      { status: 404 },
    );
  } catch (error) {
    console.error("IMAGE PROXY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while loading image.",
      },
      { status: 500 },
    );
  }
}
