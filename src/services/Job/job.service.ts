import amqp, { Connection, Channel, ConsumeMessage } from 'amqplib';
import { log, error as errorLog, warn as warnLog } from 'console';
import { appConfig } from '~/config';
import { Injectable } from '~/server';
import { JobData, JobType } from './type';

@Injectable()
export class JobService {
    private connection: Connection | null = null;
    private channel: Channel | null = null;
    private readonly queueName = appConfig.jobs.queueName;

    constructor() {
        this.initialize();
    }

    private async initialize() {
        try {
            this.connection = await amqp.connect(appConfig.jobs.host);
            this.channel = await this.connection.createChannel();
            await this.channel.assertQueue(this.queueName, { durable: appConfig.jobs.durable });

            // Consume messages
            this.channel.consume(this.queueName, async (msg) => {
                if (msg !== null) {
                    const job: JobData = JSON.parse(msg.content.toString());
                    await this.processJob(job, msg);
                }
            }, { noAck: false });

            log(`Waiting for jobs in '${this.queueName}' queue...`);
        } catch (error) {
            errorLog('Failed to initialize RabbitMQ connection:', error);
        }
    }

    public async addJob(type: JobType, payload: unknown): Promise<boolean> {
        try {
            if (!this.channel) {
                errorLog('Channel is not initialized.');
                return false;
            }
            const job: JobData = { type, payload };
            this.channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(job)), { persistent: true });
            log(`Job added to queue: ${type}`);
            return true;
        } catch (error) {
            errorLog(`Error adding job to queue: ${error}`);
            return false;
        }
    }

    private async processJob(job: JobData, msg: ConsumeMessage): Promise<void> {
        const { type, payload } = job;
        switch (type) {
        case 'exampleJob':
            await this.handleExampleJob(payload, msg);
            break;
        case 'otherJob':
            await this.handleOtherJob(payload, msg);
            break;
        default:
            warnLog(`Unknown job type: ${type}`);
        }
    }

    private async handleExampleJob(payload: unknown, msg: ConsumeMessage): Promise<void> {
        log('Processing example job with payload:', payload);
        this.channel!.ack(msg);
    }

    private async handleOtherJob(payload: unknown, msg: ConsumeMessage): Promise<void> {
        log('Processing fallback job with payload:', payload);
        this.channel!.ack(msg);
    }
}
