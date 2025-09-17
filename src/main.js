/* eslint-disable no-undef */
import { app, BrowserWindow, protocol, ipcMain, dialog } from 'electron';
import fs from 'node:fs';
import * as fsp from 'node:fs/promises';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import mime from 'mime';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    minWidth: 800,
    height: 600,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // handler for file dialog
  ipcMain.handle('dialog:openFiles', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        {
          name: 'Images',
          extensions: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'svg'],
        },
      ],
    });

    if (result.canceled) return [];

    const tempDir = path.join(app.getPath('temp'), 'UploadedImages');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const copiedFiles = [];
    for (const filePath of result.filePaths) {
      const fileName = path.basename(filePath);
      const destPath = path.join(tempDir, fileName);
      fs.copyFileSync(filePath, destPath);
      copiedFiles.push(destPath);
    }

    return copiedFiles;
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  protocol.handle('webify', async (request) => {
    const url = new URL(request.url);
    const filePath = decodeURIComponent(url.pathname);

    try {
      const data = await fsp.readFile(filePath);
      const mimeType = mime.getType(filePath) || 'application/octet-stream';
      return new Response(data, {
        headers: { 'Content-Type': mimeType },
      });
    } catch (err) {
      console.error('Failed to load:', filePath, err);
      return new Response('File not found', { status: 404 });
    }
  });
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
