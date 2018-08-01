<template>
  <div id="main_party_edit">
    <div v-if="errors.length" v-for="error in errors">
      {{error}}
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="!loading">
      <router-link v-if="modifyType === 'edit'" :to="{ name: 'getParty', params: {partyId: party._id }, props: true }">back to {{ party.firstName + " " + party.lastName}}</router-link>
      <router-link v-if="modifyType === 'create'" to="/party">back to wedding party</router-link>
      <br/>
      <div v-if="modifyType === 'edit'">
        EDITING Party Name : {{party.firstName + " " + party.lastName}}
      </div>
      <div v-if="modifyType === 'create'">
        Creating Party
      </div>
      <br/>

      <form v-on:submit.prevent="checkForm();">
        Party First Name:
        <br/>
        <input placeholder="Party First Name" v-model="partyFirstName"/>
        <br/>
        Party Last Name:
        <br/>
        <input placeholder="Party Last Name" v-model="partyLastName"/>
        <br/><br/>
        <input type="submit" value="Submit" />
      </form>
    </div>
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
      party: null,
      errors: [],
      partyFirstName: null,
      partyLastName: null
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
      this.errors = [];
      if (!this.partyFirstName) {
        this.errors.push("Party First Name Missing");
      }

      if (!this.partyLastName) {
        this.errors.push("Party Last Name Missing");
      }

      if (!this.errors.length) {
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
          lastName: this.partyLastName
        }
        const updateParty = await partyHandler.updateParty(this.tokens, this.party._id, fields);
        this.party = updateParty.party;
        this.populateFields();
        console.log("SUCCESSFULLY UPDATED PARTY");
      } catch (e) {
        this.errors.push(e.details);
      }
    },
    addParty: async function() {
      try {
        const fields = {
          firstName: this.partyFirstName,
          lastName: this.partyLastName
        }
        const addParty = await partyHandler.addParty(this.tokens, this.account._id, fields);
        this.party = addParty.party;
        this.populateFields();
        console.log("SUCCESSFULLY ADDED PARTY");
      } catch (e) {
        this.errors.push(e.details);
      }
    },
    populateFields: function() {
      this.partyFirstName = this.party.firstName;
      this.partyLastName = this.party.lastName;
    }
  },
  async created() {
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
      this.errors.push(e.details);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
