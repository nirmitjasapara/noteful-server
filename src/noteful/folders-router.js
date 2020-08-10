const path = require('path')
const express = require('express')
const xss = require('xss')
const FoldersService = require('./folders-service')

const foldersRouter = express.Router()
const jsonParser = express.json()

const serializeFolder = folder => ({
  id: folder.id,
  name: xss(folder.name)
})

foldersRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    FoldersService.getAllFolders(knexInstance)
      .then(folders => {
        res.json(folders.map(serializeFolder))
      })
      .catch((error) => {
        console.error(error);
        next();
      })
  })
  .post(jsonParser, (req, res, next) => {
    const {name} = req.body
    const newfolder = {name}

    
    if (name == null) {
      return res.status(400).json({
        error: { message: `Missing 'name' in request body` }
      })
    }

    FoldersService.insertFolder(
      req.app.get('db'),
      newfolder
    )
      .then(folder => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${folder.id}`))
          .json(serializeFolder(folder))
      })
      .catch(next)
  })

module.exports = foldersRouter