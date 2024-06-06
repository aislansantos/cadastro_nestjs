/*
  Warnings:

  - You are about to drop the column `city` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `customers` table. All the data in the column will be lost.
  - You are about to alter the column `email` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `VarChar(130)` to `VarChar(14)`.
  - Added the required column `bairro` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cidade` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rua` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customers` DROP COLUMN `city`,
    DROP COLUMN `lastname`,
    DROP COLUMN `name`,
    ADD COLUMN `bairro` VARCHAR(50) NOT NULL,
    ADD COLUMN `cidade` VARCHAR(120) NOT NULL,
    ADD COLUMN `complemento` VARCHAR(50) NULL,
    ADD COLUMN `estado` VARCHAR(2) NOT NULL,
    ADD COLUMN `nome` VARCHAR(120) NOT NULL,
    ADD COLUMN `nomefantasia` VARCHAR(120) NULL,
    ADD COLUMN `numero` VARCHAR(5) NOT NULL,
    ADD COLUMN `rua` VARCHAR(130) NOT NULL,
    ADD COLUMN `telefone` VARCHAR(14) NOT NULL,
    MODIFY `email` VARCHAR(14) NOT NULL;
