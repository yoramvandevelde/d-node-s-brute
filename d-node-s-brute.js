// includes
var readline = require('readline');
var fs = require('fs');
var dns = require('dns');

// check if domain is provided and set it
if (process.argv.length <= 2) {
    console.log("Usage: " + __filename + " <domain>");
    process.exit(-1);
}

var domain = process.argv[2]

// Open wordlist and use each line as input for a DNS query
var MyInterface = readline.createInterface({
    input: fs.createReadStream('wordlist')
}).on('line', function (host) {
    var result = dns.lookup(host + '.' + domain, function (err,
    addresses, family) {
        if (addresses !== undefined)
            console.log(host + '.' + domain + '   ' + addresses);
    });
});
