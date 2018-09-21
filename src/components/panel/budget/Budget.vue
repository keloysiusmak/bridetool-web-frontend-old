<template>
  <div>
    <router-link :to="{ name: 'BudgetOverview' }" class="button is-light"  v-bind:class="{ 'is-primary': panelSelected === 'overview' }">
      <span class="icon is-small is-left">
        <i class="fas fa-clipboard-list"></i>
      </span>&nbsp;
      Overview
    </router-link>
    <router-link :to="{ name: 'BudgetRecords' }" class="button is-light"  v-bind:class="{ 'is-primary': panelSelected === 'records' }">
      <span class="icon is-small is-left">
        <i class="fas fa-stream"></i>
      </span>&nbsp;
      Records
    </router-link>

    <router-link :to="{ name: 'BudgetManage' }" class="button is-light" v-bind:class="{ 'is-primary': panelSelected === 'manage' }">
      <span class="icon is-small is-left">
        <i class="fas fa-wrench"></i>
      </span>&nbsp;
      Manage
    </router-link>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';
import { EventBus } from '../../../events/event-bus.js';

const budgetHandler = require('../../../handlers/budgetHandler');

export default {
  data() {
    return {
      errors: []
    }
  },
  props: ['panelSelected'],
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    loadBudget: async function() {
      try {
        if (this.account._id && this.account.couple._id) {
          const getBudget = await budgetHandler.getBudget(this.tokens, this.account.couple.budget);
          this.setState({
            budget: getBudget.budget
          })
        }
      } catch (e) {
        //
      }
    }
  },
  async created() {
    this.loadBudget();
  },
  async mounted() {
    EventBus.$on('loadBudget', payload => {
      this.loadBudget();
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
