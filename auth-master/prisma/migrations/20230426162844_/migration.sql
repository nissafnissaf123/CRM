/*
  Warnings:

  - You are about to drop the column `fullname` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Employee_fullname_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "fullname",
ADD COLUMN     "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_username_key" ON "Employee"("username");
