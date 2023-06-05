/*
  Warnings:

  - You are about to drop the `Label` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Label" DROP CONSTRAINT "Label_taskId_fkey";

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "read" BOOLEAN;

-- DropTable
DROP TABLE "Label";
