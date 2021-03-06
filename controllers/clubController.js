const Club = require('../models/club');
const User = require('../models/user');
const Category = require('../models/category');
const async = require('async');

exports.index = (req, res) => {
	async.parallel(
		{
			club_count: (callback) => {
				Club.countDocuments({}, callback);
			},
			club_investment_count: (callback) => {
				Category.countDocuments({ name: 'Investment Club' }, callback);
			},
			club_stokvel_count: (callback) => {
				Category.countDocuments({ name: 'Stokvel' }, callback);
			},
			users_count: (callback) => {
				User.countDocuments({}, callback);
			}
		},
		(err, results) => {
			res.render('home', { title: 'Dashboard', error: err, data: results });
		}
	);
};

// Display list of all Clubs.
exports.club_list = (req, res, next) => {
	Club.find({}).populate('category').populate('user').exec((err, list_clubs) => {
		if (err) {
			return next(err);
		}
		//Successful, render view
		res.render('club_list', { title: 'Available Clubs', club_list: list_clubs });
	});
};

// Display detail page for a specific Club.
exports.club_detail = (req, res, next) => {
	async.parallel(
		{
			club: (callback) => {
				Club.findById(req.params._id).populate('user').populate('category').exec(callback);
			}
		},
		(err, results) => {
			if (err) {
				return next(err);
			}
			if (results.club == null) {
				//No results
				let err = new Error('Club not found.');
				err.status = 404;
				return next(err);
			}
			//Sucessful, render view
			res.render('club_detail'), { title: 'Title', club: results.club };
		}
	);
};

// Display Club create form on GET.
exports.club_create_get = (req, res) => {
	res.send('NOT IMPLEMENTED: Club create GET');
};

// Handle Club create on POST.
exports.club_create_post = (req, res) => {
	res.send('NOT IMPLEMENTED: Club create POST');
};

// Display Club delete form on GET.
exports.club_delete_get = (req, res) => {
	res.send('NOT IMPLEMENTED: Club delete GET');
};

// Handle Club delete on POST.
exports.club_delete_post = (req, res) => {
	res.send('NOT IMPLEMENTED: Club delete POST');
};

// Display Club update form on GET.
exports.club_update_get = (req, res) => {
	res.send('NOT IMPLEMENTED: Club update GET');
};

// Handle Club update on POST.
exports.club_update_post = (req, res) => {
	res.send('NOT IMPLEMENTED: Club update POST');
};
