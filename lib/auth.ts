import { db } from "@/db/drizzle";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { schema } from "@/db/schema";


export const auth = betterAuth({

    emailAndPassword: {
        enabled: true,
    },


    database: drizzleAdapter(db, {
        provider: "pg",
        schema
    }),
});