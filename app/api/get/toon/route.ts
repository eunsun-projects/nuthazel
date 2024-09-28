import { Toon } from "@/types/NutHazel.type";
import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();

  const {
    data: toon,
    error,
  }: { data: Toon[] | null; error: PostgrestError | null } = await supabase
    .from("toon")
    .select("*")
    .order("num", { ascending: false });

  if (error) {
    return NextResponse.json(error.message, { status: 500 });
  }

  return NextResponse.json(toon, { status: 200 });
}
