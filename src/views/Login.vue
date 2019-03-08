<template>
    <div>
    <h1>Log in</h1>

    <form @submit.prevent="handleLogin">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input class="input" type="text" placeholder="Email" v-model="email">
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" placeholder="Password" v-model="password">
        </div>
      </div>

      <div class="field">
        <div class="control">
          <button class="button is-link" type="submit">Log in</button>
        </div>
      </div>

      <h3>Don't have an account?
        <router-link to="/signup">Sign Up</router-link>
      </h3>

    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapGetters(['error', 'loading']),
    ...mapGetters('user', [
      'user'
    ])
  },
  watch: {
    user(value) {
      if (value) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    handleLogin() {
      this.$store.dispatch('user/loginUser', {
        data: {
          email: this.email,
          password: this.password
        }
      })
    }
  }
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
