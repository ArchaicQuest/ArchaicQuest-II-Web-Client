import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
    declarations: [
        AppComponent,
        ClientComponent,
        WindowComponent,
        InputComponent,
        CreatePlayerComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        EffectsModule.forRoot([]),
        StoreModule.forRoot({ appReducer }),
        StoreDevtoolsModule.instrument({
            name: 'Archaic Quest II - client',
            maxAge: 25, // Retains last 25 states
            logOnly: environment.production, // Restrict extension to log-only mode
        }),
    ],
    providers: [AppService, CreateService],
    bootstrap: [AppComponent]
})
export class AppModule { }
