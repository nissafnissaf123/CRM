/*
  Warnings:

  - You are about to drop the column `date` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `totalWithoutVat` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "date",
DROP COLUMN "totalWithoutVat",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "invoice" TEXT,
ADD COLUMN     "issueDate" TIMESTAMP(3),
ADD COLUMN     "projectId" TEXT,
ADD COLUMN     "total" TEXT;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
