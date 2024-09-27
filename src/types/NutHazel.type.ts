import { Tables } from "./supabase";

export type NutHazel = {
  category: string;
  desc: string;
  imgurl: string[];
  isPublic: boolean;
  keywords: string[];
  num: number;
  pageurl: string;
  time: string;
  title: string;
};
export type Users = Tables<"users">;
