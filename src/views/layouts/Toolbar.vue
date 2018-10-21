<template>
  <v-toolbar :color="color" dark app fixed clipped-left>

    <v-toolbar-side-icon @click.native="toggleNav"
      v-if="authStatus"
    ></v-toolbar-side-icon>
    
    <span class="title ml-3 mr-5">
      <a href="/" style="color: white; text-decoration:none">
        Inquiry&nbsp;<span class="text">Management System</span>
      </a>
    </span>
      
    <span class="text"
      v-if="authStatus"
    >
      <h3>
         Company: <b>{{ company.name }}</b>
      </h3>
    </span>
    &nbsp;
    <a href="/settings" style="color: white;" v-if="authStatus">
      [Change company]
    </a>
    
    <v-spacer></v-spacer>

    <span
      v-if="authStatus"
    >
      <b>
        Logged In as : {{ user.name }} ( {{ user.email }} )
      </b>
    </span> &nbsp;

    <!-- If the user is logged in  -->
    <v-btn color="info" v-if="authStatus"
      @click="logout"
    >Logout</v-btn>

    <!-- If the user is not logged in -->
    <v-btn color="info" v-if="! authStatus" to="/login">Login</v-btn>
    <v-btn color="error" v-if="! authStatus" to="/register">Register</v-btn>
  
  </v-toolbar>

</template>

<script type="text/javascript">

  import { mapGetters, mapActions } from 'vuex'
  import Form from 'helpers/Form.js'
  
  export default {

    computed: {
      ...mapGetters([
        'user', 'company', 'color'
      ]),

      authStatus() {
        if(this.user.api_token && this.user.id)
        {
          this.toggleNav({
            opened: true  
          });
          return true;
        }

        this.toggleNav({
          opened: false  
        });

        return false;
      }
    },

    mounted() {

      this.authInitialize();
      this.configInitialize();

      if(! this.authStatus)
        this.$route.fullPath == "/register" ? '' : this.$router.push('/login');
      else
        this.$route.fullPath == "/login" ? this.$router.push('/') : '';

    },

    methods: {
      ...mapActions([
        'toggleNav', 'authInitialize', 'authRemove', 'configInitialize'
      ]),

      logout() { 
        let form = new Form;
        form.post('/api/logout')
          .then(data => {
            this.authRemove();  
            this.authInitialize(); 
            this.$router.push('/login');
          })
          .catch(error => {
            alert('Error!')
          })
      }
    }

  }
</script>