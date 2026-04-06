interface HttpClientOptions {
  baseURL: string;
  headers: Record<string, string>;
}

interface HttpResponse<T> {
  data: T;
  status: number;
  statusText: string;
  parseBody?: T;
}

export class HttpClient {
  baseURL: string;
  headers: Record<string, string>;

  constructor(options: HttpClientOptions = { baseURL: "", headers: {} }) {
    this.baseURL = options.baseURL || "";
    this.headers = options.headers || {};
  }

  fetchJSON = async <T>(endpoint: string, options: any = {}): Promise<HttpResponse<T>> => {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: this.headers
    });

    if (!res.ok) throw new Error(res.statusText);

    if (options.parseResponse !== false && res.status !== 204)
      return res.json();

    return {
      data: null as any,
      status: res.status,
      statusText: res.statusText
    };
  }

  setHeader(key: string, value: string) {
    this.headers[key] = value;
    return this;
  }

  getHeader(key: string) {
    return this.headers[key];
  }

  setBasicAuth = (username: string, password: string) => {
    this.headers.Authorization = `Basic ${btoa(`${username}:${password}`)}`;
    return this;
  }

  setBearerAuth = (accessToken: string | undefined) => {
    this.headers.Authorization = `Bearer ${accessToken}`;
    return this;
  }

  get = async (endpoint: string, options: any = {}) => {
    return this.fetchJSON(endpoint, {
      ...options,
      method: "GET"
    });
  }

  post = async (endpoint: string, body: any, options: any = {}) => {
    return this.fetchJSON(endpoint, {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
      method: "POST"
    });
  }

  put = async (endpoint: string, body: any, options: any = {}) => {
    return this.fetchJSON(endpoint, {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
      method: "PUT"
    });
  }

  patch = async (endpoint: string, operations: any, options: any = {}) => {
    return this.fetchJSON(endpoint, {
      parseResponse: false,
      ...options,
      body: JSON.stringify(operations),
      method: "PATCH"
    });
  }

  delete = async (endpoint: string, options: any = {}) => {
    return this.fetchJSON(endpoint, {
      parseResponse: false,
      ...options,
      method: "DELETE"
    });
  }
}
