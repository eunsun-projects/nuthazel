import { Illust } from "@/types/NutHazel.type";
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

  const data: Partial<Illust> = {
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
          .from("illust")
          .upload(uniqueFileName, file);

        if (error) {
          console.error(`Error uploading ${file.name}:`, error.message);
          // 업로드 실패한 파일에 대한 처리를 계속하려면 continue 사용
          continue;
        }
        const { data: url } = supabase.storage.from("illust").getPublicUrl(fileData.path);
        data.imgurl = [...(data.imgurl || []), url.publicUrl];
      } catch (error) {
        console.error(`Error processing ${file.name}:`, error);
      }
    }
  } else {
    data.imgurl = imgurl.split(",");
  }

  let illustData: Illust | null = null;
  if (id) {
    const { data: illust, error: illustError }: { data: Illust | null; error: PostgrestError | null } =
      await supabase
        .from("illust")
        .update({ ...data })
        .eq("id", id)
        .select()
        .single();

    if (illustError) {
      return NextResponse.json(illustError.message, { status: 500 });
    }

    illustData = illust;
  } else {
    const { data: illust, error: illustError }: { data: Illust | null; error: PostgrestError | null } =
      await supabase
        .from("illust")
        .upsert({ ...data })
        .select()
        .single();

    if (illustError) {
      return NextResponse.json(illustError.message, { status: 500 });
    }

    illustData = illust;
  }

  revalidatePath("/", "layout");
  return NextResponse.json(illustData, { status: 200 });
}

export async function DELETE(request: Request) {
  const payload: Illust = await request.json();
  const supabase = createClient();

  for (const img of payload.imgurl) {
    const match = img.match(/\/[^\/]+\/([^\/]+)$/);
    if (match && match[1]) {
      const fileName = match[1];
      const highFileName = fileName.replace(/\.(jpg|png)$/i, "_high.$1");
      const { error } = await supabase.storage.from("illust").remove([fileName, highFileName]);
      if (error) {
        console.error(`Error deleting ${fileName}:`, error.message);
        // 업로드 실패한 파일에 대한 처리를 계속하려면 continue 사용
        continue;
      }
    }
  }

  const { error } = await supabase.from("illust").delete().eq("id", payload.id);

  if (error) {
    return NextResponse.json(error.message, { status: 500 });
  }

  return NextResponse.json("success", { status: 200 });
}
