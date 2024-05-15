/*
  Warnings:

  - You are about to drop the column `FName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `LName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `Phone` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `Usertype` on the `user` table. All the data in the column will be lost.
  - Added the required column `Address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DateCreated` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserType` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `location` ADD COLUMN `postCode` VARCHAR(10) NULL,
    MODIFY `Name` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `FName`,
    DROP COLUMN `LName`,
    DROP COLUMN `Phone`,
    DROP COLUMN `Usertype`,
    ADD COLUMN `Address` VARCHAR(1000) NOT NULL,
    ADD COLUMN `DateCreated` DATETIME NOT NULL,
    ADD COLUMN `Name` VARCHAR(100) NOT NULL,
    ADD COLUMN `UserType` ENUM('Driver', 'Customer') NOT NULL,
    MODIFY `Email` VARCHAR(200) NOT NULL;
