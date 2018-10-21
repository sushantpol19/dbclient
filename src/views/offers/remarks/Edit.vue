<template>
   <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>

        <v-card class="elevation-12"> 

          <v-card-title primary-title>
            <h3 class="headline mb-0">Edit remark for offer ID: {{ $route.params.offer_id }}
              <v-btn small color="primary"
                :to="`/inquiries/${$route.params.inquiry_id}`"
              >View inquiry</v-btn>
            </h3>
          </v-card-title> 

          <form 
            @submit.prevent="update"
            @keydown="form.errors.clear($event.target.name)"
          >

            <v-card-text> 

              <v-text-field prepend-icon="update" name="date" label="Date" id="date" type="text" 
                ref="date"
                v-model="form.date"
                :rules="[() => !form.errors.has('date') || form.errors.get('date') ]"
              ></v-text-field>  

              <v-date-picker name="date" label="Date" id="type" 
                :landscape="true"
                v-model="form.date"   
              ></v-date-picker>

              <v-text-field prepend-icon="settings_remote" name="remark" label="Add remark" id="remark" type="text" 
                ref="remark"
                v-model="form.remark"
                :rules="[() => !form.errors.has('remark') || form.errors.get('remark') ]"
              ></v-text-field>  

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" 
              >
                Update Remark
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
        date: '',
        remark: ''
      }),
    }), 

    mounted() {

      this.form.get(`/api/inquiries/${this.$route.params.inquiry_id}/offers/${this.$route.params.offer_id}/remarks/${this.$route.params.remark_id}`)
          .then(data  =>  { 
            this.form = new Form(data.data)
          }) 
    },

    methods: {

      update() {
        this.form.patch(`/api/inquiries/${this.$route.params.inquiry_id}/offers/${this.$route.params.offer_id}/remarks/${this.$route.params.remark_id}`)
          .then(data  =>  {
            this.$router.push(`/inquiries/${this.$route.params.inquiry_id}`);
          })
          .catch(errors => {
            this.form.validate(this.$refs)
          })
      }
    }
  }
</script>