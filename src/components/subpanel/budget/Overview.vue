<template>
  <div v-if="!budget" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="budget">
    <br/>
    <div class="columns">
      <div class="column is-4 is-12-mobile">
        <div class="title no-spaced is-size-7">AVAILABLE BUDGET</div>
        <div class="is-size-2">{{Math.floor((budget.initialBudget - usedBudget()) * 100) / 100}} {{budget.currency}}</div>
        <progress class="progress is-small" v-bind:class="budgetWarning()" v-bind:value="availableBudgetPercentage()" max="100"></progress>
        <div class="is-size-7 has-text-grey"><i>{{Math.floor(availableBudgetPercentage())}}% used out of {{budget.initialBudget}} {{budget.currency}}</i></div>
        <hr/>
        <div class="title no-spaced is-size-7">TOTAL EXPENDITURE</div>
        <div class="is-size-2">{{usedBudget()}} {{budget.currency}}</div>
      </div>
      <div class="column is-8 is-12-mobile">
        <div class="has-text-right">
          <router-link :to="{name:'RecordAdd'}" class="button is-secondary is-small is-rounded">
            + Add New Record
          </router-link>
        </div>
        <br/>
        <template v-if="sortedRecords.length === 0">
          <p class="is-size-6">
            No records to show. <router-link :to="{name:'RecordAdd'}">Add some records</router-link> to get started!
          </p>
        </template>
        <table class="table is-fullwidth is-striped is-small" v-if="sortedRecords.length > 0">
          <thead>
            <tr class="is-uppercase is-size-6">
              <th>Name</th>
              <th>Value</th>
              <th class="has-text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            <router-link :to="{name:'RecordEdit', params: {recordId: record._id}}" tag="tr" v-for="record in sortedRecords" class="is-size-6" :key="record._id">
              <td>{{record.name}}</td>
              <td v-if="record.type === 'capital'"><span class="has-text-success">+{{record.value + " " + budget.currency}}</span></td>
              <td v-if="record.type === 'expenditure'"><span class="has-text-danger">-{{record.value + " " + budget.currency}}</span></td>
              <td class="has-text-right">{{formatTime(record.date)}}</td>
            </router-link>
          </tbody>
          <tfoot>
            <td colspan="3" class="has-text-right">
              <span class="is-size-7 is-italic has-text-grey-light">(click on a record to edit)</span>&nbsp;
              <router-link :to="{ name: 'BudgetRecords' }" class="is-size-7">See All Records</router-link>
            </td>
          </tfoot>
        </table>
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
    ...mapState(mappedStates),
    sortedRecords: function() {
      return this.budget.records.sort((record1, record2) => {
        return record1.date < record2.date;
      }).filter(record => {
        return !record.isDeleted;
      }).slice(0, 10);
    }
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
    },
    formatTime: function(time) {
      const formattedTime = moment.unix(time).format('D MMMM YYYY');

      return formattedTime;
    },
  },
  async created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  tr {
    cursor: pointer
  }
  .progress {
    margin-bottom: 0.5rem;
  }
  .title.no-spaced {
    margin-bottom: 0;
  }
</style>
