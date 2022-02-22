/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ['s3.us-west-2.amazonaws.com'],
  },
  reactStrictMode: true,
};
