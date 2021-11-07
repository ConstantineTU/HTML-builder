const path = require('path')
const fs = require('fs')

const originalFolder = path.join(__dirname, 'files')
const copyFolder = path.join(__dirname, 'files-copy')

return new Promise(function (resolve, reject) {
	async function copyDir() {
		await fs.mkdir(copyFolder, { recursive: true }, (err) => {
			if (err) throw err
			console.log('Пустая папка создана')
			resolve()
		})
		await fs.readdir(copyFolder, (err, files) => {
			if (err) throw err
			for (let file of files) {
				const nameFile = path.join(copyFolder, file)
				fs.unlink(nameFile, err => {
					if (err) throw err
				})
			}
			console.log('Удаление папки с файлами выполнено')
		})
	}
	copyDir()
}).then(() => {
	fs.readdir(originalFolder, { withFileTypes: true }, (err, files) => {
		for (const file of files) {
			if (file.isDirectory()) {
				const originalDir = path.join(originalFolder, file.name)
				const copyDir = path.join(__dirname, 'files-copy', file.name)

				console.log(originalDir)
			}
			if (file.isFile()) {
				const originalFile = path.join(originalFolder, file.name)
				const copyFile = path.join(__dirname, 'files-copy', file.name)
				fs.copyFile(originalFile, copyFile, (err) => {
					if (err) {
						console.log(err)
						throw err
					}
				})
				console.log(`${file.name} скопирован`)
			}
		}
		console.log(`Скрипт выполнил поставленную задачу и завершает работу...`)
	})
})



// const path = require('path')
// const fs = require('fs')
// const fsPromises = require('fs/promises')

// const originalFolder = path.join(__dirname, 'files')
// const copyFolder = path.join(__dirname, 'files-copy')

// return new Promise(function (resolve, reject) {
// 	async function deleteAndCreateDir(directory) {
// 		await fs.mkdir(copyFolder, { recursive: true }, (err) => {
// 			if (err) throw err
// 			console.log('Пустая папка создана')

// 		})
// 		await fs.readdir(directory, { withFileTypes: true }, (err, files) => {
// 			if (err) throw err
// 			for (let file of files) {
// 				const nameFile = path.join(directory, file.name)
// 				if (file.isDirectory()) {
// 					console.log(`Найдена новая директория: ${file.name}`)
// 					fs.rm(nameFile, { recursive: true }, err => {
// 						// console.log(`Директория: ${file.name} удалена`)
// 						if (err) {
// 							deleteAndCreateDir(copyFolder)
// 						}
// 					})
// 					deleteAndCreateDir(nameFile)
// 					fs.rm(nameFile, { recursive: true }, err => {
// 						// console.log(`Директория: ${file.name} удалена`)
// 						if (err) {
// 							deleteAndCreateDir(copyFolder)
// 						}
// 					})
// 				} else {

// 				}
// 				if (file.isFile()) {
// 					fs.rm(nameFile, { recursive: true }, err => {
// 						if (err) {

// 							if (err) throw err

// 						}
// 						// console.log(`Файл: ${file.name} удалён`)
// 					})

// 				}

// 			}

// 		})
// 		// await fs.mkdir(copyFolder, { recursive: true }, (err) => {
// 		// 	if (err) throw err
// 		// 	// console.log('Пустая папка создана')
// 		// 	resolve()
// 		// })
// 		resolve()
// 	}
// 	deleteAndCreateDir(copyFolder)

// }).then(() => {
// 	async function getCopyDir(original, copy) {
// 		fs.readdir(original, { withFileTypes: true }, (err, files) => {
// 			for (const file of files) {
// 				// if (file.isDirectory()) {
// 				// 	const originalDir = path.join(original, file.name)
// 				// 	const copyDir = path.join(copy, file.name)
// 				// 	fs.mkdir(copyDir, { recursive: true }, (err) => {
// 				// 		if (err) throw err
// 				// 		console.log('Пустая папка создана')
// 				// 	})
// 				// 	// getCopyDir(originalDir, copyDir)
// 				// 	console.log(`Папка для копиравания найдена - ${file.name}`)
// 				// }
// 				if (file.isFile()) {
// 					const originalFile = path.join(original, file.name)
// 					const copyFile = path.join(copy, file.name)
// 					fs.copyFile(originalFile, copyFile, (err) => {
// 						if (err) {
// 							console.log(err)
// 							throw err
// 						}
// 					})
// 					console.log(`${file.name} скопирован`)
// 				}
// 			}
// 			console.log(`Скрипт выполнил поставленную задачу и завершает работу...`)
// 		})
// 	}
// 	getCopyDir(originalFolder, copyFolder)
// })