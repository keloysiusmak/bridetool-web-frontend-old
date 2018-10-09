<template>
  <div v-if="!member && modifyType === 'edit' || modifyLoading" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="member || modifyType !== 'edit'">

    <div class="columns is-multiline">
      <div class="column is-12">
        <span class="subtitle is-7">{{(modifyType === 'edit') ? 'Edit' : 'Create'}} Member</span><br/>
        <span class="title is-4">{{(modifyType === 'edit') ? memberFirstName + " " + memberLastName : schedule.name}}</span>
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
    <div class="box">
      <form v-on:submit.prevent="checkForm();">
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">First Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control has-icons-left">
                <input class="input is-small" placeholder="First Name" v-model="memberFirstName"  v-bind:class="{'is-danger': localErrors.memberFirstName}"/>
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
                <p class="help is-danger" v-if="localErrors.memberFirstName">{{localErrors.memberFirstName}}</p>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">Last Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control has-icons-left">
                <input class="input is-small" placeholder="Last Name" v-model="memberLastName"  v-bind:class="{'is-danger': localErrors.memberLastName}"/>
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
                <p class="help is-danger" v-if="localErrors.memberLastName">{{localErrors.memberLastName}}</p>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">Email</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control has-icons-left">
                <input class="input is-small" placeholder="Email" v-model="memberEmail"  v-bind:class="{'is-danger': localErrors.memberEmail}"/>
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
                <p class="help is-danger" v-if="localErrors.memberEmail">{{localErrors.memberEmail}}</p>
              </div>
            </div>
          </div>
        </div>
        <br/>
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">Gender</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <label class="radio">
                  <input type="radio" class="is-checkradio" id="memberGenderMale" name="memberGender" value="male" v-model="memberGender">
                  <label for="memberGenderMale" class="is-size-7">Male</label>
                </label>
                <label class="radio">
                  <input type="radio" class="is-checkradio" id="memberGenderMale" name="memberGender" value="female" v-model="memberGender">
                  <label for="memberGenderFemale" class="is-size-7">Female</label>
                </label>
                <p class="help is-danger" v-if="localErrors.memberLastName">{{localErrors.memberLastName}}</p>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div class="field is-horizontal">
          <div class="field-label"></div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input class="button is-primary is-small" type="submit" value="Save" v-if="modifyType === 'edit'" />
                <input class="button is-primary is-small" type="submit" value="Create" v-if="modifyType === 'create'" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';
import { EventBus } from '../../../events/event-bus.js';

const memberHandler = require('../../../handlers/memberHandler');

export default {
  name: 'Main-Member-Edit',
  data() {
    return {
      loading: true,
      localErrors: {},
      localSuccess: '',
      member: null,
      memberFirstName: null,
      memberLastName: null,
      memberGender: null,
      memberEmail: null,
      modifyLoading: false
    }
  },
  props: ['memberId', 'modifyType'],
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    checkForm: async function() {
      this.resetErrors();
      let hasErrors = false;
      if (!this.memberFirstName) {
        this.localErrors.memberFirstName = "First Name Missing";
        hasErrors = true;
      }

      if (!this.memberLastName) {
        this.localErrors.memberLastName = "Last Name Missing";
        hasErrors = true;
      }

      if (!this.memberGender) {
        this.localErrors.memberGender = "Gender Missing";
        hasErrors = true;
      }

      if (!this.memberEmail) {
        this.localErrors.memberEmail = "Email Missing";
        hasErrors = true;
      } else {
        if (!this.validEmail(this.memberEmail)) {
          this.localErrors.memberEmail = 'Your email address is invalid.';
          hasErrors = true;
        }
      }

      if (!hasErrors) {
        if (this.modifyType === 'edit') {
          this.updateMember();
        } else {
          this.addMember();
        }
      }
    },
    updateMember: async function() {
      this.modifyLoading = true;
      try {
        const fields = {
          firstName: this.memberFirstName,
          lastName: this.memberLastName,
          gender: this.memberGender,
          email: this.memberEmail
        }
        const updateMember = await memberHandler.updateMember(this.tokens, this.member._id, fields);
        this.member = updateMember.member;
        EventBus.$emit('loadWeddingTeam');
        this.populateFields();
        this.localSuccess = 'Successfully updated member.';
      } catch (e) {
        this.localErrors.componentError = 'Oops, something went wrong. Please refresh the page and try again.';
      }
      this.modifyLoading = false;
    },
    addMember: async function() {
      this.modifyLoading = true;
      try {
        const fields = {
          firstName: this.memberFirstName,
          lastName: this.memberLastName,
          gender: this.memberGender,
          email: this.memberEmail
        }
        const addMember = await memberHandler.addMember(this.tokens, this.account.couple._id, fields);
        this.member = addMember.member;
        EventBus.$emit('loadWeddingTeam');
        this.populateFields();
        this.localSuccess = 'Successfully added member.';
      } catch (e) {
        this.localErrors.componentError = 'Oops, something went wrong. Please refresh the page and try again.';
      }
      this.modifyLoading = false;
    },
    populateFields: function() {
      this.memberFirstName = this.member.firstName;
      this.memberLastName = this.member.lastName;
      this.memberGender = this.member.gender;
      this.memberEmail = this.member.email;
    },
    resetErrors: function() {
      this.localSuccess = null
      this.localErrors = {
        componentError: null,
        memberFirstName: null,
        memberLastName: null,
        memberGender: null,
        memberEmail: null
      }
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    loadMember: async function() {
      try {
        if (this.modifyType === 'edit') {
          const getMember = await memberHandler.getMember(this.tokens, this.memberId);
          if (getMember.member.type === 'couple') {
            this.$router.push('/member');
          }
          this.member = getMember.member;
          this.populateFields();
        }
        this.loading = false;
      } catch (e) {
        //
      }
    }
  },
  created() {
    this.resetErrors();
    if (this.modifyType === 'edit') {
      this.loadMember();
    } else {
      this.member = null;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
