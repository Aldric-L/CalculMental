import React, { Component } from 'react';
import { IonCard, IonCardContent, IonItem, IonLabel, IonButton, IonInput, IonGrid, IonRow, IonCol } from '@ionic/react';
import { derivative } from 'mathjs'
//import * as Applist from '@ionic-native/app-list';
import Launcher from '../components/Launcher';
import * as AppAvailability from '@ionic-native/app-availability'

import './CalculContainer.css';
import './CalculLauncher.css';
import { isString } from 'util';

const NB = 5;
var cool_apps_uri = ["com.facebook.katana", "com.happening.studios.swipeforfacebookfree", "com.instagram.android", "com.snapchat.android", "de.axelspringer.yana.zeropage", "com.amazon.mShop.android.shopping", "com.microsoft.office.outlook", "com.discord", "com.king.candycrushsaga", "flipboard.app", "com.google.android.gm", "com.google.android.youtube"];
var cool_apps = ["Facebook", "Swipe", "Instagram", "Snapchat", "UpDay", "Amazon", "Outlook", "Discord", "Candy Crush", "Flipboard", "Gmail", "Youtube"];

interface TwoLauncherProps {
    one: number | undefined;
    two: number | undefined;
}

class CalculLauncher extends Component<any> {
    op: string;
    f_n: number;
    s_n: number;
    result: number | string;
    exp: string;
    exp_expected: string;
    apps_index: number[] = [];
    launch_raws: number;
    apps: number[][];
    appp: string[];

    state = {
        reloaded: 0,
        wins : 0,
        won : undefined,
        prop_value : undefined,
        launched: false
      };

    constructor (props: any){
        super(props);
        this.op = "+"; this.f_n = 0; this.s_n = 0; this.result = 0; this.exp = "";  this.exp_expected = ""; this.apps = []; this.appp = []; this.launch_raws = 0;
        this.calcul();
        this.init();
        return;
    }

    async init(){
        var echecs = [];
        var index: number;
        var uri: string;
        for (var i = 0; i < cool_apps_uri.length; i++){
            index = i;
            uri = cool_apps_uri[i];
            try {
                await AppAvailability.AppAvailability.check(cool_apps_uri[i])
                .then(
                    (yes: boolean) => this.apps_index.push(i) && this.appp.push("index : " + index + " - URI: " + uri),
                    (no: boolean) => echecs.push(i)
                );
            }catch (error){
                console.log("Error : " + error);
            }
            
        }
        this.launch_raws = this.apps_index.length/3;
        
        if (this.launch_raws !== 0 && this.launch_raws > 0 && this.launch_raws < 1)
            this.launch_raws = 1;
        else if (this.apps_index.length%3 !== 0)
            this.launch_raws += 1;

        var local_index = this.apps_index;
        for (var i = 0; i < this.launch_raws; i++){
            this.apps[i] = new Array(local_index[i*2], local_index[i*2+1]);
        }
        this.setState({ reloaded: this.state.reloaded });
    }

    calcul () {
        var rand = Math.floor(Math.random() * Math.floor(100));
        if (rand % 2 === 0){
            this.op = "+";
            //On calcule les nombres
            this.f_n = rand;
            this.s_n = Math.floor(Math.random() * Math.floor(100));
            while (this.f_n === 0 || this.f_n === 1 || this.f_n === 2){
                this.f_n = Math.floor(Math.random() * Math.floor(100));
            }
            while (this.s_n === 0 || this.s_n === 1 || this.s_n === 2){
                this.s_n = Math.floor(Math.random() * Math.floor(100));
            }
            this.result = this.f_n + this.s_n;
        }
        else if (rand%9 === 0 || rand%9 === 7){
            this.op = "prim";

            var primitives = ["1/2x^2", "1/(n+1)*x^(n+1)", "-1/x", "ln(x)", "e^x", "1/2u^2", "-1/u", "ln(u)"];
            var index = Math.floor(Math.random() * Math.floor(primitives.length));
            while (primitives[index] === undefined){
                index = Math.floor(Math.random() * Math.floor(primitives.length));
            }
            this.exp_expected = primitives[index];
            if (this.exp_expected === "ln(x)"){
                this.exp = "1/x";
            }else if (this.exp_expected === "e^x"){
                this.exp = "e^x";
            }else if (this.exp_expected === "1/2u^2"){
                this.exp = "u'u";
            }else if (this.exp_expected === "-1/u"){
                this.exp = "u'/u^2";
            }else if (this.exp_expected === "ln(u)"){
                this.exp = "u'/u";
            }else {
                this.exp = derivative(this.exp_expected, 'x').toString();
            }
        }
        else {
            this.op = "x";
            //On calcule les nombres
            this.f_n = rand%3;
            this.s_n = Math.floor(Math.random() * Math.floor(12));
            while (this.f_n <= 2 || this.f_n > 12){
                this.f_n = Math.floor(Math.random() * Math.floor(12));
            }
            while (this.s_n <= 2 || this.s_n > 12){
                this.s_n = Math.floor(Math.random() * Math.floor(12));
            }
            this.result = this.f_n * this.s_n;
        }
    }

    restart () {
        this.calcul();
        this.setState({ reloaded: this.state.reloaded+1, won: undefined });
    }

