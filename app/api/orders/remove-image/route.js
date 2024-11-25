
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "us-east-1", // Set the appropriate region
});

export async function DELETE(req) {
  try {
    const { fileName } = await req.json();

    const params = {
      Bucket: process.env.CLOUD_AWS_S3_BUCKET_NAME, // Use your S3 bucket name
      Key: `orders/${fileName}`, // Set the correct path where images are stored in S3
    };

    const deleteCommand = new DeleteObjectCommand(params);
    await s3.send(deleteCommand);

    return new Response(JSON.stringify({ message: "Image removed successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error removing image from S3:", error);
    return new Response("Failed to remove image", { status: 500 });
  }
}
