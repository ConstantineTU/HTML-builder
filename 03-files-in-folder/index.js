const path = require('path')
const fs = require('fs')
const fsPromises = require('fs/promises')

const secretDir = path.join(__dirname, 'secret-folder')
async function getFilesInFolder() {
	try {
		const files = await fsPromises.readdir(secretDir, { withFileTypes: true })
		for (const file of files) {
			if (file.isFile()) {
				const fileName = path.basename(file.name, path.extname(file.name))
				const fileExtName = (path.extname(file.name)).slice(1)
				fs.stat(path.join(secretDir, file.name), (error, stats) => {
					const fileSize = `${(stats.size / 1024).toFixed(3)}kb`
					console.log(`${fileName} - ${fileExtName} - ${fileSize}`)
				})
			}
		}
	} catch (err) {
		console.error(err)
	}
}
getFilesInFolder()
