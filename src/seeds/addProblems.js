/**
 * SEED SCRIPT - Add Sample Problems to CodeSaga
 * 
 * SETUP INSTRUCTIONS:
 * 1. Login to your CodeSaga platform as ADMIN
 * 2. Open browser DevTools (F12) -> Application/Storage -> Cookies
 * 3. Find the cookie named "token" and copy its value
 * 4. Paste the token value in the COOKIE_TOKEN constant below
 * 5. Make sure your backend server is running on http://localhost:8080
 * 6. Run this script: node src/seeds/addProblems.js
 */

import axios from "axios";
import {
    sampleStringBasic1,
    sampleMathBasic2,
    sampleMathBasic3
} from "./problems.js";

// ========== CONFIGURATION ==========
const API_URL = "http://localhost:8080/api/v1/problems/create-problem";

// PASTE YOUR ADMIN JWT TOKEN HERE (from browser cookies)
const COOKIE_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRjZjliOTExLThlNGEtNGVjZi1hODZmLTJmNzkzYzkyMGY3YiIsImlhdCI6MTc3MDE0Nzk3NSwiZXhwIjoxNzcwNzUyNzc1fQ.OUt30E5nagLv2H5dntyL50AmIXmrlLs41BiqLiIp-SE";

// List of problems to seed
const problems = [
    sampleStringBasic1,
    sampleMathBasic2,
    sampleMathBasic3
];

// ========== SCRIPT ==========
async function addProblems() {
    console.log("🚀 Starting to seed problems...\n");

    // Validate token
    if (COOKIE_TOKEN === "PASTE_YOUR_ADMIN_JWT_TOKEN_HERE" || !COOKIE_TOKEN) {
        console.error("❌ ERROR: Please set your ADMIN JWT token first!");
        console.log("\n📝 Instructions:");
        console.log("1. Login as ADMIN on http://localhost:5173");
        console.log("2. Open DevTools (F12) -> Application -> Cookies");
        console.log("3. Copy the 'token' cookie value");
        console.log("4. Paste it in the COOKIE_TOKEN constant in this file\n");
        return;
    }

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < problems.length; i++) {
        const problem = problems[i];

        try {
            console.log(`[${i + 1}/${problems.length}] Adding: "${problem.title}"...`);

            const res = await axios.post(API_URL, problem, {
                headers: {
                    "Cookie": `token=${COOKIE_TOKEN}`,
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (res.data.success) {
                console.log(`✅ Success: "${problem.title}"\n`);
                successCount++;
            } else {
                console.log(`⚠️  Warning: "${problem.title}" - ${res.data.message}\n`);
                failCount++;
            }

        } catch (err) {
            console.error(`❌ Failed: "${problem.title}"`);

            if (err.response) {
                // Server responded with error
                console.error(`   Status: ${err.response.status}`);
                console.error(`   Message: ${err.response.data.message || err.response.statusText}`);

                if (err.response.status === 401 || err.response.status === 403) {
                    console.error("\n🔒 Authentication Error!");
                    console.error("Your token might be expired or invalid.");
                    console.error("Please get a fresh token from browser cookies.\n");
                    break; // Stop execution on auth error
                }
            } else if (err.request) {
                // Request made but no response
                console.error("   Error: No response from server");
                console.error("   Make sure your backend is running on http://localhost:8080\n");
                break;
            } else {
                // Something else
                console.error(`   Error: ${err.message}\n`);
            }

            failCount++;
        }
    }

    // Summary
    console.log("\n" + "=".repeat(50));
    console.log("📊 SEED SUMMARY");
    console.log("=".repeat(50));
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);
    console.log(`📝 Total: ${problems.length}`);
    console.log("=".repeat(50) + "\n");
}

// Run the script
addProblems().catch(err => {
    console.error("\n💥 Unexpected error:", err);
    process.exit(1);
});
