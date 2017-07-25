'use strict'
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/ade_library";
var ObjectID = require('mongodb').ObjectID;

let createBook = (req,res) => {
  MongoClient.connect(url,(err,db) => {
    if (err) res.send(err)
    db.collection("books").insertOne({
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
      stock: req.body.stock
    },(err,result) => {
      if (err) res.send(err)
      res.send(result);
      console.log(result);
      db.close();
    })
  })
}

let getAllBooks = (req,res) => {
  MongoClient.connect(url,(err,db) => {
    if (err) res.send(err)
    db.collection("books").find({}).toArray((err,result) => {
      if (err) res.send(err)
      res.send(result);
      console.log(result);
      db.close();
    })
  })
}

let updateBook = (req,res) => {
  MongoClient.connect(url,(err,db) => {
    if (err) res.send(err)
    db.collection("books").update({
      _id: ObjectID(req.params.id)
    },{$set: req.body},(err,result) => {
      if (err) res.send(err)
      console.log(result);
      res.send(result);
      db.close();
    })
  })
}

let deleteBook = (req,res) => {
  MongoClient.connect(url, (err,db) => {
    if (err) res.send(err)
    var id = {_id: ObjectID(req.params.id)}
    db.collection("books").remove(id,(req,result) => {
      if (err) res.send(err)
      console.log(result);
      res.send(result);
      db.close();
    })
  })
}

module.exports = {
  createBook,
  getAllBooks,
  updateBook,
  deleteBook
}