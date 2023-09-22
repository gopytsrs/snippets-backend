/*
  Warnings:

  - You are about to drop the column `date` on the `Snippet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
