import React from 'react'
import commonStyles from 'common.less'
import { Field, reduxForm } from 'redux-form'
import Dropzone from 'react-dropzone'
import styles from './styles.less'
import MenuItem from 'material-ui/MenuItem'
import { SelectField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton';

const validate = (values) => {
    const errors = {};
    if (!values.transactionFile) {
        errors.date = 'Required';
    }
    return errors;
};

const renderSelect = ({ input, placeholder, type, meta: { touched, error, warning } }) => {
    const divClassName = `form-group ${touched && error ? 'has-danger' : ''}`;
    const inputClassName = `form-control ${touched && error ? 'form-control-danger' : ''}`;
    return (
        <SelectField
            floatingLabelText={placeholder}
            {...input}>
        </SelectField>
    );
};

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    <div>
      <Dropzone
        className={styles['dropzone']}
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
      >
        <div>Click or drop a file here to upload</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
}

class Form extends React.Component {
    onDrop(acceptedFiles, rejectedFiles) {
        const {dispatch} = this.props;
        this.setState({files: acceptedFiles});
        console.log(acceptedFiles);
    }

    render() {
        const { handleSubmit, handleClose } = this.props;
        return (
            <form className="form-inline" onSubmit={handleSubmit}>
                <Field
                    name='importFile'
                    component={renderDropzoneInput}
                />
                <Field
                    name="importType"
                    component={SelectField}
                    hintText="Type">
                    <MenuItem value="Bank Statement" primaryText="Bank Statement" />
                    <MenuItem value="Credit Card" primaryText="Credit Card"/>
                </Field>
            </form>
        );
    }
}

export default reduxForm({
    form: 'creditCardImport',
    validate
})(Form);
