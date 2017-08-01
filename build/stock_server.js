"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var ws_1 = require("ws");
var app = express();
app.use("/", express.static(path.join(__dirname, "..", "client")));
app.get('/api/stock', function (req, res) {
    var reslut = stocks;
    var params = req.query;
    if (params.name) {
        reslut = reslut.filter(function (stock) { return stock.name.indexOf(params.name) !== -1; });
    }
    res.json(reslut);
});
app.get('/api/stock/:id', function (req, res) {
    res.json(stocks.find(function (stock) { return stock.id == req.params.id; }));
});
var server = app.listen(8000, "localhost", function () {
    console.log("服务器已启动，地址：http://localhost:8000");
});
var subcriptions = new Set();
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on("connection", function (websoctet) {
    subcriptions.add(websoctet);
});
var messageCount = 0;
setInterval(function () {
    subcriptions.forEach(function (ws) {
        if (ws.readyState === 1) {
            ws.send(JSON.stringify({ messageCount: messageCount++ }));
        }
        else {
            subcriptions.delete(ws);
        }
    });
}, 2000);
var Stock = (function () {
    function Stock(id, name, price, rating, desc, categories) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Stock;
}());
exports.Stock = Stock;
var stocks = [
    new Stock(1, "第一只股票", 3.5, 5.0, "这是第一支股票", ["IT", "互联网"]),
    new Stock(2, "第二只股票", 5.7, 3.6, "这是第二支股票", ["科技"]),
    new Stock(3, "第三只股票", 7.5, 4.5, "这是第三支股票", ["科技", "互联网"]),
    new Stock(4, "第四只股票", 1.5, 2.4, "这是第四支股票", ["IT", "科技"]),
    new Stock(5, "第五只股票", 3.5, 4.4, "这是第五支股票", ["科技", "互联网"]),
    new Stock(6, "第六只股票", 6.7, 3.6, "这是第六支股票", ["IT", "互联网", "科技"]),
    new Stock(7, "第七只股票", 8.5, 2.7, "这是第七支股票", ["互联网"]),
    new Stock(8, "第八只股票", 2.5, 4.4, "这是第八支股票", ["IT", "科技"])
];
