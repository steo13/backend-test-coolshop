const fs = require('fs');
const readline = require('readline');
const moment = require('moment')

const arguments = process.argv.slice(2)

function checkArgs(args) {
    let ret = args.length === 3 && fs.existsSync(args[0]) && Number.isInteger(Number(args[1])) && Number(args[1]) >= 0 && Number(args[1]) < 4
    if (Number(args[1]) === 3)
        return ret && moment(args[2], 'DD/MM/YYYY', true).isValid()
    else
        return ret
}

const searchKey = (file, idx, value) => {
    return new Promise((res, rej) => {
        const stream = fs.createReadStream(file)
        const reader = readline.createInterface({ input: stream });

        reader.on("line", (row) => {
            if (row.split(",")[idx] === value) 
                res(row)
        })

        reader.on("close", () => rej("No match found"))
    })
    
}

if (checkArgs(arguments)) {
  searchKey(arguments[0], Number(arguments[1]), arguments[2])
    .then(line => console.log(line))
    .catch(err => console.log(err))  
} else {
    console.log("Invalid arguments")
}

