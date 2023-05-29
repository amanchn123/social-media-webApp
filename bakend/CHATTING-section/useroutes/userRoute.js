const express=require('express')
const router=express.Router()
const {registercontroller, alluser,login}=require('../usercontroller')
const { protect } = require('../middleware')

router.route('/').post(registercontroller).get(protect,alluser)
router.post('/login',login)


module.exports=router;