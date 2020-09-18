import React from "react"
import { Formik, Form } from "formik"
import { Button } from "@chakra-ui/core"
import { useRouter } from "next/router"

import { Wrapper } from "../components/Wrapper"
import { InputField } from "../components/InputField"
import { useLoginMutation } from "../generated/graphql"
import { toErrorMap } from "../util/toErrorMap"
import { createUrqlClient } from "../util/createUrqlClient"
import { withUrqlClient } from "next-urql"

const Login: React.FC<{}> = ({}) => {
  const router = useRouter()
  const [, login] = useLoginMutation()

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values)
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors))
          } else if (!response.data?.login.user) {
            router.push("/")
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='usernameOrEmail'
              placeholder='username or email'
              label='Username or Email'
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient)(Login)
