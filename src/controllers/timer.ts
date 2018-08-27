import { Request, Response } from "express";
import { WriteError } from "mongodb";
import { default as User, UserModel, AuthToken } from "../models/User";
import { each } from "../../node_modules/@types/async";
import { MyGroup } from "../controllers/group" ;

// const a = new MyGroup;
// console.log(a.getName());
/**
 * GET /
 * Timer page.
 */

 //  starts, stops, formats dates

class MyTimer extends MyGroup {


    /*
    timerData: object;
    constructor() {
        this.timerData = {
            startTime: 0,
            endTime: 0,
            min: 0,
            sec: 0
        }
    }
    */

    private nameList = this.getNames();

    private timerData = {
        startTime: 0,
        endTime: 0,
        min: 0,
        sec: 0,
        name: this.nameList[0],
        index: 0
    };

    // private nextName(listIn: object) {
        // this.timerData.name = this.name;
    // }

    setStartTime() {

        this.timerData.startTime = this.getTime();
        // this.nextName(this.nameList);
    }

    setStopTime() {

        this.timerData.endTime = this.getTime();
        this.elapsedTime(this.timerData.startTime, this.timerData.endTime);
        // this.timerData.name = this.nextName();

    }

    setUser(inc: number) {

        this.timerData.name = this.nameList[inc];
    }

    nextUser(cnt: number) {
        this.resetTimer();
        const endIng = this.nameList.length - 1;
        // this.timerData.name = private cnt = 0;
        const inc = cnt + 1;
        if ( inc > endIng ) {
            this.timerData.name = this.nameList[0];
            this.timerData.index = 0;
        } else {
            this.timerData.name = this.nameList[inc];
            this.timerData.index = inc;
        }
        // console.log(inc);

    }

    private getTime() {

        return Date.now();
    }

    returnTimerData() {

        return this.timerData;
    }

    private elapsedTime(startedAt: number, stoppedAt: number) {

        const diff = stoppedAt - startedAt;
        // const totalTime = this.formatMinSec(diff).seconds;
        this.timerData.min = this.formatMinSec(diff).minutes;
        this.timerData.sec = this.formatMinSec(diff).seconds;

    }

    private formatMinSec(ms: number) {

        const sec = (ms / 1000) % 60;
        // const secCalc = (ms / 1000) % 60;
        const min = ((ms / 1000) - ((ms / 1000) % 60)) / 60;
        // const sec = Math.trunc(secCalc * Math.pow(10, 3)) / 100;

        const results = { seconds: sec, minutes: 0 };

        if (min < 1) {

            results.minutes = 0;
        } else {

            results.minutes = min;
        }

        return results;
    }

    resetTimer() {

        this.timerData.startTime = 0;
        this.timerData.endTime = 0;
        this.timerData.min = 0;
        this.timerData.sec = 0;
    }

}

const timer = new MyTimer;

export let getGroup = (req: Request, res: Response) => {

    // res.send(group.getName());
    // console.log(group.getName());
    res.render("timer", timer.returnTimerData());

};

export let getTimer = (req: Request, res: Response) => {
    timer.resetTimer();
    res.render("timer", timer.returnTimerData());
};

export let startTimer = (req: Request, res: Response) => {
    timer.setStartTime();
    res.render("timer", timer.returnTimerData());
};

export let stopTimer = (req: Request, res: Response) => {
    timer.setStopTime();
    res.render("timer", timer.returnTimerData());
};

export let next = (req: Request, res: Response) => {
    timer.nextUser(timer.returnTimerData().index);
    res.render("timer", timer.returnTimerData());

};

export let t = timer;