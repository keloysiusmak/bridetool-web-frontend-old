<template>
  <div class="loginPanel">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container box">
          <div class="is-vcentered has-text-centered">
            <div class="logo">Bt<span class="has-text-danger">.</span></div>
            <div class="tile is-parent" v-if="showResetPassword">
              <article class="tile is-child box has-text-left">
                <p class="is-italic is-size-7 is-underline">
                  <a v-on:click="resetPassword(false)">
                    Remembered your password?
                  </a>
                </p>
                <br/>
                <p class="title is-5">Oh no, did you forget your password?</p>
                <p class="subtitle is-7">
                  Don't worry! We got this. Key in your username you use to sign in to your account
                  and we'll drop you an email associated with that account for more information.
                </p>
                <form v-on:submit.prevent="login()">
                  <label class="label has-text-grey">Username</label>
                  <div class="field">
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" placeholder="Username" v-model="username"/>
                      <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                  </div>
                  <br/>
                  <div class="field is-clearfix">
                    <div class="control is-pulled-right">
                      <input class="button is-link is-outlined" type="submit" value="Reset Password" />
                    </div>
                  </div>
                </form>
              </article>
            </div>
            <div class="tile is-parent" v-if="!showResetPassword">
              <article class="tile is-child box has-text-left">
                <div v-if="localErrors.componentError" class="notification is-danger">
                  <button class="delete" v-on:click="localErrors.componentError = null"></button>
                  <span class="is-size-7">{{localErrors.componentError}}</span>
                </div>
                <form v-on:submit.prevent="login()">
                  <label class="label has-text-grey">Username</label>
                  <div class="field">
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" placeholder="Username" v-model="username"/>
                      <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                    <p class="help is-danger" v-if="localErrors.username">{{localErrors.username}}</p>
                  </div>
                  <br/>
                  <label class="label has-text-grey">Password</label>
                  <div class="field">
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" placeholder="Password" type="password" v-model="password"/>
                      <span class="icon is-small is-left">
                        <i class="fas fa-key"></i>
                      </span>
                    </div>
                    <p class="help is-danger" v-if="localErrors.password">{{localErrors.password}}</p>
                  </div>
                  <p class="is-italic is-size-7 is-underline">
                    <a v-on:click="resetPassword(true)">
                      forgot your password?
                    </a>
                  </p>
                  <br/>
                  <div class="field is-clearfix">
                    <div class="control is-pulled-right" v-if="!loginLoading">
                      <input class="button is-link is-outlined" type="submit" value="Login" />
                    </div>
                    <div class="control is-pulled-right" v-if="loginLoading">
                      <a class="button is-loading is-medium is-text"></a>
                    </div>
                  </div>
                  <div class="is-divider" data-content="DON'T HAVE AN ACCOUNT?"></div>
                  <p class="title is-5">Sign ups open soon!</p>
                  <p class="subtitle is-7">
                    Bridetool is still in its beta testing phase and unfortunately we're unable
                    to accomodate more users at this moment. We would however be happy to share
                    with you more information when it's ready. Drop us an email at <a href="mailto:keloysiusmak@hotmail.com">keloysiusmak@hotmail.com</a>
                    and we'll keep in touch.
                  </p>
                </form>
              </article>
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
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  data () {
    return {
      username: null,
      password: null,
      showResetPassword: false,
      loginLoading: false,
      localErrors: {
        componentError: '',
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    resetPassword: function(value) {
      this.showResetPassword = value;
    },
    resetErrors: function() {
      this.localSuccess = null
      this.localErrors = {
        componentError: null,
        username: null,
        password: null
      }
    },
    login: async function() {
      try {
        this.resetErrors();
        let hasErrors = false;

        if (!this.username) {
          this.localErrors.username = 'Username cannot be empty.';
          hasErrors = true;
        }

        if (!this.password) {
          this.localErrors.password = 'Password cannot be empty.';
          hasErrors = true;
        }

        if (!hasErrors) {
          this.loginLoading = true;
          const loginAccount = await accountHandler.loginAccount(this.tokens, this.username, this.password);

          this.setState({
            accessToken: loginAccount.accessToken,
            refreshToken: loginAccount.refreshToken,
            account: loginAccount.account,
            storedTokensTime: Math.floor(Date.now() / 1000),
            loggedInMember: loginAccount.account.member
          });
          this.loginLoading = false;

          this.$router.push({ path: '/' });
        }
      } catch (e) {
        if (e.statusCode === 401) {
          this.localErrors.componentError = 'Incorrect username or password.';
        } else {
          this.localErrors.componentError = 'Oops something went wrong.';
        }
        this.loginLoading = false;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loginPanel {
    background: #ddd6f3; /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #ddd6f3, #faaca8); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #ddd6f3, #faaca8);
    /*
    background: #DAE2F8;
    background: -webkit-linear-gradient(to bottom, #D6A4A4, #DAE2F8);
    background: linear-gradient(to bottom, #D6A4A4, #DAE2F8);  */
  }
  .label {
    text-transform: uppercase;
    font-size: 0.75rem;
  }
  .box {
    max-width: 500px;
    width:500px;
    opacity: 0.9
  }
  .logo {
    font-size: 4rem;
    font-weight: 600;
    color: #000 !important;
  }
  .hero-body{
    padding: 3rem 0.5rem;
  }
</style>
