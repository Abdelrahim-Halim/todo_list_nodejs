const fs = require('fs');

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

    switch (parseArgs.command) {
        case 'add':
            add(parseArgs)
            break;
        case 'edit':
            edit(parseArgs)
            break;
        case 'delete':
            delete(parseArgs)
            break;
        case 'list':
            list(parseArgs)
            break;
        
        default:
            break;
    }
}

main(process.argv)