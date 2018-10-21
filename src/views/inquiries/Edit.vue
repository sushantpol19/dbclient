<template>
   <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>

        <v-card class="elevation-12"> 

          <v-card-title primary-title>
            <h3 class="headline mb-0">Edit a inquiry
              <v-btn small color="primary"
                to="/inquiries"
              >View inquiries</v-btn>
            </h3>
          </v-card-title> 

          <form 
            @submit.prevent="update"
            @keydown="form.errors.clear($event.target.name)"
          >

            <v-card-text> 

              <v-layout row wrap> 

                <v-flex xs6>
                  <v-subheader>Select Inquirer &nbsp; 
                    <router-link to="/contacts/create">[Add New Contact]</router-link>
                  </v-subheader>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    autocomplete
                    name="contact_id"
                    ref="contact_id"
                    :items="contacts"
                    v-model="form.contact_id"
                    label="Select Inquirer"
                    :rules="[() => !form.errors.has('contact_id') || form.errors.get('contact_id') ]"
                  ></v-select>
                </v-flex> 

              </v-layout> 

              <v-text-field prepend-icon="arrow_forward" name="date" label="Date" id="type" type="text" 
                ref="date"
                v-model="form.date"
                :rules="[() => !form.errors.has('date') || form.errors.get('date') ]"
              ></v-text-field>  

              <v-date-picker name="date" label="Date" id="type" 
                :landscape="true"
                v-model="form.date"   
              ></v-date-picker>

              <v-text-field prepend-icon="arrow_forward" name="inquiryDetails.type" label="Machine Type" id="type" type="text" 
                ref="inquiryDetails.type"
                v-model="form.inquiryDetails.type"
                :rules="[() => !form.errors.has('inquiryDetails.type') || form.errors.get('inquiryDetails.type') ]"
              ></v-text-field>  

              <v-text-field prepend-icon="arrow_forward" name="inquiryDetails.capacity" label="Machine capacity" id="capacity" capacity="text" 
                ref="inquiryDetails.capacity"
                v-model="form.inquiryDetails.capacity"
                :rules="[() => !form.errors.has('inquiryDetails.capacity') || form.errors.get('inquiryDetails.capacity') ]"
              ></v-text-field>  

              <v-layout row wrap> 

                <v-flex xs6>
                  <v-subheader>Select Inquiry Type</v-subheader>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    multiple chips
                    autocomplete
                    name="inquiryTypeIds"
                    ref="inquiryTypeIds"
                    :items="types"
                    v-model="form.inquiryTypeIds"
                    label="Select Inquiry type"
                    :rules="[() => !form.errors.has('inquiryTypeIds') || form.errors.get('inquiryTypeIds') ]"
                  ></v-select>
                </v-flex> 

              </v-layout> 

              <v-layout row wrap> 

                <v-flex xs6>
                  <v-subheader>Select Inquiry Mode</v-subheader>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    multiple chips
                    autocomplete
                    name="inquiryModeIds"
                    ref="inquiryModeIds"
                    :items="modes"
                    v-model="form.inquiryModeIds"
                    label="Select Mode"
                    :rules="[() => !form.errors.has('inquiryModeIds') || form.errors.get('inquiryModeIds') ]"
                  ></v-select>
                </v-flex> 

              </v-layout> 

              <v-subheader>Hiring Details</v-subheader>

              <v-text-field prepend-icon="arrow_forward" name="hiringDetails.nature_of_work" label="Nature of work" id="nature_of_work" capacity="text" 
                ref="hiringDetails.nature_of_work"
                v-model="form.hiringDetails.nature_of_work"
                :rules="[() => !form.errors.has('hiringDetails.nature_of_work') || form.errors.get('hiringDetails.nature_of_work') ]"
              ></v-text-field>  

              <v-text-field prepend-icon="arrow_forward" name="hiringDetails.site_location" label="Site Location" id="site_location" capacity="text" 
                ref="hiringDetails.site_location"
                v-model="form.hiringDetails.site_location"
                :rules="[() => !form.errors.has('hiringDetails.site_location') || form.errors.get('hiringDetails.site_location') ]"
              ></v-text-field>                

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" 
              >
                Update inquiry
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
        contact_id: '',
        date: '',
        inquiryDetails: {
          type: '',
          capacity: ''
        },
        inquiryTypeIds: [],
        inquiryModeIds: [],
        hiringDetails: {
          nature_of_work: '',
          site_location: ''
        }
      }),
      contacts: [],
      types: [],
      modes: []
    }),

    mounted() { 
      this.form.get('/api/contacts')
        .then(data => {
          data.data.forEach(item => {
            this.contacts.push({
              text: item.name,
              value: item.id
            })
          }) 
        })  

      this.form.get('/api/types')
        .then(data => {
          data.data.forEach(item => {
            this.types.push({
              text: item.type,
              value: item.id
            })
          })
        })

      this.form.get('/api/modes')
        .then(data => {
          data.data.forEach(item => {
            this.modes.push({
              text: item.mode,
              value: item.id
            })
          })
        })

      this.form.get(`/api/inquiries/${this.$route.params.inquiry_id}`)
        .then(data => {
          let types = data.data.types.map(type => type.id)
          let modes = data.data.modes.map(mode => mode.id)
          this.form = new Form({
            id: data.data.id,
            contact_id: parseInt(data.data.contact_id),
            date: data.data.date,
            inquiryDetails: data.data.inquiry_details[0],
            inquiryTypeIds: types,
            inquiryModeIds: modes,
            hiringDetails: data.data.hiring_details[0] ? data.data.hiring_details[0] : { nature_of_work: '', site_location: '' }
          })
        })
    },

    methods: {
      update() {
        this.form.patch(`/api/inquiries/${this.$route.params.inquiry_id}`)
          .then(data  =>  {
            this.$router.push('/inquiries');
          })
          .catch(errors => {
            this.form.validate(this.$refs)
          })
      }
    }
  }
</script>