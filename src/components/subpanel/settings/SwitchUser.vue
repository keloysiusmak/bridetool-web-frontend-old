<template>
  <div v-if="!account || modifyLoading" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="account">
    <br/>
    <p class="is-size-6">Are you {{activeParty.firstName + " " + activeParty.lastName}}? If not, click <a href="#" v-on:click="selectParty(nonPrimaryParty._id)">here</a> to switch to {{nonPrimaryParty.firstName + " " + nonPrimaryParty.lastName}}.</p>
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
      this.modifyLoading = true;
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
      errors: [],
      modifyLoading: false
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
