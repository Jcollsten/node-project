/*
  Warnings:

  - You are about to drop the column `memberId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_memberId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "memberId";

-- DropTable
DROP TABLE "member";
