import { Request, Response } from "express";
import { WriteError } from "mongodb";
import { default as User, UserModel, AuthToken } from "../models/User";

// fake user list for now - this is moving to a router - see api.ts, userFIles.ts, index.pug
export class MyGroup {

    // removed to randomize name list - don't want random open
    // private names = [ "Alan", "Dave", "Greg", "Ian", "Caleb", "Austin", "Open" ];
    private names = [ "Alan", "Dave", "Greg", "Ian", "Caleb", "Austin"];

    countUsers() {

        return this.names.length;
    }

    getNames() {

        // return this.names;
        return this.mixnames(this.names);
    }

  mixnames(namelistIn: Array<string>) {
    // let mixedNames = ;
    // console.log(namelistIn);

    for (let i = namelistIn.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));
        [namelistIn[i], namelistIn[j]] = [namelistIn[j], namelistIn[i]];
    }

    // namelistIn.push("Open");
    // console.log(namelistIn);
    return namelistIn;
  }

}