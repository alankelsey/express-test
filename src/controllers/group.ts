import { Request, Response } from "express";
import { WriteError } from "mongodb";
import { default as User, UserModel, AuthToken } from "../models/User";

// fake user list for now - this is moving to a router - see api.ts, userFIles.ts, index.pug
export class MyGroup {

    private names = [ "Alan", "Dave", "Greg", "Ian", "Caleb", "Austin" ];

    countUsers() {

        return this.names.length;
    }

    getNames() {

        return this.names;
    }

    // need to move from timer.ts
   /*  nextName() {

        const list = this.names;
        let onNum = 0;
        onNum++;

        return list[onNum];
    } */

}