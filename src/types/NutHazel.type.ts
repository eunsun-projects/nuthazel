import { Timestamp } from "firebase/firestore";

export type NutHazel = {
  category: string;
  desc: string;
  imgurl: string[];
  isPublic: boolean;
  keywords: string[];
  num: number;
  pageurl: string;
  time: Timestamp;
  title: string;
};
