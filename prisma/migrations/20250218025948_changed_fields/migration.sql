/*
  Warnings:

  - You are about to drop the column `number_phone` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone_number]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "users_number_phone_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "number_phone",
ADD COLUMN     "phone_number" VARCHAR(20);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_number_key" ON "users"("phone_number");
