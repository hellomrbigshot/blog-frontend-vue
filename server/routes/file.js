const router = require('express').Router()
const fs = require('fs')
const path = require('path')

const FileModel = require('../models/file')
const UserModel = require('../models/user')
const checkLogin = require('../middlewares/check').checkLogin

// post /signup/uploadAvatar 上传头像
router.post('/uploadAvatar', checkLogin, (req, res, next) => {
    const imgData = req.body.imgData
    const username = req.body.username
    // 过滤data:URL
    const base64Data = imgData.replace(/^data:image\/\w+;base64,/, "")
    const dataBuffer = new Buffer(base64Data, 'base64')
    const filename = `${new Date().getTime()}.png`
    fs.writeFile(path.join(__dirname, `../uploads/${filename}`), dataBuffer, async (err) => {
        if (err) {
            res.status(200).json({ code: 'ERROR', data: err })
        } else {
            try {
                // 保存成功后保存数据库
                let file = await FileModel.create({ filename, username })
                let user = await UserModel.updateAvatar({ username, avatar: filename })
                res.status(200).json({ code: 'OK', data: filename })
            } catch (e) {
                res.status(200).json({ code: 'ERROR', data: e })
            }
        }
    })
})
// get /avatar/file_id
router.get('/avatar', (req, res, next) => {
	const filename = req.query.filename
	if (filename === 'undefined' || !filename) {
        res.end()
        return false
    }
    res.set('content-type', 'image/jpg')
    FileModel.getFilePath(filename).then(url => {
        // res.sendFile(url)
        // fs.readFile(url, 'binary', (err, file) => {
        // 	if (err) {
        //       console.log(err)
        //       res.end()
        // 	  return;
        // 	} else {
        // 		res.writeHead(200, { 'Content-Type': 'image/jpeg' })
        // 		res.write(file, 'binary')
        // 		res.end()
        // 		return
        // 	}
        // })
        try {
            if (url) {
                let stream = fs.createReadStream(url)
                let responseData = []; // 存储文件流
                stream.on('error', err => {
                    res.end()
                })
                if (stream) { // 判断状态
                    stream.on('data', chunk => {
                        responseData.push(chunk)
                    })
                    stream.on('end', () => {
                        let finalData = Buffer.concat(responseData)
                        res.write(finalData)
                        res.end()
                    })
                }
            } else {
                res.end()
            }
        } catch (e) {
            res.end()
        }
        
    }).catch(e => {
        res.write()
        res.end()
    })
	
})
module.exports = router