var request = require("request");
var cheerio = require("cheerio");
const http = require('http');
const hostname = 'localhost';
const port = 3001;

var url="https://www.premierleague.com/tables";
var jsonArray = []; 

const server = http.createServer((req, res) => {
	if (req.url == '/getTableData') {
		console.log("getTableData");
		res.setHeader('Content-Type', 'application/json');
		res.statusCode = 200;
		res.end(JSON.stringify({response:jsonArray}));
	}
});

request(url,function(err,response,html){
    if(!err){
        var $=cheerio.load(html);
        var allItems=$("table").children().eq(1).children();
        for(var i=0;i<allItems.length; i+=2){
           var myObj = { "position":$("table").children().eq(1).children().eq(i).children().eq(1).find(".value").text(),
                        "club":$("table").children().eq(1).children().eq(i).children().eq(2).find(".long").text(), 
                        "played":$("table").children().eq(1).children().eq(i).children().eq(3).text(),
                        "won":$("table").children().eq(1).children().eq(i).children().eq(4).text(),
                        "drawn":$("table").children().eq(1).children().eq(i).children().eq(5).text(),
                        "lost":$("table").children().eq(1).children().eq(i).children().eq(6).text(),
                        "gf":$("table").children().eq(1).children().eq(i).children().eq(7).text(),
                        "ga":$("table").children().eq(1).children().eq(i).children().eq(8).text(),
                        "gd":$("table").children().eq(1).children().eq(i).children().eq(9).text(),
                        "points":$("table").children().eq(1).children().eq(i).children().eq(10).text()
            };
            jsonArray.push(myObj);
        } 
    }
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
