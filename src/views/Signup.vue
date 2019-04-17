<template>
  <div class="container has-text-centered">
    <div class="column is-4 is-offset-4">

      <div class="box">
        <h1 class="title">Sign up to CryptoVue</h1>
        <form @submit.prevent="handleCreateUser">
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Username" v-model="username">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Email" v-model="email">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input class="input" type="password" placeholder="Password" v-model="password">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button class="button is-fullwidth is-dark" type="submit">
                Sign Up
              </button>
            </div>
            <div v-if="error" class="help is-danger">
              {{error}}
            </div>
          </div>

          <h3>Already have an account?
            <router-link to="/login">Log in</router-link>
          </h3>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "signup",
  data() {
    return {
      isFormValid: true,
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    };
  },
  computed: {
    ...mapGetters(["loading", "error"]),
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
    handleCreateUser() {
      this.$store.dispatch("user/createUser", {
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      });
    }
  }
};
</script>