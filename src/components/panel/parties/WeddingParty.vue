<template>
  <div id="main_wedding_party">
    <div v-if="errors.length" v-for="error in errors">
      {{error}}
    </div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="!loading">
      Couple: <br/>
      <div v-for="party in coupleParty">
        <router-link :to="{ name: 'getParty', params: {partyId: party._id }, props: true }">{{ party.firstName + " " + party.lastName }} (me)</router-link>
      </div>
      <br/>
      Active: <br/>
      <div v-for="party in activeParties">
        <router-link :to="{ name: 'getParty', params: {partyId: party._id }, props: true }">{{ party.firstName + " " + party.lastName}}</router-link>
      </div><br/>
      Deleted: <br/>
      <div v-for="party in deletedParties">
        <router-link :to="{ name: 'getParty', params: {partyId: party._id }, props: true }">{{ party.firstName + " " + party.lastName}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const partyHandler = require('../../../handlers/partyHandler');

export default {
  name: 'Main-Wedding-Party',
  data() {
    return {
      errors: [],
      loading: true,
      parties: null
    }
  },
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
    coupleParty: function() {
      return this.parties.filter(party => {
        return party.type === "couple"
      });
    },
    activeParties: function() {
      return this.parties.filter(party => {
        return !party.isDeleted && party.type !== "couple";
      });
    },
    deletedParties: function() {
      return this.parties.filter(party => {
        return party.isDeleted && party.type !== "couple";
      });
    }
  },
  methods: {
    ...mapMutations([
      'setState'
    ])
  },
  async created() {
    try {
      const getWeddingParty = await partyHandler.getWeddingParty(this.tokens, this.account._id);
      this.parties = getWeddingParty.weddingParty;
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
