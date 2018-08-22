import { Request, Response } from "express";
import { WriteError } from "mongodb";
import { default as User, UserModel, AuthToken } from "../models/User";

class MyGroup {

    private nameArry: string[] = [

        "Greg",
        "Dave",
        "Alan"
    ];

    getName() {

        return this.nameArry;
    }

}

export let getGroup = (req: Request, res: Response) => {

    res.send(this.nameArry);

};