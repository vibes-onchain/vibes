import express from "express";
import compression from "compression";
import expressPathsAsRoutes from "express-paths-as-routes";
import cookie_parser from "cookie-parser";
import cookie_session from "cookie-session";
import cors from "cors";
import body_parser from "body-parser";
import multer from "multer";
import pinoLogger from "express-pino-logger";
import pinoPretty from "pino-pretty";

import mock_data from "./fixtures/mock_data";

export const createBaseApp = function () {
  const app = express();

  const pinoConfig =
    process.env.APP_ENV !== "production"
      ? pinoPretty({
          colorize: true,
          hideObject: true,
          singleLine: true,
          messageFormat: "{req.method} {req.url}\n",
        })
      : {};

  if (!process.env.APP_TEST) {
    app.use(pinoLogger(pinoConfig));
  }
  app.use(compression({ filter: () => true }));

  app.use(
    cors({
      credentials: true,
      // optionsSuccessStatus: 204,
      // methods: ["GET", "PUT", "POST", "DELETE"],
      origin: function (origin, cb) {
        cb(null, true);
        return true;
        if (!origin) {
          cb(null, false);
          return false;
        }
        var host = origin.replace(/^http(|s):\/\//, "");
        const domains = {
          [process.env.APP_DOMAIN_api_domain]:
            process.env.APP_DOMAIN_api_base_url,
          [process.env.APP_DOMAIN_www_domain]:
            process.env.APP_DOMAIN_www_base_url,
        };
        for (const domain of Object.keys(domains)) {
          if (host == domain) {
            cb(null, true);
            return domains[domain];
          }
        }
        cb(null, false);
        return false;
      },
    })
  );

  const COOKIE_SECRET = process.env.SECRET_TOKEN || "NOT-A-REAL-SECRET";
  app.use(cookie_parser(COOKIE_SECRET));
  app.use(
    cookie_session({
      name: process.env.APP_HTTPS ? "session" : "http_session",
      secret: COOKIE_SECRET,
      signed: !process.env.APP_TEST,
      path: "/",
      // httpOnly: true,
      // secure: false,
      maxAge: null,
    })
  );
  return app;
};

export const createMockApp = function () {
  const app = createBaseApp();
  app.use(body_parser.json());
  app.use(body_parser.urlencoded({ extended: false }));
  app.use(multer({}).any());
  globalThis.MockData = mock_data;
  app.use(expressPathsAsRoutes(`${__dirname}/api-mock`));
  return app;
};

export const createApp = function () {
  const app = createBaseApp();
  app.use(body_parser.json());
  app.use(body_parser.urlencoded({ extended: false }));
  app.use(multer({}).any());
  app.use(expressPathsAsRoutes(`${__dirname}/api`));
  return app;
};

export default process.env.APP_MOCKAPI == 1 ? createMockApp() : createApp();
