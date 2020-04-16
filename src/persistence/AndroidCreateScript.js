//for (let i = 0; i < createScript.length; i++) {
//         executeTransaction(createScript[i], [])
//     }
//     setDbLoaded(true);

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
 "kunReading" TEXT NOT NULL,
 "onReading" TEXT NOT NULL,
 "translation" TEXT NOT NULL,
 "gradeId" INTEGER NOT NULL,
 "gotIt" INTEGER NOT NULL
);`,

        `

CREATE TABLE "Settings" (
 "type" TEXT NOT NULL,
 "value" TEXT NOT NULL
);`,
        `

INSERT INTO "Grade" ("id", "grade") VALUES ('1', '1st Grade  小一');`, `
INSERT INTO "Grade" ("id", "grade") VALUES ('2', '2nd Grade  小二');`, `
INSERT INTO "Grade" ("id", "grade") VALUES ('3', '3rd Grade  小三');`, `
INSERT INTO "Grade" ("id", "grade") VALUES ('4', '4th Grade  小四');`, `
INSERT INTO "Grade" ("id", "grade") VALUES ('5', '5th Grade  小五');`, `
INSERT INTO "Grade" ("id", "grade") VALUES ('6', '6th Grade  小六');`, `
INSERT INTO "Grade" ("id", "grade") VALUES ('7', '7th Grade  中一');`, `
INSERT INTO "Grade" ("id", "grade") VALUES ('8', '8th Grade  中二');`, `
INSERT INTO "Grade" ("id", "grade") VALUES ('9', '9th Grade  中三');`, `

INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('1', '一', 'ひと', 'イチ, イツ', 'One', '1', '1');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('2', '二', 'ふた', 'ニ', 'Two', '1', '1');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('3', '三', 'み', 'サン', 'Three', '1', '1');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('4', '四', 'よ, よん', 'シ', 'Four', '1', '1');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('5', '五', 'いつ', 'ゴ', 'Five', '1', '1');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('6', '六', 'む, むい', 'ロク', 'Six', '1', '1');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('7', '七', 'なな, なの', 'シチ', 'Seven', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('8', '八', 'や, よう', 'ハチ', 'Eight', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('9', '九', 'ここの', 'キュウ、ク', 'Nine', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('10', '十', 'とお, と', 'ジュウ, ジュッ, ジッ', 'Ten', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('11', '百', 'もも', 'ヒャク', 'Hundred', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('12', '千', 'ち', 'セン', 'Thousand', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('13', '日', 'ひ, か', 'ニチ, ジツ', 'Day, Sun', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('14', '月', 'つき', 'ゲツ, ガツ', 'Month, Moon', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('15', '火', 'ひ', 'カ', 'Fire', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('16', '水', 'みず', 'スイ', 'Water', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('17', '木', 'き, こ', 'オク, モク', 'Tree, Wood', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('18', '金', 'かね, かな', 'キン, コン', 'Gold, Money', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('19', '土', 'つち', 'ド, ト', 'Earth, Ground', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('20', '休', 'やす', 'キュウ', 'Rest, Day off', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('21', '上', 'うえ, うわ, かみ, あ, のぼ', 'ジョウ, ショウ', 'Above, Up', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('22', '下', 'した, しも, もと, さ, くだ, お', 'カ, ゲ', 'Below, Down', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('23', '右', 'みぎ', 'ウ, ユウ', 'Right', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('24', '左', 'ひだり', 'サ', 'Left', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('25', '大', 'おお', 'ダイ, タイ', 'Big, Large', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('26', '中', 'なか', 'チュウ', 'Inside, Middle', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('27', '小', 'ちい, こ, お', 'ショウ', 'Little, Small', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('28', '円', 'まる', 'エン', 'Circle, Round, Yen', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('29', '人', 'ひと', 'ジン, ニン', 'Person', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('30', '目', 'め, ま', 'モク, ボク', 'Eye, Look', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('31', '耳', 'みみ', 'ジ', 'Ear', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('32', '口', 'くち', 'コウ, ク', 'Mouth', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('33', '手', 'て, た', 'シュ, ズ', 'Hand', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('34', '足', 'あし, た', 'ソク', 'Leg, Foot', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('35', '力', 'ちから', 'リョク, リキ', 'Power, Strength', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('36', '立', 'た', 'リツ, リュウ', 'Rise, Stand up', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('37', '男', 'おとこ, お', 'ダン, ナン', 'Male, Man', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('38', '女', 'おんな, め', 'ジョ, ニョ, ニョウ', 'Female, Woman', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('39', '子', 'こ', 'シ, ス, ツ', 'Child', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('40', '生', 'い, う, は, き, なま, な, む', 'セイ, ショウ', 'Life, Birth, Raw', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('41', '天', 'あめ, あま', 'テン', 'Heaven, Sky', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('42', '空', 'そら, あ, から, す', 'クウ', 'Sky, Void', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('43', '気', 'いき', 'キ, ケ', 'Spirit, Mind', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('44', '雨', 'あめ, あま', 'ウ', 'Rain', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('45', '山', 'やま', 'サン', 'Mountain', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('46', '川', 'かわ', 'セン', 'River', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('47', '林', 'はやし', 'リン', 'Grove', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('48', '森', 'もり', 'シン', 'Forest', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('49', '石', 'いし', 'セキ, シャク, コク', 'Stone', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('50', '花', 'はな', 'カ', 'Flower', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('51', '犬', 'いぬ', 'ケン', 'Dog', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('52', '虫', 'むし', 'チョウ', 'Bug, Insect', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('53', '町', 'まち', 'チョウ', 'Town', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('54', '村', 'むら', 'ソン', 'Village', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('55', '田', 'た', 'デン', 'Rice field', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('56', '夕', 'ゆう', 'セキ', 'Evening', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('57', '赤', 'あか', 'セキ, シャク', 'Red', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('58', '青', 'あお', 'セイ, ショウ', 'Blue', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('59', '白', 'しろ', 'ハク, ビャク', 'White', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('60', '見', 'み', 'ケン', 'To see, Idea, Opinion', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('61', '出', 'で, だ, い', 'ショツ, スイ', 'To leave, Exit', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('62', '入', 'い, はい', 'ニュウ', 'To enter, Entrance', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('63', '先', 'さき, ま', 'セン', 'Before, Previous, Future', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('64', '早', 'はや', 'ソウ, サッ', 'Fast, Early', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('65', '本', 'もと', 'ホン', 'Book, Main, Real', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('66', '文', 'ふみ', 'ブン, モン, モ', 'Sentence, Literature, Culture', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('67', '名', 'な', 'メイ, ミョウ', 'Name', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('68', '字', 'あざ', 'ジ', 'Letter, Word', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('69', '学', 'まな', 'ガク', 'To learn, Science', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('70', '校', 'None', 'コウ, キョウ', 'School', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('71', '正', 'ただ, まさ', 'セイ, ショウ', 'Correct, Exact', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('72', '年', 'とし', 'ネン', 'Year', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('73', '王', 'None', 'オウ', 'King', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('74', '音', 'おと, ね', 'オン', 'Sound, Noise', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('75', '糸', 'いと', 'シ', 'Thread, String', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('76', '車', 'くるま', 'シャ', 'Car', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('77', '貝', 'かい', 'バイ', 'Shellfish', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('78', '玉', 'たま', 'ギョク', 'Ball, Sphere, Jewel', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('79', '草', 'くさ', 'ソウ', 'Grass, Herb', '1', '0');`, `
INSERT INTO "Kanji" ("id", "kanji", "kunReading", "onReading", "translation", "gradeId", "gotIt") VALUES ('80', '竹', 'たけ', 'チク', 'Bamboo', '1', '0');`, `

INSERT INTO "Settings" ("type", "value") VALUES ('theme', 'dark');
`];
