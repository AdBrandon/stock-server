import * as express from 'express';
import * as path from 'path';
import {Server} from "ws";

const app = express();

app.use("/",express.static(path.join(__dirname,"..","client")))

app.get('/api/stock',(req,res)=>{
    let reslut = stocks;
    let params = req.query;
    if (params.name){
        reslut = reslut.filter(stock => stock.name.indexOf(params.name) !== -1)
    }
    res.json(reslut)
})

app.get('/api/stock/:id',(req,res)=>{
    res.json(stocks.find(stock => stock.id == req.params.id))
})

const server = app.listen(8000,"localhost",()=>{
    console.log("服务器已启动，地址：http://localhost:8000")
})

const subcriptions = new Set<any>();

const wsServer = new Server({port:8085});
wsServer.on("connection",websoctet => {
    subcriptions.add(websoctet )
})

var messageCount = 0;

setInterval(()=>{
    subcriptions.forEach(ws => {
        if (ws.readyState === 1){
            ws.send(JSON.stringify({messageCount:messageCount++}))
        }else{
            subcriptions.delete(ws)
        }
    })
},2000)

export class Stock{
    constructor(
        public id: number,
        public name: string,
        public price:number,
        public rating: number,
        public desc:string,
        public categories: Array<string>
    ){}
}

const stocks:Stock[] = [
    new Stock(1, "第一只股票",3.5,5.0,"这是第一支股票",["IT","互联网"]),
    new Stock(2, "第二只股票",5.7,3.6,"这是第二支股票",["科技"]),
    new Stock(3, "第三只股票",7.5,4.5,"这是第三支股票",["科技","互联网"]),
    new Stock(4, "第四只股票",1.5,2.4,"这是第四支股票",["IT","科技"]),
    new Stock(5, "第五只股票",3.5,4.4,"这是第五支股票",["科技","互联网"]),
    new Stock(6, "第六只股票",6.7,3.6,"这是第六支股票",["IT","互联网","科技"]),
    new Stock(7, "第七只股票",8.5,2.7,"这是第七支股票",["互联网"]),
    new Stock(8, "第八只股票",2.5,4.4,"这是第八支股票",["IT","科技"])
];