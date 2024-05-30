export type JobType = 'exampleJob' | 'emailJob' | 'otherJob';

export interface JobData {
    type: JobType;
    payload: unknown;
}