<template>
   <v-container fluid fill-height>
    <v-layout>
      <v-flex xs12>

        <v-card class="elevation-12"> 

          <v-card-title primary-title>
            <h3 class="headline mb-0">Inquiry statuses
              <v-btn small color="primary"
                to="/status/create"
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
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.status }}</td> 
              <td class="justify-center layout px-0">
                <v-btn icon class="mx-0"
                  :to="`/status/${props.item.id}/edit`"
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

  import Form from 'helpers/Form.js'
  
  export default {

    data: () => ({
      form: new Form,
      search: '',
      headers: [
        { text: 'Status', sortable:false, value: 'status' }, 
      ],
      items: []
    }),

    mounted() {
      this.form.get('/api/statuses')
        .then(data => {
          this.items = data.data;
        })
        .catch(errors => {

        })
    }

  }
</script>