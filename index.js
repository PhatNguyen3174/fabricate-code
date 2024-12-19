const jsonfile = require('jsonfile');
const simpleGit = require('simple-git');
const random = require('random');
const moment = require('moment');

const markCommit = async (date) => {
  const data = { date: date.toISOString() };
  await jsonfile.writeFile(path, data);

  const git = simpleGit();
  await git.add([path]);
  await git.commit(date.toISOString(), { "--date": date.toISOString() });
};

const makeCommits = async (n) => {
  const git = simpleGit();

  for (let i = 0; i < n; i++) {
    const randomWeeks = random.int(0, 54 * 4);
    const randomDays = random.int(0, 6);

    const randomDate = moment("2019-01-01")
      .add(randomWeeks, "weeks")
      .add(randomDays, "days");

    if (isValidDate(randomDate)) {
      console.log(`Creating commit: ${randomDate.toISOString()}`);
    }
  }
};

const isValidDate = (date) => {
  return date.isValid();
};

// Call makeCommits with a number
makeCommits(10);