<template> 
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">

          <v-toolbar color="amber">
            <v-toolbar-title>Login</v-toolbar-title> 
          </v-toolbar>

          <form 
            @submit.prevent="login"
            @keydown="form.errors.clear($event.target.name)"
          >

            <v-card-text> 

                <v-text-field prepend-icon="email" name="email" label="Email" type="email"
                  ref="email"
                  v-model="form.email"
                  :rules="[() => !form.errors.has('email') || form.errors.get('email') ]" 
                ></v-text-field>

                <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password"
                  ref="password"
                  v-model="form.password"
                  :rules="[() => !form.errors.has('password') || form.errors.get('password') ]" 
                ></v-text-field>

            </v-card-text>
            
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit"
                :disabled="form.errors.any()"
              >Login</v-btn>
            </v-card-actions>
            
          </form> 
        
        </v-card>
      </v-flex>
    </v-layout>
  </v-container> 
</template>

<script>

  import axios from 'axios'
  import { mapActions } from 'vuex'
  import Form from 'helpers/Form.js'

  export default { 

    data() {
      return {
        form: new Form({
          email: '',
          password: ''
        }),
      }
    }, 

    methods: {
      ...mapActions([
        'authSet', 'authInitialize', 'configRemove', 'configInitialize'
      ]),

      login() { 

        this.form.post('/api/login') 
          .then(data => {
            this.authSet(data);
            this.authInitialize();

            this.configRemove()
            this.configInitialize() 

            this.$router.push('/');
          })
          .catch(errors => {

            // To get the validation errors in the form
            this.form.validate(this.$refs);
           
          })

      }
    }

  }
</script>