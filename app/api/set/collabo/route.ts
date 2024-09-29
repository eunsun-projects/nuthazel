import { Collabo } from "@/types/NutHazel.type";
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

  const data: Partial<Collabo> = {
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
        const { data: fileData, error } = await supabase.storage
          .from("collabo")
          .upload(uniqueFileName, file);

        if (error) {
          console.error(`Error uploading ${file.name}:`, error.message);
          // 업로드 실패한 파일에 대한 처리를 계속하려면 continue 사용
          continue;
        }
        const { data: url } = supabase.storage.from("collabo").getPublicUrl(fileData.path);
        data.imgurl = [...(data.imgurl || []), url.publicUrl];
      } catch (error) {
        console.error(`Error processing ${file.name}:`, error);
      }
    }
  } else {
    data.imgurl = imgurl.split(",");
  }

  let collaboData: Collabo | null = null;
  if (id) {
    const { data: collabo, error: collaboError }: { data: Collabo | null; error: PostgrestError | null } =
      await supabase
        .from("collabo")
        .update({ ...data })
        .eq("id", id)
        .select()
        .single();

    if (collaboError) {
      return NextResponse.json(collaboError.message, { status: 500 });
    }

    collaboData = collabo;
  } else {
    const { data: collabo, error: collaboError }: { data: Collabo | null; error: PostgrestError | null } =
      await supabase
        .from("collabo")
        .upsert({ ...data })
        .select()
        .single();

    if (collaboError) {
      return NextResponse.json(collaboError.message, { status: 500 });
    }

    collaboData = collabo;
  }

  revalidatePath("/", "layout");
  return NextResponse.json(collaboData, { status: 200 });
}

export async function DELETE(request: Request) {
  const payload: Collabo = await request.json();
  const supabase = createClient();

  for (const img of payload.imgurl) {
    const match = img.match(/\/[^\/]+\/([^\/]+)$/);
    if (match && match[1]) {
      const fileName = match[1];
      const { error } = await supabase.storage.from("collabo").remove([fileName]);
      if (error) {
        console.error(`Error deleting ${fileName}:`, error.message);
        // 업로드 실패한 파일에 대한 처리를 계속하려면 continue 사용
        continue;
      }
    }
  }

  const { error } = await supabase.from("collabo").delete().eq("id", payload.id);

  if (error) {
    return NextResponse.json(error.message, { status: 500 });
  }

  return NextResponse.json("success", { status: 200 });
}
