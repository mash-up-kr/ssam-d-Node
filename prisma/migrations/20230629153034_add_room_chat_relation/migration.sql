/*
  Warnings:

  - You are about to drop the column `receiver_id` on the `chat` table. All the data in the column will be lost.
  - Added the required column `room_id` to the `chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `chat` DROP FOREIGN KEY `chat_receiver_id_fkey`;

-- DropForeignKey
ALTER TABLE `signal` DROP FOREIGN KEY `signal_room_id_fkey`;

-- AlterTable
ALTER TABLE `chat` DROP COLUMN `receiver_id`,
    ADD COLUMN `room_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `signal` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `chat` ADD CONSTRAINT `chat_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
