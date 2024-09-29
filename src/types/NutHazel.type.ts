import { Tables } from "./supabase";

export type Toon = Tables<"toon">;
export type Users = Tables<"users">;
export type Illust = Tables<"illust">;
export type Collabo = Tables<"collabo">;

export type NutHazelAll =
  | Toon[]
  | Illust[]
  | Collabo[]
  | {
      created_at: string;
      desc: string;
      id: string;
      imgurl: string[];
      isPublic: boolean;
      keywords: string[];
      link: string | null;
      num: number | null;
      pageurl: string;
      title: string;
    }[];
