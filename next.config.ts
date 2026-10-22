import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  cacheComponents: true,
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  experimental: {
    agentUpgrade: "security",
  },
};

export default withNextIntl(nextConfig);
