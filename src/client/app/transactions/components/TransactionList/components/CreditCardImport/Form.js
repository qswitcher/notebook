import React from 'react'
import commonStyles from 'common.less'
import { Field, reduxForm } from 'redux-form'
import Dropzone from 'react-dropzone'
import styles from './styles.less'
import MenuItem from 'material-ui/MenuItem'
import { SelectField } from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';

const validate = (values) => {
    const errors = {};
    if (!values.transactionFile) {
        errors.date = 'Required';
    }
    if (!values.creditCardType) {
        errors.creditCardType = 'Type required';
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
        <List>
          { files.map((file, i) => <ListItem key={i} primaryText={file.name}/>) }
        </List>
      )}
    </div>
  );
}

class Form extends React.Component {
    fileChange = (file) => {
        const { autofill } = this.props;
        // get file name
        const filename = file[0];
        console.log(filename);
        autofill('creditCardType', 'Amex');
    };

    render() {
        const { handleSubmit, handleClose } = this.props;
        return (
            <form className="form-inline" onSubmit={handleSubmit}>
                <Field
                    name='importFile'
                    component={renderDropzoneInput}
                    onChange={this.fileChange}
                />
                <Field
                    name="creditCardType"
                    component={SelectField}
                    hintText="Type">
                    <MenuItem value="Citi" primaryText="Citi Bank Credit Card"/>
                    <MenuItem value="Amex" primaryText="American Express"/>
                    <MenuItem value="Amazon" primaryText="Amazon Credit Card"/>
                </Field>
            </form>
        );
    }
}

export default reduxForm({
    form: 'creditCardImport',
    validate
})(Form);
