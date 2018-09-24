<template>
  <div>
    <router-link :to="{ name: 'MemberTeam' }" class="button is-light is-small"  v-bind:class="{ 'is-primary': panelSelected === 'members' }">
      <span class="icon is-small is-left">
        <i class="fas fa-clipboard-list"></i>
      </span>&nbsp;
      Members
    </router-link>
    <router-link :to="{ name: 'MemberGroups' }" class="button is-light is-small"  v-bind:class="{ 'is-primary': panelSelected === 'groups' }">
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

const coupleHandler = require('../../../handlers/coupleHandler');
const memberHandler = require('../../../handlers/memberHandler');

export default {
  data() {
    return {
      errors: []
    }
  },
  props: ['memberId', 'panelSelected'],
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    loadWeddingTeam: async function() {
      try {
        if (this.account._id && this.account.couple._id) {
          const getWeddingTeam = await coupleHandler.getWeddingTeam(this.tokens, this.account._id);
          this.setState({
            members: getWeddingTeam.weddingTeam
          })
        }
      } catch (e) {
        //
      }
    }
  },
  async created() {
    this.loadWeddingTeam();
  },
  async mounted() {
    EventBus.$on('loadWeddingTeam', payload => {
      this.loadWeddingTeam();
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
