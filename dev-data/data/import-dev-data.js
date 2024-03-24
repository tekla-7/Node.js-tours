const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel')


dotenv.config({ path: './controllers' });

const DB = 'mongodb+srv://tekla:lxBcVDiZHwNrfgh1@cluster0.palp669.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => { console.log("conection is successful") })

//Read Jsson file
const tours = JSON.parse(fs.readFileSync('tours-simple.json', 'utf-8'));

//IMPORT DAta into DB
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded');
        
    } catch (err) {
        console.log(err)
    }
    process.exit();
}
///Delate all data from db
const deleteData = async () => {
    try {
        await Tour.deleteMany();

        console.log('Data successfully delete'); 
    } catch (err) {
        console.log(err)
    }
    process.exit();
}
// delateData();
// importData();
//or
if (process.argv[2] === '--import') {
    importData()
} else if (process.argv[2] === '--delete') {
    deleteData()
}
//node import-dev-data.js --delete or node --import
