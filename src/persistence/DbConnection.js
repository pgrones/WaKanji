import {Asset} from "expo-asset";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import * as Device from 'expo-device';
import {createScript} from "./EmulatorCreateScript";

/**
 * Persistence layer executing DB queries
 */
let db = null;
let logDBCalls = false;

export const downloadDB = (setDbLoaded) => {
    if (Device.isDevice) {
        FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/WaKanji.db`).then(({exists}) => {
            if (!exists) {
                if (logDBCalls) {
                    console.log('Creating DB');
                }
                FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`).then(() =>
                    FileSystem.downloadAsync(
                        Asset.fromModule(require('../../assets/db/WaKanji.db')).uri,
                        `${FileSystem.documentDirectory}SQLite/WaKanji.db`
                    ).then(({status}) => {
                        if (status === 200) {
                            setDbLoaded(true)
                        }
                    }).catch(error => {
                        console.log('Err\n' + error);
                    })
                ).catch(error => {
                    console.log('Err\n' + error);
                });
            } else {
                if (logDBCalls) {
                    console.log('DB exists');
                }
                setDbLoaded(true);
            }
        });
    } else {
        if (logDBCalls) {
            console.log('Creating Emulator DB');
        }

        for (let i = 0; i < createScript.length; i++) {
            executeTransaction(createScript[i], [])
        }
        setDbLoaded(true);
    }
};

export const overWriteOldDb = (setDbLoaded) => {
    if (logDBCalls) {
        console.log('overwrite');
    }
    if (Device.isDevice) {
        if (logDBCalls) {
            console.log('real device');
        }
        //FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`).then((a) => if(logDBCalls){console.log(a));}
        FileSystem.downloadAsync(
            Asset.fromModule(require('../../assets/db/WaKanji.db')).uri,
            `${FileSystem.documentDirectory}SQLite/WaKanji.db`
        ).then(({status}) => {
            if (status === 200) {
                setDbLoaded(true)
            }
        }).catch(error => {
            console.log('Err\n' + error);
        });
    } else {
        if (logDBCalls) {
            console.log('Creating Emulator DB');
        }

        for (let i = 0; i < createScript.length; i++) {
            executeTransaction(createScript[i], [])
        }
        setDbLoaded(true);
    }
};

const executeTransaction = (statement, args, callback, onlyOneEntry) => {
    if (!db) {
        db = SQLite.openDatabase('WaKanji.db');
    }

    let data;
    db.transaction(tx => {
            tx.executeSql(statement, args,
                (tx, rs) => {
                    data = rs.rows._array;
                }
            );
        },
        err => console.log(err), //TODO better handling
        () => {
            if (callback) {
                if (onlyOneEntry) {
                    callback(data[0])
                } else {
                    callback(data);
                }
            }
        });
};

export const getGrades = (setGrades) => {
    if (logDBCalls) {
        console.log('getGrades');
    }
    executeTransaction(`
                select *
                from Grade;
        `,
        [],
        setGrades);
};

export const getKanjiByGradeId = (id, setKanji) => {
    if (logDBCalls) {
        console.log('getKanjiByGradeId');
    }
    executeTransaction(
            `
                select *
                from Kanji
                where gradeId = ?;
        `,
        [id],
        setKanji
    );
};

export const setKanjiGotIt = (id, state, gradeId, setKanji) => {
    if (logDBCalls) {
        console.log('setKanjiGotIt');
    }
    executeTransaction(
            `
                update Kanji
                set gotIt = ?
                where id = ?
        `,
        [state, id],
        () => getKanjiByGradeId(gradeId, setKanji)
    );
};

export const getSetting = (type, setSetting) => {
    if (logDBCalls) {
        console.log('getSetting ' + type);
    }
    executeTransaction(`
                select *
                from Settings
                where type = ?;
        `,
        [type],
        setSetting,
        true)
};

export const setSetting = (type, value, setSetting) => {
    if (logDBCalls) {
        console.log('setSetting ' + type);
    }
    executeTransaction(
            `
                update Settings
                set value = ?
                where type = ?
        `,
        [value, type],
        () => setSetting({value: value})
    );
};

export const getRandomKanji = (setRandomKanji) => {
    if (logDBCalls) {
        console.log('getRandomKanji');
    }
    executeTransaction(
            `
                select id, kanji, translation
                from Kanji
                where gotIt = 1
        `,
        [],
        (data) => {
            setRandomKanji(data.sort(() => Math.random() - 0.5));
        }
    );
};

export const getTranslations = (setTranslations) => { //TODO maybe gradeID?
    if (logDBCalls) {
        console.log('getTranslations');
    }
    executeTransaction(
            `
                select translation
                from Kanji
        `,
        [],
        (data) => {
            setTranslations(data.sort(() => Math.random() - 0.5));
        }
    );
};

export const getSvg = (kanjiId, setSvg) => {
    if (logDBCalls) {
        console.log('getSvg');
    }
    executeTransaction(
            `
                select *
                from KanjiSvgs
                where kanjiId = ?
        `,
        [kanjiId],
        (data) => {
            setSvg(data);
        }, true
    );
}

export const getGotItAmount = (setAmount) => {
    if (logDBCalls) {
        console.log('getGotItAmount');
    }
    executeTransaction(
            `
                SELECT COUNT(*) as count
                FROM Kanji
                WHERE gotIt = 1;
        `,
        [],
        (data) => {
            setAmount(data["count"]);
        },
        true
    )
};

export const getHighScore = (setHighscore) => {
    if (logDBCalls) {
        console.log('getHighScore');
    }
    executeTransaction(
            `
                SELECT *
                FROM GameTemp
                WHERE id = 1;
        `,
        [],
        setHighscore,
        true
    )
};

export const setNewHighScore = (value) => {
    if (logDBCalls) {
        console.log('setNewHighScore');
    }
    executeTransaction(
            `
                update GameTemp
                set value = ?
                where id = 1
        `,
        [value]
    );
};
