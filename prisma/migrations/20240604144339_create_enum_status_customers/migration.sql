/*
  Warnings:

  - You are about to drop the column `active` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `active`,
    ADD COLUMN `status` ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo';
