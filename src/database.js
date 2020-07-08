const mongoose = require('mongoose');
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true 
})
.then(db => console.log('DB is connected '))
.catch(err=> console.log(err))