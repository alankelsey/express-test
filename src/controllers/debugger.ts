import { Request, Response } from "express";

export function writeToLog(txt: string) {

    if (this.Request.app.locals.debugOn) {

        console.log(txt);
    }

}
// class MyDebugger {

    // interface LogTxt {
       // txt?: string;
        // debugOn?: boolean;
    // }



// }