/*
  Warnings:

  - You are about to alter the column `status` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `status` ENUM('ativo', 'inativo') NOT NULL DEFAULT 'inativo';
