import gql from 'graphql-tag'

export const LOGIN_USER = gql`
  mutation($data: LoginUserInput!) {
    login(data: $data) {
      token
    }
  }
`

export const SIGNUP_USER = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
    }
  }
`

export const CREATE_POST = gql`
  mutation($data: CreatePostInput!) {
    createPost(data: $data) {
      id
      content
      category
      posts {
        id
        content
        category
      }
      parent {
        id
        content
        category
      }
      createdAt
      author {
        id
        username
      }
    }
  }
`

export const DELETE_POST = gql`
  mutation($id: ID!) {
    id
    content
  }
`

export const FAV_CRYPTO = gql`
  mutation($crypto: String!, $array: [String!]!) {
    favCrypto(crypto: $crypto, array: $array) {
      favCryptos
    }
  }
`

export const UNFAV_CRYPTO = gql`
  mutation($crypto: String!, $array: [String!]!) {
    favCrypto(crypto: $crypto, array: $array) {
      favCryptos
    }
  }
`
