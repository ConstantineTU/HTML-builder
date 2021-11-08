const path = require('path')
const fs = require('fs')
const fsPromises = require('fs/promises')

const originalFolder = path.join(__dirname, 'styles')
const project = path.join(__dirname, 'project-dist')
let files
const bundle = path.join(project, 'bundle.css')

return new Promise(function (resolve, reject) {
	async function copyDir() {
		await fs.readdir(project, { withFileTypes: true }, (err, projectFiles) => {
			if (err) throw err
			for (let file of projectFiles) {
				const nameExtFile = path.extname(file.name)
				if (nameExtFile === '.css') {
					const nameFile = path.join(project, file.name)
					// console.log(`Файл ${nameFile} удалён`);
					fs.unlink(nameFile, err => {
						if (err) throw err
					})
				}
			}
			async function createCssArr() {
				files = await fsPromises.readdir(originalFolder, { withFileTypes: true })
				resolve()
			}
			createCssArr()
		})
	}
	copyDir()
}).then(() => {
	let i = 0
	async function getAppendInBundle() {
		const nameExtFile = path.extname(files[i].name)
		if (files[i].isFile()) {
			if (nameExtFile === '.css') {
				const originalFile = path.join(originalFolder, files[i].name)
				await fs.readFile(originalFile, 'utf-8', (err, content) => {
					if (err) { throw err }
					fs.appendFile(bundle, content, (err) => {
						if (err) { throw err }
					})
				})
				i++
				setTimeout(() => {
					if (i < files.length) {
						getAppendInBundle()
					}
				}, 0);
				if (i === files.length - 1) {
					i = 0
					console.log(`Скрипт выполнил поставленную задачу и завершает работу...`)
				}
			}
		}
	}
	getAppendInBundle()
})
