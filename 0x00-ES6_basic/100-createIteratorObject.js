export default function createIteratorObject(report) {
	return (function* _() {
		for (const department of Object.keys(report.allEmployees)) {
			for (const employee of report.allEmployees[department]) {
				 yield employee;
			}
		}
	}());
}
