<template>
  <div id="main_settings_password">
    Password Settings
    <br/>
    <div v-if="errors.length" v-for="error in errors">
      {{error}}
    </div>
    <br/>
    {{account.firstName + " " + account.lastName}}
    <br/>
    <br/>
    <form v-on:submit.prevent="checkForm();">
      Old Password:
      <br/>
      <input type="password" placeholder="password" v-model="oldPassword"/>
      <br/>
      <br/>
      New Password:
      <br/>
      <input type="password" placeholder="password" v-model="newPassword"/>
      <br/>
      <input type="password" placeholder="password" v-model="newPasswordConfirmation"/>
      <br/>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { mappedStates } from '../../config/vuex-config';

const accountHandler = require('../../../handlers/accountHandler');

export default {
  name: 'Main-Settings-Password',
  computed: {
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
        const changePassword = await accountHandler.changePassword(this.accessToken, this.account._id, this.oldPassword, this.newPassword);
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
