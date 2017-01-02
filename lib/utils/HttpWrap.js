"use strict";

var http = require('http');
var _ = require('lodash-node');

var AppConfig = require("../../config/AppConfig"),
    Utils = require("./Utils");

http://docs.strongloop.com/display/public/LB/Making+authenticated+requests

var HttpWrap = {

    defaultOptions: {
        host: AppConfig.apiServer,
        timeout: 5000,
        debug: false,
        headers: {
            "Authorization": AppConfig.apiKey
        }
    },

    callApi: function(apiPath, options, callback) {

        //var body = { data: JSON.stringify(body) };
        //this.defaultOptions.body = body;
        _.merge(this.defaultOptions, options);

        // TODO add authorisation to header
        this.defaultOptions.path = apiPath;

        var that = this;
        var handleResponse = function(response) {
            var str = '';

            //another chunk of data has been received, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been recieved, so we just print it out here
            response.on('end', function (res) {
                //Utils.clog('HttpWrap>','options', that.defaultOptions);
                //Utils.clog('HttpWrap>', 'end', str);
                var blob;
                try {
                    blob = JSON.parse(str);
                    options.response = blob;
                } catch (err) {
                    Utils.error("cant parse API response", str);
                    Utils.error("error>", err);
                    options.response = "api offline";
                }
                callback(options);
            });
        };

        var handleTimeout = function(err) {
            Utils.error("HttpWrap", "timeout", err);
        };

        // var request = http.request(options);
        // request.setTimeout(30000, onProblem);
        // request.on('error', onProblem);

        var request = http.request(this.defaultOptions, handleResponse);
        request.setTimeout(3000, handleTimeout);
        request.end();

    }

    // XgetApi1: function(apiPath, callback) {

    //     var endPoint = {
    //         host: AppConfig.apiServer,
    //         path: apiPath
    //     };

    //     console.log("getApi", endPoint);
    //     return http.get(endPoint, function(response) {
    //         // Continuously update stream with data
    //         var body = '';
    //         response.on('data', function(d) {
    //             body += d;
    //         });
    //         response.on('end', function() {

    //             // Data reception is done, do whatever with it!
    //             var parsed = JSON.parse(body);
    //             callback(parsed);
    //         });
    //     });

    // }

};

module.exports = HttpWrap;
