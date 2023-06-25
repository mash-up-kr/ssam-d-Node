/*
  Warnings:

  - Added the required column `profile_image_url` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `profile_image_url` VARCHAR(191) NOT NULL;
