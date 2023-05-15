let con = require('./connection');
let express = require('express');
let app = express();

let bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended:true }));

app.set('view engine','ejs');

// user registering to the system
app.get('/',function(req,res){
    res.sendFile(__dirname+'/singup.html');
});

app.post('/',function(req,res){
    console.log(req.body)
      let name = req.body.name;
      let email = req.body.email;
      let password =req.body.password;
      
      console.log(email,password)
      con.connect(function(error){
          if(error) throw error;
      
          let sql = "INSERT INTO student(name,email,password) VALUES(? , ? , ?)";
          con.query(sql,[name,email,password],function(error,result){
              if(error) throw error;
              res.redirect('/userlist');
            //   res.send('Sucssess'+result.insertId);
          });
      });
 });



//-------- users list showing to the addmin panel----------------------------------------

//seting optional route for user list to admin panel

app.get('/userlist',function(req,res){
    con.connect(function(error){
        if(error) console.log(error);


        let sql ="SELECT * FROM student";

        con.query(sql,function(error,result){
            if(error) console.log(error);

            res.render(__dirname+"/userlist",{userlist:result});
        });
    });
});


app.listen(7000 , ()=>{
    console.log("Databse connection successfully");
});