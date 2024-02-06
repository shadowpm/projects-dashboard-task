# Projects dashboard overview

This application consists of a list of projects; each project has: a title, start and end date, an accordion that when unfolded shows a list of users full names and device serial numbers, and an edit button.

On edit page you can see three tabs:
General project data, users table, and devices table. Users and devices can also be deleted.

<b>Implementation duration:</b> about 1 day (an hour of that deciding on ui and ux element while scrolling on Material-ui, 4-5 hours of consistant implementation)


## Table of Contents
- [Installation](#installation)
- [Data calculations](#data-calculations)
- [Potential missing features](#Potential-missing-features)
- [UI, UX decisions, accessibility](#ui-ux-decisions-accessibility)
  - [Accessibility](#accessibility)
- [Available Scripts](#available-scripts)
  - [`npm start`](#npm-start)
  - [`npm test`](#npm-test)
  - [`npm run format`](#npm-run-format)

## Installation

To run this project, make sure you have Node.js and npm installed on your machine. You can download them from https://nodejs.org/.

At the time this project is compatible with node v20.5.1, and npm version 9.8.0>, so it is recommended to have the same versions installed to avoid further complications.

After having this requirements in place, you may run `npm install`, and then you can start te project by running `npm start`:

```console
npm install
npm start
```

Now you can open http://localhost:3000 to view it in the browser.

## Data calculations:

The data source of this project, is from a few separate JSON files.

What has been done in terms of state management, is to add device and user ids, in the form of array of numbers, to the project data.
Also both device data and user data have been transformed to hash map, to make the data retrieval more efficient.

### Potential missing features

What I have in mind for completing this dashboard, is to have a separate users table (with the possiility to add and edit user there), and also a devices dashboard with the possibility to add or edit devices.

Also on top of that, a separate form for adding new projects as well.

That all would make this projects dashboard complete. My Estimation for adding these features would be an exttra 4 hours.

## UI, UX decisions, accessibility

Making an accessible UI, and an intuitive and user friendly UX, is always at forefront of my priorities.
The page design is simple, and responsive.

### Accessibility

For the page accessibility, high contrast colors have been used.
Each textfield has a label, name and id, and placeholder.
At the end, I used chrome lighthouse tool, to check the page accessiibility score.

Here are some accessibility resources that I utilized:

* https://www.a11yproject.com/posts/how-to-write-accessible-forms/
* https://www.w3.org/WAI/tutorials/forms/instructions
* https://a11y-style-guide.com/style-guide/section-cards.html


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run format`

Runs Prettier through all files (except node_modules, build, and dist) to assure uniform syntax.

Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary. By running this command, you will format the code so that it's all the way syntactically consistant.
