export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  redis: {
      host: process.env.REDIS_CI_HOST,
      port: parseInt(process.env.REDIS_CI_PORT, 10)
    }
});
