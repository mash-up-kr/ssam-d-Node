/*
  Warnings:

  - You are about to alter the column `nickname` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(20)`.
  - A unique constraint covering the columns `[social_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `social_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `provider` VARCHAR(191) NOT NULL DEFAULT 'KAKAO',
    ADD COLUMN `refresh_token` VARCHAR(191) NULL,
    ADD COLUMN `social_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `nickname` VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_social_id_key` ON `User`(`social_id`);
