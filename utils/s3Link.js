export function transformLink(originalLink) {
  // Updated regex pattern to match the expected S3 URL format
  const pattern =
    /^https:\/\/([a-zA-Z0-9.-]+)\.s3\.([a-zA-Z0-9-]+)\.amazonaws\.com\/(.+)/;
  const match = originalLink.match(pattern);

  if (!match) {
    throw new Error("Invalid URL format");
  }

  const bucket = match[1]; // Bucket name (e.g., "yst.images")
  const region = match[2]; // Region (e.g., "us-east-1")
  const path = match[3]; // Path (e.g., "orders/temp/...img1.jpg")

  // Construct the transformed URL
  return `https://s3.${region}.amazonaws.com/${bucket}/${path}`;
}

// Example usage
try {
  const originalLink =
    "https://yst.images.s3.us-east-1.amazonaws.com/orders/temp/a2af5e80-03c0-43b1-b6a9-833cc6ad01e5-img1.jpg";
  const transformedLink = transformLink(originalLink);
  //   console.log(transformedLink);
  // Output: "https://s3.us-east-1.amazonaws.com/yst.images/orders/temp/a2af5e80-03c0-43b1-b6a9-833cc6ad01e5-img1.jpg"
} catch (error) {
  console.error(error.message);
}
