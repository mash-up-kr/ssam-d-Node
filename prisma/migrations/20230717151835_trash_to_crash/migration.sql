/*
  Warnings:

  - You are about to drop the `trash` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[device_token]` on the table `device_token` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `trash` DROP FOREIGN KEY `trash_user_id_fkey`;

-- DropIndex
DROP INDEX `signal_room_id_fkey` ON `signal`;

-- DropTable
DROP TABLE `trash`;

-- CreateTable
CREATE TABLE `crash` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `keywords` VARCHAR(191) NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `device_token_device_token_key` ON `device_token`(`device_token`);

-- AddForeignKey
ALTER TABLE `crash` ADD CONSTRAINT `crash_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
