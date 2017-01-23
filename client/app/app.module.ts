import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import { HttpModule }    from '@angular/http';
import {SimpleNotificationsModule} from 'angular2-notifications';

import {AppComponent} from "./app.component";
import {ClientsComponent} from "./pages/clients/clients.component";
import {OperatorComponent} from "./pages/operator/operator.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {DeveloperComponent} from "./pages/developer/developer.component";
import {TicketSelectionComponent} from "./pages/developer/ticketSelection/ticketSelection.component";
import {DeveloperTicketsComponent} from "./pages/developer/ticketSelection/tickets/tickets.component";
import {PaginationComponent} from "./pages/developer/ticketSelection/pagination/pagination.component";
import {CommentsComponent} from "./pages/developer/comments/comments.component";
import {RoleManagementComponent} from "./pages/admin/role/role.component";
import {RoleManagementHeaderComponent} from "./pages/admin/role/header/header.component";
import {AddUserComponent} from "./pages/admin/role/addUser/addUser.component";
import {BlockUserComponent} from "./pages/admin/role/blockUser/blockUser.component";
import {UnblockUserComponent} from "./pages/admin/role/unblockUser/unblockUser.component";
import {ProductComponent} from "./pages/admin/product/product.component";
import {ProductHeaderComponent} from "./pages/admin/product/header/header.component";
import {AddMainProductComponent} from "./pages/admin/product/addProduct/addProduct.component";
import {EditProductComponent} from "./pages/admin/product/editProduct/editProduct.component";
import {MailTemplatesComponent} from "./pages/admin/mailTemplates/mailTemplates.component";
import {MailTemplateHeaderComponent} from "./pages/admin/mailTemplates/header/header.component";
import {AddMailTemplateComponent} from "./pages/admin/mailTemplates/addTemplate/addTemplate.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {TicketsComponent} from "./pages/tickets/tickets.componet";
import {ReportsComponent} from "./pages/reports/reports.component";
import {OperatorSidenavigationComponent} from "./shared/navigation/operator.sidenavigation.component";
import {AdminSidenavigationComponent} from "./shared/navigation/admin.sidenavigation.component";
import {DeveloperSidenavigationComponent} from "./shared/navigation/developer.sidenavigation.component";


import { ClientService } from './services/client.service';
import { AuthService } from './services/auth.service';
import { RoleManagementService } from './services/role.service';
import { ProductManagementService } from './services/product.service';
import { AuthGuard } from './guards/auth.gaurd';
import { AppRoutingModule } from './app.routing';

import {NavbarheaderComponent} from "./shared/navigation/navbarheader/navbarheader.component";
import {AddclientsComponent} from "./pages/clients/addclient/addclients.component";
import {SearchClientComponent} from "./pages/clients/searchclient/searchclient.component";
import { LoginComponent } from './pages/login/login.component';
import { ChangeCredentialsComponent } from './shared/changeCredentials/changeCredentials.component';
import { NotificationComponent } from './shared/notification/notification.component';



