const { Router } = require('express');
const router = Router();
const { Schema, model } = require('mongoose');

const new_post = new Schema({
	title: String,
	description: String,
	tags:{
		type: Array,
		"default":[]
	},
	page: String,
	image:String	
}, { versionKey: '_somethingElse' });

const post = model('Post',new_post);

// PAGINA
router.get('/', async (req,res)=>{
	const response = await post.find();
	console.log(response);
	for(let i=0; i<response.length; i++){
		response[i].tags = response[i].tags.toString().replace(/,/g, ' ');
		response[i].image = response[i].image.replace('Verde', 'Negro')
	}
	res.render('index.ejs',{
		data: response
	})
})
router.route('/post')
	.get(async (req,res)=>{
		const response = await post.find();
		console.log(response.length)
		for(let i=0; i<response.length; i++){
			console.log(response[i]);
		}
		res.json(response);
	})


//admin
router.get('/edit/:id', async(req,res)=>{
	const response = await post.findById({_id: req.params.id});
	console.log(response);
	response.tags = response.tags.toString().replace(/,/g , ' ')
	res.render('edit',{
		data: response
	})
})
router.get('/add', async(req,res)=>{
	const response = await post.find();
	console.log(response);
	for(let i=0; i<response.length; i++){
		response[i].tags = response[i].tags.toString().replace(/,/g, ' ');
	}
	res.render('add.ejs',{
		data: response
	})
})

router.route('/posts/:id')
	.get(async (req,res)=>{
		const response = await post.findById({_id: req.params.id});
		res.json(response);
	})



// REST API	

router.route('/api/post')
	.post(async (req,res)=>{
		const response = await new post({
				title: req.body.title,
				description: req.body.description,
				tags:req.body.tags.split(" "),
				page: req.body.page,
				image:req.body.image
			})
		console.log(response);
		await response.save();
		res.redirect('/add')
	})

router.route('/api/post/:id')
	.post(async (req,res)=>{
		const response = await post.findOneAndUpdate({_id: req.params.id},{
				title: req.body.title,
				description: req.body.description,
				tags:req.body.tags.split(" "),
				page: req.body.page,
				image:req.body.image
			})
		console.log(response);
		res.redirect('/add');
	})
	.delete(async (req,res)=>{
		const response = await post.findByIdAndDelete(req.params.id)
		console.log(response);
		res.redirect('/add');
	})

module.exports = router;