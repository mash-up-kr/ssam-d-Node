/*
  Warnings:

  - A unique constraint covering the columns `[device_token]` on the table `device_token` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `signal` DROP FOREIGN KEY `signal_room_id_fkey`;

-- AlterTable
ALTER TABLE `signal` MODIFY `room_id` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `device_token_device_token_key` ON `device_token`(`device_token`);

-- AddForeignKey
ALTER TABLE `signal` ADD CONSTRAINT `signal_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `room`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
