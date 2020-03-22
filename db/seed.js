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
            description: `"Pyrotechnics" can be used in two different methods - Indoor Pyrotechinc Effects or Outdoor Close Proximity Effects. Indoor effects would include flames, mines, comets, gerbs (fountains), concussions, airbursts, flash pots, etc. Some of the uses for this type of effect would include sporting events, concerts, stage productions, corporate events, just to name a few. Outdoor Close Proximity Pyrotechnics include similar effects as indoor, but usually much bigger. Some examples are flames that can go as high as 150' and Gasoline Fireballs. Also Mines and Comets that can reach 300'`,
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
            venue: "Qudos Bank Arena (Australia)",
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
            email: 'randy.tennison@brookfieldproperties.com',
            comment: 'Great Venue - customer is very pleased with shows.'
        },
        {
            businessName: 'Iowa State University - Football',
            firstName: 'Mary',
            lastName: 'Pink',
            phone: '515.294.1534',
            email: 'mpink@iastate.edu',
            comment: 'Excellent Customer to work with'
        },
        {
            businessName: 'Iowa State University - Alumni Association',
            firstName: 'Mary Kate',
            lastName: 'Misak',
            phone: '515.294.2632',
            email: 'mkmisak@iastate.edu',
            comment: 'Fun Show - Shoots at midnight before Homecoming Game'
        },
        {
            businessName: 'Iowa State University - Wrestling',
            firstName: 'Laura',
            lastName: 'Spieth',
            phone: '515.357.6662',
            email: 'lspieth@iastate.edu',
            comment: 'I Love Wrestling!!!'
        },
        {
            businessName: 'Iowa Wild Hockey Team',
            firstName: 'Alexandra (Allie)',
            lastName: 'Brown',
            phone: '712.540.7865',
            email: 'alexandra.brown@iowawild.com',
            comment: '38 Regular Season Games'
        },
        {
            businessName: 'Prairie Meadows',
            firstName: 'Kayla',
            lastName: 'DeBruin',
            phone: '515.967.8504',
            email: 'kayla.debruin@prairiemeadows.com',
            comment: 'Favorite Show - raised budget to $40,000 for 2020.'
        },
        {
            businessName: 'Parks Area Foundation',
            firstName: 'Bill',
            lastName: 'Wheeler',
            phone: '515.770.6275',
            email: 'highlandhardware3613@yahoo.com',
            comment: 'New Venue this year.'
        },
        {
            businessName: 'KISS - Concert Tour',
            firstName: 'Yulia',
            lastName: 'Shibinskaya',
            phone: '310.600.6571',
            email: 'yulia@ffp-fx.net',
            comment: 'Best Indoor Gig Ever!!!'
        },
        {
            businessName: 'Disturbed - Concert Tour',
            firstName: 'Ariana',
            lastName: 'George',
            phone: '424.376.8014',
            email: 'arianna@ffp-fx.net',
            comment: 'Amazing Flames and very unique flame drop from ceiling'
        },
        {
            businessName: 'City of Fairmont MN',
            firstName: 'Sam',
            lastName: 'Cress',
            phone: '507.236.6413',
            email: 'scress@cressref.com',
            comment: 'Great Group of firefighters that work very hard as helpers.'
        },
        {
            businessName: 'Drake University - Drake Relays',
            firstName: 'Aimee',
            lastName: 'Lane',
            phone: '515.271.4003',
            email: 'aimee.schmidt@drake.edu',
            comment: 'Drake Stadium is a fun place to shoot!'
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
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
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
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
        {
            name: '',
            size: '',
            description: '',
            quantity: '',
            type: ''
        },
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
            venue: 'Jordan Creek Mall',
            address: '101 Jordan Creek Parkway, Suite 12518',
            city: 'West Des Moines',
            state: 'IA',
            country: 'USA',
            zip: '50266'
        },
        {
            venue: 'Jack Trice Stadium',
            address: '1732 South 4th Street',
            city: 'Ames',
            state: 'IA',
            country: 'USA',
            zip: '50011'
        },
        {
            venue: 'ISU Campanile',
            address: '2335 Union Drive',
            city: 'Ames',
            state: 'IA',
            country: 'USA',
            zip: '50011'
        },
        {
            venue: 'Hilton Coliseum',
            address: '1705 Center Drive',
            city: 'Ames',
            state: 'IA',
            country: 'USA',
            zip: '50011'
        },
        {
            venue: 'Wells Fargo Arena',
            address: '233 Center Street',
            city: 'Des Moines',
            state: 'IA',
            country: 'USA',
            zip: '50309'
        },
        {
            venue: 'Riverview Island',
            address: '710 Corning Avenue',
            city: 'Des Moines',
            state: 'IA',
            country: 'USA',
            zip: '50313'
        },
        {
            venue: 'Target Center',
            address: '600 North 1st Avenue',
            city: 'Minneapolis',
            state: 'MN',
            country: 'USA',
            zip: '55403'
        },
        {
            venue: 'Sprint Center',
            address: '1407 Grand Boulevard',
            city: 'Kansas City',
            state: 'MO',
            country: 'USA',
            zip: '56031'
        },
        {
            venue: 'City Park',
            address: '507 Lake Avenue',
            city: 'Fairmont',
            state: 'MN',
            country: 'USA',
            zip: '56031'
        },
        {
            venue: 'Drake Stadium',
            address: '2719 Forest Avenue',
            city: 'Des Moines',
            state: 'IA',
            country: 'USA',
            zip: '50311'
        },
        {
            venue: 'Qudos ank Arena (Australia)',
            address: '19 Edwin Flack Avenue',
            city: 'Sydney Olympic Park',
            state: 'NSW',
            country: 'AUS',
            zip: ''
        },
        {
            venue: 'Prairie Meadows Racetrack',
            address: '1 Prairie Meadows Drive',
            city: 'Altoona',
            state: 'IA',
            country: 'USA',
            zip: '50009'
        }
        
    ])

    .then(venues => console.log(venues))
    .catch(err => console.log(err))
});