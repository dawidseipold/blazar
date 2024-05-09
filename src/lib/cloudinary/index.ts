import { Cloudinary } from "@cloudinary/url-gen";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

export const cloudinaryUrlGen = new Cloudinary({
  cloud: { cloudName: "dlgqzrykq" },
});

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const uploadFile = async (
  file: File,
  location: string,
  tags: string[]
) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          tags: [...tags],
          folder: location,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        }
      )
      .end(buffer);
  });
};
