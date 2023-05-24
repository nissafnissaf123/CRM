/*
  Warnings:

  - You are about to drop the column `username` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fullname]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Employee_username_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "username",
ADD COLUMN     "fullname" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_fullname_key" ON "Employee"("fullname");
