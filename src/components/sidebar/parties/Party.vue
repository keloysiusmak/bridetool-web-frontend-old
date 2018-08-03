<template>
  <div id="sidebar_schedule" v-if="parties">
    <aside class="menu">
      <ul class="menu-list">
        <li><router-link to="/party/create" v-bind:class="{ 'is-active': sidebarSelected === 'createparty' }">Create Party</router-link></li>
        <li><router-link to="/party/" v-bind:class="{ 'is-active': sidebarSelected === 'partyoverview' }">Overview</router-link></li>
      </ul>
      <p>&nbsp;</p>
      <p class="menu-label">Groups</p>
      <ul class="menu-list">
        <li><router-link to="/party/groups">Groups</router-link></li>
      </ul>
    </aside>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const partyHandler = require('../../../handlers/partyHandler');

export default {
  name: 'Sidebar-Party',
  props: ['sidebarSelected', 'partyId'],
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
    coupleParty: function() {
      return this.parties.filter(party => {
        return party.type === "couple"
      });
    }
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    loadWeddingParty: async function() {
      try {
        if (this.account._id) {
          const getWeddingParty = await partyHandler.getWeddingParty(this.tokens, this.account._id);
          this.setState({
            parties: getWeddingParty.weddingParty
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    loadParty: async function() {
      try {
        if (this.partyId) {
          const getParty = await partyHandler.getParty(this.tokens, this.partyId);
          this.setState({
            party: getParty.party
          })
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  watch: {
    '$route.params.partyId': function () {
      this.loadParty();
    }
  },
  async created() {
    this.loadWeddingParty();
    this.loadParty();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
