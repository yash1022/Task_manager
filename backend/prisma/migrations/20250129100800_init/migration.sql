/*
  Warnings:

  - Added the required column `userid` to the `flashcards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `subjects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `flashcards` ADD COLUMN `userid` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `subjects` ADD COLUMN `userid` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `subjects` ADD CONSTRAINT `subjects_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `flashcards` ADD CONSTRAINT `flashcards_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
