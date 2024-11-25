import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"; // Correct import
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  try {
    const { fileName, folder } = await req.json();

    if (!fileName || !folder) {
      return new Response(
        JSON.stringify({ error: "fileName and folder are required" }),
        { status: 400 }
      );
    }

    const uniqueFileName = `${folder}/${uuidv4()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: uniqueFileName,
      ContentType: "application/octet-stream", // Adjust content type if needed
    });

    // Use getSignedUrl from s3-request-presigner
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 }); // 5 minutes expiration

    return new Response(
      JSON.stringify({
        uploadUrl,
        fileUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${uniqueFileName}`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

