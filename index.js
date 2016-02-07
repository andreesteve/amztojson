var program = require('commander');
var fs = require('fs');

function run(parserPath) {
    return function() {
        var results = [];
        var parser = require(parserPath);
        
        if (!parser) {        
            console.error("Parser '%s' not found.", parserPath);
            process.exit(-1);
        }

        for (var i = 0; i < program.args.length - 1; i++) {
            var filePath = program.args[i];

            if (fs.existsSync(filePath)) {
                var html = fs.readFileSync(filePath, "utf8");       
                var result = parser(html);
                
                if (result) {
                    results.push(result);
                }
            } else {
                console.error("File '%s' does not exist. Skipping file.", filePath);
            }           
        }

        console.log(JSON.stringify(results));
    };
}

program
    .version('0.1.0')
    .command('order <file...>')
    .action(run('./lib/amzorder'))
    .description('Parse orders.')

program.parse(process.argv);
