const fs = require('fs')
const path = require('path')
const process = require('process')
const readline = require('readline')
const chalk = require('chalk')
let isFirstLine = false
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });
const file = path.join(__dirname, 'text.txt')



fs.writeFile(file, '', err => {
	if (err) {
		throw err
	}
})
console.log(chalk.green('Приветствую! Введите сообщение: '))

rl.on('line', (input) => {
	if (input.trim() === 'exit') {
		endInput()
		process.exit()
	} else {
		console.log(chalk.red('Ваше сообщение добавлено в файл!'), chalk.green('Введите новое сообщение: '))
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
	console.log(chalk.green('Желаю вам счастья, успехов в учёбе и до новых встреч!'), chalk.red('Завершаю работу скрипта'))
}
process.on('beforeExit', endInput)