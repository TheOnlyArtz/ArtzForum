exports.home = async function (req, res) {
	res.render('home');
};

exports.subject = async function (req, res) {
	const exists = await r.table('Subjects').get(req.params.subject);
	if (exists === null) {
		return res.redirect('/*');
	}
	const recentPosts = await r.table('Posts').getAll(req.params.subject, {index: 'subject'}).run();
	res.render('subject', {
		subject: req.params.subject,
		recentPosts
	});
};

exports.subjectPost = async function (req, res) {
	res.render(`subjectPost`, {
		subject: req.params.subject
	});
};

exports.subjectSubmittedPost = async function (req, res) {
	const title = req.body.postTitle;
	const content = req.body.postContent;
	const subject = req.body.postSubject;
  // Res.render(`subjectPost`, {
  //   subject : req.params.subject
  // })

	const URI_ID = await makeid();
	const URL = `/subject/${subject}/post/${URI_ID}`;

	try {
		await r.table('Posts').insert({
			postID: URI_ID,
			postURI: URL,
			subject,
			title,
			content,
			comments: []
		});
		res.redirect(URL);
	} catch (e) {
		res.redirect('SubjectFailure');
	}
};

exports.notFound = function (req, res) {
	res.render('notFound');
};

exports.postPage = async function (req, res) {
	const forumExists = await r.table('Subjects').get(req.params.subject);
	const postExists = await r.table('Posts').getAll(req.params.subject, {index: 'subject'});
	const _POST = await r.table('Posts').getAll(req.params.subject, {index: 'subject'})
  .filter({postID: req.params.post}).run();
	if (!_POST[0].postID || !forumExists === null || !postExists[0]) {
		res.redirect('/*');
		return;
	}
	res.render('postPage', {
		title: _POST[0].title,
		subject: _POST[0].subject,
		comments: _POST[0].comments,
		content: _POST[0].content,
		postID: _POST[0].postID
	});
};

exports.commentSubmitted = async function (req, res) {
	const _POST = await r.table('Posts').getAll(req.params.subject, {index: 'subject'})
  .filter({postID: req.params.post}).run();
	const appendToArray = async (table, uArray, doc) => r.table(table)
    .filter({postID: req.body.postID})
    .update(object => ({[uArray]: object(uArray)
    .default([]).append(doc)}))
    .run();
	await appendToArray('Posts', 'comments', {content: req.body.commentContent});
	await res.redirect(`/subject/${req.body.postSubject}/post/${req.body.postID}/`);
};

async function makeid() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < 9; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}
