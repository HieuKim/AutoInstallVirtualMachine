  
// async function activateDarkMode() {
//     // code to be executed
//     const isDarkMode = await window.darkMode.toggle()
//     document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
//   }

//   document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
//     activateDarkMode()
//   })
  
//   document.getElementById('reset-to-system').addEventListener('click', async () => {
//     await window.darkMode.system()
//     document.getElementById('theme-source').innerHTML = 'System'
//   })

document.getElementById('activate-btn').addEventListener('click', async () => {
  console.log("Checking activate");
  if (window.confirm("Do you really want to activate?")) {
      const myOS = await window.OsInformation.checkOS();
      if(myOS == "Windows"){
        await window.OpenScript.OpenShellFile();
        // console.log(myOS);
      }
  }
})