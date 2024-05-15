/*
  Warnings:

  - You are about to drop the column `Address` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `DateCreated` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `Address`,
    DROP COLUMN `DateCreated`;
