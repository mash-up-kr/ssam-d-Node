-- AlterTable
ALTER TABLE `room_user` ADD COLUMN `is_chat_read` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `room_user_user_id_room_id_key` ON `room_user`(`user_id`, `room_id`);
