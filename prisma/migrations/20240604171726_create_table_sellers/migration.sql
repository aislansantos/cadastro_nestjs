-- AlterTable
ALTER TABLE `customers` MODIFY `status` ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo';

-- AlterTable
ALTER TABLE `users` MODIFY `status` ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo';

-- CreateTable
CREATE TABLE `sellers` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `status` ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
    `name` VARCHAR(63) NOT NULL,
    `email` VARCHAR(127) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
