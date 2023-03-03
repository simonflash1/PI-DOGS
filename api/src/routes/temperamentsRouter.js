const {Router} = require('express')
const getTemperamentsHandler = require("../handlers/temperamentsHandler")

const router = Router()

router.get('/', getTemperamentsHandler)


module.exports = router