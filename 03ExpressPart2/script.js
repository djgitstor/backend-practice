const { name } = require('ejs');
const express = require('express');
const app = express();
const data = {
    sahil: {
        name: "seerat",
        class: "1st",
        age: 26
    },

    harsh: {
        name: "harsh",
        age: "29",
        class: "7th"
    },
    karan:{
        name:'karan',
        age:20,
        class:'12th'
    }

}
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.get('/',function(req,res){
    res.send('hello world')
})

app.get('/name/:username', function (req, res) {
    let username = req.params.username
    res.render("index", { name : username , userdata: data});
})
app.listen(5000)