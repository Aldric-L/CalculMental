import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import CalculLauncher from '../components/CalculLauncher';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lanceur d'applications</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Lanceur d'applications</IonTitle>
          </IonToolbar>
        </IonHeader>
       <CalculLauncher />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
/* /*Launcher name="Maps" uri="com.google.android.apps.maps" />*/