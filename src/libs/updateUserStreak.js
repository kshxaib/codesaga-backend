import { db } from './db.js';

export const updateUserStreak = async (userId) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId }
    });

    if (!user) return;

    const today = new Date();
    const lastSolved = user.lastSolvedDate;

    console.log(`[Streak] User: ${user.username || userId}`);
    console.log(`[Streak] lastSolved: ${lastSolved ? lastSolved.toISOString() : 'Never'}`);
    console.log(`[Streak] today: ${today.toISOString()}`);

    // Case 1: Already solved today — don't update
    if (lastSolved && isSameDay(today, lastSolved)) {
      console.log("✅ Already submitted today, not updating streak.");
      return;
    }

    // Case 2: Solved yesterday — increment streak
    // Case 3: Missed a day — reset streak to 1
    const consecutive = lastSolved && isConsecutiveDay(today, lastSolved);
    const newStreak = consecutive ? user.currentStreak + 1 : 1;

    console.log(`[Streak] Consecutive: ${consecutive}, Previous Streak: ${user.currentStreak}, New Streak: ${newStreak}`);

    await db.user.update({
      where: { id: userId },
      data: {
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, user.longestStreak),
        lastSolvedDate: today
      }
    });

    console.log(`🔥 Streak updated to ${newStreak}`);
  } catch (error) {
    console.error("❌ Error while updating user's streak:", error);
  }
};

// Helper: Check if two dates are on the same day (Local Time)
const isSameDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

// Helper: Check if date1 is exactly one day after date2 (Local Time)
const isConsecutiveDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Set both to midnight local time for comparison
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  const diffTime = d1.getTime() - d2.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  return diffDays === 1;
};
