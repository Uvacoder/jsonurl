import { useEffect } from 'react';
import { useRouter } from 'next/router';
// @ts-ignore
import mixpanel from 'mixpanel-browser';

export class Mixpanel {
    constructor(skipInit = false) {
        if (skipInit) return;
        mixpanel.init('a3137b3df0cbd9635bcc0b3f0c2fcb8d', {
            debug: process.env.NODE_ENV === 'development',
        });
    }

    track = (event: string, properties?: any) => {
        mixpanel.track(event, {
            ...properties,
        });
    };

    setRef(ref: any) {
        if (!ref) return;
        mixpanel.register_once({ ref });
        mixpanel.people.set_once({ ref });
    }

    setIsDeveloper() {
        mixpanel.register({
            isDeveloper: true,
        });
        mixpanel.people.set({
            isDeveloper: true,
        });
    }

    trackUrlClick = (_id: any) => {
        this.track('url clicked in UI', {
            _id: _id,
        });
    };

    trackBackendUrlOpened(
        source: 'rawJSON' | 'shortURL' | 'python',
        withDelay: boolean,
        distinct_id: 'string'
    ) {
        this.track('backend url opened', {
            source,
            withDelay,
            distinct_id,
        });
    }
}

export const useMixpanel = () => {
    const router = useRouter();

    const track = (event: string, properties?: any) => {
        const mixpanel = new Mixpanel();
        mixpanel.track(event, {
            path: router.pathname,
            asPath: router.asPath,
            ...properties,
        });
        mixpanel.setRef(router?.query?.ref);
        if (process.env.NODE_ENV !== 'development') return;
        mixpanel.setIsDeveloper();
    };

    useEffect(() => {
        if (!router?.query?.isDeveloper) return;
        const mixpanel = new Mixpanel(true);
        mixpanel.setIsDeveloper();
    }, [router?.query?.isDeveloper]);

    useEffect(() => {
        track('Page Viewed');
    }, [router.asPath]);
};

export class BackendMixpanel {
    async track(event: string, properties: any) {
        const options = {
            method: 'POST',
            headers: {
                accept: 'text/plain',
                'content-type': 'application/json',
            },
            body: JSON.stringify([
                {
                    properties: {
                        token: 'a3137b3df0cbd9635bcc0b3f0c2fcb8d',
                        ...properties,
                    },
                    event: event,
                },
            ]),
        };

        fetch('https://api.mixpanel.com/track', options)
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((err) => console.error(err));
    }

    async trackBackendUrlOpened(
        distinct_id: string,
        source: 'rawJSON' | 'shortURL' | 'python',
        withDelay: boolean
    ) {
        this.track('Backend url opened', {
            distinct_id,
            source,
            withDelay,
        });
    }
}
