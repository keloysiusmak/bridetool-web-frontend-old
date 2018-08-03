<template>
  <div id="main_settings_password">
    <p class="title is-1">Password Settings</p>
    <form v-on:submit.prevent="checkForm();">
      <div class="field">
        <label class="label">Old Password</label>
        <div class="control has-icons-left">
          <input class="input" placeholder="Old Password" v-model="oldPassword"/>
          <span class="icon is-small is-left">
            <i class="fas fa-key"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <label class="label">New Password</label>
        <div class="control has-icons-left">
          <input class="input" placeholder="New Password" v-model="newPassword"/>
          <span class="icon is-small is-left">
            <i class="fas fa-key"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <label class="label">Confirm New Password</label>
        <div class="control has-icons-left">
          <input class="input" placeholder="Re-enter New Password" v-model="newPasswordConfirmation"/>
          <span class="icon is-small is-left">
            <i class="fas fa-key"></i>
          </span>
        </div>
      </div>
      <p>&nbsp;</p>
      <div class="field">
        <div class="control">
          <input class="button is-link" type="submit" value="Save" />
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
      errors: []
    }
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    checkForm: async function() {
      this.errors = [];
      if (!this.oldPassword) {
        this.errors.push("Old Password missing");
      }

      if (!this.newPassword) {
        this.errors.push("New Password missing");
      }

      if (!this.newPasswordConfirmation) {
        this.errors.push("New Password Confirmation missing");
      }

      if (!(this.newPassword === this.newPasswordConfirmation)) {
        this.errors.push("New Password different");
      }

      if (!this.errors.length) {
        this.changePassword();
      }
    },
    changePassword: async function() {
      try {
        const changePassword = await accountHandler.changePassword(this.tokens, this.account._id, this.oldPassword, this.newPassword);
        console.log("SUCCESSFULLY CHANGED PASSWORD");
      } catch (e) {
        this.errors.push(e.details);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
