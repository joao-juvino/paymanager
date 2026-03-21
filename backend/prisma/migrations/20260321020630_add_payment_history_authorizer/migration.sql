-- AlterTable
ALTER TABLE `Payment` ADD COLUMN `authorizedAt` DATETIME(3) NULL,
    ADD COLUMN `authorizedById` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_authorizedById_fkey` FOREIGN KEY (`authorizedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
