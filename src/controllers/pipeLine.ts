"use srict";
import { Request, Response } from "express";
import req  from "request";
import * as request from "request-promise-native";
import async from "async";




class MyPipeLine {


/*
    setPipeLineData(objIn: any) {
        console.log("setting pipe data");
        console.log(objIn);
        this.pipeLineData = objIn;
    }
*/

    getPipeLineData() {
        console.log("getPipeLineData");

        const tasks = [  this.setActiveRelease   ];
        const test = async () => {
            console.log(this.pipeLineData);
            this.setActiveRelease();
            console.log(this.pipeLineData);
            return "done";
        };
        return test;
    }

    // https://velma.aha.io/api/v1/features/
    private ahaUrl = "https://velma.aha.io/api/v1";
    private releaseId = "6550652763433854458";
    private pipeLineData = {};

    setActiveRelease() {


        // https://velma.aha.io/api/v1/releases/6550652763433854458/features/
        // const releaseUrl = "${this.aha}$/releases/{releaseId}/features/";
        const releaseUrl = "https://velma.aha.io/api/v1/releases/6550652763433854458/features/";
        // Up to 300 requests are allowed per minute, and up to 20 requests per second.
        // https://www.aha.io/api?_ga=2.135691761.1750409197.1537505826-546858760.1536327392
        const authInfo = { "auth" : { "user" : "akelsey@velma.com", "pass" : "zhe2LBbMOCtL", "sendImmediately" : true } };

        request.get( releaseUrl, authInfo, function (error, response, body) {
            console.log("settingPipeLine");
            this.pipeLineData = body.toJSON;
            // console.log(this.pipeLineData);
            // this.setPipeLineData(body.toJSON);
            // response.send(body);
            if (this.pipeLineData == body.toJSON) {
                console.log("matched");
                // console.log(this.pipeLineData);
            }
            // console.log(body);
            return body;
          });

    }

}

const line = new MyPipeLine;
// line.setActiveRelease();


export let get = (req: Request, res: Response) => {
    // const authInfo = { "auth" : { "user" : "akelsey@velma.com", "pass" : "zhe2LBbMOCtL", "sendImmediately" : true } };
    // const data = restReq({"https://velma.aha.io/api/v1/releases/6550652763433854458/features/", authInfo});


    // console.log(line.getPipeLineData());
    // line.setActiveRelease().then(() => {
       //  console.log("render");
        res.render("pipeline", line.getPipeLineData());
    // });
};