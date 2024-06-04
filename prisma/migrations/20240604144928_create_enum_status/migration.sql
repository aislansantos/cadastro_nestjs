-- AlterTable
ALTER TABLE `customers` ADD COLUMN `status` ENUM('ativo', 'inativo') NOT NULL DEFAULT 'inativo';

-- AlterTable
ALTER TABLE `users` ADD COLUMN `status` ENUM('ativo', 'inativo') NOT NULL DEFAULT 'inativo';
