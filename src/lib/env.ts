const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const defaultApiBaseUrl = "https://traec.apphero.agency/api";

const toBoolean = (value: string | undefined, fallback: boolean) => {
  if (value == null) {
    return fallback;
  }

  return !["0", "false", "no", "off"].includes(value.toLowerCase());
};

export const env = {
  apiBaseUrl: trimTrailingSlash(
    process.env.NEXT_PUBLIC_API_BASE_URL ?? defaultApiBaseUrl,
  ),
  designMode: toBoolean(process.env.NEXT_PUBLIC_DESIGN_MODE, true),
};
