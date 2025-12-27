// import VerificationEmail from "@/components/emails/verification-email";
// import { db } from "@/db/drizzle";
// import { schema } from "@/db/schema";
// import { betterAuth } from "better-auth";
// import { drizzleAdapter } from "better-auth/adapters/drizzle";
// import { nextCookies } from "better-auth/next-js";
// import { Resend } from "resend"


// const resend = new Resend(process.env.RESEND_API_KEY!);

// export const auth = betterAuth({
//     emailVerification: {
//         sendVerificationEmail: async  ({ user, url, token}, request) => {
//             const { data, error } = await resend.emails.send({
//                 from: "Notiva <jasanizeel487@gmail.com>",
//                 to: user.email,
//                 subject: "Verify your email address",
//                 text: `Click the link to verify your email: ${url}`,
//                 react: VerificationEmail({userName: user.name, verificationUrl: url}),
//             });
//         },
//         sendOnSignIn: true,
//     },
//     emailAndPassword: {
//         enabled: true,
//     },
//     database: drizzleAdapter(db, {
//         provider: "pg",
//         schema
//     }),
//     plugins: [nextCookies()]
// });





// import PasswordResetEmail from "@/components/emails/reset-email";
import PasswordResetEmail from "@/components/emails/reset-email";
import VerificationEmail from "@/components/emails/verification-email";
import { db } from "@/db/drizzle";
import { schema } from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set in environment variables');
    throw new Error('Email service is not properly configured');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            try {
                console.log(`Sending verification email to: ${user.email}`);
                const { data, error } = await resend.emails.send({
                    from: 'Notiva <onboarding@resend.dev>',
                    to: [user.email],
                    subject: 'Verify your email address',
                    react: VerificationEmail({ userName: user.name, verificationUrl: url }),
                    text: `Please verify your email by clicking this link: ${url}`,
                });

                if (error) {
                    console.error('Email verification failed:', error);
                    throw new Error(`Failed to send verification email: ${error.message}`);
                }

                console.log('Verification email sent successfully to:', user.email);
                console.log('Email ID:', data?.id);
            } catch (error) {
                console.error('Error in sendVerificationEmail:', error);
                throw error;
            }
        },
        sendOnSignUp: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            try {
                console.log(`Sending password reset email to: ${user.email}`);
                const { data, error } = await resend.emails.send({
                    from: 'Notiva <onboarding@resend.dev>',
                    to: [user.email],
                    subject: 'Reset your password',
                    react: PasswordResetEmail({
                        userName: user.name,
                        resetUrl: url,
                        requestTime: new Date().toLocaleString()
                    }),
                    text: `You requested to reset your password. Click here to reset it: ${url}`,
                });

                if (error) {
                    console.error('Password reset email failed:', error);
                    throw new Error(`Failed to send password reset email: ${error.message}`);
                }

                console.log('Password reset email sent successfully to:', user.email);
                console.log('Email ID:', data?.id);
            } catch (error) {
                console.error('Error in sendResetPassword:', error);
                throw error;
            }
        },
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema
    }),
    plugins: [nextCookies()]
});