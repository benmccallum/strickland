import BaseStore from 'fluxible/addons/BaseStore';
import routesConfig from '../configs/routes';
import Validator from '../../../src/StoreValidator';

class ApplicationStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.context = this.getContext();
        this.currentPageName = null;
        this.currentPage = null;
        this.pages = routesConfig;
        this.pageTitle = '';

        this.validate = {
            handlePageTitle: {
                params: [
                    [
                        require('../../../src/validators/Required')
                    ]
                ]
            }
        };
    }
    handlePageTitle(data) {
        this.context.validate(data.pageTitle);
        this.pageTitle = data.pageTitle;
        this.emitChange();
    }
    getCurrentPageName() {
        return this.currentPageName;
    }
    getPageTitle() {
        return this.pageTitle;
    }
    getPages() {
        return this.pages;
    }
    dehydrate() {
        return {
            currentPageName: this.currentPageName,
            currentPage: this.currentPage,
            pages: this.pages,
            pageTitle: this.pageTitle
        };
    }
    rehydrate(state) {
        this.currentPageName = state.currentPageName;
        this.currentPage = state.currentPage;
        this.pages = state.pages;
        this.pageTitle = state.pageTitle;
    }
}

ApplicationStore.storeName = 'ApplicationStore';
ApplicationStore.handlers = {
    'UPDATE_PAGE_TITLE': 'handlePageTitle'
};

export default ApplicationStore;