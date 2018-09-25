<template>
  <div v-if="!account || modifyLoading" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="account">
    <br/>
    <p class="is-size-6">Are you {{activeMember.firstName + " " + activeMember.lastName}}? If not, click <a href="#" v-on:click="selectMember(nonPrimaryMember._id)">here</a> to switch to {{nonPrimaryMember.firstName + " " + nonPrimaryMember.lastName}}.</p>
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
    nonPrimaryMember: function() {
      return this.account.couple.coupleMember.find(member => {
        return member._id !== this.activeMember.id;
      });
    }
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    selectMember: function(key) {
      this.modifyLoading = true;
      const selectedMember = this.account.couple.coupleMember.find(member => {
        return member._id === key;
      });

      const activeMember = {
        firstName: selectedMember.firstName,
        lastName: selectedMember.lastName,
        gender: selectedMember.gender,
        id: selectedMember._id
      }

      this.setState({
        activeMember: activeMember
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
