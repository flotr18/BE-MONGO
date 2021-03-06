const express = require('express')
const app = express()
const port = 3000;


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})


let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://admin:root@cluster0.elh7n.mongodb.net/test?retryWrites=true&w=majority";




MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
    if (err) throw err;
    let dbo = db.db("users");

    // Insert Query
    let doc = {name: 'Luke', familyname: 'Skywalker', age: 45, darkSide: false};
    dbo.collection("infos").insertOne(doc, function (err) {
        if (err) throw err;
        console.log("The Document has been inserted");
    });

    // Delete Query

    let MyDeleteQuery = { name : 'Luke'};
    dbo.collection("infos").deleteMany(MyDeleteQuery,function (err) {
        if (err) throw  err;
        console.log("The Document has been deleted ! ");



    });

    // Update Query

    let MyUpdateQuery = { name : 'Mace'};
    let Value = { $set : {name : 'Anakin', familyname: 'Skywalker', age : 45, darkSide: true}};
    dbo.collection("infos").updateOne(MyUpdateQuery,Value, function (err) {
        if (err) throw  err;
        console.log("The Document has been updated ! ")


    });

    // Read Query

    dbo.collection("infos").find({}).toArray(function(err, res) {
        if (err) throw err;
        console.log('Connected ! ');
        console.log(res);
        db.close()

    });
});







