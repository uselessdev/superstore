-- CreateTable
CREATE TABLE "medias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pathname" TEXT NOT NULL,
    "description" TEXT,
    "size" INTEGER NOT NULL,
    "version" INTEGER DEFAULT 1,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME
);
