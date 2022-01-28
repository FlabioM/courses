const {Student} = require('../models')


module.exports.viewAll = async function(req, res){
    const students = await Student.findAll();
    res.render('student/view_all', {students});
}


module.exports.viewProfile= async function(req,res){
    const student = await Student.findByPk(req.params.id);
    res.render('student/profile', {student})
}