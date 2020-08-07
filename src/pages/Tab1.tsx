import React from 'react';
/*import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonFab, IonFabButton, IonIcon, IonGrid, IonRow,
  IonCol, IonImg, IonActionSheet, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle } from '@ionic/react';*/
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import Operation from '../components/CalculContainer';

import './Tab1.css';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Calcul simple</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Calcul simple</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Operation />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
