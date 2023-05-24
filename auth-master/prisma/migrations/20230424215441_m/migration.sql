-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'employee';

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
