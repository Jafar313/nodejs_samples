const fs = require('fs');
const got = require('got');
const patternsUrl = "http://api.chapyar.com/message-pattern";
const productCode = "1MMM111MMM11M";
const request = got.get(patternsUrl, {searchParams: {productCode : productCode}});
request.then((response) => {
    fs.writeFile(__dirname + 'tempResult', response.body,
        () => {
            console.log('Finish Successfully');
        });
});
exports.printMsg = function () {
    console.log('This is a sample package');
}
