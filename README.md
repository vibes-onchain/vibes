# vibesbot
## Configuring Development Domains

You must append the following line to your `/etc/hosts` file to access the development ports.

```
127.0.0.1 vibes-dev.live
```

By the way, `vibes-dev.live` simply points to your computer via `127.0.0.1`, but we need to use it instead of `localhost`, so that we can set cookies and make cross-domain requests between the frontend and backend.