import { CollaboMutationProps } from "@/hooks/mutations/collabo.mutation";
import { IllustMutationProps } from "@/hooks/mutations/illust.mutation";
import { ToonMutationProps } from "@/hooks/mutations/toon.mutation";
import { Collabo, Illust, Toon } from "@/types/NutHazel.type";
import fetchWrapper from "@/utils/common/fetchWrapper";

export async function setToon(toonPayload: ToonMutationProps) {
  const url = "/api/set/toon";
  const data = await fetchWrapper<Toon[]>(url, {
    method: toonPayload.method,
    body: toonPayload.method === "POST" ? (toonPayload.toon as FormData) : JSON.stringify(toonPayload.toon),
  });
  return data;
}

export async function setCollabo(collaboPayload: CollaboMutationProps) {
  const url = "/api/set/collabo";
  const data = await fetchWrapper<Collabo[]>(url, {
    method: collaboPayload.method,
    body:
      collaboPayload.method === "POST"
        ? (collaboPayload.collabo as FormData)
        : JSON.stringify(collaboPayload.collabo),
  });
  return data;
}

export async function setIllust(illustPayload: IllustMutationProps) {
  const url = "/api/set/illust";
  const data = await fetchWrapper<Illust[]>(url, {
    method: illustPayload.method,
    body:
      illustPayload.method === "POST"
        ? (illustPayload.illust as FormData)
        : JSON.stringify(illustPayload.illust),
  });
  return data;
}
