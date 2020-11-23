const path = require("path");

const nextConfig = {
  webpack: (webpackConfig) => {
    webpackConfig.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          outputPath: "static/",
          publicPath: "/_next/static/",
          limit: 1000,
        },
      },
    });

    return webpackConfig;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  publicRuntimeConfig: {
    ssoUrl: process.env.URL_SSO,
    apis: {
      baseUrl: process.env.API_SEBLIFEPORTAL_BO,
    },
  },
};

module.exports = nextConfig;
