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
    onDrop(acceptedFiles, rejectedFiles) {
        const {dispatch} = this.props;
        this.setState({files: acceptedFiles});
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
                    <MenuItem value="citi" primaryText="Citi Bank Credit Card"/>
                    <MenuItem value="amex" primaryText="American Express"/>
                    <MenuItem value="amazon" primaryText="Amazon Credit Card"/>
                    <MenuItem value="ally" primaryText="Ally Bank Statement" />
                </Field>
            </form>
        );
    }
}

export default reduxForm({
    form: 'creditCardImport',
    validate
})(Form);
