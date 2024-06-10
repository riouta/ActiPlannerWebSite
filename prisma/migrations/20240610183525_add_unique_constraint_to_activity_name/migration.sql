/*
  Warnings:

  - Made the column `adress` on table `Activity` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Activity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "date" DATETIME NOT NULL,
    "time" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Activity" ("adress", "date", "description", "id", "name", "time", "userId") SELECT "adress", "date", "description", "id", "name", "time", "userId" FROM "Activity";
DROP TABLE "Activity";
ALTER TABLE "new_Activity" RENAME TO "Activity";
CREATE UNIQUE INDEX "Activity_name_key" ON "Activity"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
