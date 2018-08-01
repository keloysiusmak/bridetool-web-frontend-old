<template>
  <div id="main_login">
    <div v-if="loading">
      Loading...
    </div>
    <form v-on:submit.prevent="login()" v-if="!loading">
      <input v-model="username" placeholder="username" value=""/>
      <br/>
      <input v-model="password" type="password" placeholder="password"/>
      <br/>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const accountHandler = require('../../../handlers/accountHandler');
const coupleHandler = require('../../../handlers/coupleHandler');

export default {
  name: 'Main-Login',
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  data () {
    return {
      loading: false,
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
        this.loading = true;
        const loginAccount = await accountHandler.loginAccount(this.tokens, this.username, this.password);

        const primaryParty = loginAccount.account.couple.primaryParty;

        const activeParty = {
          firstName: primaryParty.firstName,
          lastName: primaryParty.lastName,
          gender: primaryParty.gender,
          id: primaryParty._id
        }

        this.setState({
          accessToken: loginAccount.accessToken,
          refreshToken: loginAccount.refreshToken,
          account: loginAccount.account,
          storedTokensTime: Math.floor(Date.now() / 1000),
          activeParty: activeParty
        });

        if (this.account.type === 'couple') {
          this.$router.push({ path: '/welcome' });
        }
      } catch (e) {
        this.setState({
          errors: e.message
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
