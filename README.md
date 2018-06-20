# neon2-wrapper
Rodan wrapper for [Neon2](https://github.com/DDMAL/Neon2)

# Setup

Since this is a Rodan job, the first step is to set up and install [rodan-docker](https://github.com/DDMAL/rodan-docker). After that, clone this repository into
the `jobs` folder of `rodan-docker`
```
git clone --recurse-submodules https://github.com/DDMAL/neon2-wrapper
``` 

Neon2 is a submodule of this and tracks the develop branch. To update this, run
```
git submodule update --remote
```
from the root of `neon2-wrapper`.

Replace all instances of `demojob` with `neon2-wrapper` in `jobs/settings.py` and `docker-compose.job-dev.yml`. For more information, refer to the setup for `rodan-docker`.

# Building Neon2

You need to use webpack to build Neon2. Ensure you have [Yarn](https://yarnpkg.com) installed first. Run
```
yarn install
yarn build
```
before trying to access Neon2 in Rodan.
