/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Department` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_employeeId_fkey";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "employeeId";

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "departmentId" TEXT;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
