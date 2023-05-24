-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "emlpoyeeId" TEXT;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_emlpoyeeId_fkey" FOREIGN KEY ("emlpoyeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
