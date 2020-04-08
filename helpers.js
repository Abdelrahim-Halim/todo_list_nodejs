const fs = require('fs')

function readTodos(pathName) {
    const todos = fs.readFileSync(pathName, 'utf8')
    return JSON.parse(todos)
}