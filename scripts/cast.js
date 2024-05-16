/* eslint-disable no-console */
const fs = require('fs');

// Get the command line arguments
const args = process.argv.slice(2);

// Component name is required
if (args.length < 1) {
  console.error('Usage: npm run cast <componentName> [<directory>]');
  process.exit(1);
}

const componentName = args[0];
const directory = args[1] || 'components';
const componentPath = `${directory}/${componentName}`;

// Create the directories recursively if they don't exist yet.
componentPath.split('/').reduce((parentPath, childPath) => {
  const currentPath = `${parentPath}/${childPath}`;
  if (!fs.existsSync(currentPath)) {
    fs.mkdirSync(currentPath);
  }
  return currentPath;
});

// Build the index file:
const indexFilename = `${componentPath}/index.ts`;
const indexContent = `import ${componentName} from './${componentName}';\n\nexport default ${componentName};\n`;
createFile(indexFilename, indexContent);

// Build the CSS file:
const cssFilename = `${componentPath}/${componentName}.module.css`;
const cssContent = `.container {\n  width: 100%;\n  height: 100%;\n}\n`;
createFile(cssFilename, cssContent);

// Build the JSX file:
const jsxFilename = `${componentPath}/${componentName}.tsx`;
const jsxContent = `import styles from './${componentName}.module.css';\n\ninterface Props{}\n\nconst ${componentName} = ({}:Props) => {\n  return (\n    <main className={styles.container}>\n      Hello World!\n    </main>\n  );\n};\n\nexport default ${componentName};\n`;
createFile(jsxFilename, jsxContent);

/**
 * Creates a file with the given filename and content.
 * @param {string} filename - The filename to create.
 * @param {string} content - The content to write to the file.
 */
function createFile(filename, content) {
  // Write the file
  fs.writeFile(filename, content, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log(`File ${filename} has been created.`);
  });
}
