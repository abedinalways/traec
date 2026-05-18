const FALLBACK_BACKEND_ORIGIN = "https://traec.apphero.agency";

export const getBackendOrigin = () => {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_BACKEND_ORIGIN ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "";

  if (!apiBaseUrl) {
    return FALLBACK_BACKEND_ORIGIN;
  }

  try {
    const normalizedUrl = apiBaseUrl.startsWith("http")
      ? apiBaseUrl
      : `https://${apiBaseUrl}`;

    const url = new URL(normalizedUrl);

    return `${url.protocol}//${url.host}`;
  } catch {
    return FALLBACK_BACKEND_ORIGIN;
  }
};

export const getImageUrl = (
  image?: string | null,
  fallback = "/images/provider-profile-img.svg",
  cacheKey?: string | number | null,
) => {
  if (!image) return fallback;

  if (image.startsWith("blob:") || image.startsWith("data:")) {
    return image;
  }

  if (
    image.startsWith("/") &&
    !image.startsWith("/uploads/") &&
    !image.startsWith("/storage/")
  ) {
    return image;
  }

  const backendOrigin = getBackendOrigin();
  const cleanImage = image.replace(/^\/+/, "");

  let fullUrl = "";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    fullUrl = image;
  } else if (
    cleanImage.startsWith("uploads/") ||
    cleanImage.startsWith("storage/")
  ) {
    fullUrl = `${backendOrigin}/${cleanImage}`;
  } else {
    fullUrl = `${backendOrigin}/uploads/${cleanImage}`;
  }

  if (!cacheKey) {
    return fullUrl;
  }

  const separator = fullUrl.includes("?") ? "&" : "?";

  return `${fullUrl}${separator}v=${encodeURIComponent(String(cacheKey))}`;
};

export const getImageFallbackUrls = (
  image?: string | null,
  fallback = "/images/provider-profile-img.svg",
  cacheKey?: string | number | null,
) => {
  if (!image) return [fallback];

  if (image.startsWith("blob:") || image.startsWith("data:")) {
    return [image];
  }

  if (
    image.startsWith("/") &&
    !image.startsWith("/uploads/") &&
    !image.startsWith("/storage/")
  ) {
    return [image, fallback];
  }

  const backendOrigin = getBackendOrigin();
  const cleanImage = image.replace(/^\/+/, "");
  const fileName = cleanImage.split("/").pop() || cleanImage;

  const urls = [
    getImageUrl(image, fallback, cacheKey),
    `${backendOrigin}/${cleanImage}`,
    `${backendOrigin}/uploads/${fileName}`,
    `${backendOrigin}/storage/uploads/${fileName}`,
    `${backendOrigin}/storage/${cleanImage}`,
    fallback,
  ];

  return Array.from(new Set(urls));
};
