/*
  Warnings:

  - You are about to drop the column `batch_no` on the `pricing` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `pricing` table. All the data in the column will be lost.
  - You are about to drop the column `total_price` on the `pricing` table. All the data in the column will be lost.
  - You are about to drop the column `units` on the `pricing` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pl_name]` on the table `pricing` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "pricing" DROP COLUMN "batch_no",
DROP COLUMN "tax",
DROP COLUMN "total_price",
DROP COLUMN "units";

-- CreateIndex
CREATE UNIQUE INDEX "pricing_pl_name_key" ON "pricing"("pl_name");
