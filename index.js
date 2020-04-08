const fs = require('fs');
const helper = require('./helpers')

function parseCmdArgs(args) {
    const [, , command, ...opthions] = args;
    const parseOptions = opthions.reduce((cum, elm) => {
        const [opthionName, opthionValue] = elm.split('=');
        cum[ opthionName ] = opthionValue;
        return cum;
    }, {})
    parseOptions.command = command;
    return parseOptions;
}

function main(cmdArgs) {
    const parseArgs = parseCmdArgs(cmdArgs);
    helper.createIfNotExists('./todo.json')
    switch (parseArgs.command) {
        case 'add':
            helper.add(parseArgs)
            break;
        case 'edit':
            helper.edit(parseArgs)
            break;
        case 'remove':
            helper.remove(parseArgs)
            break;
        case 'list':
            helper.list(parseArgs)
            break;
        
        default:
            break;
    }
}

main(process.argv)