-- CreateTable
CREATE TABLE `User` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `FName` VARCHAR(100) NOT NULL,
    `LName` VARCHAR(100) NOT NULL,
    `Email` VARCHAR(100) NOT NULL,
    `Password` VARCHAR(100) NOT NULL,
    `Phone` INTEGER NOT NULL,
    `Usertype` ENUM('driver', 'Customer') NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
