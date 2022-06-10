# Vue Toast with Tailwindcss

This is a simple vue pluign toast notifier with tailwind

## Installation

```bash
npm i @k90mirzaei/vue-toast
yarn add @k90mirzaei/vue-toast
```


## Import

```js
import { createApp } from 'vue'
import App from './App.vue'

import toast from 'vue-toast'
import 'vue-toast/dist/index.css'

createApp(App).use(toast).mount('#app')

```

## Usage

```js
this.$toast.show(`Hey! I'm here`);
this.$toast.success(`Hey! I'm here`);
this.$toast.error(`Hey! I'm here`);
this.$toast.warning(`Hey! I'm here`);
this.$toast.info(`Hey! I'm here`);

// Close all opened
this.$toast.clear();
```

## Available options

The API methods accepts these options:

| Attribute     |      Type       |    Default     | Description                                                                   |
| :------------ | :-------------: | :------------: | :---------------------------------------------------------------------------- |
| message       |     String      |       --       | Message text/html (required)                                                  |
| type          |     String      |   `default`    | One of `success`, `info`, `warning`, `error`, `default`                       |
| duration      |      Number     |     `4000`     | Visibility duration in milliseconds or `false` that disables duration         |
| queue         |     Boolean     |    `false`     | Wait for existing to close before showing new                                 |
| maxToasts     | Number or false |      `5`       | Defines the max of toasts showed in simultaneous                              |


## API methods

### `show(message, ?options)`

This is generic method, you can use this method to make any kind of toast.

```js
// Can accept a message as string and apply rest of options from defaults
this.$toast.show("Howdy!");

// Can accept an Object of options.
// If yout don't pass options, the default toast will be showed
this.$toast.show("Something went wrong!", {
  type: "error",
  // all of other options may go here
});
```

## Contributing

Please see [CONTRIBUTING](.github/CONTRIBUTING.md) for details.

## Security Vulnerabilities

Please review [our security policy](../../security/policy) on how to report security vulnerabilities.

## Credits

-   [k90mirzaei](https://github.com/k90mirzaei)
-   [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

## Support

This project needs a ⭐️ from you. Don't forget to leave a star ⭐️
