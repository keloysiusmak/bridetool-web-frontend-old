<template>
  <div id="main_party">
    <div v-if="party">
      <div v-if="party.type !== 'couple'">
        {{party.firstName + " " + party.lastName}}
        <br/>
        <router-link :to="{ path: 'edit' }" append>edit</router-link>
        <div v-on:click="removeParty();" v-if="!party.isDeleted">delete</div>
        <div v-on:click="restoreParty();" v-if="party.isDeleted">restore</div>
      </div>
      <div v-if="party.type === 'couple'">
        {{party.firstName + " " + party.lastName}} (me)
      </div>
      <br/>
      Activities:
      <div v-for="activity in activeActivities">
        <router-link :to="{ name: 'getActivity', params: {activityId: activity._id, party: party}, props: true }">Activity: {{activity.name}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const partyHandler = require('../../../handlers/partyHandler');

export default {
  name: 'Main-Party',
  data() {
    return {
      errors: []
    }
  },
  props: ['partyId'],
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
    activeActivities: function() {
      return this.party.activities.filter(activity => {
        return !activity.isDeleted;
      });
    }
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    removeParty: async function() {
      try {
        const removeParty = await partyHandler.removeParty(this.tokens, this.partyId);
        this.party = removeParty.party;
      } catch (e) {
        this.errors.push(e.details);
      }
    },
    restoreParty: async function() {
      try {
        const restoreParty = await partyHandler.restoreParty(this.tokens, this.partyId);
        this.party = restoreParty.party;
      } catch (e) {
        this.errors.push(e.details);
      }
    }
  },
  async created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
