-- CreateEnum
CREATE TYPE "OrderPaymentStatus" AS ENUM ('UNPAID', 'PAID', 'FAILED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentStatus" "OrderPaymentStatus" NOT NULL DEFAULT 'UNPAID',
ADD COLUMN     "vendorPaymentStatus" "OrderPaymentStatus" NOT NULL DEFAULT 'UNPAID';
