import {
  app,
  BrowserWindow,
  Tray,
  Menu,
  Notification,
  clipboard,
  ipcMain,
  globalShortcut,
  dialog
} from "electron";
import pkg from "../../package.json";

// const path = require('path')
// const shell = require('electron').shell

const PDFWindow = require('electron-pdf-window')

let isQuit = false;

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\");
}

let mainWindow;
let tray;
let contextMenu;
const winURL =
  process.env.NODE_ENV === "development"
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createTray() {
  const menubarPic =
    process.platform === "darwin"
      ? `${__static}/menubar.png`
      : `${__static}/menubar-nodarwin.png`;
  tray = new Tray(menubarPic);
  contextMenu = Menu.buildFromTemplate([
    {
      label: "关于审计平台",
      click() {
        dialog.showMessageBox({
          title: "BoleanGuard",
          message: "BoleanGuard",
          detail: `版本: ${pkg.version}\n`
        });
      }
    },
    {
      label: "打开",
      click() {
        if (mainWindow === null) {
          createWindow();
          mainWindow.show();
          mainWindow.maximize();
        } else {
          mainWindow.show();
          mainWindow.maximize();
        }
      }
    },
    {
      label: "退出",
      click: function() {
        isQuit = true;
        app.quit();
        app.quit(); // 程序设定关闭为最小化，所以调用两次关闭，防止最大化时一次不能关闭
      }
    }
  ]);
  // 设置此托盘图表的悬停提示内容
  tray.setToolTip("木链安全审计平台");

  tray.on("right-click", () => {
    tray.popUpContextMenu(contextMenu);
  });
  tray.on("click", () => {
    if (mainWindow === null) {
      createWindow();
      mainWindow.show();
      mainWindow.maximize();
    } else {
      mainWindow.show();
      mainWindow.maximize();
    }
  });
}

let useDirection = null;

ipcMain.on("openUseDirections", (event) => {
  let path_ = app.getAppPath();
  path_ = path_.split("\\").join("/");
  Menu.setApplicationMenu(null);//隐藏菜单
  if (useDirection) {
    if (useDirection.isMinimized()) {
      useDirection.restore(); // 窗口从最小化恢复时触发
    }
    useDirection.show();
    useDirection.focus();
  }else{
    let options = {
      width: 838,
      height: 600,
      icon:`${__static}/icon.ico`,
      title:'BOLEANGUARD工控安全审计平台',
      autoHideMenuBar:true,
      webPreferences: {
        plugins: true
      }
    };
    useDirection = new PDFWindow(options);
    useDirection.loadURL(`file:///${path_}/static/BoleanGuard.pdf`);
  }
  
  useDirection.on('closed', () => {
    useDirection = null;
  })
  event.sender.returnValue = false;
})


function createWindow() {
  /**
   * Initial window options
   */
  const options = {
    height: 1040,
    width: 1920,
    show: false,
    frame: false,
    resizable: false,
    title: "BoleanGuard",
    vibrancy: "ultra-dark",
    transparent: true,
    titleBarStyle: "hidden",
    webPreferences: {
      backgroundThrottling: false
    }
  };
  if (process.platform === "win32") {
    // options.show = true;
    options.frame = false;
  }
  mainWindow = new BrowserWindow(options);
  mainWindow.loadURL(winURL);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    mainWindow.maximize(); // 窗口最大化
  });

  mainWindow.on("close", function(event) {
    if (!isQuit) {
      event.preventDefault();
      mainWindow.hide();
    }
    return false;
  });
}

// 点击图标(桌面快捷方式)检查当前活动实例的个数
const isSecondInstance = app.makeSingleInstance(() => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore(); // 窗口从最小化恢复时触发
    }
    mainWindow.show();
    mainWindow.maximize();
    mainWindow.focus();
  }
});

if (isSecondInstance) {
  app.quit();
}

if (process.platform === "win32") {
  app.setAppUserModelId(pkg.build.appId);
}

app.on("ready", () => {
  createWindow();
  createTray();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (settingWindow === null) {
    createWindow();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
