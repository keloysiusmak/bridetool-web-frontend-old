<template>
  <div id="main_settings_profile">
    Profile Settings
    <br/>
    <div v-if="errors.length" v-for="error in errors">
      {{error}}
    </div>
    <br/>
    <br/>
    <form v-on:submit.prevent="checkForm();">
      First Name:
      <br/>
      <input placeholder="First Name" v-model="accountFirstName"/>
      <br/><br/>
      Last Name:
      <br/>
      <input placeholder="Last Name" v-model="accountLastName"/>
      <br/><br/>
      Email:
      <br/>
      <input placeholder="Email" v-model="accountEmail"/>
      <br/>
      <br/>
      <input type="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const accountHandler = require('../../../handlers/accountHandler');

export default {
  name: 'Main-Settings-Profile',
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  data() {
    return {
      errors: []
    }
  },
  created() {
    this.accountFirstName = this.account.firstName;
    this.accountLastName = this.account.lastName;
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
      this.errors = [];
      if (!this.accountFirstName) {
        this.errors.push("First Name Missing");
      }

      if (!this.accountLastName) {
        this.errors.push("Last Name Missing");
      }

      if (!this.accountEmail) {
        this.errors.push("Email Missing");
      } else {
        if (!this.validEmail(this.accountEmail)) {
          this.errors.push("Invalid Email");
        }
      }

      if (!this.errors.length) {
        this.updateAccount();
      }
    },
    updateAccount: async function() {
      try {
        const fields = {
          firstName: this.accountFirstName,
          lastName: this.accountLastName,
          email: this.accountEmail
        }
        const updateAccount = await accountHandler.updateAccount(this.tokens, this.account._id, fields);
        this.setState({
          account: updateAccount.account
        });
        console.log("SUCCESSFULLY UPDATED ACCOUNT");
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
