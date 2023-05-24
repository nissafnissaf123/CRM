/*
  Warnings:

  - You are about to drop the `_LabelToTask` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `taskId` to the `Label` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_LabelToTask" DROP CONSTRAINT "_LabelToTask_A_fkey";

-- DropForeignKey
ALTER TABLE "_LabelToTask" DROP CONSTRAINT "_LabelToTask_B_fkey";

-- AlterTable
ALTER TABLE "Label" ADD COLUMN     "taskId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_LabelToTask";

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
