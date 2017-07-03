import { SettingsService } from './settings.service';

describe('Service: SettingsService', () => {

    (<any>window).ClientSettings = {
        AuthToken: "AuthToken",
        AuditInfoToken: "AuditInfoToken",
        LoggedOnUserName: "LoggedOnUserName",
        UserImageUrl: "UserImageUrl",
        ServiceFabricApi: "ServiceFabricApi"
    };

    let service = new SettingsService();

    beforeEach(() => {
        service = new SettingsService();
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should have the right user info parameters', () => {
        expect(service.authToken).toEqual('AuthToken');
        expect(service.auditInfoToken).toEqual('AuditInfoToken');
        expect(service.loggedOnUserName).toEqual('LoggedOnUserName');
        expect(service.userImageUrl).toEqual('UserImageUrl');
        expect(service.serviceFabricApi).toEqual('ServiceFabricApi');

    });
});