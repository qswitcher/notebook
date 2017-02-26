import React from 'react';
import commonStyles from 'common.less';
import { Field, reduxForm } from 'redux-form';
import {importCCTransactions} from '../../actions';
import Dropzone from 'react-dropzone';

const validate = (values) => {
    const errors = {};
    if (!values.transactionFile) {
        errors.date = 'Required';
    }
    return errors;
};

const renderField = ({ input, placeholder, type, meta: { touched, error, warning } }) => {
    const divClassName = `form-group ${touched && error ? 'has-danger' : ''}`;
    const inputClassName = `form-control ${touched && error ? 'form-control-danger' : ''}`;
    return (
        <div className={divClassName}>
          <input {...input} placeholder={placeholder} type={type} className={inputClassName}/>
        </div>
    );
};

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
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
                <button className="btn btn-danger" type="button" onClick={handleClose}>Cancel</button>
                <Field
                    name='importFile'
                    component={renderDropzoneInput}
                />
                <Field
                    name="importType"
                    component="select"
                    className="form-control" >
                    <option>Type</option>
                    <option value="Bank Statement">Bank Statement</option>
                    <option value="Credit Card">Credit Card</option>
                </Field>
                <button type="submit" className='btn btn-info'>{'Import'}</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'creditCardImport',
    validate
})(Form);
