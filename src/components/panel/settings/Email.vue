<template>
  <div id="main_settings_email">
    <p class="title is-1">Email Settings</p>
    <form v-on:submit.prevent="checkForm();">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Email</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-left">
              <input class="input" placeholder="Email" v-model="accountEmail"/>
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <p>&nbsp;</p>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="button is-link" type="submit" value="Save" />
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
      errors: []
    }
  },
  created() {
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
