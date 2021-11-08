const path = require('path')
const fs = require('fs')
const fsPromises = require('fs/promises')

const originalAsset = path.join(__dirname, 'assets')
const stylesDirectory = path.join(__dirname, 'styles')
const htmlDirectory = path.join(__dirname, 'components')

const projectDist = path.join(__dirname, 'project-dist')

const assetsDirectory = path.join(projectDist, 'assets')
const styles = path.join(projectDist, 'style.css')
const indexHtml = path.join(projectDist, 'index.html')

async function createProjectDir() {
	await fsPromises.mkdir(projectDist, { recursive: true })
	await copyDir(originalAsset, assetsDirectory)
	setTimeout(() => {
		getAppendInStyle()
		saveTemplateHtml()
	}, 100);

}
createProjectDir()
async function copyDir(original, project) {
	await fsPromises.rm(projectDist, { recursive: true, force: true })
	await fsPromises.mkdir(project, { recursive: true })
	const files = await fsPromises.readdir(original, { withFileTypes: true })
	for (const file of files) {
		if (file.isDirectory()) {
			const originalDirFolder = path.join(original, file.name)
			const copyDirFolder = path.join(project, file.name)
			if (originalDirFolder !== projectDist) {
				copyDir(originalDirFolder, copyDirFolder)
			}
		}
		if (file.isFile()) {
			const originalFile = path.join(original, file.name)
			const copyFile = path.join(project, file.name)
			fs.copyFile(originalFile, copyFile, (err) => {
				if (err) {
					console.log(err)
					throw err
				}
			})
		}
	}
}

let i = 0
async function getAppendInStyle() {
	const files = await fsPromises.readdir(stylesDirectory, { withFileTypes: true })
	const nameExtFile = path.extname(files[i].name)
	if (files[i].isFile()) {
		if (nameExtFile === '.css') {
			const originalFile = path.join(stylesDirectory, files[i].name)
			// console.log(originalFile)
			fs.readFile(originalFile, 'utf-8', (err, content) => {
				if (err) { throw err }
				fs.appendFile(styles, content, (err) => {
					if (err) { throw err }
				})
			})
			i++
			setTimeout(() => {
				if (i < files.length) {
					getAppendInStyle()
				}
			}, 0);
			// if (i === files.length) {
			// 	i = 0
			// 	console.log(`Скрипт выполнил поставленную задачу и завершает работу...`)
			// }
		}
	}
}

let templateHtml
async function saveTemplateHtml() {
	templateHtml = await fsPromises.readFile(path.join(__dirname, 'template.html'), 'utf-8')
	getAppendInBundle()
}

async function getAppendInBundle() {
	const files = await fsPromises.readdir(htmlDirectory, { withFileTypes: true })
	let j = 0
	for (let i = 0; i < files.length; i++) {
		j++
		const nameExtFile = path.extname(files[i].name)
		if (files[i].isFile()) {
			const fileName = path.basename(files[i].name, path.extname(files[i].name))
			const regexp = `{{${fileName}}}`;
			const originalFile = path.join(htmlDirectory, files[i].name)
			fs.readFile(originalFile, 'utf-8', (err, content) => {
				if (nameExtFile === '.html') {
					templateHtml = templateHtml.replace(regexp, content)
				}
			})
		}
	}
	setTimeout(() => {
		fs.writeFile(indexHtml, templateHtml, (err) => {
			if (err) { throw err }
		})
	}, 100);
}

