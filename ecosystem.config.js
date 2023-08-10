module.exports = {
  apps : [{
    name   : "Epicure-server",
    script : "ts-node ./src/app.ts",
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


			'post-deploy': "mkdir -p logs && npm i && pm2 reload ecosystem.config.js --env staging && ts-node ./src/app.ts",


			"pre-deploy-local": "echo 'Deploying code to servers'",
			env: {
				NODE_ENV: "staging"
			}
		}
	}


}
