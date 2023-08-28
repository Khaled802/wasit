-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "image" TEXT[],

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
