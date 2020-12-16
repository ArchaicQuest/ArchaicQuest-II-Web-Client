# ArchaicQuest II - Web Client
![alt ArchaicQuest II](https://i.imgur.com/LUv3vGm.png)

This is the game client project for [ArchaicQuest II](https://github.com/ArchaicQuest/ArchaicQuest-II). 
## Current Features
- Landing page with login / registration 🧾
- Character creation wizard 🧙‍♂️
- Character management screen 🧝‍♀️
- Area Map displayed in the UI 🗺
- Chat windows to keep track of communications 💬
- Key info shown in UI Windows such as Character info, Inventory, Equipment, Quest logs ℹ
- Health, Mana, move stat bars 📊
  

ArchaicQuest II comprises of [3 projects](https://github.com/ArchaicQuest) that are required together.


| Project                                                                                     | Description                                                                                                            |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| [ArchaicQuest II](https://github.com/ArchaicQuest/ArchaicQuest-II)                          | C# game engine, contains the web API for the admin tool and the SignalR hub for the web socket connects to the client. |
| [ArchaicQuest II - Admin tool](https://github.com/ArchaicQuest/ArchaicQuest-II-Web-Admin)   | Angular 8+ web admin, allows creation and management of your MUD world.                                                |
| [ArchaicQuest II - Game Client](https://github.com/ArchaicQuest/ArchaicQuest-II-Web-Client) | Angular 8+ web client for connecting to the game and playing with others.                                              |

---

## Running the project

You need [Node.js](https://nodejs.org/en/) installed

Run `npm install` in the directory where you cloned the repo

Run `npm start` to run the project. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build for production

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Screenshots

### Landing page
![alt ArchaicQuestII Web Client](https://i.imgur.com/U6Iw7MN.png)

### Web Client
![alt ArchaicQuestII Web Client](https://i.imgur.com/40FRpwy.png)

### Character Management
![alt ArchaicQuestII Web Client](https://i.imgur.com/GnMeewc.png)

### Character Creation
![alt ArchaicQuestII Web Client](https://i.imgur.com/cFcbmwn.png)
![alt ArchaicQuestII Web Client](https://i.imgur.com/Ia9M8wt.png)

