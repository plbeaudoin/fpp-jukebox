import type { NextConfig } from "next";

module.exports = {
  output: 'export',
  images: { unoptimized: true },
  env: {
    SUPABASE_URL: "MISSING",
    SUPABASE_KEY: "FILL ME IN",
  },
}
