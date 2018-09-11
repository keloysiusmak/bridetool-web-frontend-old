<template>
  <div v-if="!account" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="account">
    <br>
    <span class="title is-5">Manage Password</span>
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
          <label class="label">Old Password</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-small" placeholder="Old Password" v-model="oldPassword"/>
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
            </div>
            <p class="help is-danger" v-if="localErrors.oldPassword">{{localErrors.oldPassword}}</p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">New Password</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-small" placeholder="New Password" v-model="newPassword"/>
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
            </div>
            <p class="help is-danger" v-if="localErrors.newPassword">{{localErrors.newPassword}}</p>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">Confirm New Password</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-small" placeholder="Re-enter New Password" v-model="newPasswordConfirmation"/>
              <span class="icon is-small is-left">
                <i class="fas fa-key"></i>
              </span>
            </div>
            <p class="help is-danger" v-if="localErrors.confirmNewPassword">{{localErrors.confirmNewPassword}}</p>
          </div>
        </div>
      </div>
      <hr>
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
  name: 'Main-Settings-Password',
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
      localErrors: {},
      localSuccess: ''
    }
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    checkForm: async function() {
      this.resetErrors();
      let hasErrors = false;
      if (!this.oldPassword) {
        this.localErrors.oldPassword = 'This field cannot be empty.';
        hasErrors = true;
      }

      if (!this.newPassword) {
        this.localErrors.newPassword = 'This field cannot be empty.';
        hasErrors = true;
      }

      if (!this.newPasswordConfirmation) {
        this.localErrors.confirmNewPassword = 'This field cannot be empty.';
        hasErrors = true;
      }

      if (!(this.newPassword === this.newPasswordConfirmation)) {
        this.localErrors.newPassword = 'Passwords do not match.';
        this.localErrors.confirmNewPassword = 'Passwords do not match.';
        hasErrors = true;
      }

      if (!hasErrors) {
        this.changePassword();
      }
    },
    changePassword: async function() {
      try {
        const changePassword = await accountHandler.changePassword(this.tokens, this.account._id, this.oldPassword, this.newPassword);
        this.localSuccess = 'Successfully updated profile.';
      } catch (e) {
        if (e.statusCode === 401) {
          this.localErrors.componentError = e.message;
        }
        else {
          this.localErrors.componentError = 'Oops, something went wrong. Please refresh the page and try again.';
        }
      }
    },
    resetErrors: function() {
      this.localSuccess = null
      this.localErrors = {
        componentError: null,
        oldPassword: null,
        newPassword: null,
        confirmNewPassword: null
      }
    }
  },
  created() {
    this.resetErrors();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
