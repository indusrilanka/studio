import React from 'react';
import SimpleNameForm from '../../shared/SimpleNameForm';

const TestMethodForm = (props: any) => (
  <SimpleNameForm
    {...props}
    nameField="methodName"
    label="Test Method Name"
    idField="methodId"
  />
);

export default TestMethodForm;
