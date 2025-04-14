/*
  Warnings:

  - You are about to drop the column `timestamp` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "timestamp",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);
