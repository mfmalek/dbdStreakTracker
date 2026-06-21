-- DropIndex
DROP INDEX "Preset_user_mode_survivor_idx";

-- AlterTable
ALTER TABLE "Preset" ADD COLUMN     "killerName" TEXT,
ADD COLUMN     "role" TEXT,
ALTER COLUMN "survivor" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Preset_user_mode_role_killerName_idx" ON "Preset"("user", "mode", "role", "killerName");

-- CreateIndex
CREATE INDEX "Preset_user_mode_role_survivor_idx" ON "Preset"("user", "mode", "role", "survivor");
