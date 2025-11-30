const { crawlPage } = require("./crawl");

function main(){
    if(process.argv.length < 3){
        console.log("No website provided");
        process.exit(1);
    }
    if(process.argv.length > 3){
        console.log("Too many arguments provided");
        process.exit(1);
    }

    console.log("Started crawling website:", process.argv[2]);
    crawlPage(process.argv[2]);
}
main();