module.exports = {
  apps: [
    {
      name: "houseofarts-api",
      script: "server.js",
      cwd: "/home/ec2-user/houseofarts/backend",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
}
