import gql from 'graphql-tag'

export const GET_ME = gql`
  query {
    me {
      id
      username
      displayName
      email
      favCryptos
    }
  }
`

export const GET_USER = gql`
  query($data:UserWhereUniqueInput!) {
    user(where: $data) {
      id
      username
      displayName
      email
      bio
      location
      favCryptos
      posts {
        id
        content
        category
        createdAt
        author {
          id
          username
          displayName
        }
      }
      followers {
        id
        username
        email
      }
      following {
        id
        username
        email
      }
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
      upvotes {
        id
        username
      }
      downvotes {
        id
        username
      }
      posts {
        id
        content
        category
        author {
          id
          username
          displayName
        }
      }
      author {
        id
        username
        displayName
      }
    }
  }
`

export const GET_POST = gql`
  query($id:ID!) {
    post(id: $id) {
      content
      category
      createdAt
      upvotes {
        id
        username
      }
      downvotes {
        id
        username
      }
      posts {
        id
        content
        category
        author {
          id
          username
          displayName
        }
      }
      author {
        id
        username
        displayName
      }
    }
  }
`