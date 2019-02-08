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
    posts(where: {
      parent: null
    }) {
      id
      content
      category
      createdAt
      posts {
        id
        content
        category
        author {
          id
          username
        }
      }
      author {
        id
        username
      }
    }
  }
`