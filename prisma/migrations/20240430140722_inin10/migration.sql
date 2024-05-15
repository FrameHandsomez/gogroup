/*
  Warnings:

  - Made the column `introduction` on table `location2` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `location2` MODIFY `introduction` VARCHAR(100) NOT NULL;
