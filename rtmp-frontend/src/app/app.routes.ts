import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
	{
		path: '',
		title: 'Home Page',
    	component: HomeComponent,
  	},
  	{
		path: 'login',
		title: 'Login Page',
    	component: LoginComponent,
  	},
  	{
		path: 'register',
		title: 'Register Page',
    	component: RegisterComponent,
  	},
  	{
		path: 'send-message',
		title: 'Send Message',
    	component: SendMessageComponent,
    	canActivate: [AuthGuard]
  	},
];
