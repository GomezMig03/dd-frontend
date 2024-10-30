# DD Frontend
A lightweight Frontend for the DD utility, made in [tauri](https://tauri.app/).

> [!WARNING]  
> The dd utility is powerful but potentially dangerous. It performs exactly as instructed without confirmation, which can lead to data loss, file corruption, or damage to partitions or drives. Be careful with your use of this app.

## How to develop
To develop this you'll need git, node and npm.
First start by cloning the repo
```
git clone https://github.com/GomezMig03/dd-frontend.git
```

Then execute the following commands to set it up
```
cd dd-frontend/
npm install
```

Now you can test the app
```
npm start
```

## Environment variables
This project is run using WEBKIT_DISABLE_DMABUF_RENDERER=1, which improves compatibility with Nvidia propietary drivers, feel free to delete that line (only for yourself) if you don't use them.

## To do list
- [x] Add basic DD commands
- [x] Add list of disks and CDs for better and faster user experience
- [x] Add configuration page
- [x] Add possibility to execute as sudo with pkexec
- [x] Option to work with complete drives instead of just partitions (for cloning purposes)
- [x] Migration to tauri
- [ ] Add OOTB support for nvidia propietary drivers
- [ ] Add flatpak version
- [ ] Add more languages
- [ ] Add a way to import CSVs or similar types of files to do several commands in order
- [ ] Stylize the app
- [ ] Add different themes
- [ ] Add advance options in config
- [ ] Add advance option for conversion of data (ASCII, EBCDIC, IBM, etc)
- [ ] Add an advance option for compressing with tools like xz, gzip, etc.
- [ ] Add advance option to specify block size (bs)
- [ ] Add advance option for the rest of conv options, such as noerror or sync
