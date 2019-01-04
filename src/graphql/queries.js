import gql from 'graphql-tag'

export const GET_ME = gql`
  query {
    me {
      id
      name
      email
    }
  }
`

export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      body
    }
  }
`