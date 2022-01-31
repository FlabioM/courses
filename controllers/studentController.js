const {Student, Course} = require('../models')

module.exports.viewAll = async function(req, res){
    const students = await Student.findAll();
    res.render('student/view_all', {students});
}


module.exports.viewProfile= async function(req,res){
    const student = await Student.findByPk(req.params.id, {
        include: 'courses'
    });
    const courses = await Course.findAll();
    let availableCourses = [];
    for (let i=0; i<courses.length; i++){
        if (!studentHasCourse(student, courses[i])){
            availableCourses.push(courses[i]);
        }
    }
    res.render('student/profile', {student, availableCourses})
}

module.exports.addStudent = async function(req, res){
    const student = await Student.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        grade_level: req.body.grade_level
    });
    res.redirect(`/students/profile/${student.id`);
};

function studentHasCourse(student, course){
    for (let i=0; i<student.courses.length; i++){
        if (course.id === student.courses[i].id){
            return true
        }
    }
    return false
};