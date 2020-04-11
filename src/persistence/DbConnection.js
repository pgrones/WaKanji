import {Asset} from "expo-asset";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import {Platform} from "react-native";
import {createScript} from "./AndroidCreateScript";

let db = null;

export const downloadDB = (setDbLoaded) => {
    if (Platform.OS === 'ios') {
        FileSystem.downloadAsync(
            Asset.fromModule(require('../../assets/db/WaKanji.db')).uri,
            `${FileSystem.documentDirectory}SQLite/WaKanji.db`
        ).then(({status}) => {
            if (status === 200) {
                //FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}SQLite`).then(value => console.log(value));
                setDbLoaded(true)
            }
        }).catch(error => {
            //TODO better error handling
            console.log('Err\n' + error);
        });
    } else {
        db = SQLite.openDatabase('WaKanji.db');
        for (let i = 0; i < createScript.length; i++) {
            db.transaction(tx => {
                    tx.executeSql(
                        createScript[i],
                        [],
                        (tx, rs) => {
                            console.log(rs)
                        }
                    );
                    //TODO better handling
                }, err => console.log(err),
                () => {
                });
        }
        setDbLoaded(true);
    }
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
