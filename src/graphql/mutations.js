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
      upvotes {
        id
      }
      downvotes {
        id
      }
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
        displayName
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

export const UPDATE_FAVCRYPTOS = gql`
  mutation($cryptos: [String!]!) {
    updateFavCryptos(cryptos: $cryptos) {
      favCryptos
    }
  }
`

export const FOLLOW_USER = gql`
  mutation($id: ID!) {
    followUser(id: $id) {
      id
      username
      displayName
      email
      favCryptos
      following {
        id
        username
      }
    }
  }
`

export const UNFOLLOW_USER = gql`
  mutation($id: ID!) {
    unfollowUser(id: $id) {
      id
      username
      displayName
      email
      favCryptos
      following {
        id
        username
      }
    }
  }
`

export const UPVOTE_POST = gql`
  mutation($id: ID!) {
    upvotePost(id: $id) {
      id
      upvotes {
        id
      }
      downvotes {
        id
      }
    }
  }
`

export const DOWNVOTE_POST = gql`
  mutation($id: ID!) {
    downvotePost(id: $id) {
      id
      upvotes {
        id
      }
      downvotes {
        id
      }
    }
  }
`

export const REMOVE_UPVOTE = gql`
  mutation($id: ID!) {
    removeUpvote(id: $id) {
      id
      upvotes {
        id
      }
      downvotes {
        id
      }
    }
  }
`

export const REMOVE_DOWNVOTE = gql`
  mutation($id: ID!) {
    removeDownvote(id: $id) {
      id
      upvotes {
        id
      }
      downvotes {
        id
      }
    }
  }
`
