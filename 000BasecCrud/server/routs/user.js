var express = require("express");
var router = express.Router();
router.get('/:username',function(req,res){
    res.send(req.params.username)
});
module.exports = router;