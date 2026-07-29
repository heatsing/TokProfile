const DEFAULT_TIMEOUT_MS = 10_000;

export class HttpError extends Error {
  readonly status: number;
  readonly url: string;

  constructor(message: string, status: number, url: string) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.url = url;
  }
}

type JsonRequestOptions = Omit<RequestInit, "signal"> & {
  signal?: AbortSignal;
  timeoutMs?: number;
};

export async function requestJson<T>(
  input: string | URL,
  options: JsonRequestOptions = {},
): Promise<T> {
  const { headers, signal, timeoutMs = DEFAULT_TIMEOUT_MS, ...requestOptions } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  const abortFromParent = () => controller.abort(signal?.reason);
  const requestHeaders = new Headers(headers);

  if (!requestHeaders.has("Accept")) {
    requestHeaders.set("Accept", "application/json");
  }

  signal?.addEventListener("abort", abortFromParent, { once: true });

  try {
    const response = await fetch(input, {
      ...requestOptions,
      headers: requestHeaders,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new HttpError(
        `Request failed with status ${response.status}.`,
        response.status,
        response.url,
      );
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeoutId);
    signal?.removeEventListener("abort", abortFromParent);
  }
}
