import gql from 'graphql-tag'

export const SUBSCRIBE_TO_MESSAGES = gql`
  subscription {
    message {
      node {
        id
        content
        author {
          id
          username
        }
        receiver {
          id
          username
        }
        createdAt
      }
      mutation
    }
  }
`
