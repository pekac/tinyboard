import { IMeta, IRide } from "@/core";

export type IReponse<T> =
  | {
      data: T;
      error: null;
    }
  | { data: null; error: Error };

export interface APIResponse {
  data: IRide[];
  meta: IMeta[];
}

export enum HttpStatusCode {
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
}

export class ApiClient {
  private token: string;
  constructor(private readonly baseUrl: string) {
    this.token = process.env.NEXT_PUBLIC_TOKEN!;
  }

  async fetch(endpoint: string, options?: RequestInit): Promise<Response> {
    const headers = new Headers({
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
      ...options?.headers,
    });

    return fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: headers,
    });
  }

  generateError(status: HttpStatusCode): IReponse<APIResponse> {
    switch (status) {
      case HttpStatusCode.BAD_REQUEST: {
        return {
          data: null,
          error: new Error("Bad request: Invalid query format."),
        };
      }
      case HttpStatusCode.UNAUTHORIZED:
      case HttpStatusCode.FORBIDDEN: {
        return {
          data: null,
          error: new Error("Unauthorized: Check your token in .env."),
        };
      }
      case HttpStatusCode.NOT_FOUND: {
        return {
          data: null,
          error: new Error(
            "Nothing here: Things that you are looking for can not be found.",
          ),
        };
      }
      case HttpStatusCode.INTERNAL_SERVER_ERROR: {
        return {
          data: null,
          error: new Error(
            "Whoops (500): Can't fetch data from API atm, some internal stuff are happening.",
          ),
        };
      }
      default: {
        return {
          data: null,
          error: new Error("Unknown error has occured. Try later."),
        };
      }
    }
  }
}
