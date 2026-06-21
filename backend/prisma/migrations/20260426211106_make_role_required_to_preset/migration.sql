/*
  Warnings:

  - Made the column `role` on table `Preset` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Preset" ALTER COLUMN "role" SET NOT NULL;
