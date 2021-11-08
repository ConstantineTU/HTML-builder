const path = require('path')
const fs = require('fs')
const fsPromises = require('fs/promises')

const originalAsset = path.join(__dirname, 'assets')
const originalStyles = path.join(__dirname, 'styles')
const originalHtml = path.join(__dirname, 'components')

const projectDist = path.join(__dirname, 'project-dist')

const assets = path.join(projectDist, 'assets')
const styles = path.join(projectDist, 'style.css')
const indexHtml = path.join(projectDist, 'index.html')

let templateHtml

async function createProject() {
	await fsPromises.rm(projectDist, { recursive: true, force: true })
	await fsPromises.mkdir(projectDist, { recursive: true })
	templateHtml = await fsPromises.readFile(path.join(__dirname, 'template.html'), 'utf-8')
	copyAssets(originalAsset, assets)
	bundleHtml()
	bundleStyles()
}
createProject()

async function copyAssets(original, project) {
	await fsPromises.mkdir(project, { recursive: true })
	const files = await fsPromises.readdir(original, { withFileTypes: true })
	for (const file of files) {
		if (file.isDirectory()) {
			const originalFolder = path.join(original, file.name)
			const copyFolder = path.join(project, file.name)
			if (originalFolder !== projectDist) {
				copyAssets(originalFolder, copyFolder)
			}
		}
		if (file.isFile()) {
			const originalPath = path.join(original, file.name)
			const copyPath = path.join(project, file.name)
			fs.copyFile(originalPath, copyPath, (err) => { if (err) { throw err } })
		}
	}
}

async function bundleStyles() {
	const files = await fsPromises.readdir(originalStyles, { withFileTypes: true })
	for (let i = 0; i < files.length; i++) {
		const extNameFile = path.extname(files[i].name)
		if (files[i].isFile()) {
			if (extNameFile === '.css') {
				const originalFile = path.join(originalStyles, files[i].name)
				const content = await fsPromises.readFile(originalFile, 'utf-8')
				await fsPromises.appendFile(styles, content)
			}
		}
	}
}

async function bundleHtml() {
	const files = await fsPromises.readdir(originalHtml, { withFileTypes: true })
	for (let i = 0; i < files.length; i++) {
		const nameExtFile = path.extname(files[i].name)
		if (nameExtFile === '.html') {
			if (files[i].isFile()) {
				const fileName = path.basename(files[i].name, path.extname(files[i].name))
				const variable = `{{${fileName}}}`;
				const originalFile = path.join(originalHtml, files[i].name)
				const content = await fsPromises.readFile(originalFile, 'utf-8')
				templateHtml = templateHtml.replace(variable, content)
				fs.writeFile(indexHtml, templateHtml, (err) => { if (err) { throw err } })
			}
		}
	}
}