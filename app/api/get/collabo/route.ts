import { Collabo } from "@/types/NutHazel.type";
import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();

  const {
    data: collabo,
    error,
  }: { data: Collabo[] | null; error: PostgrestError | null } = await supabase
    .from("collabo")
    .select("*")
    .order("num", { ascending: false });

  if (error) {
    return NextResponse.json(error.message, { status: 500 });
  }

  return NextResponse.json(collabo, { status: 200 });
}
