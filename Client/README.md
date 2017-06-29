#Introduction 
The Transact Client UI is the front-end web application that the users interact with. It consists of the UI web application that serves the HTML, CSS and JavaScript to the browser, and the API Gateway services that proxy communication to other APIs for the persistence and retrieval of data.

#Getting Started
# Global Development Machine Setup #
**Node JS setup**

- Download and install the window installer version at this link [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

**Locall IIS Setup**

Navigate to C:\Windows\System32\drivers\etc

Edit the hosts file to include => 127.0.0.1 localtitan.fcsamerica.com 

![](./Documentation/localhostsfile.png) 

ensure local IIS includes localtitan binding:

![](/Documentation/EditBindings.png) 


Add site binding

![](/Documentation/SiteBindings.png)

Edit site binding to configure as pictured

![](/Documentation/AddSiteBinding.png)

Now, you should be able to navigate to https://localtitan.fcsamerica.com/<application> on your development machine.

****

**Install TeamJedi Cert**

Instructions and cert are located at:
\\appdevnas\appdevnas\Team Jedi\ServiceFabric\LocalhostSSL

# Visual Studio 2015 Setup #

**Install update 3 at this link:**  [https://www.microsoft.com/net/core#windowsvs2015](https://www.microsoft.com/net/core#windowsvs2015)

**Install TypeScript for VS2015 Update 3**
- Go to [https://www.microsoft.com/en-us/download/details.aspx?id=48593](https://www.microsoft.com/en-us/download/details.aspx?id=48593) to download and install the necessary typescript one for VS2015 Update 3 

**Service Fabric**
Download Microsoft Web Platform Installer [[https://www.microsoft.com/web/downloads/platform.aspx?lang=](https://www.microsoft.com/web/downloads/platform.aspx?lang= "Web Installer")]
Launch Web Installer and search for Service Fabric SDK and Tools.
Download the option marked SDK and Tools.

**Resharper**

- Please make sure to update Resharper to the latest version to enable better intellisense for Typescript in Visual Studio by accessing "Resharper->Help->check for updates".

**Visual Studio Node Configuration**

- Since Visual Studio 2015 comes bundled with it’s own version of Node 5.*, located here;   “C:\Program Files (x86)\Microsoft Visual Studio 14.0\Web\External”, 
please add the following change to redirect VS to the latest version of node installed locally; You can access Tools->Options->Projects and solutions->External Web Tools and add the highlighted entry as the 1st item in the list. 
This is simply for consistency so that everything is using the latest version of Node. 

	![](/Documentation/VS_RedirectNode.png) 

**Task Runner Setup**

- Install the NPM Task Runner Extension
![](/Documentation/TaskRunner.png) 

- Installing the NPM Task Runner will allow you to build and launch Angular sites from within Visual Studio

	![](/Documentation/TaskRunnerTab.png)

**Wallaby Setup**

- Install Wallaby either by Tools->Extension & Update as screenshot below:

![](/Documentation/vs2015Wallaby.png) 

- OR alternatively install Wallaby extension for VS2015 at this link: [https://wallabyjs.com/docs/intro/install.html#nodejs-1](https://wallabyjs.com/docs/intro/install.html#nodejs-1)

- Copy the settings.json file from [\\\\\\appdevnas\appdevnas\Team Jedi\POC\Wallaby](\\appdevnas\appdevnas\Team%2cJedi\POC\Wallaby) or it's contents if the file exists already to the following directory 

		C:\Users\{user}\.wallaby\

- Upon opening the Transact NGT WebUI project, you will be prompted to enter the Wallaby license. You can access [\\\\\\appdevnas\appdevnas\Configuration\WallabyLicenses.xlsx](\\\\\\appdevnas\appdevnas\Configuration\WallabyLicenses.xlsx) and obtain a license key from the spreadsheet and be sure to add your email address next to the license so that we know the license is in use. 

- Right click on the wallaby.js file and click start.

- Result should look like the screenshot below:

![](/Documentation/resultVS2015.png)
 
**Build**

Currently Service Fabric only supports x64 bit, so make sure that when building the project debug settings are set to x64 like the following:


![](/Documentation/Debug_x64pic.png)



****

# Visual Studio Code Setup #

- Install VSCode at this link: [https://code.visualstudio.com/download](https://code.visualstudio.com/download)
- Install Wallaby either by Extensions as shown in the screenshot below:

![](/Documentation/vsCodeWallaby.png) 

- OR alternatively install Wallaby extension for VSCode at this link: [https://wallabyjs.com/docs/intro/install.html#nodejs-1](https://wallabyjs.com/docs/intro/install.html#nodejs-1)
 
- Upon opening your first wallaby based project, you will need to enter the license key when prompted. You can access [\\\\\\appdevnas\appdevnas\Configuration\WallabyLicenses.xlsx](\\\\\\appdevnas\appdevnas\Configuration\WallabyLicenses.xlsx) and obtain a license key from the spreadsheet and be sure to add your email address next to the license so that we know the license is in use. 

- Access the command Pallete and select Wallaby->Start

- Result should look like the screenshot below:

![](/Documentation/resulvVsCodet.png)

****

**In addition below are some vsCode extensions for developer productivity**

-	Angular2 TypeScript Snippets
-	AutoImport 
-	Path Intellisense

![](/Documentation/productivit.png)

****
# General Tips/Troubleshooting #

- Currently due to the nature of npm package hosting, in some instances, there are multiple redirects in package repositories. These redirects are flagged by the network firewall rules and prevented. This stops package installation. To get around this issue, you may need to switch to the guest WiFi network to install packages. 

- If you run into errors regarding webpack, it may be that you do not have webpack installed or you do not have it installed globally. Open a command prompt and run the command **npm install -g webpack**

- If you run into unexpected npm install failures, try deleting the project's **node_modules** folder and re-running the **npm install** command to install packages.

- If after installing an extension, the extension appears to not be working. Try restarting the IDE to reload the extension.

- Ensure you build the Angular application before trying to launch in through Visual Studio by running the build process in the NPM Task Runner as illustrated below.

![](/Documentation/TaskRunnerBuild.png)

***
#Service Fabric Updates

TODO: Add images with next merge to master.

- The Service Fabric SDK version may be updated from time to time to accomodate framework improvements or integrate new functionality. The easiest way to update the Service Fabric SDK locally is to use the Web Platform Installer.

- If you do not have the Web Platform Installer installed on your machine, search for it on and download it from the internet. 

- Open the Web Platform Installer. You should be able to type Platform into your Windows start menu search to find the application.

![](/Documentation/WPI_Screen1.png)

- Click on Products and then in the search box, type Fabric.

![](/Documentation/WPI_Screen2.png)

- Locate the Service Fabric version you want from the search results and install it. Simple as that.

#Build and Test
TODO: Describe and show how to build your code and run the tests. 

#Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

If you want to learn more about creating good readme files then refer the following [guidelines](https://www.visualstudio.com/en-us/docs/git/create-a-readme). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)