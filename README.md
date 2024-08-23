# React AI Object Identifier

This template sets up a minimal React application with TypeScript and Vite, including support for AI-based object identification using TensorFlow.js. It integrates Hot Module Replacement (HMR) and offers a base ESLint configuration for better development practices.

## Features

- **React**: Frontend library for building user interfaces.
- **TypeScript**: Static type checking for JavaScript.
- **Vite**: Fast build tool with HMR.
- **TensorFlow.js**: Machine learning library for running AI models directly in the browser.
- **AI Object Identification**: Uses MobileNet model to identify objects in images.

## Setup

### 1. Install Dependencies

Ensure you have Node.js installed. Then, install the required dependencies:

```bash
npm install
```

### 2. Start the Development Server

Run the following command to start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Your application will be available at `http://localhost:3000`.

## ESLint Configuration

For production applications, it is recommended to enhance the ESLint configuration to enable type-aware lint rules. Follow these steps to update your configuration:

### 1. Configure ESLint Parser Options

Update the top-level `parserOptions` in your ESLint configuration:

```js
// eslint.config.js
import tseslint from 'eslint-config-ts';

export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

### 2. Update ESLint Rules

Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`. Optionally, add `...tseslint.configs.stylisticTypeChecked` to enforce styling rules.

### 3. Install and Configure ESLint Plugins

Install the necessary ESLint plugins:

```bash
npm install eslint-plugin-react --save-dev
```

Update your ESLint configuration to include the React plugin:

```js
// eslint.config.js
import react from 'eslint-plugin-react';
import tseslint from 'eslint-config-ts';

export default tseslint.config({
  settings: { react: { version: '18.3' } },
  plugins: {
    react,
  },
  rules: {
    // Enable React plugin recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

## Project Structure

- `src/`: Contains the source code for the application.
  - `components/`: Reusable React components.
  - `App.tsx`: Main application component.
  - `index.tsx`: Entry point for React application.
- `public/`: Static assets.
- `index.css`: Global styles.
- `vite.config.ts`: Vite configuration file.
- `tsconfig.json`: TypeScript configuration file.
- `.eslintrc.js`: ESLint configuration file.

## Usage

1. **Upload an Image**: Use the `ImageUpload` component to select and upload an image.
2. **View Object Identification**: The `CaptionDisplay` component will show the AI-generated caption based on the uploaded image.

## Development

For development, you can run:

```bash
npm run dev
```

To build the production version:

```bash
npm run build
```

## License

This project is licensed under the MIT License.
