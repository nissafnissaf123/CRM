/*
  Warnings:

  - You are about to drop the column `username` on the `Employee` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Employee_username_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "username",
ADD COLUMN     "fullname" TEXT;
