## Usage

To install the project, follow these steps:

1. Install the required dependencies:

   ```
   yarn install
   ```

2. Prebuild the app with expo before running:
   ```
   yarn prebuild
   ```

```
yarn android
# yarn start
# yarn ios
```

### tvOS troubleshooting

If you get the error

```
CommandError: Failed to build iOS project. "xcodebuild" exited with error code 65.
To view more error logs, try building the app with Xcode directly, by opening /Users/thomasrenaud/Desktop/SpaceNavigation/react-tv-space-navigation/packages/example/ios/hoppixTv.xcworkspace.

Command line invocation:
    /Applications/Xcode.app/Contents/Developer/usr/bin/xcodebuild -workspace /Users/thomasrenaud/Desktop/SpaceNavigation/react-tv-space-navigation/packages/example/ios/hoppixTv.xcworkspace -configuration Debug -scheme hoppixTv -destination id=B14D0E77-99C4-486F-8096-6584A23C9476

User defaults from command line:
    IDEPackageSupportUseBuiltinSCM = YES
```

please delete the .xcode.env.local in your ios directory, and run the `yarn ios` command again.

### Running the Web Application

Hoppix also supports running as a web application. To run the web version of the project, use the following command:

```
yarn web
```

This will start a development server using Webpack and serve the application in your default web browser.

## Handling Remote Control

In order to use Spatial Navigation in the Web Application or TV Application, you must configure the remoteControlManager to map your keyboard or remote keys to LRUD Directions.

See [Remote Control](./src/components/remote-control/) for how to manage Platform Specific remote controls.

## Build

```shell

yarn install

yarn prebuild

yarn preview
```
