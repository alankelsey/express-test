import { Request, Response } from "express";
import { MyGroup } from "./group" ;
import httpReq from "request";
import { SLACK_HOOK_URL } from "../util/secrets";



/**
 * GET /
 * Timer page.
 */

 //  starts, stops, resets, formats dates.
 //  pills in group for a list of names
 //  and combines it all together for running results

class MyTimer extends MyGroup {

    // vars
    private nameList: Array<string> = [];
    private resultsList: Array<string> = [];
    private slackUrl = SLACK_HOOK_URL;

    // initialize timerdata
    private timerData = {
        startTime: 0,
        endTime: 0,
        min: 0,
        sec: 0,
        name: this.nameList[0],
        index: 0,
        html: "",
        totals: {}
    };

    setStartTime() {

        this.timerData.startTime = this.getTime();
        // console.log("Set Start Time");
        // console.log(this.timerData);
    }

    setStopTime() {
        if (this.timerData.endTime == 0) {
            this.timerData.endTime = this.getTime();
            this.elapsedTime(this.timerData.startTime, this.timerData.endTime);
            this.timerData.totals = this.setTotals(this.timerData.name, this.timerData.min, this.timerData.sec);
            // console.log("Set Stop Time");
            // console.log(this.timerData);
        }
    }

    setUser(inc: number) {

        this.timerData.name = this.nameList[inc];
        this.timerData.index = inc;
        // console.log("Set User");
        // console.log(this.timerData);
    }

    setTotals(user: string, min: number, sec: number) {

        // min, sec, and name all to a single string -
        const minSec = min + ":" + sec;
        const fullTotal = user + " " + minSec;

        this.resultsList.push(fullTotal);
        // console.log("Set Totals");
        // console.log(this.timerData);
        return  this.resultsList;
    }

    skip(nameToSkip: string) {
        Object.defineProperty(this.timerData.totals, nameToSkip, {value: 0});

    }
    // This resets the timer and group order
    nextUser(cnt: number) {

        this.resetTimer();
        // get length for the names array : minus one to offset index vs length
        const endIng = this.nameList.length - 1;
        // console.log("Get Next User");
        // check if array length vs current position in user list
        const inc = cnt + 1;

        if ( inc > endIng ) {
            // this.timerData.name = this.nameList[0];
            this.timerData.name = "Open";
            // this.timerData.index = 0;
            // console.log(this.timerData.index + " " + this.timerData.name);
        } else {
            this.timerData.name = this.nameList[inc];
            this.timerData.index = inc;
            // console.log(this.timerData.index + " " + this.timerData.name);
        }

        // console.log(this.timerData);
    }

    private getTime() {
        // console.log("Get Time");
        // console.log(this.timerData);
        return Date.now();
    }

    returnTimerData() {
        // console.log("Return Timer Data");
        // console.log(this.timerData);
        // possibly use app.locals.siteDate
        return this.timerData;
    }

    // get's start/end time difference in ms
    // formats to get from ms to mm and s.sssssss
    private elapsedTime(startedAt: number, stoppedAt: number) {

        const diff = stoppedAt - startedAt;
        this.timerData.min = this.formatMinSec(diff).minutes;
        this.timerData.sec = this.formatMinSec(diff).seconds;
        // console.log("Get Elapsed Time");
        // console.log(this.timerData);

    }

    // converts ms to combined min sec
    private formatMinSec(ms: number) {

        const sec = Math.floor((ms / 1000) % 60);
        // const secCalc = (ms / 1000) % 60;
        const min = ((ms / 1000) - ((ms / 1000) % 60)) / 60;
        // const sec = Math.trunc(secCalc * Math.pow(10, 3)) / 100;

        const results = { seconds: sec, minutes: 0 };

        if (min < 1) {

            results.minutes = 0;
        } else {

            results.minutes = min;
        }
        // console.log("Formatting Time");
        // console.log(this.timerData);
        return results;

    }

    // Clear times and user only
    resetTimer() {

        this.timerData.startTime = 0;
        this.timerData.endTime = 0;
        this.timerData.min = 0;
        this.timerData.sec = 0;
        // this.setUser(0);
        // console.log("Reset Timer");
        // console.log(this.timerData);
    }

    // reset name needs to be called seperate of resettimer
    resetName() {
        this.nameList = this.getNames();
        // this.nameList.push("Open");
        // console.log(this.nameList);
        this.setUser(0);
    }

    // clear result totals only
    resetResults() {

        this.timerData.totals = {};
        // this.timerData.totals =  0;
        this.resultsList = [];
        // console.log("Reset Results");
        // console.log(this.timerData);
    }

    // post a web hook/request to slack channel - sending the time totals
    copyToSlack(data: string) {

        const body = {
            "channel": "#dev-team",
            "username": "Standup_Times",
            "text": data,
            "icon_url": "https://pbs.twimg.com/profile_images/76277472/bender.jpg"
        };
        // console.log("Send to Slack");
        // console.log(this.timerData);

        httpReq({
            url: "https://hooks.slack.com/services/" + this.slackUrl,
            method: "POST",
            json: true,   // <--Very important!!!
            body: body,
            headers: {
                "content-type": "application/json",

            }
        }, function (err, resp, body) {

            if (err) {
                // console.log(err, err.stack);
            } else {
                // console.log(resp.statusCode);
                // console.log(resp.statusMessage);
                // console.log(body);
            }
        });


    }

}

const timer = new MyTimer;

export let getGroup = (req: Request, res: Response) => {
    // console.log("Reset Results");
    // console.log(this.timerData);
    res.render("timer", timer.returnTimerData());
};

export let getTimer = (req: Request, res: Response) => {

    timer.resetTimer();
    timer.resetName();
    timer.resetResults();
    // console.log("Get Timer");
    // console.log(timer.returnTimerData());
    // res.send({title: "Timer"});
    res.render("timer", timer.returnTimerData()); // added title?
        };

export let startTimer = (req: Request, res: Response) => {
    // console.log("Start Timer");
    timer.setStartTime();
    // console.log(this.timerData);
    res.render("timer", timer.returnTimerData());
};

export let stopTimer = (req: Request, res: Response) => {
    // console.log("Stopped Timer");
    timer.setStopTime();
    if (timer.returnTimerData().name != "Open") {
        timer.nextUser(timer.returnTimerData().index);
    }
    // console.log(timer.returnTimerData());
    res.render("timer", timer.returnTimerData());
};

export let next = (req: Request, res: Response) => {
    if (req.query.skip) {
        // console.log(req.query.skip);
        timer.skip(req.query.skip);
    }
    // console.log("next Timer");
    timer.nextUser(timer.returnTimerData().index);
    // console.log(this.timerData);
    res.render("timer", timer.returnTimerData());
};

export let copy = (req: Request, res: Response) => {
    // res.statusCode = 202;
    // console.log("Copy Timer");
    const message = JSON.stringify(timer.returnTimerData().totals);
    const notify = res.statusCode  + " Times sent to slack: " + message;

    timer.copyToSlack(message);
    // console.log(this.timerData);
    res.send(notify);
};