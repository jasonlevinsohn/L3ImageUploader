# L3ImageUploader
Ionic App for Uploading Images to LlamasOnTheLooseFarm.com

### Install Cordova and Ionic
npm install -g cordova ionic

Follow instructions on ionic website:
http://ionicframework.com/getting-started/

### Install ngCordova
- these are extensions on top of the Cordova API to build the angular way

In the project root directory use bower to install ngCordova
bower install ngCordova

Follow the instructions on the ngCordova site for the rest
http://ngcordova.com/docs/install/


### Android SDK
Make sure you have the Android SDK installed.
Download the latest Android SDK and unpack it.
Our is in ~/Documents/Android-IDE/android-sdk-macosx/

Be sure to put the tools folder and platform-tools folder in your path:
We are using Fish so its in config.fish

# Path for building PhoneGap Android apps
set -x PATH ~/Documents/Android-IDE/android-sdk-macosx/platform-tools $PATH
set -x PATH ~/Documents/Android-IDE/android-sdk-macosx/tools $PATH

Run the Android SDK Tools, by running the executable ‘android’ in the tools folder of the package.
Check the packages needed:
Tools
     Android SDK Tools
     Android SDK Platform Tools
     Android SDK Build Tools

Android API 22
     SDK Platform
     You need one System Image:  I chose Intel x86 Atom_64 System Image

Extras
     Android Support Repository
     Android Support Library
     Intel x86 Emulator Accelerator (HAXM installer) - only if you chose the Intel Processor

Click Install Packages and another window will pull up.
Double click each one to accept the T&C’s and install them

After all this you still need to install the HAX emulator.
In the extras folder in the SDK
