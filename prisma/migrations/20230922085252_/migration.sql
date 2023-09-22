-- CreateTable
CREATE TABLE "Snippet" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Snippet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Snippet_uuid_key" ON "Snippet"("uuid");
