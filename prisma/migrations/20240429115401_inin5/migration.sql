/*
  Warnings:

  - You are about to alter the column `datetime` on the `location2` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `location2` MODIFY `datetime` DATETIME NOT NULL;