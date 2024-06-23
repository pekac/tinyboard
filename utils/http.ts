export class ApiClient {
  private token: string;
  constructor(private readonly baseUrl: string) {
    this.token = process.env.NEXT_PUBLIC_TOKEN!;
  }

  async fetch(endpoint: string, options?: RequestInit): Promise<Response> {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
      ...options?.headers,
    });

    return fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: headers,
    });
  }
}
