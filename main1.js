const { app, BrowserWindow, ipcMain, nativeTheme,shell  } = require('electron')
const path = require('path')

const exec = require('child_process').exec;
const fs = require('fs')  
async function execute(command, callback) {
    exec(command, (error, stdout, stderr) => { 
        callback(stdout); 
    });
    // shell.loadFile('RunBackground.bat');
};


async function getSystemOS(){
    var opsys = process.platform
    if (opsys == "darwin") {
        opsys = "MacOS";
    } else if (opsys == "win32" || opsys == "win64") {
        opsys = "Windows";
    } else if (opsys == "linux") {
        opsys = "Linux";
    }
    console.log(opsys) // I don't know what linux is.
    return opsys
  }


 


function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })

 async function checkExistsWithTimeout(filePath, timeout) {
    return new Promise(function (resolve, reject) {

        var timer = setTimeout(function () {
            watcher.close();
            reject(new Error('File did not exists and was not created during the timeout.'));
        }, timeout);

        fs.access(filePath, fs.constants.R_OK,  function (err) {
            if (!err) {
                clearTimeout(timer);
                watcher.close();
                resolve();
            }
        });

        var dir = path.dirname(filePath);
        var basename = path.basename(filePath);
        var watcher = fs.watch(dir, function (eventType, filename) {
            if (eventType === 'rename' && filename === basename) {
                clearTimeout(timer);
                watcher.close();
                resolve();
            }
        });
    });
}


  win.loadFile('index.html')
  
 function runFile(filePath){
    win.loadFile(filePath);
}


  ipcMain.handle('Os-Information:checkOS', () => {
    var OSInfor = getSystemOS()
    return OSInfor
  })
  ipcMain.handle('Open-Script:OpenShellFile', async () => {
    
    execute('RunBackground.bat', (output) => {
        console.log(output);
        return output;
    });
    const myFile = "InitialScreen.png"

    var IsFile =  checkExistsWithTimeout(myFile, 1000000);
    IsFile.then(
         function(value) {  
            console.log("Load File!!!");
            setTimeout(function() {
                runFile(myFile);
            }, 4000);},
        async function(error) { 
            await win.loadURL("https://github.com") }
    )
    
  })

  
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})