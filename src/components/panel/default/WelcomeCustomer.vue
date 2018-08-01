<template>
  <div id="main_welcome">
    Hello! You are currently signed in as {{activeParty.firstName + " " + activeParty.lastName}}. Is this you? If not, click below to sign in as your partner.
    <br/>
    <br/>
    <a href="#" v-on:click="selectParty(nonPrimaryParty._id)">{{nonPrimaryParty.firstName + " " + nonPrimaryParty.lastName}}</a>
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
