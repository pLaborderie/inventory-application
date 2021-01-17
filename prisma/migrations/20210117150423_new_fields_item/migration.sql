/*
  Warnings:

  - Added the required column `price` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0;
