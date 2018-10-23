import { Request, Response } from "express";

function writeToLog(txt: string) {

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