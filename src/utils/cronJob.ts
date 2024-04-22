import * as cron from 'cron';
import { makeRequest } from './request';

interface CronJobInterface {
	start(): void;
	stop(): void;
};


import { config } from '../config/config';

const environment = process.env.NODE_ENV || 'development';

const configAPI = {
    baseURL: config[environment].endpointAllCharacters,
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
