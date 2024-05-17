# Mobile_project

 ## Prequisites

 ### 1. Install chocolatey

 1. start terminal in admin mode
 2. check if Get-ExecutionPolicy is not restricted :

    Run ```Get-ExecutionPolicy```. If it returns Restricted, then run ```Set-ExecutionPolicy AllSigned``` or ```Set-ExecutionPolicy Bypass -Scope Process```.
 3. run the [script](https://community.chocolatey.org/install.ps1) installation :

    ```Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1')) ```

    if chololatey is already installed :

    ```choco upgrade chocolatey```

 ### 2. Install nodejs

 ```choco install -y nodejs```

 ### 3. Instal Java SE Developpment Kit (JDK)

 ```choco install -y microsoft-openjdk17```

 ### 4. Install and confuigure Android Studio

 1. Install [Android Studio](https://developer.android.com/studio?hl=fr)
 2. Launch and configure Android Studio by reading this [tutorial](https://docs.expo.dev/workflow/android-studio-emulator/) (emulator section is optional).
 
 Note : When adding variable environement ANDROID_HOME in the tutorial, choose System variable instead of User.

 ## Project initialisation

 ### 0. Create project (only when creating for the first time)
  <span style="color:orange;">skip this step if you cloned the project</span>

 ```npx create-expo-app@latest```

 ### 1. Install expo-dev-client
 ```npx expo install expo-dev-client```

 ### 2. Run app

 1. Run your emulator or plug device and enable usb debugger (need developper mode enabled). You can check connected devices by running this command :
   ```adb devices```
 2. run the app :
   ```npx expo run:android```


