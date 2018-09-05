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
      <div class="column">
        <p class="title is-5">
          Wedding Party
        </p>
      </div>
      <div class="column has-text-right">
        <a href="#" v-on:click="toggleHideDeletedParties()" class="button is-outlined is-small is-rounded">
          {{ (hideDeletedParties) ? 'Show' : 'Hide' }} Deleted Parties
        </a>
        <router-link :to="{name:'PartyAdd'}" class="button is-secondary is-small is-rounded">
          + Add New Party
        </router-link>
      </div>
    </div>

    <div v-if="localSuccess" class="notification is-success">
      <button class="delete" v-on:click="localSuccess = null"></button>
      <span class="is-size-7">{{localSuccess}}</span>
    </div>

    <article class="media" v-for="party in activeParties">
      <div class="media-content">
        <p class="is-size-6 has-text-weight-bold">{{party.firstName + " " + party.lastName}}</p>
        <p class="is-size-7">
          <router-link :to="{ name: 'PartyOverview', params: {partyId: party._id }, props: true }">Overview</router-link>
          &#183;
          <router-link :to="{ name: 'PartyEdit', params: {partyId: party._id }, props: true }">Edit Party</router-link>
          &#183;
          <a v-on:click="confirmDeleteParty(party._id);">Delete Party</a>
        </p>
      </div>
    </article>

    <article class="media has-text-grey-lighter" v-for="party in deletedParties" v-if="!hideDeletedParties">
      <div class="media-content">
        <p class="is-size-6 has-text-weight-bold">{{party.firstName + " " + party.lastName}}</p>
        <p class="is-size-7">
          <router-link :to="{ name: 'PartyOverview', params: {partyId: party._id }, props: true }">Overview</router-link>
          &#183;
          <router-link :to="{ name: 'PartyEdit', params: {partyId: party._id }, props: true }">Edit Party</router-link>
          &#183;
          <a v-on:click="confirmRestoreParty(party._id);">Restore Party</a>
        </p>
      </div>
      <div class="media-right is-size-7">
        <span class="tag is-danger is-small">Deleted</span>
      </div>
    </article>
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
      party: null,
      hideDeletedParties: true
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
    loadWeddingParty: async function() {
      try {
        if (this.account._id && this.account.couple._id) {
          const getWeddingParty = await partyHandler.getWeddingParty(this.tokens, this.account.couple._id);
          this.setState({
            parties: getWeddingParty.weddingParty
          })
        }
      } catch (e) {
        console.log(e);
      }
    },
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
    toggleHideDeletedParties: function() {
      this.hideDeletedParties = !this.hideDeletedParties;
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
  },
  async created() {
    this.loadWeddingParty();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
