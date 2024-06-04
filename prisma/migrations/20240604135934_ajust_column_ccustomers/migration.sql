/*
  Warnings:

  - You are about to drop the column `City` on the `customers` table. All the data in the column will be lost.
  - Added the required column `city` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customers` DROP COLUMN `City`,
    ADD COLUMN `city` VARCHAR(130) NOT NULL;
