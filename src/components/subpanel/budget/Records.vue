<template>
  <div v-if="!budget" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="budget">
    <br/>
    <template v-if="budget.records.length === 0">
      <p class="is-size-7">
        No records to show. <router-link :to="{name:'RecordAdd'}">Add some records</router-link> to get started!
      </p>
    </template>
    <template v-if="budget.records.length > 0">
      <template v-for="record in budget.records">
        <article class="media columns is-multiline">
          <div class="column is-4 is-12-mobile">
            <p class="is-size-6 has-text-weight-bold">{{record.name}}</p>
          </div>
          <div class="column is-4 is-12-mobile">
            <p class="is-size-6 has-text-weight-bold">{{record.value}}</p>
          </div>
          <div class="column is-4 is-12-mobile is-size-7">

          </div>
        </article>
      </template>
    </template>
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
  async created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
