import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({ region: "us-east-1" });

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const objectKey = searchParams.get("objectKey"); // Get the object key from query params

  if (!objectKey) {
    return new Response(JSON.stringify({ error: "Missing object key" }), {
      status: 400,
    });
  }

  try {
    const params = {
      Bucket: "your-bucket-name", // Replace with your bucket name
      Key: objectKey,            // Pass the object key
    };

    const command = new GetObjectCommand(params);
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1-hour expiration

    return new Response(JSON.stringify({ url: signedUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to generate pre-signed URL" }),
      { status: 500 }
    );
  }
}
