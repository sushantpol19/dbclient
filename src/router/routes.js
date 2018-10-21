
// auth
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Home from '../views/Home.vue'
// inquiries
import Inquiries from '../views/inquiries/Index.vue'
import InquiriesCreate from '../views/inquiries/Create.vue'
import InquiriesEdit from '../views/inquiries/Edit.vue'
import InquiriesShow from '../views/inquiries/Show.vue'
// inquiry remarks
import InquiryRemarksCreate from '../views/inquiries/remarks/Create.vue'
import InquiryRemarksEdit from '../views/inquiries/remarks/Edit.vue'
// inquiry offers
import Offers from '../views/offers/Index.vue'
import OffersCreate from '../views/offers/Create.vue'
import OffersEdit from '../views/offers/Edit.vue' 
// offer remarks
import OfferRemarksCreate from '../views/offers/remarks/Create.vue'
import OfferRemarksEdit from '../views/offers/remarks/Edit.vue'
// companies
import Companies from '../views/companies/Index.vue'
import CompaniesCreate from '../views/companies/Create.vue'
import CompaniesEdit from '../views/companies/Edit.vue'
// settings
import Settings from '../views/settings/Index.vue'
// contacts
import Contacts from '../views/contacts/Index.vue'
import ContactsCreate from '../views/contacts/Create.vue'
import ContactsEdit from '../views/contacts/Edit.vue' 
// contact categories
import Categories from '../views/categories/Index.vue'
import CategoriesCreate from '../views/categories/Create.vue'
import CategoriesEdit from '../views/categories/Edit.vue'
// inquiry modes
import Modes from '../views/modes/Index.vue'
import ModesCreate from '../views/modes/Create.vue'
import ModesEdit from '../views/modes/Edit.vue'
// inquiry types
import Types from '../views/types/Index.vue'
import TypesCreate from '../views/types/Create.vue'
import TypesEdit from '../views/types/Edit.vue'
// user roles
import Roles from '../views/roles/Index.vue'
import RolesCreate from '../views/roles/Create.vue'
import RolesEdit from '../views/roles/Edit.vue'
// user roles
import Status from '../views/status/Index.vue'
import StatusCreate from '../views/status/Create.vue'
import StatusEdit from '../views/status/Edit.vue'

let routes = [
  // auth
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/', component: Home },
  // inquiries
  { path: '/inquiries', component: Inquiries },
  { path: '/inquiries/create', component: InquiriesCreate },
  { path: '/inquiries/:inquiry_id/edit', component: InquiriesEdit },
  { path: '/inquiries/:inquiry_id', component: InquiriesShow },
  // inquiry remarks
  { path: '/inquiries/:inquiry_id/remarks/create', component: InquiryRemarksCreate },
  { path: '/inquiries/:inquiry_id/remarks/:remark_id/edit', component: InquiryRemarksEdit },
  // inquiry offers
  { path: '/inquiries/:inquiry_id/offers', component: Offers },
  { path: '/inquiries/:inquiry_id/offers/create', component: OffersCreate },
  { path: '/inquiries/:inquiry_id/offers/:offer_id/edit', component: OffersEdit },
  // offer remarks
  { path: '/inquiries/:inquiry_id/offers/:offer_id/remarks/create', component: OfferRemarksCreate },
  { path: '/inquiries/:inquiry_id/offers/:offer_id/remarks/:remark_id/edit', component: OfferRemarksEdit },
  // companies
  { path: '/companies', component: Companies },
  { path: '/companies/create', component: CompaniesCreate },
  { path: '/companies/:company_id/edit', component: CompaniesEdit },
  // settings
  { path: '/settings', component: Settings },
  // contacts
  { path: '/contacts', component: Contacts },
  { path: '/contacts/create', component: ContactsCreate },
  { path: '/contacts/:contact_id/edit', component: ContactsEdit },
  // contact categories
  { path: '/categories', component: Categories },
  { path: '/categories/create', component: CategoriesCreate },
  { path: '/categories/:category_id/edit', component: CategoriesEdit },
  // inquiry modes
  { path: '/modes', component: Modes },
  { path: '/modes/create', component: ModesCreate },
  { path: '/modes/:mode_id/edit', component: ModesEdit },
  // inquiry types
  { path: '/types', component: Types },
  { path: '/types/create', component: TypesCreate },
  { path: '/types/:type_id/edit', component: TypesEdit },
  // user roles
  { path: '/roles', component: Roles },
  { path: '/roles/create', component: RolesCreate },
  { path: '/roles/:role_id/edit', component: RolesEdit },
  // user roles
  { path: '/status', component: Status },
  { path: '/status/create', component: StatusCreate },
  { path: '/status/:status_id/edit', component: StatusEdit },
];

export default routes;