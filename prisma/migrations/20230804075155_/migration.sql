/*
  Warnings:

  - A unique constraint covering the columns `[device_token]` on the table `device_token` will be added. If there are existing duplicate values, this will fail.

*/

-- AlterTable
ALTER TABLE `user` MODIFY `agree_alarm` BOOLEAN NOT NULL DEFAULT true;


