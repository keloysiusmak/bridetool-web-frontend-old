<template>
  <div v-if="!budget || modifyLoading" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="budget">
    <br/>
    <span class="title is-5">Edit Budget</span>
    <hr/>
    <div v-if="localErrors.componentError" class="notification is-danger">
      <button class="delete" v-on:click="localErrors.componentError = null"></button>
      <span class="is-size-7">{{localErrors.componentError}}</span>
    </div>
    <div v-if="localSuccess" class="notification is-success">
      <button class="delete" v-on:click="localSuccess = null"></button>
      <span class="is-size-7">{{localSuccess}}</span>
    </div>
    <form v-on:submit.prevent="checkForm();">
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">Budget</label>
          <p class="help">Setting your budget allows us to help you keep track of how much you've spent, and whether you're keeping within your budget.</p>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-small" id="budgetInitialBudget" v-bind:class="{'is-danger': localErrors.budgetInitialBudget}" placeholder="Initial Budget" v-model="budgetInitialBudget"/>
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
            <p class="help is-danger" v-if="localErrors.initialBudget">{{localErrors.initialBudget}}</p>
          </div>
        </div>
      </div>
      <br/>
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">Currency</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <span class="select is-small" v-bind:class="{'is-danger': localErrors.activityType}">
                <select v-model="budgetCurrency">
                  <option value="SEK">SEK</option>
                  <option value="USD">USD</option>
                  <option value="SGD">SGD</option>
                  <option value="MYR">MYR</option>
                  <option value="THB">THB</option>
                </select>
              </span>
            </p>
            <p class="help is-danger" v-if="localErrors.currency">{{localErrors.currency}}</p>
          </div>
        </div>
      </div>
      <hr/>
      <div class="field is-horizontal">
        <div class="field-label"></div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="button is-link is-small" type="submit" value="Save" />
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';
import { EventBus } from '../../../events/event-bus.js';

const budgetHandler = require('../../../handlers/budgetHandler');
const moment = require('moment');

export default {
  data() {
    return {
      budgetInitialBudget: null,
      budgetCurrency: null,
      localErrors: {},
      localSuccess: '',
      modifyLoading: false
    }
  },
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    checkForm: async function() {
      this.resetErrors();
      let hasErrors = false;
      var regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
      if (!this.budgetInitialBudget) {
        this.localErrors.initialBudget = 'Field cannot be empty.';
        hasErrors = true;
      } else if (!regex.test(this.budgetInitialBudget) || this.budgetInitialBudget <= 0) {
        this.localErrors.initialBudget = 'Field must be a number and it must be greater than 0.';
        hasErrors = true;
      }
      if (!this.budgetCurrency) {
        this.localErrors.currency = 'Field cannot be empty.';
        hasErrors = true;
      }

      if (!hasErrors) {
        this.updateBudget();
      }
    },
    updateBudget: async function() {
      this.modifyLoading = true;
      try {
        const fields = {
          initialBudget: this.budgetInitialBudget,
          currency: this.budgetCurrency
        }
        const updateBudget = await budgetHandler.updateBudget(this.tokens, this.budget._id, fields);
        this.setState({
          budget: updateBudget.budget
        })
        this.populateFields();
        this.localSuccess = "Successfully updated budget.";
      } catch (e) {
        this.localErrors.componentError = 'Oops, something went wrong. Please refresh the page and try again.';
      }
      this.modifyLoading = false;
    },
    populateFields: function() {
      this.budgetCurrency = this.budget.currency;
      this.budgetInitialBudget = this.budget.initialBudget;
    },
    resetErrors: function() {
      this.localErrors = {
        componentError: null,
        budgetCurrency: null,
        budgetInitialBudget: null
      }
    }
  },
  watch: {
    budget: function() {
      this.populateFields();
    }
  },
  async created() {
    this.resetErrors();
    if (this.budget) {
      this.populateFields();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