    reinit(){
        this.launch_raws = 0;
        this.apps_index = [];
        this.apps = [];
        this.init();
        this.calcul();
        this.setState({ reloaded: 0, wins: 0, won: undefined });
    }

    render () {
        const Compteur : React.FC = () => {
            return (<IonCard>
                <IonItem>
                    <IonLabel>Compteur</IonLabel>
                </IonItem>
                <IonCardContent>
                    <h4>Tentatives : <strong>{this.state.reloaded}</strong></h4>
                    <h4>Réussites : <strong>{this.state.wins} / {NB}</strong></h4>
                    
                    {this.state.launched !== true && <div><br />
                    <p><em>Les applications tierses pourront être lancées après que {NB} calculs aient été terminés avec succès.</em></p>
                    <IonButton onClick={() => { this.setState({launched: true}); } } expand="block" color="danger">Démarrer</IonButton> </div>}
                </IonCardContent>
            </IonCard>);
        };
        const TwoLaunchers : React.FC <TwoLauncherProps> = ({one, two}) => {
            
            return (
                <IonRow className="ion-align-self-center">
                    {one !== undefined && <IonCol className="ion-align-self-center"><Launcher name={cool_apps[one]} uri={cool_apps_uri[one]} /></IonCol> }
                    {two !== undefined && <IonCol className="ion-align-self-center"><Launcher name={cool_apps[two]} uri={cool_apps_uri[two]} /></IonCol> }
                </IonRow>
            );
        };
        const Launchers : React.FC = () => {
            
            return (
                <IonGrid className="launchers">
                    <IonRow>
                        <IonCol>
                        <br />
                        <h1>Bravo !</h1>
                        <h5>Choisissez l'application à ouvrir</h5>
                        <br />
                        <br />
                        </IonCol>
                    </IonRow>
                    {this.apps.map((app) => ( 
                        <div>
                            <TwoLaunchers one={app[0]} two={app[1]} />
                        </div>
                    ))}
                    <IonRow>
                        <IonCol>
                            <IonButton expand="block" onClick={(e) => {this.reinit();}}>Relancer</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            );
        };
        if (this.op === "prim" && this.state.launched === true && this.state.wins < NB){
            return (
                <div>
                    <Compteur />
                    <IonCard>
                        <IonItem>
                            <IonLabel>Primitives</IonLabel>
                        <IonButton fill="outline" slot="end" onClick={() => { this.restart(); }} >Relancer</IonButton>
                        </IonItem>
                
                        <IonCardContent>
                            <h1>f(x) = <strong>{this.exp}</strong></h1>
                            
                            {this.state.won === false && <h3>Erreur ! Essaie encore. </h3> }
                            <IonItem>
                                <IonLabel>F(x) = </IonLabel>
                                <IonInput autocorrect="off" value={this.state.prop_value} onIonChange={e => { this.setState({prop_value: e.detail.value});}} ></IonInput>
                            </IonItem>
                            <div className="ion-padding">
                                <IonButton onClick={() => { this.checkVal(); } } expand="block" color="success">Valider</IonButton>
                            </div>
                            
                        </IonCardContent>
                    </IonCard>
                </div>
            );
        }else if (this.state.launched === true && this.state.wins < NB){
            return (
                <div>
                <Compteur />
                <IonCard>
                    <IonItem>
                    {this.op === "+" ? (<IonLabel>Addition</IonLabel>) : (this.op === "x" && <IonLabel>Multiplication</IonLabel>) }
                    <IonButton fill="outline" slot="end" onClick={() => { this.restart(); }} >Relancer</IonButton>
                    </IonItem>
            
                    <IonCardContent>
                        <h1><strong>{this.f_n}</strong> {this.op === "+" ? (<span>+</span>) : (this.op === "x" && <span>x</span>) } <strong>{this.s_n}</strong> = x </h1>
                        
                        {this.state.won === false && <h3>Erreur ! Essaie encore. </h3> }
                        <IonItem>
                            <IonLabel>x=</IonLabel>
                            <IonInput inputmode="numeric" value={this.state.prop_value} onIonChange={e => { this.setState({prop_value: e.detail.value});}}></IonInput>
                        </IonItem>
                        <div className="ion-padding">
                            <IonButton onClick={() => { this.checkVal(); } } expand="block" color="success">Valider</IonButton>
                        </div>
                        
                    </IonCardContent>
                </IonCard>
                </div>
            );
        }else if (this.state.wins < NB){
            return (<Compteur />);
        }else if (this.state.wins >= NB){
            return (
                <div>
                    <Launchers />
                </div>
            );
        }
        return (<br />);
    }

    checkVal () {
        if (this.op !== "prim"){
            if (this.result == this.state.prop_value){
                this.setState({won: true, wins: this.state.wins+1, prop_value: undefined});
                this.restart();
            }else {
                this.setState({won: false, reloaded: this.state.reloaded+1});
            }
        }else {
            if (isString(this.state.prop_value) && this.exp_expected == this.state.prop_value){
                this.setState({won: true, wins: this.state.wins+1, prop_value: undefined});
                this.restart();
            }else {
                this.setState({won: false, reloaded: this.state.reloaded+1});
            }
        }
        
    }

   
}
      

export default CalculLauncher;