<template>
  <div id="panel_login">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <div class="columns is-centered is-desktop">
            <div class="column is-one-third is-vcentered is-desktop">
              <form v-on:submit.prevent="login()">
                <div class="field">
                  <div class="control has-icons-left has-icons-right">
                    <input class="input is-medium" placeholder="Username" v-model="username"/>
                    <span class="icon is-small is-left">
                      <i class="fas fa-user"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <div class="control has-icons-left has-icons-right">
                    <input class="input is-medium" placeholder="Password" type="password" v-model="password"/>
                    <span class="icon is-small is-left">
                      <i class="fas fa-key"></i>
                    </span>
                  </div>
                </div>
                <p>&nbsp;</p>
                <div class="field">
                  <div class="control">
                    <input class="button is-link is-medium" type="submit" value="Login" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const accountHandler = require('../../../handlers/accountHandler');
const coupleHandler = require('../../../handlers/coupleHandler');

export default {
  name: 'Panel-Login',
  computed: {
    ...mapGetters(mappedGetters),
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

        this.$router.push({ path: '/' });
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
