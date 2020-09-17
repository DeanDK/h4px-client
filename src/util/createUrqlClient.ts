import { fetchExchange, dedupExchange } from "urql"
import { cacheExchange } from "@urql/exchange-graphcache"
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  RegisterMutation,
} from "../generated/graphql"
import { betterUpdateQuery } from "./betterUpdateQuery"

export const createUrqlClient = (ssrExcahnge: any) => ({
  url: "http://localhost:4001/graphql",
  fetchOptions: {
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => ({ me: null })
            )
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              _result,
              (result: any, query) => {
                if (result.login.errors) {
                  return query
                } else {
                  return {
                    me: result.login.user,
                  }
                }
              }
            )
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              {
                query: MeDocument,
              },
              _result,
              (result: any, query) => {
                if (result.register.errors) {
                  return query
                } else {
                  return {
                    me: result.register.user,
                  }
                }
              }
            )
          },
        },
      },
    }),
    ssrExcahnge,
    fetchExchange,
  ],
})
