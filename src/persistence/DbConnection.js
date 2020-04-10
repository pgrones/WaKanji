import {Asset} from "expo-asset";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

export const downloadDB = async () => {
    return await FileSystem.downloadAsync(
        Asset.fromModule(require('../../assets/db/WaKanji.db')).uri,
        `${FileSystem.documentDirectory}/SQLite/WaKanji.db`
    ).then(({status}) => {
        return status === 200;
    }).catch(error => {
        //TODO better error handling
        console.log('Err\n' + error);
        return false;
    });
};

export const getGrades = (callback) => {
    const db = SQLite.openDatabase('WaKanji.db');
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
    const db = SQLite.openDatabase('WaKanji.db');
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
