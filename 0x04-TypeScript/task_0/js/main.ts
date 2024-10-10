export interface Student {
	firstName: string;
	 lastName: string;
	 age: number;
	 location: string;
}
const studentA: Student = {
	firstName: 'John',
	 lastName: 'Doe',
	 age: 20,
	 location: 'Nigeria'
};
const studentB: Student = {
	firstName: 'Jane',
	lastName: 'Doe',
	age: 25,
	 location: 'Ghana'
};
const studentList: Array<Student> = [
	studentA,
	studentB
];
const styleSheet =
	html {
	margin: 0;
	height: 100%;
}
body {
	margin: 0;
	 height: 100%
	 display: flex;
	 justify-content: center;
	 align-items: center;
}
table {
	border-collapse: collapse;
	width: 100%;
}
thead {
	font-weight: bold;
}
td {
	border: 1px solid black;
	padding: 10px;
}
 td:hover {
	 background-color: #f2f2f2;
 }
  td:nth-child(1) {
	          text-align: center;
  }
  ;

  export const displayStudentList = (studentList: Array<Student>): void => {
	  const table = document.createElement('table');
	   const thead = document.createElement('thead');
	   const tbody = document.createElement('tbody');
	   const style = document.createElement('style');
	   style.innerHTML = styleSheet;
	   thead.innerHTML =
		   <tr>
	   <td>First Name</td>
	   <td>Last Name</td>
	   <td>Age</td>
	   <td>Location</td>
	   </tr>
	   ;
	   studentList.forEach((student) => {
		    const tr = document.createElement('tr');
		     tr.innerHTML =
			     <td>${student.firstName}</td>
		     <td>${student.lastName}</td>
		     <td>${student.age}</td>
		     <td>${student.location}</td>
		     ;
		     tbody.appendChild(tr);
	   });
	   table.appendChild(thead);
	   table.appendChild(tbody);
	   document.body.appendChild(style);
	   document.body.appendChild(table);
  }

  displayStudentList(studentList);
  const styleSheetElement = document.createElement('style');
  styleSheetElement.innerHTML = styleSheet;
  document.head.insertAdjacentElement('beforeend', styleSheetElement);
  document.title = 'Task 0';
