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
              <input class="input" type="password" placeholder="Password - at least 8 characters" v-model="password">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input class="input" type="password" placeholder="Confirm your password" v-model="passwordConfirmation">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button :disabled="!formIsValid" class="button is-fullwidth is-dark" type="submit">
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
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    };
  },
  mounted() {
    this.$store.commit('setError', null)
  },
  computed: {
    ...mapGetters(["loading", "error"]),
    ...mapGetters('user', [
      'user'
    ]),
    formIsValid() {
      return this.username.length >= 3 && this.email.length > 5 && this.password.length >= 8 && this.password === this.passwordConfirmation
    }
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