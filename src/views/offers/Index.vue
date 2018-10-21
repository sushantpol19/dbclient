<template>  
  <v-card class="elevation-12"> 

    <v-card-title primary-title>
      <h3 class="headline mb-0">Machines Offered
        <v-btn small color="primary"
          :to="`/inquiries/${inquiry_id}/offers/create`"
        >Offer New Machine</v-btn>
      </h3>
      
      <v-spacer></v-spacer>

      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td v-html="props.item.offer_details"></td> 
        <td v-html="props.item.modes"></td> 
        <td v-html="props.item.statuses"></td>  
        <td v-html="props.item.remarks"></td>  
        <td class="justify-center layout px-0"> 
          <router-link :to="`/inquiries/${inquiry_id}/offers/${props.item.id}/remarks/create`">Add Remark </router-link>
          
          <v-btn icon class="mx-0"
            :to="`/inquiries/${inquiry_id}/offers/${props.item.id}/edit`"
            title="edit"
          >
            <v-icon color="teal">edit</v-icon>
          </v-btn> 
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>

  </v-card> 
</template>

<script type="text/javascript">

  import Form from 'helpers/Form.js'
  
  export default {
    data: () => ({
      form: new Form,
      search: '',
      headers: [
        { text: 'Offered Machine Details', sortable:false, value: 'offer_details'},  
        { text: 'Mode of Offer', sortable:false, value: 'modes'}, 
        { text: 'Offer Status', sortable:false, value: 'statuses'}, 
        { text: 'Offer Remarks', sortable:false, value: 'remarks'}, 
      ],
      items: []  
    }),

    props: [ 'inquiry_id' ],

    watch: {
      'inquiry_id' : 'getOffers'
    },  

    methods: {

      getOffers() {
        this.form.get(`/api/inquiries/${this.inquiry_id}/offers`)
        .then(data => {
          console.log(data.data)

          data.data.forEach(item => {

            this.items.push({
              id: item.id,
              offer_details: `
                ${
                  item.offer_details.map(details => {
                    return `
                      <b>Date: </b> ${item.date}
                      <br>
                      <b>CP ID: </b> ${item.cp_id ? item.cp_id : ''}
                      <br>
                      <b>Type: </b> ${details.type}
                      <br>
                      <b>Capacity: </b> ${details.capacity}
                    `
                  })
                }
              `,
              modes: `
                ${
                  item.modes.map(mode => {
                    return `
                      ${mode.mode}
                    `
                  })
                }
              `,
              statuses: `
                ${
                  item.statuses.map(status => {
                    return `
                      ${status.status}
                    `
                  })
                }
              `,
              remarks: `
                ${
                  item.offer_remarks.map((remark, index) => {
                    return `
                      <br>
                      ${index + 1}. [<b>${remark.date}</b>], ${remark.remark}
                      <a
                        href="/inquiries/${this.$route.params.inquiry_id}/offers/${item.id}/remarks/${remark.id}/edit"
                      >[ edit ]</a>
                    `
                  })
                }
              `
            })

          })
        })
      }

    }

  }

</script>