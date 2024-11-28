-- CreateTable
CREATE TABLE "customer" (
    "cid" INTEGER NOT NULL,
    "name" VARCHAR(75),
    "phone" INTEGER,
    "email" VARCHAR(75),
    "age" INTEGER,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "nurseplant" (
    "name" VARCHAR(75) NOT NULL,
    "batch_no" INTEGER NOT NULL,
    "loc" VARCHAR(25),
    "stock" INTEGER,

    CONSTRAINT "nurseplant_pkey" PRIMARY KEY ("name","batch_no")
);

-- CreateTable
CREATE TABLE "plant" (
    "name" VARCHAR(75) NOT NULL,
    "water" VARCHAR(10),
    "sunlight" VARCHAR(10),
    "lifespan" INTEGER,
    "height" REAL,
    "fruit_nut" CHAR(1),
    "soil_ph" REAL,
    "temperature" REAL,
    "fertilizer" VARCHAR(25),
    "pest" VARCHAR(75),
    "comp_plants" VARCHAR(75),

    CONSTRAINT "plant_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "pricing" (
    "id" SERIAL NOT NULL,
    "pl_name" VARCHAR(75) NOT NULL,
    "batch_no" INTEGER NOT NULL,
    "units" INTEGER,
    "unit_price" REAL,
    "total_price" REAL,
    "tax" REAL,

    CONSTRAINT "pricing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seed" (
    "pl_name" VARCHAR(75) NOT NULL,
    "sid" INTEGER NOT NULL,
    "quantity" INTEGER,
    "price" REAL,
    "germination" interval,
    "temp" REAL,
    "humidity" VARCHAR(10),
    "prop_time" interval,
    "expiration_date" DATE,

    CONSTRAINT "seed_pkey" PRIMARY KEY ("sid","pl_name")
);

-- CreateTable
CREATE TABLE "supplier" (
    "sid" INTEGER NOT NULL,
    "name" VARCHAR(75),
    "phone" INTEGER,
    "email" VARCHAR(75),
    "address" VARCHAR(150),
    "lead_time" interval,

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "adminuser" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "email" TEXT,
    "hashedpassword" TEXT,

    CONSTRAINT "adminuser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "nurseplant" ADD CONSTRAINT "nurseplant_name_fkey" FOREIGN KEY ("name") REFERENCES "plant"("name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pricing" ADD CONSTRAINT "pricing_pl_name_fkey" FOREIGN KEY ("pl_name") REFERENCES "plant"("name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seed" ADD CONSTRAINT "seed_pl_name_fkey" FOREIGN KEY ("pl_name") REFERENCES "plant"("name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "seed" ADD CONSTRAINT "seed_sid_fkey" FOREIGN KEY ("sid") REFERENCES "supplier"("sid") ON DELETE NO ACTION ON UPDATE NO ACTION;
