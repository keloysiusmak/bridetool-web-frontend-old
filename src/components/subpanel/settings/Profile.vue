<template>
  <div v-if="!account || modifyLoading" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="account">
    <br/>
    <span class="title is-5">Manage Email</span>
    <hr/>
    <div v-if="localErrors.componentError" class="notification is-danger">
      <button class="delete" v-on:click="localErrors.componentError = null"></button>
      <span class="is-size-7">{{localErrors.componentError}}</span>
    </div>
    <div v-if="localSuccess" class="notification is-success">
      <button class="delete" v-on:click="localSuccess = null"></button>
      <span class="is-size-7">{{localSuccess}}</span>
    </div>
    <form v-on:submit.prevent="checkForm();">
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">Email</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-small" placeholder="Email" v-model="accountEmail"/>
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
            <p class="help is-danger" v-if="localErrors.email">{{localErrors.email}}</p>
          </div>
        </div>
      </div>
      <hr/>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="button is-link is-small" type="submit" value="Save" />
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const accountHandler = require('../../../handlers/accountHandler');

export default {
  name: 'Main-Settings-Email',
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  data() {
    return {
      localErrors: {},
      localSuccess: '',
      modifyLoading: false
    }
  },
  created() {
    this.resetErrors();
    this.accountEmail = this.account.email;
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    checkForm: async function() {
      this.resetErrors();
      let hasErrors = false;

      if (!this.accountEmail) {
        this.localErrors.email = 'You need to fill in an email address.';
        hasErrors = true;
      } else {
        if (!this.validEmail(this.accountEmail)) {
          this.localErrors.email = 'Your email address is invalid.';
          hasErrors = true;
        }
      }

      if (!hasErrors) {
        this.updateAccount();
      }
    },
    updateAccount: async function() {
      this.modifyLoading = true;
      try {
        const fields = {
          email: this.accountEmail
        }
        const updateAccount = await accountHandler.updateAccount(this.tokens, this.account._id, fields);
        this.setState({
          account: updateAccount.account
        });
        this.localSuccess = 'Successfully updated profile.';
      } catch (e) {
        this.localErrors.componentError = 'Oops, something went wrong. Please refresh the page and try again.';
      }
      this.modifyLoading = false;
    },
    resetErrors: function() {
      this.localSuccess = null
      this.localErrors = {
        componentError: null,
        email: null
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
