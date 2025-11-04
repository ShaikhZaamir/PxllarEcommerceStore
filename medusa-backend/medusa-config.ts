import { loadEnv, defineConfig } from "@medusajs/framework/utils"

// Load .env variables (from medusa-backend/.env)
loadEnv(process.env.NODE_ENV || "development", process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      // Use env variables (comma-separated list is allowed)
      storeCors: process.env.STORE_CORS || "http://localhost:8000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7000",
      authCors: process.env.AUTH_CORS || "http://localhost:8000",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  plugins: [
    {
      resolve: "medusa-payment-manual",
      options: {
        display_name: "Cash on Delivery",
        is_enabled: true,
      },
    },
  ],
})
