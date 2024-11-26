module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "",
      "images.pexels.com",
      "printify.com",
      "yst.images.s3.us-east-1.amazonaws.com",
      "s3.amazonaws.com",
      "s3.us-east-1.amazonaws.com",
      "google.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
      },
    ],
  },
};
