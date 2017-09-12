exports.home = async function (req, res) {
  res.render('home')
}

exports.subject = async function (req, res) {
  const exists = await r.table('Subjects').get(req.params.subject)
  if (exists === null) {
    return res.redirect('/*')
  }
  res.render('subject', {
    subject : req.params.subject
  })
}

exports.subjectPost = async function (req, res) {
  res.render(`subjectPost`, {
    subject : req.params.subject
  })
}

exports.subjectSubmittedPost = async function (req, res) {
  let title = req.body.postTitle
  let content = req.body.postContent
  let subject = req.body.postSubject
  // res.render(`subjectPost`, {
  //   subject : req.params.subject
  // })


  const URI_ID = await makeid();
  const URL = `/subject/${subject}/${URI_ID}`

  try {
    await r.table('Posts').insert({
      postID : URI_ID,
      postURI : URL,
      subject : subject,
      title : title,
      content : content,
    });
    res.redirect(`/subject/${subject}`)
  } catch (e) {
     res.redirect('SubjectFailure')
  }
}

exports.notFound = function (req, res) {
  res.render('notFound')
}

exports.postPage = async function (req, res) {
  const forumExists = await r.table('Subjects').get(req.params.subject)
  const postExists = await r.table('Posts').getAll(req.params.subject, {index : "subject"})
  const _POST = await r.table('Posts').getAll(req.params.subject, {index : "subject"})
  .filter({postID : req.params.post}).run();
  if (!_POST[0].postID || !forumExists === null || !postExists[0]) {
    res.redirect('/*');
    return;
  }

  res.render('postPage', {
    title : _POST[0].title,
    content : _POST[0].content,
    postID : _POST[0].postID,
  })
}

async function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 9; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
