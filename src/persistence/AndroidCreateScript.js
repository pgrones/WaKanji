export const createScript = [`
DROP TABLE IF EXISTS "Kanji";`,
        `DROP TABLE IF EXISTS "Grade";`,
        `DROP TABLE IF EXISTS "Settings";`,
        `CREATE TABLE "Grade" (
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
"grade" TEXT NOT NULL
);`,
        `

CREATE TABLE "Kanji" (
 "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
 "kanji" TEXT NOT NULL,
 "kunReading" TEXT,
 "onReading" TEXT,
 "translation" TEXT NOT NULL,
 "gradeId" INTEGER NOT NULL
);`,

        `

CREATE TABLE "Settings" (
 "type" TEXT NOT NULL,
 "value" TEXT NOT NULL
);`,
        `

INSERT INTO "Grade" ("id", "grade") VALUES ('1', '1st Grade  小一');`,`
INSERT INTO "Grade" ("id", "grade") VALUES ('2', '2nd Grade  小二');`,`
INSERT INTO "Grade" ("id", "grade") VALUES ('3', '3rd Grade  小三');`,`
INSERT INTO "Grade" ("id", "grade") VALUES ('4', '4th Grade  小四');`,`
INSERT INTO "Grade" ("id", "grade") VALUES ('5', '5th Grade  小五');`,`
INSERT INTO "Grade" ("id", "grade") VALUES ('6', '6th Grade  小六');`,`
INSERT INTO "Grade" ("id", "grade") VALUES ('7', '7th Grade  中一');`,`
INSERT INTO "Grade" ("id", "grade") VALUES ('8', '8th Grade  中二');`,`
INSERT INTO "Grade" ("id", "grade") VALUES ('9', '9th Grade  中三');`,`
INSERT INTO "Grade" ("id", "grade") VALUES ('10', '10th Grade  高一');`,`
INSERT INTO "Grade" ("id", "grade") VALUES ('11', '11th Grade  高二');`,`
INSERT INTO "Grade" ("id", "grade") VALUES ('12', '12th Grade  高三');`,`

INSERT INTO "Settings" ("type", "value") VALUES ('theme', 'dark');
`];
