import dotenv from "dotenv";

dotenv.config({
    quiet: true
});

export const ENV = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    AI_API_KEY: process.env.AI_API_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    FRONTEND_URL: process.env.FRONTEND_URL,

    AI_GUESS_THE_OUTPUT_API: process.env.AI_GUESS_THE_OUTPUT_API,
    AI_REGEX_RUSH_API: process.env.AI_REGEX_RUSH_API,
    AI_TYPING_SPEED_TEST_API: process.env.AI_TYPING_SPEED_TEST_API,
    AI_BUG_HUNT_API: process.env.AI_BUG_HUNT_API,
    AI_BINARY_CLICKER_API: process.env.AI_BINARY_CLICKER_API,
    AI_SHORTCUT_NINJA_API: process.env.AI_SHORTCUT_NINJA_API,
    AI_EMOJI_PICTIONARY_API: process.env.AI_EMOJI_PICTIONARY_API,
};

