<template>
  <div class="loginPanel">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container box">
          <div class="is-vcentered has-text-centered">
            <div class="logo">Bt<span class="has-text-danger">.</span></div>
            <div class="tile is-parent" v-if="signUpSuccess">
              <article class="tile is-child box has-text-left">
                <p class="is-italic is-size-7 is-underline">
                  <a v-on:click="signUpSuccess = false">
                    Go Back to Login
                  </a>
                </p>
                <br/>
                <p class="title is-5">Your account and your partner's account has been successfully created.</p>
                <p class="subtitle is-7">
                  Check your email for more information on how to activate your account and get started.
                </p>
                <p class="subtitle is-7">
                  Welcome to Bridetool! We're so excited to have you.
                </p>
              </article>
            </div>
            <div class="tile is-parent" v-if="showResetPassword">
              <article class="tile is-child box has-text-left">
                <div v-if="localErrors.componentError" class="notification is-danger">
                  <button class="delete" v-on:click="localErrors.componentError = null"></button>
                  <span class="is-size-7">{{localErrors.componentError}}</span>
                </div>
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
            <form v-on:submit.prevent="login()">
              <div class="tile is-parent" v-if="showSignUp === 1">
                <article class="tile is-child box has-text-left">
                  <div v-if="localErrors.componentError" class="notification is-danger">
                    <button class="delete" v-on:click="localErrors.componentError = null"></button>
                    <span class="is-size-7">{{localErrors.componentError}}</span>
                  </div>
                  <p class="is-italic is-size-7 is-underline">
                    <a v-on:click="signUpWindow(0)">
                      Already have an account? Click here to login.
                    </a>
                  </p>
                  <br/>
                  <p class="title is-5">Sign Up for a New Account</p>
                  <p class="subtitle is-7">
                    Let's start by filling in your details. We'll get to your partner's details on the next page.
                  </p>
                  <label class="label has-text-grey">Choose a Username</label>
                  <div class="field">
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" placeholder="Username" v-model="signUp.member1.username" v-bind:class="{'is-danger': localErrors.member1Username}"/>
                      <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                    <p class="help is-danger" v-if="localErrors.member1Username">{{localErrors.member1Username}}</p>
                  </div>
                  <br/>
                  <label class="label has-text-grey">Password</label>
                  <div class="field">
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" type="password" placeholder="Password" v-model="signUp.member1.password" v-bind:class="{'is-danger': localErrors.member1Password}"/>
                      <span class="icon is-small is-left">
                        <i class="fas fa-key"></i>
                      </span>
                    </div>
                    <p class="help is-danger" v-if="localErrors.member1Password">{{localErrors.member1Password}}</p>
                  </div>
                  <br/>
                  <label class="label has-text-grey">Your First Name</label>
                  <div class="field">
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" placeholder="First Name" v-model="signUp.member1.firstName" v-bind:class="{'is-danger': localErrors.member1FirstName}"/>
                      <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                    <p class="help is-danger" v-if="localErrors.member1FirstName">{{localErrors.member1FirstName}}</p>
                  </div>
                  <br/>
                  <label class="label has-text-grey">Your Last Name</label>
                  <div class="field">
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" placeholder="Last Name" v-model="signUp.member1.lastName" v-bind:class="{'is-danger': localErrors.member1LastName}"/>
                      <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                    <p class="help is-danger" v-if="localErrors.member1LastName">{{localErrors.member1LastName}}</p>
                  </div>
                  <br/>
                  <label class="label has-text-grey">Email</label>
                  <div class="field">
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" placeholder="Email" v-model="signUp.member1.email" v-bind:class="{'is-danger': localErrors.member1Email}"/>
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                    </div>
                    <p class="help is-danger" v-if="localErrors.member1Email">{{localErrors.member1Email}}</p>
                  </div>
                  <br/>
                  <label class="label has-text-grey">Gender</label>
                  <div class="field">
                    <input class="is-checkradio" id="male" type="radio" v-model="signUp.member1.gender" value="male">
                    <label for="male">Male</label>
                    <input class="is-checkradio" id="female" type="radio" v-model="signUp.member1.gender" value="female">
                    <label for="female">Female</label>
                    <p class="help is-danger" v-if="localErrors.member1Gender">{{localErrors.member1Gender}}</p>
                  </div>
                  <br/>
                  <div class="field is-clearfix">
                    <div class="control is-pulled-right">
                      <a class="button is-link is-outlined" v-on:click="signUpWindow(2)" type="submit">Add Partner Details</a>
                    </div>
                  </div>
                </article>
              </div>

              <div class="tile is-parent" v-if="showSignUp === 2">
                <article class="tile is-child box has-text-left">
                  <div v-if="localErrors.componentError" class="notification is-danger">
                    <button class="delete" v-on:click="localErrors.componentError = null"></button>
                    <span class="is-size-7">{{localErrors.componentError}}</span>
                  </div>
                  <p class="is-italic is-size-7 is-underline">
                    <a v-on:click="signUpWindow(0)">
                      Already have an account? Click here to login.
                    </a>
                  </p>
                  <br/>
                  <p class="title is-5">Fill in your Partner's Details</p>
                  <p class="subtitle is-7">
                    Let's fill in your partner's details.
                  </p>
                  <label class="label has-text-grey">Choose a Username</label>
                  <div class="field">
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" placeholder="Username" v-model="signUp.member2.username" v-bind:class="{'is-danger': localErrors.member2Username}"/>
                      <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                    <p class="help is-danger" v-if="localErrors.member2Username">{{localErrors.member2Username}}</p>
                  </div>
                  <br/>
                  <label class="label has-text-grey">Password</label>
                  <div class="field">
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" type="password" placeholder="Password" v-model="signUp.member2.password" v-bind:class="{'is-danger': localErrors.member2Password}"/>
                      <span class="icon is-small is-left">
                        <i class="fas fa-key"></i>
                      </span>
                    </div>
                    <p class="help is-danger" v-if="localErrors.member2Password">{{localErrors.member2Password}}</p>
                  </div>
                  <br/>
                  <label class="label has-text-grey">Your Partner's First Name</label>
                  <div class="field">
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" placeholder="First Name" v-model="signUp.member2.firstName" v-bind:class="{'is-danger': localErrors.member2FirstName}"/>
                      <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                    <p class="help is-danger" v-if="localErrors.member2FirstName">{{localErrors.member2FirstName}}</p>
                  </div>
                  <br/>
                  <label class="label has-text-grey">Your Partner's Last Name</label>
                  <div class="field">
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" placeholder="Last Name" v-model="signUp.member2.lastName" v-bind:class="{'is-danger': localErrors.member2LastName}"/>
                      <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                      </span>
                    </div>
                    <p class="help is-danger" v-if="localErrors.member2LastName">{{localErrors.member2LastName}}</p>
                  </div>
                  <br/>
                  <label class="label has-text-grey">Email</label>
                  <div class="field">
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" placeholder="Email" v-model="signUp.member2.email" v-bind:class="{'is-danger': localErrors.member2Email}"/>
                      <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                      </span>
                    </div>
                    <p class="help is-danger" v-if="localErrors.member2Email">{{localErrors.member2Email}}</p>
                  </div>
                  <br/>
                  <label class="label has-text-grey">Gender</label>
                  <div class="field">
                    <input class="is-checkradio" id="male" type="radio" v-model="signUp.member2.gender" value="male">
                    <label for="male">Male</label>
                    <input class="is-checkradio" id="female" type="radio" v-model="signUp.member2.gender" value="female">
                    <label for="female">Female</label>
                    <p class="help is-danger" v-if="localErrors.member2Gender">{{localErrors.member2Gender}}</p>
                  </div>
                  <br/>
                  <div class="field is-clearfix">
                    <div class="control is-pulled-right">
                      <input class="button is-link is-outlined" v-on:click="showSignUp = 1" value="Edit Your Details" />
                      <template v-if="signUpLoading">
                        <a class="button is-loading is-medium is-text"></a>
                      </template>
                      <template v-if="!signUpLoading">
                        <a class="button is-link is-outlined" v-on:click="register()">Register</a>
                      </template>
                    </div>
                  </div>
                </article>
              </div>
            </form>
            <div class="tile is-parent" v-if="!signUpSuccess && !showResetPassword && !showSignUp">
              <article class="tile is-child box has-text-left">
                <div v-if="localErrors.componentError" class="notification is-danger">
                  <button class="delete" v-on:click="localErrors.componentError = null"></button>
                  <span class="is-size-7">{{localErrors.componentError}}</span>
                </div>
                <form v-on:submit.prevent="login()">
                  <label class="label has-text-grey">Username</label>
                  <div class="field">
                    <div class="control has-icons-left has-icons-right">
                      <input class="input" placeholder="Username" v-model="username" v-bind:class="{'is-danger': localErrors.username}"/>
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
                      <input class="input" placeholder="Password" type="password" v-model="password" v-bind:class="{'is-danger': localErrors.password}"/>
                      <span class="icon is-small is-left">
                        <i class="fas fa-key"></i>
                      </span>
                    </div>
                    <p class="help is-danger" v-if="localErrors.password">{{localErrors.password}}</p>
                  </div>
                  <p class="is-italic is-size-7 is-underline">
                    <a v-on:click="resetPassword(true)">
                      Forgot your password?
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
                  <p class="title is-5">Sign up for a new Account!</p>
                  <p class="subtitle is-7 is-italic">
                    <a v-on:click="signUpWindow(1)">
                      Click here to sign up
                    </a>
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
      signUpSuccess: false,
      showResetPassword: false,
      showSignUp: 0,
      loginLoading: false,
      signUpLoading: false,
      signUp: {
        member1: {
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          email: '',
          gender: ''
        },
        member2: {
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          email: '',
          gender: ''
        }
      },
      localErrors: {
        componentError: '',
        username: '',
        password: '',
        member1Username: '',
        member1Password: '',
        member1FirstName: '',
        member1LastName: '',
        member1Email: '',
        member1Gender: '',
        member2Username: '',
        member2Password: '',
        member2FirstName: '',
        member2LastName: '',
        member2Email: '',
        member2Gender: ''
      }
    }
  },
  methods: {
    ...mapMutations([
      'setState',
      'clearState'
    ]),
    resetPassword: function(value) {
      this.showResetPassword = value;
    },
    signUpWindow: function(value) {
      if (value === 2) {
        let hasErrors = false;
        if (!this.signUp.member1.username) {
          this.localErrors.member1Username = 'Username cannot be empty.';
          hasErrors = true;
        }
        if (!this.signUp.member1.password) {
          this.localErrors.member1Password = 'Password cannot be empty.';
          hasErrors = true;
        }
        if (!this.signUp.member1.firstName) {
          this.localErrors.member1FirstName = 'First Name cannot be empty.';
          hasErrors = true;
        }
        if (!this.signUp.member1.lastName) {
          this.localErrors.member1LastName = 'Last Name cannot be empty.';
          hasErrors = true;
        }
        if (!this.signUp.member1.email) {
          this.localErrors.member1Email = 'Email cannot be empty.';
          hasErrors = true;
        } else if (!this.validEmail(this.signUp.member1.email)) {
          this.localErrors.member1Email = 'Email must be valid.';
          hasErrors = true;
        }
        if (!this.signUp.member1.gender) {
          this.localErrors.member1Gender = 'Gender cannot be empty.';
          hasErrors = true;
        }

        if (!hasErrors) {
          this.showSignUp = value;
        }
      } else {
        this.showSignUp = value;
      }
    },
    resetErrors: function() {
      this.localSuccess = null
      this.localErrors = {
        componentError: null,
        username: null,
        password: null
      }
    },
    resetSignUpErrors: function() {
      this.localSuccess = null
      this.localErrors = {
        componentError: null,
        member1Username: '',
        member1Password: '',
        member1FirstName: '',
        member1LastName: '',
        member1Email: '',
        member1Gender: '',
        member2Username: '',
        member2Password: '',
        member2FirstName: '',
        member2LastName: '',
        member2Email: '',
        member2Gender: ''
      }
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    register: async function() {
      try {
        this.resetSignUpErrors();
        let hasErrors = false;

        if (this.signUp.member1.username === this.signUp.member2.username) {
          this.localErrors.member1Username = 'Your username and your partner\'s username cannot be identical.';
          this.localErrors.member2Username = 'Your username and your partner\'s username cannot be identical.';
          hasErrors = true;
        }

        if (this.signUp.member1.email === this.signUp.member2.email) {
          this.localErrors.member1Email = 'Your email and your partner\'s email cannot be identical.';
          this.localErrors.member2Email = 'Your email and your partner\'s email cannot be identical.';
          hasErrors = true;
        }

        if (!this.signUp.member1.username) {
          this.localErrors.member1Username = 'Username cannot be empty.';
          hasErrors = true;
        }
        if (!this.signUp.member1.password) {
          this.localErrors.member1Password = 'Password cannot be empty.';
          hasErrors = true;
        }
        if (!this.signUp.member1.firstName) {
          this.localErrors.member1FirstName = 'First Name cannot be empty.';
          hasErrors = true;
        }
        if (!this.signUp.member1.lastName) {
          this.localErrors.member1LastName = 'Last Name cannot be empty.';
          hasErrors = true;
        }
        if (!this.signUp.member1.email) {
          this.localErrors.member1Email = 'Email cannot be empty.';
          hasErrors = true;
        } else if (!this.validEmail(this.signUp.member1.email)) {
          this.localErrors.member1Email = 'Email must be valid.';
          hasErrors = true;
        }
        if (!this.signUp.member1.gender) {
          this.localErrors.member1Gender = 'Gender cannot be empty.';
          hasErrors = true;
        }

        if (!this.signUp.member2.username) {
          this.localErrors.member2Username = 'Username cannot be empty.';
          hasErrors = true;
        }
        if (!this.signUp.member2.password) {
          this.localErrors.member2Password = 'Password cannot be empty.';
          hasErrors = true;
        }
        if (!this.signUp.member2.firstName) {
          this.localErrors.member2FirstName = 'First Name cannot be empty.';
          hasErrors = true;
        }
        if (!this.signUp.member2.lastName) {
          this.localErrors.member2LastName = 'Last Name cannot be empty.';
          hasErrors = true;
        }
        if (!this.signUp.member2.email) {
          this.localErrors.member2Email = 'Email cannot be empty.';
          hasErrors = true;
        } else if (!this.validEmail(this.signUp.member2.email)) {
          this.localErrors.member2Email = 'Email must be valid.';
          hasErrors = true;
        }
        if (!this.signUp.member2.gender) {
          this.localErrors.member2Gender = 'Gender cannot be empty.';
          hasErrors = true;
        }

        this.signUp.member1.username = this.signUp.member1.username.toLowerCase();
        this.signUp.member2.username = this.signUp.member2.username.toLowerCase();

        if (!hasErrors) {
          this.signUpLoading = true;
          const fields = {
            member1: this.signUp.member1,
            member2: this.signUp.member2
          }
          const registerAccount = await accountHandler.registerAccount(this.tokens, fields);
          this.signUpLoading = false;

          this.signUpSuccess = true;
          this.showSignUp = 0;
          this.signUp = {
            member1: {
              username: '',
              password: '',
              firstName: '',
              lastName: '',
              email: '',
              gender: ''
            },
            member2: {
              username: '',
              password: '',
              firstName: '',
              lastName: '',
              email: '',
              gender: ''
            }
          }
        }
      } catch (e) {
        if (e.statusCode === 409) {
          this.localErrors.componentError = 'An account with the specified usernames or emails exists.';
        } else {
          this.localErrors.componentError = 'Oops something went wrong.';
        }
        this.signUpLoading = false;
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

          this.clearState();
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
