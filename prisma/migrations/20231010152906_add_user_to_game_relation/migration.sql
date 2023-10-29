-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "team1" TEXT NOT NULL,
    "team2" TEXT NOT NULL,
    "team1result" INTEGER NOT NULL,
    "team2result" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
