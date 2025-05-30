# 🚀 Project Setup

Follow these steps to install and run the project on your local machine or a new server:

## 1. 📦 Clone the Repository

```bash
git clone https://github.com/wmmead/friendsapp.git
cd your/project/directory
```

## 2. 📁 Install Dependencies

Use `npm ci` for a clean, reproducible install using the `package-lock.json` file:

```bash
npm ci
```

If you plan to actively develop and may add or update packages, you can use `npm install` instead:

```bash
npm install
```

## 3. Set Up the Database

Use the Back4App backend as a service to set up a database. Make a class called 'friends' (all lower case), and add the following fields as strings. The * indicates the fields should be set to required. The free tier is fine for testing and low usage.

```back4app
lname*
fname*
email*
facebook
twitter
instagram
linkedin
```

You can create dummy records for practice or import the provided CSV file with a few records so that you have a little data.

## 4. 🔐 Environment Variables

Create a `.env` file in the root directory with your Back4App credentials, or if installing on through a cPanel app wizard, add these two environment variables:

```env
APP_ID=your-app-id-here
JS_KEY=your-javascript-key-here
```

(Optional) Add a `.env.example` file to your project to help others know what variables are needed.

## 5. ▶️ Run the App

Start the server with:

```bash
node app.js
```

For development, use `nodemon` (if installed):

```bash
npx nodemon app.js
```

## 6. 🌐 Access Your App

Visit the app in a browser:

```browser

http://localhost:3000
```

Or replace `localhost` with your production domain or IP if hosted on a server.
