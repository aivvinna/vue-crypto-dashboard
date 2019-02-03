import gql from 'graphql-tag'

export const GET_ME = gql`
  query {
    me {
      id
      username
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
      createdAt
      author {
        id
        username
      }
    }
  }
`