'use strict';
var express=require('express');
var app=express();
app.set("view engine", 'jade');
const {Firestore} = require('@google-cloud/firestore');
async function quickstart() {
    // Obtain a document reference.
    const firestore = new Firestore();
    const document = firestore.collection('Items').get().
            then((snapshot) => {
                if (!snapshot.empty) {
                    const ret = { items: [] };
                    snapshot.docs.forEach(element => {
                        //get data
                        const item = element.data();
                        console.log(item);
                    }, this);
                }
    });
    // Enter new data into the document.
    // await document.set({
    //     title: 'Welcome to Firestore',
    //     body: 'Hello World',
    // });
    // console.log('Entered new data into the document');

    // Update an existing document.
    // await document.update({
    //     body: 'My first Firestore app',
    // });
    // console.log('Updated an existing document');

    // Read the document.
    let doc = await document.get();
    console.log(doc);

    // Delete the document.
    // await document.delete();
    // console.log('Deleted the document');
}
app.get('/',function(req,res)
{
    //res.send('Home Page!');
// Create a new client
    const firestore = new Firestore();
    const document = firestore.collection('Items').get()
                .then((snapshot) => {
                    if (!snapshot.empty) {
                        const ret = {items: []};
                        snapshot.docs.forEach(element => {
                            //get data
                            const item = element.data();
                            //console.log(item);
                            ret.items.push(item);
                        }, this);
                        console.log(ret.items);
                        res.render('index', {items: ret.items});
                    }
                });
});
app.get('/search',function(req,res)
{
    res.send('Search Portal');
});
app.get('/items',function(req,res)
{
    res.send('Add an Item');
});
app.get('/jade',function (req,res) {
    res.render('index',
        {title: 'Hello World',message: 'Welcome'});
});
var server=app.listen(3000,function() {});