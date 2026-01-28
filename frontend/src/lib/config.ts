/**
 * Frontend configuration loaded from environment variables.
 */

interface Config {
  apiUrl: string;
}

export const config: Config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
};
