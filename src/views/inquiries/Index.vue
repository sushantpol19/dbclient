<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex xs12>

        <v-card class="elevation-12"> 

          <v-card-title primary-title>
            <h3 class="headline mb-0">Inquiries
              <v-btn small color="primary"
                to="/inquiries/create"
              >Add New</v-btn>
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
            item-key="id" 
          >
            <template slot="items" slot-scope="props">
              <td v-html="props.item.date"></td> 
              <td v-html="props.item.inquirer"></td> 
              <td v-html="props.item.inquiry_details"></td> 
              <td v-html="props.item.hiring_details"></td> 
              <td v-html="props.item.modes"></td> 
              <td v-html="props.item.types"></td> 
              <td class="justify-center layout px-0"> 
                <router-link :to="`/inquiries/${props.item.id}/remarks/create`">Add Remark </router-link>
                <v-btn icon class="mx-0"
                  :to="`/inquiries/${props.item.id}`"
                  title="view"
                > 
                  <v-icon color="orange">view_comfy</v-icon>
                </v-btn> 
                <v-btn icon class="mx-0"
                  :to="`/inquiries/${props.item.id}/edit`"
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

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script type="text/javascript">
  
  import moment from 'moment'
  import Form from 'helpers/Form.js'
  
  export default {

    data: () => ({
      form: new Form,
      search: '',
      headers: [
        { text: 'Date', sortable:false, value: 'date'}, 
        { text: 'Inquirer', sortable:false, value: 'inquirer'}, 
        { text: 'Inquiry Details', sortable:false, value: 'inquiry_details'}, 
        { text: 'Hiring Details', sortable:false, value: 'hiring_details'}, 
        { text: 'Mode of Inquiry', sortable:false, value: 'modes'}, 
        { text: 'Inquiry Type', sortable:false, value: 'types'}, 
      ],
      customSort: {isDescending: true},
      items: []
    }),

    mounted() {
      this.form.get('/api/inquiries')
        .then(data => {
          let contact;

          data.data.forEach(item => {

            this.items.push({
              id: item.id,
              date: moment(item.date).format('DD-MM-YYYY'),
              inquirer: ` 
                ${item.contact.name}
                <br>
                <b>Company:</b> ${item.contact.contact_company_name}
              `, 
              inquiry_details: `
                <b>ID:</b> ${item.id}
                <br> 
                ${
                  item.inquiry_details.map(inquiry_detail =>  {
                    return `
                      <b>Type: </b>${inquiry_detail.type}
                      <br>
                      <b>Capacity: </b>${inquiry_detail.capacity} Tons
                    `
                  })
                } 
              `,
              hiring_details: `
                ${
                  item.hiring_details.map(hiring_detail =>  {
                    return `
                      <b>Nature of Work: </b>${hiring_detail.nature_of_work ? hiring_detail.nature_of_work : '' }
                      <br>
                      <b>Site Location: </b>${hiring_detail.site_location ? hiring_detail.site_location : ''}
                    `
                  })
                } 
              `,
              modes: `
                ${
                  item.modes.map(mode =>  {
                    return `
                      ${mode.mode}
                    `
                  })
                } 
              `,
              types: `
                ${
                  item.types.map(type =>  {
                    return `
                      ${type.type}
                    `
                  })
                } 
              `
            }) 
            
          }) 

        })
        .catch(errors => {

        })
    }

  }
</script>