import { Observable } from "rxjs";

import { UserSetting } from '../../shared/models/user-setting.model';

export class MockUserSettingsDataService {

    getUserSettings(): Observable<UserSetting> {

        let userSetting = new UserSetting();
        userSetting.UserId = 1;
        userSetting.LoginName = 'test';
        userSetting.RegionId = 1;
        userSetting.RegionName = 'SouthEast';

        return Observable.of(userSetting);
    }
}