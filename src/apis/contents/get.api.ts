import { Collabo, Illust, Toon } from "@/types/NutHazel.type";
import fetchWrapper from "@/utils/common/fetchWrapper";

export async function getCollabo() {
  const url = "/api/get/collabo";
  const data = await fetchWrapper<Collabo[]>(url, { method: "GET" });
  return data;
}

export async function getIllust() {
  const url = "/api/get/illust";
  const data = await fetchWrapper<Illust[]>(url, { method: "GET" });
  return data;
}

export async function getToon() {
  const url = "/api/get/toon";
  const data = await fetchWrapper<Toon[]>(url, { method: "GET" });
  return data;
}
