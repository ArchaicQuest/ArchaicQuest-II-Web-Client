import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { WindowComponent } from './client/window/window.component';
import { InputComponent } from './client/input/input.component';
import { environment } from 'src/environments/environment';
import { AppService } from './app.service';
import { CreatePlayerComponent } from './player/create/create.component';
import { CreateService } from './player/create/create.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './welcome/welcome.component';
import { PlayerAppearanceComponent } from './player/create/Appearance/appearance.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateAccountComponent } from './player/account/account.component';
import { ToastrModule } from 'ngx-toastr';
import { ManageCharactersComponent } from './player/manage/manage.component';
import { ManageCharactersService } from './player/manage/manage.service';
import { HttpService } from './_shared/http.service';
import { Safe } from './_shared/pipes/safe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClientService } from './client/client.service';
import { ContextModalComponent } from './context-modal/context-modal.component';
import { ContentModalComponent } from './client/content-modal/content-modal.component';
import { SettingsModalComponent } from './client/settings-modal/settings-modal.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ForgotPasswordComponent } from './player/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './player/reset-password/reset-password.component';
@NgModule({
  declarations: [
    AppComponent,
    CreatePlayerComponent,
    WelcomeComponent,
    PlayerAppearanceComponent,
    CreateAccountComponent,
    ManageCharactersComponent,
    ContextModalComponent,
    ContentModalComponent,
    SettingsModalComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  entryComponents: [
    CreateAccountComponent,
    ForgotPasswordComponent,
    ContextModalComponent,
    ContentModalComponent,
    SettingsModalComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatStepperModule,
    MatRadioModule,
    MatSliderModule,
    MatExpansionModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center'
    }),
    BrowserAnimationsModule,
  ],
  providers: [CreateService, ManageCharactersService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
