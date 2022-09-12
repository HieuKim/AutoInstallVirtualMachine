echo "Running vagrant file"

vagrant init nhalm/centos7-gui
vagrant up
powershell -Command "Invoke-WebRequest -UseBasicParsing https://clusterlabs.org/pacemaker/doc/deprecated/en-US/Pacemaker/1.1/html/Clusters_from_Scratch/images/Installer.png -OutFile InitialScreen.png"
exit 0