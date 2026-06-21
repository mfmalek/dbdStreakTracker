-- CreateIndex
CREATE INDEX "Match_user_mode_role_killerName_createdAt_idx" ON "Match"("user", "mode", "role", "killerName", "createdAt");

-- CreateIndex
CREATE INDEX "Match_groupId_mode_role_killerName_createdAt_idx" ON "Match"("groupId", "mode", "role", "killerName", "createdAt");
