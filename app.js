const http = require('http');
const fs = require('fs');
var requests = require("requests"); 
// we are reading all our required files like home.html
const homeFile = fs.readFileSync("home.html","utf-8");

// function to change value of location temperature min temp and max temp
const replaceVal=(tempVal, orgVal ) =>{
    
    let temperature = tempVal.replace("{%tempval%}", (orgVal.main.temp - 273.15).toFixed(2));
    temperature = temperature.replace("{%tempmin%}", (orgVal.main.temp_min - 273.15).toFixed(2));
    temperature = temperature.replace("{%tempmax%}", (orgVal.main.temp_max - 273.15).toFixed(2));
    temperature = temperature.replace("{%locations%}", orgVal.name);
    temperature = temperature.replace("{%country%}", orgVal.sys.country);
    temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);
    return temperature;
      
      return temperature;
}     

// now create server and listen to that server
const server = http.createServer((req,res)=>{
   if(req.url=="/"){
   
    requests('https://api.openweathermap.org/data/2.5/weather?q=Lucknow&appid=13a1b17d833148c6d2536e155b952288' )
    .on('data',(chunk) => {
        const objdata = JSON.parse(chunk);
        const arrData = [objdata];
         const realTimeData = arrData.map((val)=>
            replaceVal(homeFile,val)).join("");
         res.write(realTimeData);
    })
    .on('end',(err) =>{
      if (err) return console.log('connection closed due to errors', err);
     
      res.end();
    });

   }
  
   
 });

const port =80;
 server.listen(port,'localhost',()=>{ 
  
    // Callback  
    console.log(`Server running at http://localhost:${port}/`); 
});