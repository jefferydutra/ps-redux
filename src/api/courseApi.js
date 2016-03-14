//This file is mocking a web API by hitting hard coded data.
const	courses = [
  {
    id: "react-flux-building-applications",
    title: "Building Applications in React and Flux",
    watchHref: "http://www.pluralsight.com/courses/react-flux-building-applications",
    author: {
      id: "cory-house",
      name: "Cory House"
    },
    length: "5:08",
    category: "JavaScript"
  },
	{
		id: "clean-code",
		title: "Clean Code: Writing Code for Humans",
		watchHref: "http://www.pluralsight.com/courses/writing-clean-code-humans",
		author: {
			id: "cory-house",
			name: "Cory House"
		},
		length: "3:10",
		category: "Software Practices"
	},
	{
		id: "architecture",
		title: "Architecting Applications for the Real World",
		watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
		author: {
			id: "cory-house",
			name: "Cory House"
		},
		length: "2:52",
		category: "Software Architecture"
	},
	{
		id: "career-reboot-for-developer-mind",
		title: "Becoming an Outlier: Reprogramming the Developer Mind",
		watchHref: "http://www.pluralsight.com/courses/career-reboot-for-developer-mind",
		author: {
			id: "cory-house",
			name: "Cory House"
		},
		length: "2:30",
		category: "Career"
	},
	{
		id: "web-components-shadow-dom",
		title: "Web Component Fundamentals",
		watchHref: "http://www.pluralsight.com/courses/web-components-shadow-dom",
		author: {
			id: "cory-house",
			name: "Cory House"
		},
		length: "5:10",
		category: "HTML5"
	}
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (course) => {
  return course.title.replace(' ', '-');
};

class CourseApi {
  static getAllCourses() {
    return new Promise(function(resolve, reject) {
      resolve(Object.assign([], courses));
    });
  }

  static getCourseById(id) {
    return new Promise(function(resolve, reject) {
      resolve(courses.find(course => id == id));      
    });
  }

  static saveCourse(course) {
    if (course.id) {
      const existingCourseIndex = courses.findIndex(a => a.id == course.id);
      courses.splice(existingCourseIndex, 1, course);
    } else {
      //Just simulating creation here.
      //The server would generate ids for new courses in a real app.
      //Cloning so copy returned is passed by value rather than by reference.
      course.id = generateId(course);
      courses.push(course);
    }

    return new Promise(function(resolve, reject) {
      resolve(Object.assign({}, course));
    });
  }

  static deleteCourse(courseId) {
    const indexOfCourseToDelete = courses.findIndex(course => { course.courseId == courseId; } );
    return new Promise(function(resolve, reject) {
      courses.splice(indexOfCourseToDelete, 1);
      resolve();
    });
  }
}

export default CourseApi;
