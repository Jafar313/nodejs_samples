const myFs = require('fs');

/*
myFs.stat('/opt', function (err, file){
    if (err != null){
        console.log(`an error occured: ${err}`);
    }
    else{
        console.log(file);
    }
})
*/

myFs.readdir('/', (err, list) => {
    if (err != null){
        console.log(`Error ${err}`);
    }
    else{
        console.log(list);
    }
});