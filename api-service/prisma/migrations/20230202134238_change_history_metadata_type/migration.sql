/*
  Warnings:

  - Changed the type of `metadata` on the `histories` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "histories" DROP COLUMN "metadata",
ADD COLUMN     "metadata" JSONB NOT NULL;
