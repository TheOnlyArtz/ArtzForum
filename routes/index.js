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

exports.postPage = function (req, res) {
  res.render('postPage')
}

async function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 9; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
