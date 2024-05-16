# Mobile_project

 ## Project Initialisation

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
 2. Launch and configure Android Studio by reading this [tutorial](https://docs.expo.dev/workflow/android-studio-emulator/) 
