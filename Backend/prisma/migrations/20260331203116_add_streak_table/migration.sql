-- CreateTable
CREATE TABLE "Streak" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "best" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Streak_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Streak_user_mode_key" ON "Streak"("user", "mode");
