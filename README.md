
## Quick Start

- [Download from Github] (https://github.com/unbounded-enterprise/sample-app)
  or [Download from Asset Layer](https://assetlayer.com/sample-app)

- Make sure your Node.js and npm versions are up to date for `React 18`

- Create an `.env` file in root and add the following:

```bash
ENVIRONMENT = "local"
URL = "http://localhost:3000"
ASSETLAYER_URL = "https://api.assetlayer.com/api/v1"
ASSETLAYER_APP_SECRET = "<asset-layer-app-secret>"
DOG_COLLECTION_ID = "<nft-collection-id> for duro dogs"
HANDCASH_APP_ID = "<handcash-app-id>"
HANDCASH_APP_SECRET = "<handcash-app-secret>"
NEXTAUTH_SECRET="<nextauth-secret>"
ENCRYPTION_SECRET="<encr-secret">
```

- Install dependencies: `npm install` or `yarn`

- Start the server: `npm run dev` or `yarn dev`

- Views are on: `localhost:3000`

## Setup authentication (optional)

1. Sign in on **Zalter Dashboard** (https://dashboard.zalter.com) and create your **Zalter project**.

2. Open your project settings and activate **Email Magic Link** authentication.
This authentication method requires `redirect URIs` setup, so while in development you need to add `http://localhost:3000/sign-in/confirm`.
For production replace `localhost:3000` with your own domain.

3. Copy `.env.example` file and rename it to `.env`

4. Open `.env` file and enable the Zalter authentication, then set your own Zalter project ID.

```bash
NEXT_PUBLIC_ENABLE_ZALTER_AUTH="true"
NEXT_PUBLIC_ZALTER_PROJECT_ID="<your-project-id>"
```

For more information about Zalter Authentication access https://developer.zalter.com.

## File Structure

Within the download you'll find the following directories and files:

```
nft-sample-app

┌── .env.example
├── .eslintrc.json
├── .gitignore
├── CHANGELOG.md
├── LICENSE.md
├── next.config.js
├── package.json
├── README.md
├── public
└── src
	├── __mocks__
	├── components
	├── icons
	├── lib
	├── theme
	├── utils
	└── pages
		├── 404.js
		├── _app.js
		├── _document.js
		├── index.js
		├── register.js
```


## Set Up the Proxy Server
- here's how to set up the proxy if you are not using a NEXT client + API routes
- need to open source our proxy sample

## License

- Licensed under MIT

## Contact Us

- Email Us: support@assetlayer.com
