// // export const getBackendOrigin = () => {
// //   const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// //   try {
// //     const url = new URL(apiBaseUrl);

// //     return `${url.protocol}//${url.host}`;
// //   } catch {
// //     return "";
// //   }
// // };

// // export const getImageUrl = (
// //   image?: string | null,
// //   fallback = "/images/provider-profile-img.svg",
// // ) => {
// //   if (!image) return fallback;

// //   if (
// //     image.startsWith("http://") ||
// //     image.startsWith("https://") ||
// //     image.startsWith("/") ||
// //     image.startsWith("blob:") ||
// //     image.startsWith("data:")
// //   ) {
// //     return image;
// //   }

// //   const backendOrigin = getBackendOrigin();

// //   if (!backendOrigin) {
// //     return fallback;
// //   }

// //   return `${backendOrigin}/${image.replace(/^\/+/, "")}`;
// // };

// export const getBackendOrigin = () => {
//   const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

//   try {
//     const url = new URL(apiBaseUrl);
//     return `${url.protocol}//${url.host}`;
//   } catch {
//     return "";
//   }
// };

// export const getImageUrl = (
//   image?: string | null,
//   fallback = "/images/provider-profile-img.svg",
// ) => {
//   if (!image) return fallback;

//   if (image.startsWith("blob:") || image.startsWith("data:")) {
//     return image;
//   }

//   if (image.startsWith("http://") || image.startsWith("https://")) {
//     return encodeURI(image);
//   }

//   const backendOrigin = getBackendOrigin();

//   if (image.startsWith("/uploads/")) {
//     return backendOrigin ? encodeURI(`${backendOrigin}${image}`) : fallback;
//   }

//   if (image.startsWith("uploads/")) {
//     return backendOrigin
//       ? encodeURI(`${backendOrigin}/${image.replace(/^\/+/, "")}`)
//       : fallback;
//   }

//   if (image.startsWith("/")) {
//     return image;
//   }

//   return backendOrigin
//     ? encodeURI(`${backendOrigin}/${image.replace(/^\/+/, "")}`)
//     : fallback;
// };

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
) => {
  if (!image) return fallback;

  if (image.startsWith("blob:") || image.startsWith("data:")) {
    return image;
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return encodeURI(image);
  }

  if (image.startsWith("/") && !image.startsWith("/uploads/")) {
    return image;
  }

  const backendOrigin = getBackendOrigin();

  return encodeURI(`${backendOrigin}/${image.replace(/^\/+/, "")}`);
};