import React, { Component } from 'react';
import { IonCard, IonCardContent, IonItem, IonLabel, IonButton, IonInput } from '@ionic/react';
import { derivative } from 'mathjs'

import './CalculContainer.css';
import { isString } from 'util';

class Operation extends Component<any> {
    op: string;
    f_n: number;
    s_n: number;
    result: number | string;
    exp: string;
    exp_expected: string;

    state = {
        reloaded: 0,
        wins : 0,
        won : undefined,
        prop_value : undefined,
      };

    constructor (props: any){
        super(props);
        this.op = "+"; this.f_n = 0; this.s_n = 0; this.result = 0; this.exp = "";  this.exp_expected = ""; 
        this.calcul();
        return;
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



    render () {
        const Compteur : React.FC = () => {
            return (<IonCard>
                <IonItem>
                    <IonLabel>Compteur</IonLabel>
                </IonItem>
                <IonCardContent>
                    <h4>Tentatives : <strong>{this.state.reloaded}</strong></h4>
                    <h4>Réussites : <strong>{this.state.wins}</strong></h4>
                </IonCardContent>
            </IonCard>);
        };

        if (this.op === "prim"){
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
        }else {
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
        }
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
      

export default Operation;