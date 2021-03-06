var express = require('express');
var router = express.Router();
//router.use(express.bodyParser());


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Adam\'s Charity Starbucks Event' });
});
/* GET home page. */
router.get('/thankYou', function(req, res) {
  res.render('thankYou', { title: 'Thank You!' });
});

router.post('/order', function(req, res) {

	var name = req.body.name;
	var location = req.body.location;
	var drinksize = req.body.drinkSize;
	var drinktype = req.body.drinkType; 
//	var drinkprice = req.body.drink.price;
//	var surcharge = req.body.drink.surcharge;

	var to = req.body.email;
	var sendgrid_username   = "rtamizian"
	var sendgrid_password   = "adamstarbucks";

	var sendgrid   = require('sendgrid')(sendgrid_username, sendgrid_password);
	var email      = new sendgrid.Email();

	email.addTo(to);
	email.setFrom(to);
	email.setSubject('Your Charity Starbucks order!');
	email.setHtml('<style> body {background-color:lightblue} h1   {color:green} p    {color:green}</style><p style="text-align:center">&nbsp;</p><p style="text-align:center">&nbsp;</p><p style="text-align:center"></p><h1 style="text-align:center">Hi bob,</h1><p style="text-align:center">This is a notification from Argus to inform you that your relative, name,  is expieriencing loud noise.</p><p style="text-align:center">You can find more information on what happened in the Argus app on your phone.</p><p style="text-align:center">&nbsp;</p><p style="text-align:center">All the best,</p><p style="text-align:center">Your Argus team</p>');
	email.addSubstitution("%name%", name);
	email.addSubstitution("%location%", location);
	email.addSubstitution("%drinktype%", drinktype);
	email.addSubstitution("%drinksize%", drinksize);
	//email.addSubstitution("%drinkprice%", drinkprice);
	//email.addSubstitution("%surcharge%", surcharge);
	email.addHeader('X-Sent-Using', 'SendGrid-API');
	email.addHeader('X-Transport', 'web');

	sendgrid.send(email, function(err, json) {
	  if (err) { return console.error(err); }
	  console.log(json);
	});

	var adamemail      = new sendgrid.Email();
	var to = "ajgask@gmail.com";
	adamemail.addTo(to);
	adamemail.setFrom(to);
	adamemail.setSubject('GO GET DAT DRINK!');
	adamemail.setHtml('Person: %name% <br> Location: %location% <br> Drink: %drinksize% %drinktype% <br> Price: %drinkprice% + %surcharge% = %finalcharge%');
	adamemail.addSubstitution("%name%", name);
	adamemail.addSubstitution("%location%", location);
	adamemail.addSubstitution("%drinktype%", drinktype);
	adamemail.addSubstitution("%drinksize%", drinksize);
	adamemail.addSubstitution("%finalcharge%", drinkprice + surcharge);
	adamemail.addSubstitution("%drinkprice%", drinkprice);
	adamemail.addSubstitution("%surcharge%", surcharge);
	adamemail.addHeader('X-Sent-Using', 'SendGrid-API');
	adamemail.addHeader('X-Transport', 'web');

	sendgrid.send(adamemail, function(err, json) {
	  if (err) { return console.error(err); }
	  console.log(json);
	});


res.redirect('/thankYou');
});

module.exports = router;
