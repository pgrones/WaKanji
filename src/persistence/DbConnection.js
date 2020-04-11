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
        for (let i = 0; i < createScript.length; i++) {
            executeTransaction(createScript[i], [])
        }
        setDbLoaded(true);
    }
};

const executeTransaction = (statement, args, callback, isSetting) => {
    if (!db) {
        db = SQLite.openDatabase('WaKanji.db');
    }

    let data;
    db.transaction(tx => {
            tx.executeSql(
                statement,
                args,
                (tx, rs) => {
                    data = rs.rows._array;
                }
            );
            //TODO better handling
        }, err => console.log(err),
        () => {
            if (callback) {
                if (isSetting) {
                    callback(data[0].value)
                } else {
                    callback(data);
                }
            }
        });
};

export const getGrades = (setGrades) => {
    executeTransaction(`
                select *
                from Grade;
        `,
        [],
        setGrades);
};

export const getKanjiByGradeId = (id, setKanji) => {
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

export const getSetting = (type, setSetting) => {
    executeTransaction(`
                select *
                from Settings
                where type = ?;
        `,
        [type],
        setSetting, true)
};

export const setSetting = (type, value, setSettings) => {
    executeTransaction(
            `
                update Settings
                set value = ?
                where type = ?
        `,
        [value, type],
        setSettings
    );
};
