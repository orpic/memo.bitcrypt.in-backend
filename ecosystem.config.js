module.exports = {
  apps: [
    {
      name: 'memo.bitcrypt.in-backend',
      script: 'dist/server.js', // Path to the entry file
      exec_mode: 'cluster', // 'cluster' or 'fork'
      instances: '1',
      autorestart: true,
      watch: false, // Set to 'true' to watch for file changes and automatically restart
      max_memory_restart: '2G', // Restart app if it uses more than 2 GB of memory
      env: {
        NODE_ENV: 'development',
        PORT: 3020,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3020,
      },
    },
  ],
};
