<template>
  <div v-if="!budget" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="budget">
    <br/>
    <div class="columns">
      <div class="column is-4 is-12-mobile">
        <div class="title no-spaced is-size-7">AVAILABLE BUDGET</div>
        <div class="is-size-1">{{budget.initialBudget - usedBudget()}} {{budget.currency}}</div>
        <progress class="progress is-small" v-bind:class="budgetWarning()" v-bind:value="availableBudgetPercentage()" max="100"></progress>
        <div class="is-size-7 has-text-grey"><i>{{Math.floor(availableBudgetPercentage())}}% used out of {{budget.initialBudget}} {{budget.currency}}</i></div>

      </div>
      <div class="column is-8 is-12-mobile">
        <div class="title is-size-7">LATEST RECORDS</div>
        <!-- table -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const moment = require('moment');

export default {
  data() {
    return {
      errors: []
    }
  },
  props: ['partyId'],
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  methods: {
    availableBudgetPercentage: function() {
      return (this.usedBudget() / this.budget.initialBudget) * 100;
    },
    usedBudget: function() {
      let usedBudget = 0;
      this.budget.records.forEach(record => {
        usedBudget += record.value
      });
      return usedBudget
    },
    budgetWarning: function() {
      if (this.availableBudgetPercentage() > 85) {
        return 'is-danger'
      } else if (this.availableBudgetPercentage() > 65) {
        return 'is-warning'
      } else {
        return 'is-success';
      }
    }
  },
  async created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .progress {
    margin-bottom: 0.5rem;
  }
  .title.no-spaced {
    margin-bottom: 0;
  }
</style>
