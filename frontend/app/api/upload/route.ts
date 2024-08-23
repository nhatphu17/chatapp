import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const file = (body.file as Blob) || null;
    console.log(file);
    const randNum = (Math.random() * 10).toString(36).replace('.', '');

  if (file) {

    console.log(randNum);

    const buffer = Buffer.from(await file.arrayBuffer());
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR);
    }

    fs.writeFileSync(
      path.resolve(UPLOAD_DIR, randNum+'.'+(body.file as File).name.split('.').pop()),
      buffer
    );
  } else {
    return NextResponse.json({
      success: false,
    });
  }

  return NextResponse.json({
    success: true,
    name: randNum+'.'+(body.file as File).name.split('.').pop(),
    path:"/uploads/"+randNum+'.'+(body.file as File).name.split('.').pop()
  });
};