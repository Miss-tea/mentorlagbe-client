import dns from "node:dns";
if (process.env.NODE_ENV !== "production") dns.setServers(["8.8.8.8", "1.1.1.1"]);import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { APIError } from "better-auth/api";
import { MongoClient } from "mongodb";

// Reuse one Mongo connection (Next.js dev mode reloads files often)
const client = globalThis._mongoClient ?? new MongoClient(process.env.MONGODB_URI);
if (process.env.NODE_ENV !== "production") globalThis._mongoClient = client;
const db = client.db(process.env.DB_NAME);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db),

  emailAndPassword: { enabled: true, minPasswordLength: 6 },

  user: {
    modelName: "users", // use the collection name from your assignment
    additionalFields: {
      role: { type: "string", required: false, defaultValue: "student" },
      plan: { type: "string", required: false, defaultValue: "free", input: false },
      phone: { type: "string", required: false },
      bio: { type: "string", required: false },
    },
  },

  // SECURITY: runs before every user is saved or updated
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Anyone can choose student or tutor. Anything else (like "admin") becomes student.
          const role = user.role === "tutor" ? "tutor" : "student";
          return { data: { ...user, role } };
        },
      },
      update: {
        before: async (data) => {
          // Users may never change their own role or plan through the auth API
          if (data.role !== undefined || data.plan !== undefined) {
            throw new APIError("FORBIDDEN", { message: "You cannot change role or plan" });
          }
          return { data };
        },
      },
    },
  },

  plugins: [jwt(), nextCookies()], // nextCookies must be LAST
});
