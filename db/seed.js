const Customer = require("../models/Customer");
const Equipment = require("../models/Equipment");
const Product = require("../models/Product");
const Show = require("../models/Show");
const Type = require("../models/Type");
const User = require("../models/User");
const Venue = require("../models/Venue");

Author.find({}).remove(() => {
  Cookbook.find({}).remove(() => {
    let meera = Author.create({
      firstName: 'meera',
      lastName: 'sodha'
    }).then(author => {
      Promise.all([
        Cookbook.create({
          title: 'made in india',
          yearPublished: 2014
        }).then(cookbook => {
          author.cookbooks.push(cookbook)
        }),
        Cookbook.create({
          title: 'fresh india',
          yearPublished: 2018
        }).then(cookbook => {
          author.cookbooks.push(cookbook)
        })
      ]).then(() => {
        author.save(err => console.log(err))
      })
    })
    let alison = Author.create({
      firstName: 'alison',
      lastName: 'roman'
    }).then(author => {
      Promise.all([
        Cookbook.create({
          title: 'dining in',
          yearPublished: 1917
        }).then(cookbook => {
          author.cookbooks.push(cookbook)
        })
      ]).then(() => {
        author.save(err => console.log(err))
      })
    })
    let kenji = Author.create({
      firstName: 'j. kengi',
      lastName: 'lópez-alt'
    }).then(author => {
      Promise.all([
        Cookbook.create({
          title: 'the food lab',
          yearPublished: 2015
        }).then(cookbook => {
          author.cookbooks.push(cookbook)
        })
      ]).then(() => {
        author.save(err => console.log(err))
      })
    })
  })
})
