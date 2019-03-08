<template>
  <div>
    <h1>Sign Up</h1>

    <form @submit.prevent="handleCreateUser">
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input class="input" type="text" placeholder="Username" v-model="username">
        </div>
      </div>

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
          <button class="button is-link" type="submit">Sign Up</button>
        </div>
      </div>

      <h3>Already have an account?
        <router-link to="/login">login</router-link>
      </h3>

    </form>
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