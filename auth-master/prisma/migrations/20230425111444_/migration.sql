/*
  Warnings:

  - You are about to drop the column `user.email` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `user.firstName` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `user.lastName` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "user.email",
DROP COLUMN "user.firstName",
DROP COLUMN "user.lastName";
