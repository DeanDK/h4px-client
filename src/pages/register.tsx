import React from "react";
import { Formik, Form, setNestedObjectValues } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";

interface Props {}

const Register: React.FC<Props> = ({}) => {
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='username'
              placeholder='Username'
              label='Username'
            />
            <InputField
              name='password'
              placeholder='Password'
              label='Password'
            />
            <Button
              type='submit'
              mt={4}
              isLoading={isSubmitting}
              variantColor='teal'>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
