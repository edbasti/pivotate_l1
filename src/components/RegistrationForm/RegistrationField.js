import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Row, ErrorContainer } from './RegistrationForm.style';

const RegistrationField = ({
  fieldLabel,
  type,
  name,
}) => (
  <Row>
    <label>
      {fieldLabel}
      <Field type={type} name={name} />
    </label>
    <ErrorContainer>
      <ErrorMessage name={name} />
    </ErrorContainer>
  </Row>
);

export default RegistrationField;
