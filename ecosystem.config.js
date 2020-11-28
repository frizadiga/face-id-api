module.exports = {
  apps : [{
    name: "face-id-api",
    script: "npm start",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}