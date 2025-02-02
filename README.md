# NatureNests App

## English Version

### Project Description
NatureNests is a fictional rental portal aimed at wildlife enthusiasts, offering cabins of high quality located in nature. The app allows users to search and filter available cabins based on specific criteria.

This project is built as a Single Page Application (SPA) using React with TypeScript for the frontend, and the backend is developed with Express (Node.js) using JavaScript. The database is managed with MongoDB and Mongoose.

Users can register and log in, with their credentials securely stored in local storage. When a user registers, their password is hashed for security before being stored in the MongoDB collection. Upon successful login, a JSON web token (JWT) is created and stored in local storage, allowing users to authenticate and authorize their access to manage their bookings. The application also implements backend form validation with express-validator to ensure that user inputs meet specified criteria before processing.

The app provides the following features:
- Search filter for available cabins by text input and date selection.
- Sorting options based on price (ascending and descending), name, and popularity.
- Integration of the Google Maps JavaScript API to display cabins on a map.

Both the frontend and backend are deployed, with the frontend hosted on Netlify and the backend on Heroku. You can check out the deployed version of the app here: [NatureNests - Explore Now!](https://nature-nests.netlify.app)

### Test Account
A test account is available for users to log in and explore the app. You can use the following credentials to access the application:
- **Email**: max.mustermann@web.de
- **Password**: abcdef

Additionally, users also have the option to create their own accounts.

### Technologies Used
- **Frontend**: React, TypeScript, React Router, Tanstack Query, Tailwind CSS, Framer Motion, Google Maps JavaScript API
- **Backend**: Node.js, Express, MongoDB with Mongoose, bcryptjs, express-validator, jsonwebtoken
- **Hosting**: Frontend (Netlify), Backend (Heroku)

### License
This project is licensed under the MIT License. See the LICENSE file for more details.

---

## Deutsche Version

### Projektbeschreibung
NatureNests ist ein fiktives Vermietungsportal, das sich an Naturliebhaber richtet und hochwertige Hütten in der Natur anbietet. Die App ermöglicht es Nutzern, verfügbare Unterkünfte nach spezifischen Kriterien zu suchen und zu filtern.

Dieses Projekt wurde als Single Page Application (SPA) mit React und TypeScript für das Frontend entwickelt. Das Backend ist mit Express (Node.js) in JavaScript erstellt. Die Datenbank wird mit MongoDB und Mongoose verwaltet.

Benutzer können sich registrieren und anmelden, wobei ihre Anmeldedaten sicher im lokalen Speicher gespeichert werden. Wenn sich ein Benutzer registriert, wird sein Passwort aus Sicherheitsgründen verschlüsselt, bevor es in der MongoDB-Sammlung gespeichert wird. Nach erfolgreicher Anmeldung wird ein JSON-Webtoken (JWT) erstellt und im lokalen Speicher gespeichert, was den Benutzern ermöglicht, sich zu authentifizieren und ihre Buchungen zu verwalten. Die Anwendung implementiert auch eine Backend-Formularvalidierung mit express-validator, um sicherzustellen, dass die Benutzereingaben vor der Verarbeitung bestimmten Kriterien entsprechen.

Die App bietet die folgenden Funktionen:
- Suchfilter für verfügbare Hütten durch Texteingabe und Datumswahl.
- Sortierungsoptionen basierend auf Preis (auf- und absteigend), Name und Beliebtheit.
- Integration der Google Maps JavaScript API zur Anzeige von Hütten auf einer Karte.

Das Frontend wurde mit Netlify und das Backend mit Heroku gehosted. Sie können die aktuelle Version der App hier ausprobieren: [NatureNests - Jetzt Entdecken!](https://nature-nests.netlify.app)

### Test-Account
Ein Test-Account steht zur Verfügung, damit Benutzer sich anmelden und die App erkunden können. Sie können die folgenden Anmeldedaten verwenden, um sich einzuloggen:
- **E-Mail**: max.mustermann@web.de
- **Passwort**: abcdef

Darüber hinaus haben Benutzer die Möglichkeit, eigene Konten zu erstellen.

### Verwendete Technologien
- **Frontend**: React, TypeScript, React Router, Tanstack Query, Tailwind CSS, Framer Motion, Google Maps JavaScript API
- **Backend**: Node.js, Express, MongoDB mit Mongoose, bcryptjs, express-validator, jsonwebtoken
- **Hosting**: Frontend (Netlify), Backend (Heroku)

### Lizenz
Dieses Projekt ist unter der MIT-Lizenz lizenziert. Weitere Einzelheiten finden Sie in der LICENSE-Datei.
