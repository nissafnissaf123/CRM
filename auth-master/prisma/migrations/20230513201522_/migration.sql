/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Trainee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Trainee_email_key" ON "Trainee"("email");
