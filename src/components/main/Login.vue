<template>
  <div id="main_login">
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
import { mapState, mapMutations } from 'vuex';
import { mappedStates } from '../config/vuex-config';

const accountHandler = require('../../handlers/accountHandler');

export default {
  name: 'MainLogin',
  computed: {
    ...mapState(mappedStates)
  },
  data () {
    return {
      username: 'hey',
      password: 'heya'
    }
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    login: async function() {
      try {
        const loginAccount = await accountHandler.loginAccount(this.apiToken, this.username, this.password);
        if (loginAccount.accessToken) {
          this.setState({
            accessToken: loginAccount.accessToken,
            account: loginAccount.account
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
