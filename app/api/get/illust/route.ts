import { Illust } from "@/types/NutHazel.type";
import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();

  const {
    data: illust,
    error,
  }: { data: Illust[] | null; error: PostgrestError | null } = await supabase
    .from("illust")
    .select("*")
    .order("num", { ascending: false });

  if (error) {
    return NextResponse.json(error.message, { status: 500 });
  }

  return NextResponse.json(illust, { status: 200 });
}
