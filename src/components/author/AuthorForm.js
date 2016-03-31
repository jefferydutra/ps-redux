import React from 'react';
import TextInput from '../common/TextInput';

const AuthorForm = ({author, onSave, onChange, loading, errors}) => {
	return (
		<form>
			<h1>Manage Author</h1>
			<TextInput
				name="firstName"
				label="First Name"
				value={author.firstName}
				onChange={onChange}
				error={errors.firstName} />

			<TextInput
				name="lastName"
				label="Last Name"
				value={author.lastName}
				onChange={onChange}
				error={errors.lastName} />

			<input
        type="submit"
        disabled={loading}
        value={loading ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave} />
		</form>
	);
};

AuthorForm.propTypes = {
  author:	React.PropTypes.object.isRequired,
  onSave:	React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired,
  errors: React.PropTypes.object
};

export default AuthorForm;
