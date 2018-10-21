<template>
   <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>

        <v-card class="elevation-12"> 

          <v-card-title primary-title>
            <h3 class="headline mb-0">Edit inquiry mode
              <v-btn small color="primary"
                to="/modes"
              >View modes</v-btn>
            </h3>
          </v-card-title> 

          <form 
            @submit.prevent="update"
            @keydown="form.errors.clear($event.target.name)"
          >

            <v-card-text> 

              <v-text-field prepend-icon="chrome_reader_mode" name="mode" label="Mode" id="mode" type="text" 
                ref="mode"
                v-model="form.mode"
                :rules="[() => !form.errors.has('mode') || form.errors.get('mode') ]"
              ></v-text-field>  

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" 
              >
                Update Mode
              </v-btn>
            </v-card-actions>
            
          </form> 

        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script type="text/javascript">
  
  import Form from 'helpers/Form.js'

  export default {

    data: () => ({
      form: new Form({
        mode: ''
      })
    }),

    mounted() {
      this.form.get(`/api/modes/${this.$route.params.mode_id}`)
        .then(data => {
          this.form = new Form(data.data)
        })
    },

    methods: {

      update() {
        this.form.patch(`/api/modes/${this.$route.params.mode_id}`)
          .then(data  =>  {
            this.$router.push('/modes');
          })
          .catch(errors => {
            this.form.validate(this.$refs)
          })
      }
    }
  }
</script>