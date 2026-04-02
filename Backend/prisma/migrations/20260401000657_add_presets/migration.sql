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

-- CreateIndex
CREATE INDEX "Preset_user_mode_survivor_idx" ON "Preset"("user", "mode", "survivor");
