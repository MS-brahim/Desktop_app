const electron = require('electron');
const { app, BrowserWindow } = electron

function createWindow () {
    const win = new BrowserWindow({
        width: 1000,
        height: 625,
        webPreferences: {
            nodeIntegration: true
        }
    })
    
    win.loadFile('patient/patients.html');
    
    //win.setMenuBarVisibility(false)
}


// app.on('ready', createWindow);    
app.whenReady().then(createWindow)
    
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        }
    })
    
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})