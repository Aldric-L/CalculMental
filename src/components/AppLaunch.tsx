import React from 'react';
import { AppLauncher, AppLauncherOptions  } from '@ionic-native/app-launcher';

const options: AppLauncherOptions = {
}

class AppLaunch {
    constructor(private app: string) { options.packageName = app; this.launch(); }

    launch(){
        AppLauncher.canLaunch(options)
        .then((canLaunch: boolean) => AppLauncher.launch(options))
        .catch((error: any) => console.error(options.packageName + ' is not available'));
    }
}
export default AppLaunch;