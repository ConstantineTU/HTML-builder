const path = require('path')
const fsPromises = require('fs/promises')

const originalStyles = path.join(__dirname, 'styles')
const project = path.join(__dirname, 'project-dist')
const bundle = path.join(project, 'bundle.css')

copyDir()
async function copyDir() {
	await fsPromises.rm(bundle, { recursive: true, force: true })
	await fsPromises.mkdir(project, { recursive: true })
	getAppendInBundle()
}

async function getAppendInBundle() {
	const files = await fsPromises.readdir(originalStyles, { withFileTypes: true })
	for (let i = 0; i < files.length; i++) {
		const extNameFile = path.extname(files[i].name)
		if (files[i].isFile()) {
			if (extNameFile === '.css') {
				const originalFile = path.join(originalStyles, files[i].name)
				const content = await fsPromises.readFile(originalFile, 'utf-8')
				await fsPromises.appendFile(bundle, content)
			}
		}
	}
}

