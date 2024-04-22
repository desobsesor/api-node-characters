import * as cron from 'cron';
import { makeRequest } from './request';
import { config } from '../config/config';

interface CronJobInterface {
	start(): void;
	stop(): void;
};

function isProductionEnvironment(env: string): env is 'production' {
	return env === 'production';
}

const environment: string = process.env.NODE_ENV || 'development';

const configAPI = {
	baseURL: isProductionEnvironment(environment)
		? config['production'].endpointAllCharacters
		: config['development'].endpointAllCharacters
};

const requestOptions = {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
	},
};

export function createCronJob(cronExpression: string): CronJobInterface {
	const job = new cron.CronJob(
		cronExpression,
		async () => {
			try {
				const d = new Date();
				console.log(`Running cron job at: ${d}`);

				const response = await makeRequest(configAPI.baseURL, requestOptions);
				console.log('Endpoint response:', response);
			} catch (error) {
				console.error('Error invoking endpoint:', error);
			}
		},
		null,
		true,
		'America/Bogota'
	);

	job.start();

	return job;
};
