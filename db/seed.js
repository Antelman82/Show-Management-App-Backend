const mongoose = require("./connection");
const Customer = require("../models/Customer");
const Equipment = require("../models/Equipment");
const Product = require("../models/Product");
const Show = require("../models/Show");
const Type = require("../models/Type");
const User = require("../models/User");
const Venue = require("../models/Venue");

    Type.deleteMany({}).then(() => {
        Type.collection.insertMany([
        {
            show: "Fireworks",
            description: `A professional 'Fireworks' display refers to a show that is always conducted outdoors and typically consists of all or some of the following: aerial fireworks shells, ground effects incuding multi-shot barrage units (cakes), fireballs, set pieces (lance-work), close proximity mines, comets, gerbs to name a few. Examples of 'Fireworks' shows occur for July 4th Events, Town Celebrations, Weddings, Anniversaries and Corporate Events just to name a few.`,
            pictures: ["WeddingFireworks1.png", "JC-FWX-Pond2.png"]
        },
        {
            show: "Pyrotechnics",
            description: `"Pyrotechnics" can be used in two different methods - Indoor Pyrotechinc Effects or Outdoor Close Proximity Effects. Indoor effects would include flames, mines, comets, gerbs (fountains), concussions, airbursts, flash pots, etc. Some of the uses for this type of effect would include sporting events, concerts, stage productions, corporate events, just to name a few. Outdoor Close Proximity Pyrotechnics ..`,
            pictures: ["Pyro-ISU1.png", "Slipknot-pyro.jpg"]
        },
        {
            show: "Special Effects",
            description: `"Special Effects" are different effects which are used to enhance a performance, meeting, presentation, celebration or many other special occaisions. They include such things as confetti, streamers, balloons, atmospherics (fog, dry ice, haze, bubbles, snow) and cryo-jets. These items are typyically non-pyrotechnic and can be used indoors or outdoors.`,
            pictures: ["Kiss-Confetti.png", "Nickelback-SFX.jpg"]
        }
    ])

    .then(types => console.log(types))
    .catch(err => console.log(err));
});


    Show.deleteMany({}).then(() => {
        Show.collection.insertMany([
        {
            businessName: "ISU - Wrestling",
            status: "Complete",
            date: 01/13/2019,
            venue: "Hilton Coliseum",
            type: "Pyrotechnics",
            user: ["Kelm Brueschke", "Mike Merrill", "Jacob Amsden",],
            role: ["Lead Operator", "Assistant Operator", "Assistant Operator",]
        },
        {
            businessName: "RV One - Tampa",
            status: "Complete",
            date: 01/16/2019,
            venue: "RV One Tampa Pond",
            type: "Fireworks",
            user: ["Kelm Brueschke",],
            role: ["Lead Operator",]
        },
        {
            businessName: "Iowa Wild",
            status: "Complete",
            date: 01/14/2019,
            venue: "Wells Fargo Arena",
            type: "Special Effects",
            user: ["Mike Merrill",],
            role: ["Lead Operator",]
        },
        {
            businessName: "Disturbed Concert Tour",
            status: "Complete",
            date: 01/23/2019,
            venue: "Sprint Center",
            type: "Pyrotechnics",
            user: ["Kelm Bruechke",],
            role: ["Cover License",]
        },
        {
            businessName: "Jordan Creek Town Center",
            status: "Complete",
            date: 06/30/2019,
            venue: "6/30/19",
            type: "Fireworks",
            user: ["Kelm Brueschke", "Mike Merrill", "Jacob Amsden",],
            role: ["Lead Operator", "Assistant Operator", "Assistant Operator",]
        },
        {
            businessName: "KISS Tour",
            status: "Cancelled",
            date: 11/23/2019,
            venue: "Qudos Bank Arena",
            type: "Pyrotechnics",
            user: ["Kelm Bruechke",],
            role: ["Cover License",]
        }
    ])

    .then(shows => console.log(shows))
    .catch(err => console.log(err));
});

    User.deleteMany({}).then(() => {
        User.collection.insertMany([
        {
            firstName: 'Anthony',
            lastName: 'Antelman',
            userName: 'anthonyantelman',
            password: '12345',
            address: '6400 NW 86th Street',
            city: 'Johnston',
            state: 'IA',
            zip: 50131,
            phone: '515.267.4573',
            email: 'antelmananthonyj@johndeere.com'
        },    
        {
            firstName: 'Kelm',
            lastName: 'Brueschke',
            userName: 'kelmbrueschke',
            password: '54321',
            address: '4104 83rd Street',
            city: 'Urbandale',
            state: 'IA',
            zip: 50322,
            phone: '515.321.2761',
            email: 'kelmbrueschke@gmail.com'
        },
        {
            firstName: 'Mike',
            lastName: 'Merrill',
            userName: 'mikemerrill',
            password: '11111',
            address: '2002 East Main',
            city: 'Knoxville',
            state: 'IA',
            zip: 50138,
            phone: '641.891.9689',
            email: 'batman_EMT@yahoo.com'
        },
        {
            firstName: 'Douglas',
            lastName: 'Gerwulf',
            userName: 'douglasgerwulf',
            password: '22222',
            address: '1124 South Main Avenue',
            city: 'Sioux Center',
            state: 'IA',
            zip: 51250,
            phone: '712.578.9372',
            email: 'doug.fusionpros@gmail.com'
        },
        {
            firstName: 'Jacob',
            lastName: 'Amsden',
            userName: 'jacobamsden',
            password: '55555',
            address: '1712 Earlham Road',
            city: 'Winterset',
            state: 'IA',
            zip: 50320,
            phone: '515.991.9719',
            email: 'jakri1221@gmail.com'
        },
        {
            firstName: 'Ryan',
            lastName: 'Hudson',
            userName: 'ryanhudson',
            password: '44444',
            address: '2303 Eagle Point Court',
            city: 'Des Moines',
            state: 'IA',
            zip: 50273,
            phone: '515.770.1866',
            email: 'ryanhudson515@gmail.com'
        },
        {
            firstName: 'Robert',
            lastName: 'Myers',
            userName: 'robertmyers',
            password: '66666',
            address: '127 Blair Street',
            city: 'Kellogg',
            state: 'IA',
            zip: 50135,
            phone: '515.333.1901',
            email: 'Arboc_jr@msn.com'
        }
    ])

    .then(users => console.log(users))
    .catch(err => console.log(err))
});

    Customer.deleteMany({}).then(() => {
        Customer.collection.insertMany([
        {
            businessName: 'Jordan Creek Town Center',
            firstName: 'Randy',
            lastName: 'Tennison',
            phone: '515.224.5000',
            email: 'randytennison@brookfieldproperties.com',
            comment: ''
        },
        {
            businessName: '',
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            comment: ''
        },
        {
            businessName: ''
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            comment: ''
        },
    ])

    .then(customers => console.log(customers))
    .catch(err => console.log(err))
});

    Equipment.deleteMany({}).then(() => {
        Equipment.collection.insertMany([
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        
    ])

    .then(equipments => console.log(equipments))
    .catch(err => console.log(err))
});

    Product.deleteMany({}).then(() => {
        Product.collection.insertMany([
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        
    ])

    .then(products => console.log(products))
    .catch(err => console.log(err))
});

    Venue.deleteMany({}).then(() => {
        Venue.collection.insertMany([
        {
            businessName: '',
            venue: '',
            address: '',
            city: '',
            state: '',
            zip: ''
        },
        
    ])

    .then(venues => console.log(venues))
    .catch(err => console.log(err))
});