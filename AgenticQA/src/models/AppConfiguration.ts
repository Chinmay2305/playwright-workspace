export interface AppConfiguration {

    application: {

        name: string;

        url: string;

    };

    environment: {

        name: string;

    };

    browser: {

        type: string;

        headless: boolean;

        timeout: number;

    };

    credentials: {

        username?: string;

        password?: string;

    };

    crawler: {

        maxDepth: number;

        sameDomainOnly: boolean;

    };

    reporting: {

        outputFolder: string;

    };

}