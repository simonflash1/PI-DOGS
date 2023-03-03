const {Router} = require('express')

const router = Router()

const {getDogs, createDog, getDogID} = require("../handlers/dogHandler")

router.get('/', getDogs)

router.get('/:id', getDogID)


router.post('/',createDog)



 
module.exports = router
