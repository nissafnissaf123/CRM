/*
  Warnings:

  - The `labels` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "labels",
ADD COLUMN     "labels" JSONB;
