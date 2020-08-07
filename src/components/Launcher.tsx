import React from 'react';
import { IonButton } from '@ionic/react';
import AppLaunch from '../components/AppLaunch';

interface LauncherProps {
  name: string;
  uri: string;
}

const Launcher: React.FC<LauncherProps> = ({ name, uri }) => {
  return (
    <div className="container">
          <IonButton color="secondary" onClick={(e) => {new AppLaunch(uri);}}>{name}</IonButton>
    </div>
  );
};

export default Launcher;
