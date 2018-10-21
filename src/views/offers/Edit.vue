<template>
   <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>

        <v-card class="elevation-12"> 

          <v-card-title primary-title>
            <h3 class="headline mb-0">Edit a offer against Inquiry ID: {{ $route.params.inquiry_id }}
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

              <v-text-field prepend-icon="arrow_forward" name="date" label="Date" id="date" capacity="text" 
                ref="date"
                v-model="form.date"
                :rules="[() => !form.errors.has('date') || form.errors.get('date') ]"
              ></v-text-field>  

              <v-date-picker name="date" label="Date" id="type" 
                :landscape="true"
                v-model="form.date"   
              ></v-date-picker>

              <v-text-field prepend-icon="widgets" name="cp_id" label="CP ID" id="cp_id" capacity="text" 
                ref="cp_id"
                v-model="form.cp_id"
                :rules="[() => !form.errors.has('cp_id') || form.errors.get('cp_id') ]"
              ></v-text-field>  

              <v-text-field prepend-icon="arrow_forward" name="offerDetails.type" label="Machine Type" id="type" type="text" 
                ref="offerDetails.type"
                v-model="form.offerDetails.type"
                :rules="[() => !form.errors.has('offerDetails.type') || form.errors.get('offerDetails.type') ]"
              ></v-text-field>  

              <v-text-field prepend-icon="arrow_forward" name="offerDetails.capacity" label="Machine capacity" id="capacity" capacity="text" 
                ref="offerDetails.capacity"
                v-model="form.offerDetails.capacity"
                :rules="[() => !form.errors.has('offerDetails.capacity') || form.errors.get('offerDetails.capacity') ]"
              ></v-text-field>  

              <v-layout row wrap> 

                <v-flex xs6>
                  <v-subheader>Select Offer Mode</v-subheader>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    multiple chips
                    autocomplete
                    name="offerModeIds"
                    ref="offerModeIds"
                    :items="modes"
                    v-model="form.offerModeIds"
                    label="Select Mode"
                    :rules="[() => !form.errors.has('offerModeIds') || form.errors.get('offerModeIds') ]"
                  ></v-select>
                </v-flex> 

              </v-layout> 

              <v-layout row wrap> 

                <v-flex xs6>
                  <v-subheader>Select Offer Status</v-subheader>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    multiple chips
                    autocomplete
                    name="offerStatusIds"
                    ref="offerStatusIds"
                    :items="statuses"
                    v-model="form.offerStatusIds"
                    label="Select Status"
                    :rules="[() => !form.errors.has('offerStatusIds') || form.errors.get('offerStatusIds') ]"
                  ></v-select>
                </v-flex> 

              </v-layout> 

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" 
              >
                Update Offer
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
        inquiry_id: '',
        cp_id: '',
        date: '',
        offerDetails: {
          type: '',
          capacity: ''
        }, 
        offerModeIds: [],
        offerStatusIds: []
      }),
      modes: [],
      statuses: []
    }),

    mounted() {
      this.form.get('/api/modes')
        .then(data => {
          data.data.forEach(item => {
            this.modes.push({
              text: item.mode,
              value: item.id
            })
          })
        })

      this.form.get('/api/statuses')
        .then(data => {
          data.data.forEach(item => {
            this.statuses.push({
              text: item.status,
              value: item.id
            })
          })
        })

      this.form.get(`/api/inquiries/${this.$route.params.inquiry_id}/offers/${this.$route.params.offer_id}`)
        .then(data => {
          console.log(data);
          let modes = data.data.modes.map(mode => mode.id)
          let statuses = data.data.statuses.map(status => status.id)
          this.form = new Form({
            id: data.data.id,
            cp_id: data.data.cp_id,
            date: data.data.date,
            offerDetails: data.data.offer_details[0], 
            offerModeIds: modes,
            offerStatusIds: statuses
          })
        })
    },

    methods: {
      update() {
        this.form.patch(`/api/inquiries/${this.$route.params.inquiry_id}/offers/${this.$route.params.offer_id}`)
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
</div></template>