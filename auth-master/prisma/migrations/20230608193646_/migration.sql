/*
  Warnings:

  - You are about to drop the column `phone` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the `Trainee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trainee" DROP CONSTRAINT "Trainee_userId_fkey";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT;

-- DropTable
DROP TABLE "Trainee";
