import { Request, Response } from "express";
import { WriteError } from "mongodb";
import { default as User, UserModel, AuthToken } from "../models/User";

export class MyGroup {

    // private groupInfo: object;
    // constructor() {

        // this.groupInfo = {
            // names: [ "Greg", "Dave", "Alan" ]
       //  };
        private names = [ "Alan", "Greg", "Dave" ];
        // this.groupInfo.forEach(() => console.log(item));
        // items.forEach((item, index, array) => console.log(item));
        // const herei = this.groupInfo;
        // console.log(this.groupInfo.forEach());
// }

    countUsers() {
    /*
        let count = 0;
        const currentUsers = this.names;

        for  (const i in currentUsers ) {
            count++;
            // console.log(i + " : " + currentUsers[i]);
        }

        return count;
    */
        return this.names.length;
    }

    getNames() {

        return this.names;
        // return this.groupInfo;
    }

    nextName() {

        const list = this.names;
        let onNum = 0;
        onNum++;
        console.log("returned ");
        return list[onNum];

    }

}