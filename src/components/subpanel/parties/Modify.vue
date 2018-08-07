<template>
  <div id="main_party_edit">
    <br/>
    <span class="title is-5" v-if="modifyType === 'edit'">Edit Party</span>
    <span class="title is-5" v-if="modifyType === 'create'">Create Party</span>
    <hr/>
    <div v-if="localErrors.componentError" class="notification is-danger">
      <button class="delete" v-on:click="localErrors.componentError = null"></button>
      {{localErrors.componentError}}
    </div>
    <div v-if="localSuccess" class="notification is-success">
      <button class="delete" v-on:click="localSuccess = null"></button>
      <span class="is-size-7">{{localSuccess}}</span>
    </div>
    <form v-on:submit.prevent="checkForm();">
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">First Name</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-small" placeholder="First Name" v-model="partyFirstName"  v-bind:class="{'is-danger': localErrors.partyFirstName}"/>
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <p class="help is-danger" v-if="localErrors.partyFirstName">{{localErrors.partyFirstName}}</p>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">Last Name</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-small" placeholder="Last Name" v-model="partyLastName"  v-bind:class="{'is-danger': localErrors.partyLastName}"/>
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
              <p class="help is-danger" v-if="localErrors.partyLastName">{{localErrors.partyLastName}}</p>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">Gender</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <label class="radio">
                <input type="radio" class="is-checkradio" id="partyGenderMale" name="partyGender" value="male" v-model="partyGender">
                <label for="partyGenderMale" class="is-size-7">Male</label>
              </label>
              <label class="radio">
                <input type="radio" class="is-checkradio" id="partyGenderMale" name="partyGender" value="female" v-model="partyGender">
                <label for="partyGenderFemale" class="is-size-7">Female</label>
              </label>
              <p class="help is-danger" v-if="localErrors.partyLastName">{{localErrors.partyLastName}}</p>
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
              <input class="button is-link is-small" type="submit" value="Save" v-if="modifyType === 'edit'" />
              <input class="button is-link is-small" type="submit" value="Create" v-if="modifyType === 'create'" />
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

const partyHandler = require('../../../handlers/partyHandler');

export default {
  name: 'Main-Party-Edit',
  data() {
    return {
      loading: true,
      localErrors: {},
      localSuccess: '',
      partyFirstName: null,
      partyLastName: null,
      partyGender: null
    }
  },
  props: ['partyId', 'modifyType'],
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
      if (!this.partyFirstName) {
        this.localErrors.partyFirstName = "First Name Missing";
        hasErrors = true;
      }

      if (!this.partyLastName) {
        this.localErrors.partyLastName = "Last Name Missing";
        hasErrors = true;
      }

      if (!this.partyGender) {
        this.localErrors.partyGender = "Gender Missing";
        hasErrors = true;
      }

      if (!hasErrors) {
        if (this.modifyType === 'edit') {
          this.updateParty();
        } else {
          this.addParty();
        }
      }
    },
    updateParty: async function() {
      try {
        const fields = {
          firstName: this.partyFirstName,
          lastName: this.partyLastName,
          gender: this.partyGender
        }
        const updateParty = await partyHandler.updateParty(this.tokens, this.party._id, fields);
        this.party = updateParty.party;
        this.populateFields();
        this.localSuccess = 'Successfully updated party.';
      } catch (e) {
        this.localErrors.componentError = 'Oops, something went wrong. Please refresh the page and try again.';
      }
    },
    addParty: async function() {
      try {
        const fields = {
          firstName: this.partyFirstName,
          lastName: this.partyLastName,
          gender: this.partyGender
        }
        const addParty = await partyHandler.addParty(this.tokens, this.account._id, fields);
        this.party = addParty.party;
        this.populateFields();
        this.localSuccess = 'Successfully added party.';
      } catch (e) {
        this.localErrors.componentError = 'Oops, something went wrong. Please refresh the page and try again.';
      }
    },
    populateFields: function() {
      this.partyFirstName = this.party.firstName;
      this.partyLastName = this.party.lastName;
      this.partyGender = this.party.gender;
    },
    resetErrors: function() {
      this.localSuccess = null
      this.localErrors = {
        componentError: null,
        partyFirstName: null,
        partyLastName: null,
        partyGender: null
      }
    },
    loadParty: async function() {
      try {
        if (this.modifyType === 'edit') {
          const getParty = await partyHandler.getParty(this.tokens, this.partyId);
          if (getParty.party.type === 'couple') {
            this.$router.push('/party');
          }
          this.party = getParty.party;
          this.populateFields();
        }
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    }
  },
  created() {
    this.resetErrors();
    if (this.modifyType === 'edit') {
      this.loadParty();
    } else {
      this.party = null;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
