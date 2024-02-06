# Payslips - a crossplatform app

## Built With:
```
React
Typescript
Vite
Capacitor
Tailwind CSS
shadcn/ui
```

## Minimum Requirements
### Common
```
node 18
```

### Running iOS
```
xcode
simulator
```

### Running Android
```
java 17
android studio
emulator
```
Must set the android home env var: `export ANDROID_SDK_ROOT=/path/to/Android/Sdk`

## Running the app
### Web
```
npm install
npm run dev
```
Access the app in your browser at `localhost:3000` (or change the port to your liking in `vite.config.ts`)

### Android
```
npm install
npm run build
npx cap run android
```
At this point, the capacitor cli should be able to check for your configured emulators if the env path to the android sdk is set correctly.

### iOS
```
npm install
npm run build
npx cap run ios
```
To enable hot reload (worked for me only for iOS): set the `config.server.url` property in your `capacitor.config.ts` to the appropriate address, make sure you are already running the web app in dev mode (`npm run dev` in another shell session) and then run `npx cap sync` and `npx cap run ios`.

## Tested platforms

### macOS
- Web
  - Safari
  - Chrome
  - Firefox
- iOS simulator
  - iOS 15
  - iOS 15 plus
  - iOS 15 pro
  - iOS 15 pro max
  - iOS SE (3rd gen)
  - iPad 10th gen
- Android emulator
  - pixel 3a

### Linux
- Web
  - Chrome
  - Firefox
- Android emulator
  - pixel 3a

## Additional Notes

### Capacitor & ios/ and android/ folders

If for whatever reason we delete `ios/` or `android/` folders, we need to reinitialize them with `npx cap add ios` and/or `npx cap add android` and then run `npx cap sync` to sync the web app with the native platforms.
In addition, since we are using the [Capacitor Filesystem plugin](https://capacitorjs.com/docs/apis/filesystem), we need to reconfigure the permissions for each native platform as per documentation. Again, would need to `npx cap sync` after making changes to the native platforms.

### Downloaded image locations
On iOS, the downloaded images can be accessed on the `Files > On My iPhone > payslips-vite` directory, or on the `Recent` tab of the `Files` explorer.
On android, there seems to be an issue with how Capacitor builds the `Documents` path, so I could only access the images through the `Files` > `Recent` in the sidebar.
