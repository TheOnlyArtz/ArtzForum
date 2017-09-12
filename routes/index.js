exports.home = function (req, res) {
  res.render('home')
}

exports.subject = function (req, res) {
  res.render('subject', {
    subject : 'subject'
  })
}

exports.subjectPost = function (req, res) {
  res.render(`subjectPost`, {
    subject : req.params.subject
  })
}

exports.subjectSubmittedPost = function (req, res) {
  let title = req.body.postTitle
  let content = req.body.postContent
  res.render(`subjectPost`, {
    subject : req.params.subject
  })

  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 9; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  const URI_ID = makeid();

}
