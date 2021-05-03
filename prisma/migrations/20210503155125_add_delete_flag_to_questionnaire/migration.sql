-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Questionnaire" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "state" INTEGER NOT NULL,
    "startAt" DATETIME NOT NULL,
    "endAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" DATETIME
);
INSERT INTO "new_Questionnaire" ("id", "title", "description", "state", "startAt", "endAt", "createdAt", "updatedAt") SELECT "id", "title", "description", "state", "startAt", "endAt", "createdAt", "updatedAt" FROM "Questionnaire";
DROP TABLE "Questionnaire";
ALTER TABLE "new_Questionnaire" RENAME TO "Questionnaire";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
