module.exports = {
  apps : [{
    name   : "Epicure-server",
    script : "ts-node ./src/app.ts",
	env: {
		NODE_ENV: "staging",
		DATABASE_NAME: process.env.DATABASE_NAME,
		DATABASE_PASSWORD: process.env.DATABASE_PASSWORD
      },
}],
  deploy: {
		staging: {
			key: "/Users/idobar/Skills/Aws/EpicureAppKey.pem",
			user: "ubuntu",


			host: ["ec2-3-137-173-135.us-east-2.compute.amazonaws.com"],


			ref: "origin/dev",


			repo: "git@github.com:idob2/Epicure-server.git",


			path: "/home/ubuntu/Epicure/Server",


			ssh_options: "StrictHostKeyChecking=no",


			'post-deploy': "mkdir -p logs && npm i && pm2 reload ecosystem.config.js --env staging",


			"pre-deploy-local": "echo 'Deploying code to servers'",
			env: {
				NODE_ENV: "staging",
				DATABASE_NAME: process.env.DATABASE_NAME,
				DATABASE_PASSWORD: process.env.DATABASE_PASSWORD
			}
		}
	}


}
