<template> 
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12>

        <v-card class="elevation-12"> 
          <v-card-title primary-title>
            <h3 class="headline mb-0">Inquiry details [ID: {{ form.id }}]
            </h3>
          </v-card-title> 

          <v-card-text>
            <v-layout row wrap>

              <v-flex xs6>
                <b>Inquirer: </b> {{ form.contact_name }}
                <br>
                <b>Company Name: </b> {{ form.contact_company_name }}
                <br>
                <b>Inquiry Details:</b>
                <br>
                {{ form.inquiryDetails.type }}, {{ form.inquiryDetails.capacity }} Tons 
                <br>
                <b>Job Details</b>
                <br>
                <b>Nature of work: </b> {{ form.hiringDetails.nature_of_work}} at {{ form.hiringDetails.site_location }}
              </v-flex>

              <v-flex xs6>
                <h4>
                  Remarks
                  <router-link
                    :to="`/inquiries/${form.id}/remarks/create`"
                  >[ Add Remark ]</router-link>
                </h4>

                <div
                  v-for="(inquiryRemark, index) in form.inquiryRemarks"
                  :key="index"
                >
                  {{ index + 1 }}. [<b>{{ inquiryRemark.date }}</b>], {{ inquiryRemark.remark }}
                  <router-link
                    :to="`/inquiries/${$route.params.inquiry_id}/remarks/${inquiryRemark.id}/edit`"
                  >edit</router-link>
                </div>
              </v-flex>

            </v-layout>

            <v-divider></v-divider>
          </v-card-text> 

          <v-card-text>
            <offers
              :inquiry_id="form.id"
            ></offers>
          </v-card-text>

        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script type="text/javascript">

  import Form from 'helpers/Form.js'
  import Offers from 'views/offers/Index.vue'
  
  export default {
    data: ()  =>  ({
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
        },
        inquiryRemarks: []
      }),
    }),

    mounted() {  

      this.form.get(`/api/inquiries/${this.$route.params.inquiry_id}`)
        .then(data => {

          this.form.get(`/api/contacts/${data.data.contact_id}`)
            .then(contact => {
              let types = data.data.types.map(type => type.id)
              let modes = data.data.modes.map(mode => mode.id)
              this.form = new Form({
                id: data.data.id,
                contact_id: parseInt(data.data.contact_id),
                contact_name: contact.data.name,
                contact_company_name: contact.data.contact_company_name,
                date: data.data.date,
                inquiryDetails: data.data.inquiry_details[0],
                inquiryTypeIds: types,
                inquiryModeIds: modes,
                hiringDetails: data.data.hiring_details[0] ? data.data.hiring_details[0] : { nature_of_work: '', site_location: '' },
                inquiryRemarks: data.data.inquiry_remarks
            }) 
          })
        })
    },

    components: {
      Offers
    }
  }
</script>