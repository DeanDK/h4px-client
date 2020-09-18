import { Box, Button, Flex, Link } from "@chakra-ui/core"
import React from "react"
import NextLink from "next/link"
import { useLogoutMutation, useMeQuery } from "../generated/graphql"

import { capitalize } from "../util/string"
import { isServer } from "../util/isServer"

type Props = {}

export const NavBar: React.FC<Props> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation()
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  })
  let body = null

  // data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href='/login'>
          <Link color='black' mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href='/register'>
          <Link color='black'>Register</Link>
        </NextLink>
      </>
    )
  } else {
    body = (
      <Flex>
        <Box mr={2}>{capitalize(data.me.username)}</Box>
        <Button
          onClick={() => logout()}
          variant='link'
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    )
  }

  return (
    <Flex bg='tomato' p={4}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  )
}
