<template>
  <div id="main_wedding_party" v-if="parties">
    <!-- START deletePartyModal -->
    <div class="modal" v-bind:class="{ 'is-active': deletePartyModal }" v-if="party">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="title is-5">Are you sure you want to delete '{{party.firstName + " " + party.lastName}}'?</div>
          <div class="subtitle is-7">
            You can restore this party later.
          </div>
          <a class="button is-danger is-small" v-on:click="deleteParty(); deletePartyModal = false">Delete</a>
          <a class="button is-white is-small" v-on:click="deletePartyModal = false">Cancel</a>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>
    <!-- END deletePartyModal -->

    <!-- START deletePartyModal -->
    <div class="modal" v-bind:class="{ 'is-active': restorePartyModal }" v-if="party">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="title is-5">Are you sure you want to restore '{{party.firstName + " " + party.lastName}}'?</div>
          <div class="subtitle is-7">
            All previously assigned activities to {{party.firstName + " " + party.lastName}} will be restored.
          </div>
          <a class="button is-success is-small" v-on:click="restoreParty(); restorePartyModal = false">Restore</a>
          <a class="button is-white is-small" v-on:click="restorePartyModal = false">Cancel</a>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>
    <!-- END deletePartyModal -->
    <br/>
    <div class="columns">
      <div class="column is-4">
        <p class="title is-4">Couple</p>
        <div class="card" v-for="party in coupleParty">
          <div class="card-content">
            <p class="title is-5">{{party.firstName + " " + party.lastName}}</p>
            <p class="subtitle is-7 is-italic has-text-grey">Couple</p>
            <router-link :to="{ name: 'PartyOverview', params: {partyId: party._id }, props: true }" class="is-size-7">Overview</router-link>
          </div>
        </div>
      </div>
      <div class="column is-8">
        <div class="columns">
          <div class="column">
            <p class="title is-4">
              Wedding Party
            </p>
          </div>
          <div class="column has-text-right">
            <router-link :to="{name:'PartyAdd'}" class="button is-secondary is-small is-rounded">
              + Add New Party
            </router-link>
          </div>
        </div>

        <div v-if="localSuccess" class="notification is-success">
          <button class="delete" v-on:click="localSuccess = null"></button>
          <span class="is-size-7">{{localSuccess}}</span>
        </div>
        <div class="card" v-for="party in activeParties">
          <div class="card-content">
            <div class="columns">
              <div class="column is-8">
                <p class="title is-5">{{party.firstName + " " + party.lastName}}</p>
                <p class="subtitle is-7 is-italic has-text-grey">Wedding Party</p>
                <div class="tags">
                </div>
              </div>
              <div class="column is-4 has-text-right is-size-7">
                <ul>
                  <li><router-link :to="{ name: 'PartyOverview', params: {partyId: party._id }, props: true }">Overview</router-link></li>
                  <li><router-link :to="{ name: 'PartyEdit', params: {partyId: party._id }, props: true }">Edit Party</router-link></li>
                  <li><a v-on:click="confirmDeleteParty(party._id);">Delete Party</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div class="card" v-for="party in deletedParties">
          <div class="card-content">
            <div class="columns">
              <div class="column is-8">
                <p class="title is-5">{{party.firstName + " " + party.lastName}}</p>
                <p class="subtitle is-7 is-italic has-text-grey">Wedding Party</p>
                <div class="tags">
                  <span class="tag is-danger">Deleted</span>
                </div>
              </div>
              <div class="column is-4 has-text-right is-size-7">
                <ul>
                  <li><router-link :to="{ name: 'PartyOverview', params: {partyId: party._id }, props: true }">Overview</router-link></li>
                  <li><router-link :to="{ name: 'PartyEdit', params: {partyId: party._id }, props: true }">Edit Party</router-link></li>
                  <li><a v-on:click="confirmRestoreParty(party._id);">Restore Party</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const partyHandler = require('../../../handlers/partyHandler');

export default {
  name: 'Main-Wedding-Party',
  data() {
    return {
      deletePartyModal: false,
      restorePartyModal: false,
      localSuccess: null,
      party: null
    }
  },
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
    coupleParty: function() {
      return this.parties.filter(party => {
        return party.type === "couple"
      });
    },
    activeParties: function() {
      return this.parties.filter(party => {
        return !party.isDeleted && party.type !== "couple";
      });
    },
    deletedParties: function() {
      return this.parties.filter(party => {
        return party.isDeleted && party.type !== "couple";
      });
    }
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    confirmDeleteParty: function(partyId) {
      this.deletePartyModal = true;
      this.party = this.parties.find(party => {
        return party._id === partyId;
      });
    },
    confirmRestoreParty: function(partyId) {
      this.restorePartyModal = true;
      this.party = this.parties.find(party => {
        return party._id === partyId;
      });
    },
    deleteParty: async function(partyId) {
      this.deletePartyModal = false;
      try {
        const deleteParty = await partyHandler.deleteParty(this.tokens, this.party._id);
        const parties = this.parties.map(party => {
          if (party._id === this.party._id) {
            party.isDeleted = true;
            return party;
          } else {
            return party;
          }
        });
        this.setState({
          parties: parties
        })
        this.localSuccess = 'Successfully deleted party.';
      } catch (e) {
        console.log(e);
      }
    },
    restoreParty: async function(partyId) {
      this.restorePartyModal = false;
      try {
        const restoreParty = await partyHandler.restoreParty(this.tokens, this.party._id);
        const parties = this.parties.map(party => {
          if (party._id === this.party._id) {
            party.isDeleted = false;
            return party;
          } else {
            return party;
          }
        });
        this.setState({
          parties: parties
        })
        this.localSuccess = 'Successfully restored party.';
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
