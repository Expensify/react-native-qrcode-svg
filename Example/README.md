# QRCode SVG Example App

## Step 1: Install dependencies

Install dependencies in both root and Example directories. 

```bash
npm install && cd Example
yarn install
```

## Step 2: Start Example Native Application

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command:

```bash
yarn start
```

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your Example app directory .
Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
yarn android
```

### For iOS

```bash
cd ios && pod install && cd ..
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

## Step 3: Start Example Web Application

Just run

```bash
yarn web
```

and enter the `http://localhost:8080/`.
