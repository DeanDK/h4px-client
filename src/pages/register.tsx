import React from "react"
import { Formik, Form } from "formik"
import { Box, Button } from "@chakra-ui/core"

import { Wrapper } from "../components/Wrapper"
import { InputField } from "../components/InputField"
import { useRegisterMutation } from "../generated/graphql"
import { toErrorMap } from "../util/toErrorMap"
import { useRouter } from "next/router"
import { createUrqlClient } from "../util/createUrqlClient"
import { withUrqlClient } from "next-urql"

interface Props {}

const Register: React.FC<Props> = ({}) => {
  const router = useRouter()
  const [, register] = useRegisterMutation()

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ options: values })
          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors))
          } else if (!response.data?.register.user) {
            router.push("/")
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='username'
              placeholder='Username'
              label='Username'
            />
            <InputField
              name='email'
              placeholder='email'
              label='Email'
              type='email'
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
              variantColor='teal'
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient)(Register)
