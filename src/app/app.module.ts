import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { WindowComponent } from './client/window/window.component';
import { InputComponent } from './client/input/input.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppService } from './app.service';
import { appReducer } from './state/app.reducer';
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
@NgModule({
    declarations: [
        AppComponent,
        ClientComponent,
        WindowComponent,
        InputComponent,
        CreatePlayerComponent,
        WelcomeComponent,
        PlayerAppearanceComponent,
        CreateAccountComponent
    ],
    entryComponents: [
        CreateAccountComponent
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
        MatInputModule,
        MatStepperModule,
        MatRadioModule,
        MatSliderModule,
        MatExpansionModule,
        MatOptionModule,
        MatSelectModule,
        MatDialogModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-center'
        }),
        EffectsModule.forRoot([]),
        StoreModule.forRoot({ appReducer }),
        StoreDevtoolsModule.instrument({
            name: 'Archaic Quest II - client',
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
        BrowserAnimationsModule,
    ],
    providers: [AppService, CreateService],
    bootstrap: [AppComponent]
})
export class AppModule { }
