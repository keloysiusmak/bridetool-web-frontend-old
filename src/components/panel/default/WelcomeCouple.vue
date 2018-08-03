<template>
  <div id="main_welcome">
    <p class="title is-1">Hello {{activeParty.firstName + " " + activeParty.lastName}}!</p>
    <p class="subtitle is-3">Welcome back.</p>
    <p>&nbsp;</p>
    Is this you? If not, click <a href="#" v-on:click="selectParty(nonPrimaryParty._id)">here</a> to switch to {{nonPrimaryParty.firstName + " " + nonPrimaryParty.lastName}}.
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

export default {
  name: 'Main-Welcome',
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
    nonPrimaryParty: function() {
      return this.account.couple.coupleParty.find(party => {
        return party._id !== this.activeParty.id;
      });
    }
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    selectParty: function(key) {
      const selectedParty = this.account.couple.coupleParty.find(party => {
        return party._id === key;
      });

      const activeParty = {
        firstName: selectedParty.firstName,
        lastName: selectedParty.lastName,
        gender: selectedParty.gender,
        id: selectedParty._id
      }

      this.setState({
        activeParty: activeParty
      });

      this.$router.push('/');
    }
  },
  data() {
    return {
      loading: true,
      activity: null,
      errors: []
    }
  },
  async created() {
    if (this.account.type !== 'couple') {
      this.$router.push('/');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
