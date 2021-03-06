# Glofox Lazy Loading Test Application

This application is designed to fulfil the requirement of the Glofox dev test based [here](https://bitbucket.org/glofox/app-recruitment).
As an experiement I have, for the first time, userd React-native to create a cross platform app to fulfil the requiemnts of the task. 

The lazy loading portion of the task is achieved uing the FlatList component native to React-native. The component state stores the current data page. By binding a callback to the onEndReached method this allowes us to update the state for a new page and request the new data in a handleLoadMore function. 

The Search functionality is limited due to the currnet requirement to match exact names are addresses. 

To install a the current Android version download and install the following [APK File](https://s3-eu-west-1.amazonaws.com/fiachramatthewsfileshare/app-release.apk). 

|![alt-text-1](Screenshots/List.png "Member List") | ![alt-text-2](Screenshots/Search.png "Search") |

## Setup

1. **Clone the repo**

  ```
  $ git clone https://github.com/fiachra/GlofoxMembers-RN
  $ cd GlofoxMembers-RN
  ```

2. **Install dependencies**:

  ```
  $ npm install
  ```

3. **Enviromental Setup**

If you have previously developed any React-native apps you can skip this step otherwise follw the instrctions laid out inder the "Building projects with Native code" tab that the following [link](https://facebook.github.io/react-native/docs/getting-started.html)

4. **Running on Android**:

  ```
  $ react-native run-android
  ```

5. **Running on iOS (macos only, XCode Required):**

  ```
  $ react-native run-ios
  ```
