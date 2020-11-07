import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Scheduler } from '../../core/scheduler/scheduler';
import { BaseTranslatorService } from '../translator/base-translator.service';
import { BaseStatusService } from './base-status.service';
import { StatusMessage } from './status-message';

@Injectable({
    providedIn: 'root'
})
export class StatusService implements BaseStatusService {
    constructor(private translatorService: BaseTranslatorService, private scheduler: Scheduler) {
    }

    private statusMessage: Subject<StatusMessage> = new Subject<StatusMessage>();
    public statusMessage$: Observable<StatusMessage> = this.statusMessage.asObservable();

    public async removingSongsAsync(): Promise<void> {
        const message: string = await this.translatorService.getAsync('Status.RemovingSongs');
        this.createStatusMessage(message, false);
    }

    public async updatingSongsAsync(): Promise<void> {
        const message: string = await this.translatorService.getAsync('Status.UpdatingSongs');
        this.createStatusMessage(message, false);
    }

    public async addedSongsAsync(numberOfAddedTracks: number, percentageOfAddedTracks: number): Promise<void> {
        const message: string = await this.translatorService.getAsync(
            'Status.AddedSongs',
            {
                numberOfAddedTracks: numberOfAddedTracks,
                percentageOfAddedTracks: percentageOfAddedTracks
            });

        this.createStatusMessage(message, false);
    }

    public async resetAsync(): Promise<void> {
        await this.scheduler.sleepAsync(1000);
        this.statusMessage.next(undefined);
    }

    private createStatusMessage(message: string, isDismissable: boolean): void {
        this.statusMessage.next(new StatusMessage(message, isDismissable));
    }
}
