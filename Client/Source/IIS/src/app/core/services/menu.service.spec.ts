import { MenuService } from './menu.service';

describe('Service: MenuService', () => {
    let service = new MenuService();

    beforeEach(() => {
        service = new MenuService();
    });

    it('should create the service', () => {
        service.sideMenuToggled = true;

        expect(service.sideMenuToggled).toBeTruthy();
    });
});