import {Asset} from "expo-asset";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import {Platform} from "react-native";
import {createScript} from "./AndroidCreateScript";

let db = null;

export const downloadDB = (setDbLoaded) => {

    // if (Platform.OS === 'ios') {
    FileSystem.downloadAsync(
        Asset.fromModule(require('../../assets/db/WaKanji.db')).uri,
        `${FileSystem.documentDirectory}/SQLite/WaKanji.db`
    ).then(({status}) => {
        if (status === 200) {
            // FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}`).then(value => console.log(value));
            // FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}/SQLite`).then(value => console.log(value));
            // //setDbLoaded(true)
            // FileSystem.getInfoAsync(`${FileSystem.documentDirectory}WaKanji.db`).then((a) => console.log(a))
            // FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/WaKanji.db`).then((a) => console.log(a))
            setDbLoaded(true)
        }
    }).catch(error => {
        //TODO better error handling
        console.log('Err\n' + error);
    });
    // } else {
    //     for (let i = 0; i < createScript.length; i++) {
    //         executeTransaction(createScript[i], [])
    //     }
    //     setDbLoaded(true);
    // }
};

const executeTransaction = (statement, args, callback, onlyOneEntry) => {
    if (!db) {
        //console.log('TX ' + new Date().getMilliseconds());
        db = SQLite.openDatabase('WaKanji.db');
        //FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/WaKanji1.db`).then((a) => console.log(a))
        //FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/WaKanji.db`).then((a) => console.log(a))
        // const dir = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
        // for (let i = 0; i < dir.length; i++) {
        //     console.log(dir[i])
        // }
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
                if(onlyOneEntry){
                    callback(data[0])
                } else{
                    callback(data);
                }
            }
        });
};

export const getGrades = (setGrades) => {
    console.log('getGrades')
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

export const getKanjiInfoById = (id, setKanjInfo) =>{
    executeTransaction(
        `
                select *
                from Kanji
                where id = ?;
        `,
        [id],
        setKanjInfo,
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
    console.log('getSetting');
    executeTransaction(`
                select *
                from Settings
                where type = ?;
        `,
        [type],
        setSetting,
        true)
};

export const setSetting = (type, value, setTheme) => {
    console.log('setSetting');
    executeTransaction(
            `
                update Settings
                set value = ?
                where type = ?
        `,
        [value, type],
        () => getSetting(type, setTheme)
    );
};
