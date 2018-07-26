<template>
  <div id="login">
    <form v-on:submit.prevent="login()">
      <input v-model="username" placeholder="username" value=""/>
      <br/>
      <input v-model="password" type="password" placeholder="password"/>
      <br/>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import router from '../router';
import { mapState, mapMutations } from 'vuex'

const accountHandler = require('../handlers/accountHandler');

export default {
  name: 'Login',
  data () {
    return {
      username: 'hey',
      password: 'heya'
    }
  },
  computed: {
    ...mapState([
      'apiToken',
      'accessToken'
    ])
  },
  methods: {
    ...mapMutations([
      'setTokens'
    ]),
    login: async function() {
      try {
        const loginAccount = await accountHandler.loginAccount(this.apiToken, this.username, this.password);
        if (loginAccount.accessToken) {
          this.setTokens({
            accessToken: loginAccount.accessToken
          });
          this.$router.push({ path: '/' });
        }
      } catch (e) {
        console.log(e);
        this.errors = JSON.stringify(e);
      };
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
