## How to develop locally
You can clone the whole repo and change the branch to this one
```
git clone https://github.com/GomezMig03/dd-frontend.git
git checkout web-page
```

Or just clone this branch
```
git clone -b web-page --single-branch https://github.com/GomezMig03/dd-frontend.git
```

After cloning the branch, install the needed dependencies
```
npm install
```

Then you can test it
```
npm run dev
```

And build it into a dist directory
```
npm run build
```

After every commit on this branch, the web will be built and deployed to github pages.