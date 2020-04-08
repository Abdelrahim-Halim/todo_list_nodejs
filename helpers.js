const fs = require('fs')
let todos = [];
const fileName = './todo.json'

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

exports.add = function (options) {
    if (options.hasOwnProperty('title') && options.hasOwnProperty('body')) {
        delete options.command;
        let newTodos = readTodos(fileName);
        newTodos.push(options)
        saveTodos(newTodos);
    } else {
        console.log("here");
    }
}

exports.edit = function (options) {

}

exports.remove = function (options) {

}

exports.list = function (options) {

}