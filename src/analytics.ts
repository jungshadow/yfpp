declare global {
    interface Window {
        ga: ((...args: unknown[]) => void) & { q?: unknown[][] };
    }
}

window.ga =
    window.ga ||
    function (this: void, ...args: unknown[]) {
        (window.ga.q = window.ga.q || []).push(args);
    };

const analytics = {
    send_event(category: string, action: string, label: string, noninteraction?: boolean): void {
        const nI = noninteraction === true ? 1 : 0;
        window.ga('send', 'event', category, action, label, {
            nonInteraction: nI,
        });
    },
    social_action(social_network: string, action: string, label: string): void {
        window.ga('send', 'social', social_network, action, label);
        window.ga('send', 'event', social_network, action, label);
    },
    success(result: { normalizedInput: { state: string } }): void {
        this.send_event('Address', 'Lookup', result.normalizedInput.state);
    },
    failure(result: string | { error?: { message?: string } }): void {
        const error = typeof result === 'string'
            ? result
            : result?.error?.message || 'Unknown error';
        this.send_event('Address', 'Failure', error);
    },
};

export default analytics;
