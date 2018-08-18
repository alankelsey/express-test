import { Request, Response } from "express";

/**
 * GET /
 * Timer page.
 */
class MyTimer {
    public startTime: number;
    public stopTime: number;

    setStartTime() {
        this.startTime = Date.now();
    }

    setStopTime() {
        this.stopTime = Date.now();
    }

    getTime() {
        const time = Date.now();
        return time;
    }

    getDate() {
        const today = new Date();
        return today;
    }

    elapsedTime(startedAt: number, stoppedAt: number) {
        const diff = stoppedAt - startedAt;
        const totalTime = diff / 1000;
        return totalTime;
    }
}

const timerData = new MyTimer;
const startTimerData = new MyTimer;
const stopTimerData = new MyTimer;

export let getTimer = (req: Request, res: Response) => {
    // const baseUrl = "http://localhost:3000/timer?start=";
    // const timeNow = Date.now();
    // const fullUrl = "baseUrl" + Date.now();
    res.render("timer", {
        date: timerData.getDate(),
        startTime: 0,
        endTime: 0,
        total: 0,
        title: "Timer"
    });
};

export let startTimer = (req: Request, res: Response) => {
    // const delta = req.params.startTime;
    // startTimerData.setStartTime();
    res.render("timer", {
        "date": startTimerData.getDate(),
        startTime: Date.now(),
        endTime: 0,
        total: 0,
        title: "Timer"
    });
};

export let stopTimer = (req: Request, res: Response) => {
    const started = req.body.start;
    // console.log(req.body.start);
    // console.log(Date.now());
    res.render("timer", {
        date: timerData.getDate(),
        endTime: Date.now(),
        startTime: started,
        total: startTimerData.elapsedTime(started, Date.now()),
        title: "Timer"
    });
};


/* export let startTimer = (req: Request, res: Response) => {
    res.send("<p>start Time: " + timer.startTime + "</p>");
}; */



