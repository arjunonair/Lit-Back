-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleID_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "roleID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleID_fkey" FOREIGN KEY ("roleID") REFERENCES "Roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
