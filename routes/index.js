exports.home = function (req, res) {
  res.render('home')
}

exports.subject = function (req, res) {
  res.render('subject', {
    subject : 'subject'
  })
}

exports.subjectPost = function (req, res) {
  console.log(req.params.subject);
  res.render(`subjectPost`, {
    subject : req.params.subject
  })
}
