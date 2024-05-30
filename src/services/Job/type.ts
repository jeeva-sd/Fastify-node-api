export type JobType = 'exampleJob' | 'otherJob';

export interface JobData {
    type: JobType;
    payload: unknown;
}