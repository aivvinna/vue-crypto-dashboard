<template>
  <div class="columns">
    <div class="column is-4">
      <nav class="panel">
        <div class="panel-heading">
          Users
        </div>

        <template v-if="usersConversed.length > 0">
          <a v-for="user in usersConversed" :key="user.id"
            class="panel-block" :class="{'is-active': markSelectedUser(user)}"
            @click="selectUser(user)">
            {{user.username}}
          </a>
        </template>
      </nav>

    </div>
    
    <div class="column" v-if="userSelected">
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
  </div>
</template>

<script>
export default {
  name: 'Messages',
  data() {
    return {
      userSelected: null,
      message: ''
    }
  },
  created() {
    this.$store.dispatch('user/messages/getUsersConversed')
  },
  computed: {
    usersConversed() {
      return this.$store.getters['user/messages/usersConversed']
    },
    messages() {
      return this.$store.getters['user/messages/messages'].filter(message => {
        if (this.userSelected) {
          return message.author.id === this.userSelected.id || message.receiver.id === this.userSelected.id
        }
      })
    }
  },
  watch: {
    userSelected: function(newUserSelected) {
      this.$store.dispatch('user/messages/getMessages', newUserSelected.id)
    }
  },
  methods: {
    selectUser(user) {
      this.userSelected = user
    },
    isMyMessage(message) {
      return this.$store.state.user.user.id === message.author.id
    },
    markSelectedUser(user) {
      if (this.userSelected) {
        return user.id === this.userSelected.id
      }
      return false
    },
    handleCreateMessage() {
      this.$store.dispatch('user/messages/createMessage', {
        content: this.message,
        receiver: this.userSelected
      })
      this.message = ''
    },
    scrollToBottom() {
      const messagesContainer = this.$el.querySelector('.messages')
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight
      }
    }
  },
  updated() {
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
