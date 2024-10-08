export default function updateStudentGradeByCity(students, city, newGrades) {
	return students
	.filter((student) => student.location === city)
	.map((student) => {
		const grade = newGrades.filter((newGrade) => newGrade.studentId === student.id);
		return {
			...student,
			grade: grade.length > 0 ? grade[0].grade : 'N/A',
		};
	});
}
