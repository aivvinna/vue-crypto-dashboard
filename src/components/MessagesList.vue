<template>
  <div v-if="messages">
    <div class="messages">
      <div class="message-container is-clearfix" v-for="message in messages" :key="message.id">
        <div class="box" :class="{'my-message': isMyMessage(message), 'not-my-message': !isMyMessage(message)}">
          <div class="content">
            <p>
              <strong>{{message.author.username}}</strong> <small>{{message.createdAt}}</small>
              <br>
              {{message.content}}
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="controls field has-addons">
      <div class="control is-expanded">
        <input
          class="input"
          v-model="message"
          type="text"
          placeholder="Write a message"
          @keydown.enter="handleCreateMessage">
      </div>
      <div class="control">
        <button class="button is-primary button-submit"
          :disabled="message.length === 0"
          @click="handleCreateMessage">
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_MESSAGES } from '@/graphql/queries'
import { CREATE_MESSAGE } from '@/graphql/mutations'
import { SUBSCRIBE_TO_MESSAGES } from '@/graphql/subscriptions'

export default {
  name: 'MessagesList',
  props: ['userSelected'],
  data() {
    return {
      message: '',
      messageOptResCounter: 0
    }
  },
  apollo: {
    messages: {
      query: GET_MESSAGES,
      variables() {
        return {
          otherUserId: this.userSelected.id
        }
      },
      subscribeToMore: {
        document: SUBSCRIBE_TO_MESSAGES,
        updateQuery: (prevResult, { subscriptionData }) => {
          return {
            messages: [...prevResult.messages, subscriptionData.data.message.node]
          }
        }
      },
      result() {
        this.scrollToBottom()
      }
    }
  },
  methods: {
    isMyMessage(message) {
      return this.$store.state.user.user.id === message.author.id
    },
    handleCreateMessage() {
      this.$apollo.mutate({
        mutation: CREATE_MESSAGE,
        variables: {
          data: {
            content: this.message,
            receiverId: this.userSelected.id
          }
        },
        update: (cache, { data: { createMessage }}) => {
          const data = cache.readQuery({ query: GET_MESSAGES, variables: { otherUserId: this.userSelected.id}})
          data.messages.push(createMessage)
          cache.writeQuery({
            query: GET_MESSAGES,
            variables: {
              otherUserId: this.userSelected.id
            },
            data
          })
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createMessage: {
            __typename: 'Message',
            id: this.messageOptResCounter,
            content: this.message,
            author: this.$store.state.user.user,
            receiver: this.userSelected,
            createdAt: Date.now()
          }
        }
      })
      this.scrollToBottom()
      this.messageOptResCounter += 1
      this.message = ''
    },
    scrollToBottom() {
      const messagesContainer = this.$el.querySelector('.messages')
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight
      }
    },
  },
  mounted() {
    this.scrollToBottom()
  }
}
</script>

<style lang="scss" scoped>
.messages {
  overflow: auto;
  height: 80vh;
  background-color: gray;
  padding: 20px;
}

.message-container {
  margin: 10px;
  .my-message {
    float: right;
  }
  .not-my-message {
    float: left;
  }
}
</style>
