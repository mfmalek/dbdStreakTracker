/*
  Warnings:

  - Made the column `role` on table `Match` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `Streak` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "role" SET NOT NULL;

-- AlterTable
ALTER TABLE "Streak" ALTER COLUMN "role" SET NOT NULL;