import {MainPipeModule} from "./pipes/main.pipe";
import {ClientsHeaderComponent} from "./pages/clients/header/clients.header";
import {SingleClientComponent} from "./pages/clients/clientSingle/single-client.component";
import {MailComponent} from "./pages/clients/mail/mail.component";
import {CustomersComponent } from "./pages/customers/customers.component";
import {SingleclientheaderComponent} from "./pages/clients/clientSingle/singleclientheader/singleclientheader.component";
import {AddCallComponent} from "./pages/clients/clientSingle/options/addCall/add-call.component";
import {OptionsClientService} from "./pages/clients/clientSingle/options/options-client.service";
import {AddNoteComponent} from "./pages/clients/clientSingle/options/addNote/add-note.component";
import {AddProductComponent} from "./pages/clients/clientSingle/options/addProduct/add-product.component";
import {AddTicketeComponent} from "./pages/clients/clientSingle/options/addTicket/add-ticket.component";
import {AddTillComponent} from "./pages/clients/clientSingle/options/addProduct/AddTill/add-till.component";
import {CallComponent} from "./pages/clients/call/call.component";
import {ClientEditComponent} from "./pages/clients/clientSingle/clientedit/clientedit.component";

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import {ClientSingleDashboardComponent} from "./pages/clients/clientSingle/dashboard/client-single-dashboard.component";
import {ClientBlockComponent} from "./pages/clients/clientSingle/options/block/client-block.component";
import {ClientdataComponent} from "./pages/clients/clientSingle/dashboard/clientdata/clientdata.component";
import {ClienthistoryComponent} from "./pages/clients/clientSingle/dashboard/clienthistory/clienthistory.component";
import {ClientproductComponent} from "./pages/clients/clientSingle/dashboard/clientproduct/clientproduct.component";
import {ClientDataSharingService} from "./shared/data/client-data-sharing.service";
import {ClienthistoryService} from "./pages/clients/clientSingle/dashboard/clienthistory/clienthistory.service";
import {SingleClientTicketsComponent} from "./pages/clients/clientSingle/options/tickets/single-client-tickets.component";
import {SingleClientPurchasedProductsComponent} from "./pages/clients/clientSingle/options/addProduct/AddTill/purchasedTills/purchased-products.component";
import {SingleTicketComponent} from "./pages/tickets/singleTicket/single-ticket.component";
import {SingleTicketService} from "./pages/tickets/singleTicket/single-ticket.service";
import {EditTicketsComponent} from "./pages/tickets/singleTicket/ticketEdit/ticket-edit.component";
import {TicketService} from "./services/ticket.service";
import {ProductService} from "./services/products.service";
import {TicketFilterComponent} from "./pages/developer/ticketSelection/ticketFilter/ticketFilter.component";
import {OverdueTicketsComponent} from "./pages/dashboard/overdue-tickets/overdue-tickets.component";
import {ActiveTicketsComponent} from "./pages/dashboard/active-tickets/active-tickets.component";
import {EmailService} from "./services/email.service";
import {AllUsersComponent} from "./pages/admin/role/allUsers/allUsers.component";
import {AllOperatorsComponent} from "./pages/admin/role/allUsers/Operators/all-operators.component";
import {AllDevelopersComponent} from "./pages/admin/role/allUsers/Divelopers/all-developers.component";
import {AllProductsComponent} from "./pages/admin/product/allProducts/allProduct.component";
import {TicketsHeaderComponent} from "./pages/tickets/ticketsHeader/tickets-header.component";
import {AddNewTicketComponent} from "./pages/tickets/add-new-ticket.component";


//when creating a component, add it here
@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule, MainPipeModule, Ng2Bs3ModalModule,SimpleNotificationsModule],
    declarations: [AppComponent, ClientsComponent,
        DashboardComponent, TicketsComponent,
        ReportsComponent, OperatorSidenavigationComponent,
        NavbarheaderComponent, AddclientsComponent,
        ClientsHeaderComponent,SingleClientComponent,
        MailComponent, LoginComponent, CustomersComponent,
        SingleclientheaderComponent, ClientdataComponent,
        ClienthistoryComponent,ClientproductComponent,
        AddCallComponent, AddNoteComponent,
        AddProductComponent, AddTicketeComponent,
        AddTillComponent, CallComponent, ChangeCredentialsComponent,
        ClientSingleDashboardComponent, ClientBlockComponent,
        ClientEditComponent, SearchClientComponent, SingleClientTicketsComponent,
        SingleClientPurchasedProductsComponent, AdminSidenavigationComponent, OperatorComponent,
        AdminComponent, RoleManagementComponent, RoleManagementHeaderComponent, AddUserComponent,
        ProductComponent, ProductHeaderComponent, AddMainProductComponent, EditProductComponent,
        MailTemplatesComponent, MailTemplateHeaderComponent, AddMailTemplateComponent, NotificationComponent,
        BlockUserComponent, DeveloperComponent, TicketSelectionComponent, DeveloperTicketsComponent,
        TicketFilterComponent,SingleTicketComponent, EditTicketsComponent,
        OverdueTicketsComponent , ActiveTicketsComponent, PaginationComponent,
        TicketFilterComponent,SingleTicketComponent, EditTicketsComponent, PaginationComponent,
        CommentsComponent, AllUsersComponent, AllOperatorsComponent, AllDevelopersComponent,
        AllProductsComponent, UnblockUserComponent, DeveloperSidenavigationComponent, TicketsHeaderComponent,
        AddNewTicketComponent

         ],
    providers: [ClientService, AuthService, AuthGuard, OptionsClientService, ClientDataSharingService,
        ClienthistoryService, RoleManagementService, ProductManagementService, SingleTicketService, TicketService, ProductService
        ,EmailService
    ],
    bootstrap: [AppComponent],
})

export class AppModule { }