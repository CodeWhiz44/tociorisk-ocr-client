# ⚓️ Tokiorisk OCR Project Client 
[![linter](https://github.com/viven-inc/tokiorisk-ocr-client/actions/workflows/linter.yml/badge.svg)](https://github.com/viven-inc/tokiorisk-ocr-client/actions/workflows/linter.yml)
## Local Development Setup 
```
git clone git@github.com:viven-inc/tokiorisk-ocr-client.git 
yarn 
yarn start
```

## File Structure
```
------- public 
    |--- src 
        |--- assets
            |--- imgs
            |--- icons
            |--- json
            |--- locales // Multi language resource files
                |--- en
                    |--- translation.json
                |--- jp
                    |--- translation.json
        |--- build
        |--- components
        |--- constants
        |--- modules
        |--- pages
            |--- home
                |--- components
                |--- index.tsx
        |--- queries
        |--- states //(Recoil Atoms)
        |--- themes
        |--- types
        |--- UILibrary
        |--- App.tsx // Implement all providers
        |--- Body.tsx // Implement layout and routing
```

## Basic Authentication 
- https://start.1password.com/open/i?a=GU4WV3N7G5EALK66V6VYFFBOO4&h=viven-inc.1password.com&i=ffgqr6mzmaqtssr3dlgawtn6me&v=ysxwvcg4pfbymfi7ks3lfg6yca

## Testing 
- Run the Dockerfile locally 
```
docker build -t hello --build-arg APP_ENV=production -f ./src/build/docker/Dockerfile .
```
