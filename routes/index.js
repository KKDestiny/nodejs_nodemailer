var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer');

var mailTransport = nodemailer.createTransport({
	host : 'smtp.sina.com',
	secureConnection: true, // use SSL
	auth : {
		user : 'konkadigital@sina.cn',
		pass : 'xxxx'
	},
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/send', function(req, res, next) {
	var options = {
		from 		: '"Mike的读书季" <konkadigital@sina.cn>',
		to 			: '"Mike" <1139904786@qq.com>, "System" <konkadigital@sina.cn>',
		// cc		: ''	//抄送
		// bcc		: ''	//密送
		subject 	: '一封来自Node Mailer的邮件',
		text 		: '一封来自Node Mailer的邮件',
		html		: '<h1>你好，这是一封来自NodeMailer的邮件！</h1><p><img src="cid:00000001"/></p>',
		attachments	: 
					[
						{
							filename: 'img1.png',
							path: 'public/images/img1.png',
							cid : '00000001'
						},
						{
							filename: 'img2.png',
							path: 'public/images/img2.png',
							cid : '00000002'
						},
					]
	};
	
	mailTransport.sendMail(options, function(err, msg){
		if(err){
			console.log(err);
			res.render('index', { title: err });
		}
		else {
			console.log(msg);
			res.render('index', { title: "已接收："+msg.accepted});
		}
	});
});

module.exports = router;
