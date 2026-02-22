import { storage } from '#imports';


export const sleep = (ms: number): Promise<void> => {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
};


// wait for full element load
export const waitFor = (
    selector: string,
    timeout: number = 100000
): Promise<NodeListOf<Element>> => {
    return new Promise((resolve, reject) => {
        const el: NodeListOf<Element> = document.querySelectorAll(selector);
        if (el.length > 0) {
            resolve(el);
            return;
        }

        const observer = new MutationObserver((_, obs) => {
            const el: NodeListOf<Element> = document.querySelectorAll(selector);
            if (el.length > 0) {
                obs.disconnect();
                resolve(el);
                return;
            }
        });

        observer.observe(document, {
            attributes: true,
            childList: true,
            subtree: true
        });

        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Element ${selector} not found within ${timeout}ms`));
        }, timeout);
    });
};


// wait for element text match
export const listenForSummon = async (
    selector: string,
    trigger: string,
    callback: () => void,
) => {
    const tigger_summoned = await storage.getItem('local:tigger_summoned');

    const el = document.querySelectorAll(selector);

    // toggle/turn on dev mode to enable tigger
    // (if trigger present and tigger not previously summoned)
    if (el.length > 0 && el[0].textContent === trigger && !tigger_summoned) {
        callback();
        return;
    }

    const observer = new MutationObserver((_, obs) => {
        const el = document.querySelectorAll(selector);

        // toggle/turn on dev mode to summon tigger
        // (if trigger present and tigger not previously summoned)
        if (el.length > 0 && el[0].textContent === trigger && !tigger_summoned) {
            console.log('User summoned tigger!');
            obs.disconnect();
            callback();
            return;
        }

        // toggle/turn off dev mode to dismiss tigger
        // (if trigger no longer present and tigger previously summoned)
        if (el.length > 0 && !el[0].textContent.startsWith(trigger) && tigger_summoned) {
            console.log('User dismissed tigger!');
            obs.disconnect();
            callback();
            return;
        }
    });

    observer.observe(document, {
        characterData: true,
        childList: true,
        subtree: true
    });
}