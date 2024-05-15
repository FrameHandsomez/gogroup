/*
  Warnings:

  - Added the required column `introduction` to the `Location2` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `location2` ADD COLUMN `introduction` VARCHAR(100) NOT NULL;
