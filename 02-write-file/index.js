const fs = require('fs')
const path = require('path')
const process = require('process')
const readline = require('readline')
let isFirstLine = false
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });
const file = path.join(__dirname, 'text.txt')



fs.writeFile(file, '', err => {
	if (err) {
		throw err
	}
})
console.log(('Приветствую! Введите сообщение: '))

rl.on('line', (input) => {
	if (input.trim() === 'exit') {
		endInput()
		process.exit()
	} else {
		console.log(('Ваше сообщение добавлено в файл!'), ('Введите новое сообщение: '))
		if (!isFirstLine) {
			fs.appendFile(file, `${input}`, err => {
				if (err) {
					throw err
				}
				isFirstLine = true
			})
		} else {
			fs.appendFile(file, `\n${input}`, err => {
				if (err) {
					throw err
				}
			})
		}
	}

})
function endInput() {
	console.log(('Желаю вам счастья, успехов в учёбе и до новых встреч!'), ('Завершаю работу скрипта'))
}
process.on('beforeExit', endInput)