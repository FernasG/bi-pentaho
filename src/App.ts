import inquirer from 'inquirer';
import { PopulateDatabase } from './services/PopulateDatabase';

(async () => {
  inquirer
    .prompt([{
      message: 'Choose one table to populate:',
      name: 'service',
      choices: [
        { value: 'Users' },
        { value: 'Orders' },
        { value: 'Products' },
        { value: 'Categories' },
        { value: 'Categories' }
      ],
      type: 'list'
    }])
    .then(async (answers) => {
      const { service } = answers;

      await new PopulateDatabase().callService(service);

      process.exit(0);
    })
    .catch(({ isTtyError, message }) => {
      const errorMessage = isTtyError
        ? `TTY Error: (${message})`
        : `System Error: (${message})`;
      console.log(errorMessage);
    });

})();