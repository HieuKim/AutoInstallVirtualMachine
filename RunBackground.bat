set "params=%*"
cd /d "%~dp0" && ( if exist "%temp%\getadmin.vbs" del "%temp%\getadmin.vbs" ) && fsutil dirty query %systemdrive% 1>nul 2>nul || (  echo Set UAC = CreateObject^("Shell.Application"^) : UAC.ShellExecute "cmd.exe", "/k cd ""%~sdp0"" && %~s0 %params%", "", "runas", 1 >> "%temp%\getadmin.vbs" && "%temp%\getadmin.vbs" && exit /B )

@echo off

:: This is a comment
echo "Start Running"
::powershell -Command "Invoke-WebRequest -UseBasicParsing https://unsplash.com/photos/ceCISmZkDXg/download?force=true -OutFile myphone.png"
powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'));"
powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force;choco install virtualbox -y"
powershell -Command "Set-ExecutionPolicy Bypass -Scope Process -Force;choco install vagrant -y"
powershell -Command "refreshenv"

@REM powershell -Command "vagrant plugin install vagrant-winnfsd"

@REM powershell -Command "vagrant plugin install vagrant-vbguest"


RunVagrant.bat
::vagrant init nhalm/centos7-gui
::vagrant up

powershell -Command "Invoke-WebRequest -UseBasicParsing https://clusterlabs.org/pacemaker/doc/deprecated/en-US/Pacemaker/1.1/html/Clusters_from_Scratch/images/Installer.png -OutFile InitialScreen.png"

echo "Done"
exit 0
@REM EXIT /B