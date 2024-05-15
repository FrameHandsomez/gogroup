-- CreateTable
CREATE TABLE `Location2` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `start` VARCHAR(200) NOT NULL,
    `end` VARCHAR(10) NULL,
    `datetime` VARCHAR(100) NOT NULL,
    `personSelect` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
