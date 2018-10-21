<template>
  <v-navigation-drawer
    fixed
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
    v-model="nav.opened"
  >
    <v-list dense>
      <template v-for="item in items">
        <v-layout
          row
          v-if="item.heading"
          align-center
          :key="item.heading"
        >
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex> 
        </v-layout>
        <v-list-group
          v-else-if="item.children"
          v-model="item.model"
          :key="item.text"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon=""
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="(child, i) in item.children"
            :key="i"
            @click=""
          >
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else @click="" :key="item.text"
          :to="item.url"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script type="text/javascript">

  import { mapGetters } from 'vuex'
  
  export default {
    data: () => ({ 
      items: [
        { icon: 'add_shopping_cart', text: 'Inquiries', url: '/inquiries' }, 
        { heading: 'Profile' },
        { icon: 'person_pin', text: 'Details', url: '/details' }, 
        { icon: 'domain', text: 'Companies', url: '/companies' }, 
        { icon: 'settings', text: 'Settings', url: '/settings' }, 
        { icon: 'contacts', text: 'Contacts', url: '/contacts' },

        { heading: 'Utilities' },
        { icon: 'control_point_duplicate', text: 'Contact Categories', url: '/categories' },
        { icon: 'chrome_reader_mode', text: 'Inquiry Modes', url: '/modes' },
        { icon: 'merge_type', text: 'Inquiry Types', url: '/types' },
        { icon: 'assistant_photo', text: 'Inquiry Statuses', url: '/status' },
        { icon: 'camera_roll', text: 'User Roles', url: '/roles' },
      ]
    }),

    computed: {
      ...mapGetters([
        'nav'
      ])
    }
  }

</script>