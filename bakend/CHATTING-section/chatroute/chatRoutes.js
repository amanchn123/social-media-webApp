const express=require('express')
const {protect}=require('../middleware')
const accessChat=require('../chatController')
const app=express.Router()

app.use('/').post(protect,accessChat)


z