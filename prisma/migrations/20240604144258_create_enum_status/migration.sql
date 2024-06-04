/*
  Warnings:

  - You are about to drop the column `active` on the `customers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `customers` DROP COLUMN `active`,
    ADD COLUMN `status` ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo';
