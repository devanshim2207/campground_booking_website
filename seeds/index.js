const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const mongoose = require('mongoose');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',() => {
	console.log("database connected");
});

const sample = array => array[Math.floor(Math.random()* array.length)];

const seedDB = async() => {
	await Campground.deleteMany({});
	for(let i=0;i<300;i++){
		const random1000 = Math.floor(Math.random()*1000);
		const price = Math.floor(Math.random()*20)+10;
		const camp = new Campground({
			//your user id
			author: '6033ca9e14bd7d2d88a619b5',
			geometry: {
    		 
     		 type: "Point", // Don't do `{ location: { type: String } }`
     		 coordinates: [cities[random1000].longitude, cities[random1000].latitude]
   			 },
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			
			images: [
   			 {
      
     		 url: 'https://res.cloudinary.com/dlh9cm6af/image/upload/v1617938710/yelpcamp/dvs2sh4pohaefz4js2b5.jpg',
      		 filename: 'yelpcamp/dvs2sh4pohaefz4js2b5'
    		  }
    		],
			description: 'nice!',
			price
		})
		await camp.save();
	}

}

seedDB().then(() =>{
	mongoose.connection.close();
});