/*
  Warnings:

  - A unique constraint covering the columns `[device_token]` on the table `DeviceToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `DeviceToken_device_token_key` ON `DeviceToken`(`device_token`);
