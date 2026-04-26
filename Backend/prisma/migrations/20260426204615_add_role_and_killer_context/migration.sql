/*
  Warnings:

  - A unique constraint covering the columns `[user,mode,role,killerName]` on the table `Streak` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupId,mode,role,killerName]` on the table `Streak` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Streak_groupId_mode_key";

-- DropIndex
DROP INDEX "Streak_user_mode_key";

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "killerName" TEXT,
ADD COLUMN     "role" TEXT;

-- AlterTable
ALTER TABLE "Streak" ADD COLUMN     "killerName" TEXT,
ADD COLUMN     "role" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Streak_user_mode_role_killerName_key" ON "Streak"("user", "mode", "role", "killerName");

-- CreateIndex
CREATE UNIQUE INDEX "Streak_groupId_mode_role_killerName_key" ON "Streak"("groupId", "mode", "role", "killerName");
