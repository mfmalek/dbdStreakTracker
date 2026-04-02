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
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "user" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);
