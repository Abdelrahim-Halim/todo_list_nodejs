const fs = require('fs')
let todos = [];
const fileName = './todo.json'

exports.parseCmdArgs = function (args) {
    const [, , command, ...opthions] = args;
    const parseOptions = opthions.reduce((cum, elm) => {
        const [opthionName, opthionValue] = elm.split('=');
        cum[ opthionName ] = opthionValue;
        return cum;
    }, {})
    parseOptions.command = command;
    return parseOptions;
}

exports.createIfNotExists = function (pathName) {
    if (!fs.existsSync(pathName)) {
        const data = []
        const jsonData = JSON.stringify(data);
        fs.writeFileSync(pathName, jsonData)
    }
}

function readTodos(pathName) {
    const todosFromFile = fs.readFileSync(pathName, 'utf8')
    return todos = JSON.parse(todosFromFile)
}

function saveTodos(todosData) {
    const todosToSave = JSON.stringify(todosData);
    fs.writeFileSync(fileName, todosToSave)
}

function isChecked(options) {
    if (options.hasOwnProperty('checked')) {
        delete options.checked
        return true
    } else {
        return false
    }
}

exports.add = function (options) {
    if (options.hasOwnProperty('title') && options.hasOwnProperty('body')) {
        delete options.command;
        let newTodos = readTodos(fileName);
        let id = newTodos.length + 1;
        options.id = id;
        options.isChecked = isChecked(options);
        newTodos.push(options);
        saveTodos(newTodos);
        console.log("Created successfully!");
    } else {
        console.log("Has not been created, pls check the options");
    }
}

exports.edit = function (options) {
    if (options.hasOwnProperty('title') && options.hasOwnProperty('body') && options.hasOwnProperty('id')) {
        delete options.command;
        let editTodos = readTodos(fileName);
        editTodos = editTodos.map((todo) => {
            options.id = parseInt(options.id)
            if (todo.id === options.id) {
                options.isChecked = isChecked(options);
                if (options.hasOwnProperty('checked')) {
                    delete options.checked   
                }
                todo = options
                console.log(todo);
            } 
            return todo
        })
        saveTodos(editTodos);
        console.log("Edit successfully!");
    } else {
        console.log("Has not been edited, pls check the options");
    }    
}

exports.remove = function (options) {
    if (options.hasOwnProperty('title') && options.hasOwnProperty('body') && options.hasOwnProperty('id')) {
        delete options.command;
        let removeTodos = readTodos(fileName);
        removeTodos = removeTodos.filter((todo) => {
            options.id = parseInt(options.id)
            if (todo.id !== options.id) {
                return todo
            } 
        })
        saveTodos(removeTodos);
        console.log("Deleted successfully!");
    } else {
        console.log("Has not been deleted, pls check the options");
    }    
}

exports.list = function () {
    console.log(readTodos(fileName));
}
