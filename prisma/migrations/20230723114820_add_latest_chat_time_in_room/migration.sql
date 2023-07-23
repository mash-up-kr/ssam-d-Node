/*
  Warnings:

  - A unique constraint covering the columns `[device_token]` on the table `device_token` will be added. If there are existing duplicate values, this will fail.

*/

-- AlterTable
ALTER TABLE `room` ADD COLUMN `latest_chat_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
