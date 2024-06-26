"use server";

import { redirect } from "next/navigation";

import { ApiClient, APIResponse, IReponse } from "@/utils";

const epUrl = "/pipes/yellow_tripdata_2017_pipe.json";

export async function getData({ query = "" }): Promise<IReponse<APIResponse>> {
  const client = new ApiClient(process.env.NEXT_PUBLIC_API_URL!);
  const url = query === "" ? epUrl : `${epUrl}?q=${query}`;
  const res = await client.fetch(url);

  if (!res.ok) {
    return client.generateError(res.status);
  }

  const data = await res.json();
  return { data, error: null };
}

export async function applyFilters(formData: FormData) {
  const query = Array.from(formData.entries())
    .filter(([key]) => !key.startsWith("$ACTION_ID_"))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const url = query === "" ? "/" : `?${query}`;
  redirect(url);
}
