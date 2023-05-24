/*
  Warnings:

  - You are about to drop the column `emlpoyeeId` on the `Ticket` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_emlpoyeeId_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "emlpoyeeId",
ADD COLUMN     "employeeId" TEXT;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
