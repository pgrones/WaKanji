import {Asset} from "expo-asset";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

let db = null;

export const downloadDB = (setDbLoaded) => {
    FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/WaKanji.db`).then(({exists}) => {
        if (!exists) {
            console.log('Creating DB');
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
            console.log('DB exists');
            setDbLoaded(true);
        }
    });
};

export const overWriteOldDb = (setDbLoaded) => {
    console.log('overwrite');
    //FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite`).then((a) => console.log(a));
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
            //TODO better handling
        },
        err => console.log(err),
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
    console.log('getGrades');
    executeTransaction(`
                select *
                from Grade;
        `,
        [],
        setGrades);
};

export const getKanjiByGradeId = (id, setKanji) => {
    console.log('getKanjiByGradeId');
    executeTransaction(
            `
                select id, kanji, gradeId, gotIt
                from Kanji
                where gradeId = ?;
        `,
        [id],
        setKanji
    );
};

export const getKanjiInfoById = (id, setKanjiInfo) => {
    executeTransaction(
            `
                select *
                from Kanji
                where id = ?;
        `,
        [id],
        setKanjiInfo,
        true
    );
};

export const setKanjiGotIt = (id, state, gradeId, setKanji) => {
    console.log('setKanjiGotIt');
    executeTransaction(
            `
                update Kanji
                set gotIt = ?
                where id = ?
        `,
        [!state, id],
        () => getKanjiByGradeId(gradeId, setKanji)
    );
};

export const getSetting = (type, setSetting) => {
    console.log('getSetting ' + type);
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
    console.log('setSetting ' + type);
    executeTransaction(
            `
                update Settings
                set value = ?
                where type = ?
        `,
        [value, type],
        () => getSetting(type, setSetting)
    );
};
