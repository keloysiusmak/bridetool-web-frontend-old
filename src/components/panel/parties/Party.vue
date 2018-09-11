<template>
  <div>
    <router-link :to="{ name: 'PartyParties' }" class="button is-light is-small"  v-bind:class="{ 'is-primary': panelSelected === 'parties' }">
      <span class="icon is-small is-left">
        <i class="fas fa-clipboard-list"></i>
      </span>&nbsp;
      Parties
    </router-link>
    <router-link :to="{ name: 'PartyGroups' }" class="button is-light is-small"  v-bind:class="{ 'is-primary': panelSelected === 'groups' }">
      <span class="icon is-small is-left">
        <i class="fas fa-stream"></i>
      </span>&nbsp;
      Groups
    </router-link>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';
import { EventBus } from '../../../events/event-bus.js';

const partyHandler = require('../../../handlers/partyHandler');

export default {
  data() {
    return {
      errors: []
    }
  },
  props: ['partyId', 'panelSelected'],
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    loadWeddingParty: async function() {
      try {
        if (this.account._id && this.account.couple._id) {
          const getWeddingParty = await partyHandler.getWeddingParty(this.tokens, this.account._id);
          this.setState({
            parties: getWeddingParty.weddingParty
          })
        }
      } catch (e) {
        console.log(e);
      }
    }
  },
  async created() {
    this.loadWeddingParty();
  },
  async mounted() {
    EventBus.$on('loadWeddingParty', payload => {
      this.loadWeddingParty();
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
