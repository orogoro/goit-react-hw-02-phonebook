import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './ContactForm.module.css';

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.number().required().positive().integer(),
});

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={massege => <p className={styles.errorMessage}>{massege}</p>}
    />
  );
};

export default function ContactForm({ onSubmit }) {
  const inputNameId = nanoid();
  const inputNumberId = nanoid();

  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);

    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form>
        <label className={styles.lableName} htmlFor={inputNameId}>
          Name
          <Field
            className={styles.inputForm}
            type="text"
            name="name"
            id={inputNameId}
          />
          <FormError name="name" />
        </label>

        <label className={styles.lableName} htmlFor={inputNumberId}>
          Number
          <Field
            className={styles.inputForm}
            type="tel"
            name="number"
            id={inputNumberId}
          />
          <FormError name="number" />
        </label>

        <button className={styles.addBtn} type="submit">
          add contact
        </button>
      </Form>
    </Formik>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// state = {
//   name: '',
//   number: '',
// };

// handleInputChange = e => {
//   const { name, value } = e.currentTarget;
//   this.setState({ [name]: value });
// };

// handleSubmit = e => {
//   e.preventDefault();

//   this.props.onSubmit(this.state);

//   this.reset();
// };

// reset = () => {
//   this.setState({ name: '', number: '' });
// };
