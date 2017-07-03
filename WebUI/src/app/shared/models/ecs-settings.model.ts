import { Injectable } from '@angular/core';

@Injectable()
export class EcsSettings {
    Environment: string;
    WebApiRecycler: string;
    ToDoApiAddress: string;
    MailApiAddress: string;
    EmailResponseFrom: string;
    JobNotificationRecipientList: string;
    SystemName: string;
    ServiceFabricApi: string;
}