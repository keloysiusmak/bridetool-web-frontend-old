<template>
  <div id="footer_default">
    <footer class="footer">
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <p class="title is-7 is-uppercase">
              <i class="fas fa-dove"></i> &nbsp;
              ABOUT US
            </p>
            <p class="is-size-7"><router-link :to="{name: 'About'}" class="has-text-grey-dark">What We Do</router-link></p>
            <p class="is-size-7"><router-link :to="{name: 'Blog'}" class="has-text-grey-dark">Blog</router-link></p>
            <p class="is-size-7"><router-link :to="{name: 'Team'}" class="has-text-grey-dark">The Team</router-link></p>
          </div>
          <div class="column is-3">
            <p class="title is-7 is-uppercase">
              <i class="fas fa-feather-alt"></i> &nbsp;
              LET'S WORK TOGETHER
            </p>
            <p class="is-size-7"><router-link :to="{name: 'Partners'}" class="has-text-grey-dark">Partners</router-link></p>
            <p class="is-size-7"><router-link :to="{name: 'Careers'}" class="has-text-grey-dark">Join Us</router-link></p>
          </div>
          <div class="column is-3">
          </div>
          <div class="column is-3">
            <p class="title is-7 is-uppercase">
              <i class="fas fa-hand-peace"></i> &nbsp;
              FOLLOW US
            </p>
            <p class="is-size-7">Rackarbergsgatan 34</p>
            <p class="is-size-7">Sweden 752 32</p>
            <br/>
            <p class="is-size-6"><i class="fab fa-facebook-f"></i>&nbsp; &nbsp;<i class="fab fa-twitter"></i>&nbsp; &nbsp;<i class="fab fa-pinterest"></i></p>
          </div>
        </div>
        <br/>
        <div class="has-text-centered">
          <p class="is-size-7 has-text-weight-light">
            © All Rights Reserved 2018. Bridetool
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer-Default'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
