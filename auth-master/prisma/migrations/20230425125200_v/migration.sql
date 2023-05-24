/*
  Warnings:

  - You are about to drop the column `name` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Trainee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "Trainee" DROP COLUMN "name";
