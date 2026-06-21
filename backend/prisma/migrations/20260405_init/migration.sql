-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurvivorConfig" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SurvivorConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preset" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "survivor" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "perks" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Preset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "user" TEXT,
    "mode" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "groupId" INTEGER,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Streak" (
    "id" SERIAL NOT NULL,
    "user" TEXT,
    "mode" TEXT NOT NULL,
    "best" INTEGER NOT NULL DEFAULT 0,
    "groupId" INTEGER,

    CONSTRAINT "Streak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupMember" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "mode" TEXT NOT NULL,

    CONSTRAINT "GroupMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreakGroup" (
    "id" SERIAL NOT NULL,
    "mode" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StreakGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "Preset_user_mode_survivor_idx" ON "Preset"("user", "mode", "survivor");

-- CreateIndex
CREATE UNIQUE INDEX "Streak_user_mode_key" ON "Streak"("user", "mode");

-- CreateIndex
CREATE UNIQUE INDEX "Streak_groupId_mode_key" ON "Streak"("groupId", "mode");

-- CreateIndex
CREATE UNIQUE INDEX "GroupMember_username_mode_key" ON "GroupMember"("username", "mode");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "StreakGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Streak" ADD CONSTRAINT "Streak_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "StreakGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "StreakGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

