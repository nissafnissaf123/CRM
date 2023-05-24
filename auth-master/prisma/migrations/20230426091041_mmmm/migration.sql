/*
  Warnings:

  - The `emergencyLevel` column on the `Ticket` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EnumTicketPriority" AS ENUM ('Low', 'Medium', 'High');

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "avatar" TEXT;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "avatar" TEXT;

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "emergencyLevel",
ADD COLUMN     "emergencyLevel" "EnumTicketPriority";

-- AlterTable
ALTER TABLE "Trainee" ADD COLUMN     "avatar" TEXT;
