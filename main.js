// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, shell, dialog } = require("electron");
const path = require("path");
const config = require("./package.json");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: "100%",
    height: "100%",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    icon: __dirname + "/lpu-live.ico",
    name: "LPU Live",
  });

  // and load the index.html of the app.
  mainWindow.maximize();
  mainWindow.loadURL("http://10.10.0.1/");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  // createMenu();
  const menuItemps = [
    {
      label: "Main",
      submenu: [
        {
          label: "Open UMS",
          click: function openUMS() {
            // mainWindow.loadURL("https://lpu.live/ums/");
            shell.openExternal("https://ums.lpu.in/lpuums");
          },
        },
        {
          label: "Open My Class",
          click: function openMyClass() {
            shell.openExternal("https://myclass.lpu.in");
          },
        },
      ],
    },
    {
      label: "Forward",
      accelerator: "CmdOrCtrl+]",
      click: function (item, focusedWindow) {
        if (focusedWindow) {
          const wc = focusedWindow.webContents;
          if (wc && wc.canGoForward()) wc.goForward();
        }
      },
    },
    {
      label: "Back",
      accelerator: "CmdOrCtrl+[",
      click: function (item, focusedWindow) {
        if (focusedWindow) {
          const wc = focusedWindow.webContents;
          if (wc && wc.canGoBack()) wc.goBack();
        }
      },
    },
    {
      label: "Help",
      submenu: [
        {
          label: "About",
          click: function about() {
            const options = {
              title: "About",
              message: "An Desktop App build of LPU Live Chat",
              detail: `LPU WIFI LOGIN - v${config.version}`,
              icon: "./icons/logo.png",
            };
            dialog.showMessageBox(null, options, (response) => {
              if (response === "Visit Source Code") {
                shell.openExternal(
                  "https://github.com/bravo68web/lpu-live-chat"
                );
              }
            });
          },
        },
        {
          label: "Developer by Bravo68web",
          click: function madeBy() {
            shell.openExternal("https://github.com/bravo68web");
          },
        },
        {
          label: "Found a Bug !!",
          click: function openIssue() {
            shell.openExternal(
              "https://github.com/BRAVO68WEB/LPU-WIFI-LOGIN/issues/new"
            );
          },
        },
        {
          label: "Check for Update ..",
          click: function openIssue() {
            shell.openExternal(
              "https://github.com/BRAVO68WEB/LPU-WIFI-LOGIN/releases"
            );
          },
        },
      ],
    },
    {
      label: "Edit",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "selectall" },
      ],
    },
    {
      label: "Exit",
      role: "quit",
    },
  ];
  const menuStrip = Menu.buildFromTemplate(menuItemps);
  Menu.setApplicationMenu(menuStrip);

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
