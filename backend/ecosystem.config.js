require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REPO,
  DEPLOY_REF = 'origin/feat-deploy',
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto-backend',
    script: './dist/app.js',
  }],
  env_production: {
    autorestart: true,
  },
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp .env.production ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/current/backend`,
      'post-deploy': 'cd backend && npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
