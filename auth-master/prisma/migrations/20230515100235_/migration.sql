-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "role" TEXT DEFAULT 'client';

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "role" TEXT DEFAULT 'employee';

-- AlterTable
ALTER TABLE "Trainee" ADD COLUMN     "role" TEXT DEFAULT 'trainee';
