/*
  Warnings:

  - You are about to drop the column `userId` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Trainee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "userId",
ADD COLUMN     "password" TEXT;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Trainee" DROP COLUMN "userId";
