export const getImageUrl = (
  image?: string | null,
  fallback = "/images/provider-profile-img.svg",
  cacheKey?: string | number,
) => {
  if (!image) return fallback;

  if (image.startsWith("blob:") || image.startsWith("data:")) {
    return image;
  }

  if (image.startsWith("/") && !image.startsWith("/uploads/")) {
    return image;
  }

  const cleanPath = image.replace(/^\/+/, "");
  const version = cacheKey ? `&v=${cacheKey}` : "";

  return `/api/image?path=${encodeURIComponent(cleanPath)}${version}`;
};
