<template>
   <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md8>

        <v-card class="elevation-12"> 

          <v-card-title primary-title>
            <h3 class="headline mb-0">Edit contact
              <v-btn small color="primary"
                to="/contacts"
              >View contacts</v-btn>
            </h3>
          </v-card-title> 

          <form 
            @submit.prevent="update"
            @keydown="form.errors.clear($event.target.name)"
          >

            <v-card-text> 

              <v-text-field prepend-icon="person" name="name" label="Name" id="name" type="text" 
                ref="name"
                v-model="form.name"
                :rules="[() => !form.errors.has('name') || form.errors.get('name') ]"
              ></v-text-field> 

              <v-text-field prepend-icon="domain" name="contact_company_name" label="Company name" id="contact_company_name" type="text" 
                ref="contact_company_name"
                v-model="form.contact_company_name"
                :rules="[() => !form.errors.has('contact_company_name') || form.errors.get('contact_company_name') ]"
              ></v-text-field>  

              <v-layout row wrap> 

                <v-flex xs6>
                  <v-subheader>Category</v-subheader>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    multiple chips
                    ref="category_ids"
                    :items="categories"
                    v-model="form.category_ids"
                    label="Select Category"
                    :rules="[() => !form.errors.has('category_ids') || form.errors.get('category_ids') ]"
                  ></v-select>
                </v-flex>

              </v-layout> 

            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" color="primary" 
              >
                Update Contact
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
        name: '',
        contact_company_name: '',
        category_ids: []
      }),
      categories: [
        {
          text: 'Client',
          value: 1
        }
      ]
    }),

    mounted() {

      this.form.get('/api/categories')
        .then(data  =>  {
          data.data.forEach(item => {
            this.categories.push({
              text: item.category,
              value: item.id
            })
          })
        })

      this.form.get(`/api/contacts/${this.$route.params.contact_id}`)
        .then(data => {  

          this.form = new Form({
            name: data.data.name,
            contact_company_name: data.data.contact_company_name,
            category_ids: []
          })

          data.data.categories.forEach(category => { 
            this.form.category_ids.push(
             category.id
            ) 
          }) 
        })

    },

    methods: {

      update() {
        this.form.patch(`/api/contacts/${this.$route.params.contact_id}`)
          .then(data  =>  {
            this.$router.push('/contacts');
          })
          .catch(errors => {
            this.form.validate(this.$refs)
          })
      }
    }
  }
</script>