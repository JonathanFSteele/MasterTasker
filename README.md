# MasterTasker
TaskForce TEAM: Jonathan Steele, Zachary Morgan, Charles Choi, and Jonathan Loya
## Description:
> The Master Tasker is a web application designed by the Task Force Team to allow users to create every day Tasks that allows them to manage and keep organized what they have to do. Users will be allowed to create an account and manage their groups allowing others to have access to those tasks while able to implement and change tasks on their own. Users will be able to check off items that they have completed or add any special details to that item giving them full mobility of the creation of Tasks.
## How to Install and Implement the Master Tasker:
> The Master Tasker is a user friendly system and is easy to use. Just follow these steps below to install the project.

1. To install and implement our system you have clone down this repository.
2. Then you will need to create a dbConfig.js file within the root directory of the MasterTasker
  * Add the Following Code Below:
    ```javascript
      module.exports = {
      host: "*WEBSITE_URL*",
      user: "*USER_NAME*",
      password: "*PASSWORD*"
    };
    ```
3. With that you can then install our dependencies.
  1. Install npm at [npmjs.com](https://docs.npmjs.com/cli/install)
  2. After installing npm you should be able to type npm install in the command prompt in the root directoy of the Master Tasker. (This will give you all the need dependencies)
  3. SKIP IF YOU DONT CARE ABOUT GRUNT: To get grunt working you need to do the following:
    * create a file called secret.json and stick it in your Certs Folder.
    * in the secret.json put in:
    ```javascript
    {"CertPassphrase":"*PassphraseToWebAccount*"}
    ```
4. After your dependencies are working you should be able to type node server into your command prompt at the root directory. -- this will run your local host
5. To access your local host just type in localhost:3000 and it will bring you to a login page.
6. And then you are clear to edit and mess around to your hearts content.

## Walk through of the Site Files:
> Now what is our site made up of? How is it organized?

Well our site is organized with 2 major folders, and 4 important root files:
1. Public folder - The public folder is where all of the front side elements of the website goes. Nothing server side or Database side happens here. This side will make calls to the server but the rest in here is to help with the user friendly environment.
2. server folder - The server folder holds all of the server controllers which are made up of POSTS, GETS, & DELETES to the Database.
3. .gitignore - This is to help ignore files that are not needed for the git repository.
4. Gruntfile.js - This is for the command - grunt deploy -  &  - grunt clean -
5. package.json - This is where all of our dependencies are shown so then when npm install is sent through the command prompt all of the dependencies in this file will be downloaded.
6. server.js - This is where all of the server controllers are organized and placed. this is the main file that runs the server of the website using nodejs.
Inside the Public Folder:
  1. The Public folder has images, scripts, styles, vendors, views, and an app.main.js, config.route.js, favicon, and index.html.
    1. images - A folder where images used on the website is stored
    2. scripts - The folder where all frontside controllers, directives, services, and vendors go
      1. Controllers - is the folder where all of the controllers for the html files goes
      2. Directives - *EMPTY* Used for any future directives with this site
      3. Services - Is where the services for this site goes
      4. Vendor - Is where all the vendor files goes
    3. styles - The folder where CSS styles are stored
    4. vendors - where files connected to vendors are stored
    5. views - Where the html files are stored for the website
    6. app.main.js - is the main frontside controller for index.html
    7. config.route.js - is the file that keeps all of the html and frontside controllers organized and in check.
    8. favicon - is the icon that shows in the tab area on your browser
    9. index.html - is the main html file, all views are connected through this one.

And that is our site from the inside now what does our site look like and do?

## Walk through of Our Site:
> Now What is our site? Here are the steps on what are web application is capable of.

1. First thing you should come across is a Login Page where you can either Login in or SignUp.
  * If you forgot your password you can click on the forgot Password which will lead you through a series of steps.
  * before you Login you can click the remember me so you don't always have to log your user information.
  * The SignUp will go to a form which you could fill out to create an account; It will bring you back to the Login page after you fill out the form, you then can login with the new created account.
2. After you first login you will be greeted by the Tasks Page, This is where you will create tasks. But first you need to create a Group.
3. To create a group click on the Groups on the navigation bar in the top right of your screen to get to the Group Creation Page.
4. Now on the Group creational page, you can now create a group by clicking on the big blue Add New Group button on the upper left part of the page.
5. This should show a popup where you can fill out the name of your group. After you fill out the Name it will bring you to a details page for your newly created Group.
6. On the Group Details Page, you may Change your Group name if you wish, and or add a description.
7. You may add friends to your group that exist either already apart of the site or do not even exist within the site. Use proper emails and invite away.
8. You may also Add Tags that you will be able to use for Tasks within the Group. You can give the tag a color and a proper name that makes sense to you.
9. Lastly you can save changes or delete your group. You may also go back which would cancel any unsaved changes.
10. Now after you have created your group you should see your group inside of your Groups table. You can always edit the group by selecting it if you deem necessary.
11. You can now head back to the Tasks page by clicking Tasks in the Toolbar above.
12. On the Tasks page you can now add a task by clicking Add New Task
13. A pop up should show where you can fill in your new New Tasks Item.
14. After filling that out you should be led to the Tasks Details Page where you can fill out your Tasks Details. Its very similar to the Group Details, but you can now add users that are in your group to the task. You can also attach one of your tags in the Group or add a location.
15. Click save changes
16. And that is it, You can filter out your tasks by choosing any of your created groups in the dropdown or add more by pressing the plus. You can click on your name if you wish to logout or change any of your account information.
17. And that is it enjoy our Task Master.
