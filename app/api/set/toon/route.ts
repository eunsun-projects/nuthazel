import { Toon } from "@/types/NutHazel.type";
import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const supabase = createClient();

  const id = formData.get("id");
  const files = formData.getAll("imgs");
  const num = formData.get("num");
  const title = formData.get("title") as string;
  const link = formData.get("link") as string;
  const desc = formData.get("desc") as string;
  const keywords = (formData.get("keywords") as string).split(",");
  const isPublic = formData.get("isPublic");
  const pageurl = formData.get("pageurl") as string;
  const imgurl = formData.get("imgurl") as string;

  const data: Partial<Toon> = {
    num: Number(num),
    title,
    link: link ? JSON.parse(link) : null,
    desc,
    keywords,
    isPublic: isPublic === "true" ? true : false,
    pageurl,
  };

  if (typeof files[0] !== "string") {
    for (const file of files as File[]) {
      const uniqueFileName = `${Date.now()}_${file.name}`;
      try {
        const { data: fileData, error } = await supabase.storage.from("toon").upload(uniqueFileName, file);

        if (error) {
          console.error(`Error uploading ${file.name}:`, error.message);
          // 업로드 실패한 파일에 대한 처리를 계속하려면 continue 사용
          continue;
        }
        const { data: url } = supabase.storage.from("toon").getPublicUrl(fileData.path);
        data.imgurl = [...(data.imgurl || []), url.publicUrl];
      } catch (error) {
        console.error(`Error processing ${file.name}:`, error);
      }
    }
  } else {
    data.imgurl = imgurl.split(",");
  }

  let toonData: Toon | null = null;
  if (id) {
    const { data: toon, error: toonError }: { data: Toon | null; error: PostgrestError | null } =
      await supabase
        .from("toon")
        .update({ ...data })
        .eq("id", id)
        .select()
        .single();

    if (toonError) {
      return NextResponse.json(toonError.message, { status: 500 });
    }

    toonData = toon;
  } else {
    const { data: toon, error: toonError }: { data: Toon | null; error: PostgrestError | null } =
      await supabase
        .from("toon")
        .upsert({ ...data })
        .select()
        .single();

    if (toonError) {
      return NextResponse.json(toonError.message, { status: 500 });
    }

    toonData = toon;
  }

  revalidatePath("/", "layout");
  return NextResponse.json(toonData, { status: 200 });
}

export async function DELETE(request: Request) {
  const payload: Toon = await request.json();
  const supabase = createClient();

  for (const img of payload.imgurl) {
    const match = img.match(/\/[^\/]+\/([^\/]+)$/);
    if (match && match[1]) {
      const fileName = match[1];
      const { error } = await supabase.storage.from("toon").remove([fileName]);
      if (error) {
        console.error(`Error deleting ${fileName}:`, error.message);
        // 업로드 실패한 파일에 대한 처리를 계속하려면 continue 사용
        continue;
      }
    }
  }

  const { error } = await supabase.from("toon").delete().eq("id", payload.id);

  if (error) {
    return NextResponse.json(error.message, { status: 500 });
  }

  return NextResponse.json("success", { status: 200 });
}
