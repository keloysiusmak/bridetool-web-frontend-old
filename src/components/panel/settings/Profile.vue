<template>
  <div v-if="!loggedInMember || modifyLoading" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="loggedInMember">
    <div class="columns is-multiline">
      <div class="column is-12">
        <span class="subtitle is-7">Email</span><br/>
        <span class="title is-4">{{ loggedInMember.firstName + " " + loggedInMember.lastName }}</span>
      </div>
    </div>
    <div v-if="localErrors.componentError" class="notification is-danger">
      <button class="delete" v-on:click="localErrors.componentError = null"></button>
      <span class="is-size-6">{{localErrors.componentError}}</span>
    </div>
    <div v-if="localSuccess" class="notification is-success">
      <button class="delete" v-on:click="localSuccess = null"></button>
      <span class="is-size-6">{{localSuccess}}</span>
    </div>
    <form v-on:submit.prevent="checkForm();">
      <div class="box">
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">Email</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control has-icons-left">
                <input class="input is-small" placeholder="Email" v-model="memberEmail"/>
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
                <input class="button is-primary is-rounded is-small" type="submit" value="Save" />
              </div>
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

const memberHandler = require('../../../handlers/memberHandler');

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
    this.memberEmail = this.loggedInMember.email;
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

      if (!this.memberEmail) {
        this.localErrors.email = 'You need to fill in an email address.';
        hasErrors = true;
      } else {
        if (!this.validEmail(this.memberEmail)) {
          this.localErrors.email = 'Your email address is invalid.';
          hasErrors = true;
        }
      }

      if (!hasErrors) {
        this.updateMember();
      }
    },
    updateMember: async function() {
      this.modifyLoading = true;
      try {
        const fields = {
          email: this.memberEmail
        }
        const updateMember = await memberHandler.updateMember(this.tokens, this.loggedInMember._id, fields);
        this.setState({
          loggedInMember: updateMember.member
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
