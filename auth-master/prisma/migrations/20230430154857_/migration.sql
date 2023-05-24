/*
  Warnings:

  - You are about to drop the column `website` on the `Client` table. All the data in the column will be lost.
  - Made the column `fullname` on table `Client` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "website",
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "fullname" SET NOT NULL;
