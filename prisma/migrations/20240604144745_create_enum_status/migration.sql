/*
  Warnings:

  - You are about to drop the column `status` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `customers` DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `status`;
