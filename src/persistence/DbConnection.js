import {Asset} from "expo-asset";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

let db = null;

export const downloadDB = async () => {
    // await FileSystem.deleteAsync(`${FileSystem.documentDirectory}SQLite`, {idempotent: true});
    // await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}SQLite`, {intermediates: true});
    return await FileSystem.downloadAsync(
        Asset.fromModule(require('../../assets/db/WaKanji.db')).uri,
        `${FileSystem.documentDirectory}SQLite/WaKanji.db`
    ).then(({status}) => {
        if (status === 200) {
            //FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}SQLite`).then(value => console.log(value));
            return true
        }
        return false
    }).catch(error => {
        //TODO better error handling
        console.log('Err\n' + error);
        return false;
    });

};

export const getGrades = (callback) => {
    if (!db) {
        db = SQLite.openDatabase('WaKanji.db');
    }
    let data;
    db.transaction(tx => {
            tx.executeSql(
                    `
                        select *
                        from Grade;
                `,
                [],
                (tx, rs) => {
                    data = rs.rows._array;
                }
            );
            //TODO better handling
        }, err => console.log(err),
        () => {
            callback(data);
        });
};

export const getKanjiById = (id, callback) => {
    if (!db) {
        db = SQLite.openDatabase('WaKanji.db');
    }
    let data;
    db.transaction(tx => {
            tx.executeSql(
                    `
                        select *
                        from Kanji
                        where gradeId = ?;
                `,
                [id],
                (tx, rs) => {
                    data = rs.rows._array;
                }
            );
            //TODO better handling
        }, err => console.log('Error: ' + err),
        () => {
            callback(data);
        });
};

export const getSetting = (type, callback) => {
    if (!db) {
        db = SQLite.openDatabase('WaKanji.db');
    }
    let setting;
    db.transaction(tx => {
            tx.executeSql(
                    `
                        select *
                        from Settings
                        where type = ?;
                `,
                [type],
                (tx, rs) => {
                    setting = rs.rows.item(0);
                }
            );
            //TODO better handling
        }, err => console.log('Error: ' + err),
        () => {
            callback(setting.value)
        });
};
