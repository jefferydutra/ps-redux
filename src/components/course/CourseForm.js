import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const CourseForm = ({course, allAuthors, onChange, onSave, errors}) => {
	return (
		<form>
			<h1>{course.id ? 'Edit' : 'Add'} Course</h1>
			<TextInput name="title"
				label="Title"
				value={course.title}
				onChange={onChange}
				error={errors.title} />

			<SelectInput name="author"
				label="Author"
				value={course.author.id}
				defaultOption="Select Author"
				options={allAuthors}
				onChange={onChange} />

			<TextInput name="category"
				label="Category"
				value={course.category}
				onChange={onChange}
				error={errors.category} />

			<TextInput name="length"
				label="Length"
				value={course.length}
				onChange={onChange}
				error={errors.length} />

			<input type="submit" value="Save" className="btn btn-default" onClick={onSave} />
		</form>
	);
};

CourseForm.propTypes = {
  course: React.PropTypes.object.isRequired,
  allAuthors: React.PropTypes.array.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default CourseForm;
