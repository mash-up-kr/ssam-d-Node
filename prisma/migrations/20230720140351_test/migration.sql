/*
  Warnings:

  - A unique constraint covering the columns `[device_token]` on the table `device_token` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `signal_room_id_fkey` ON `signal`;

-- CreateIndex
CREATE UNIQUE INDEX `device_token_device_token_key` ON `device_token`(`device_token`);
