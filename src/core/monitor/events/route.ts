import BaseEvent from "./base";
import { logInfo } from "../../../utils/log";
import { tiangong_tracert } from "../../../constant";

export interface IRouteEvent {
    handleStateChange: any;
    start: () => void;
}

type EventType = Event & { arguments: any };
type MethodType = "pushState" | "replaceState";
export default class Route extends BaseEvent implements IRouteEvent {
    constructor(props) {
        super(props);
    }

    aop(type: MethodType) {
        const source = window.history[type];
        return function () {
            let event: EventType = new Event(type) as EventType;
            event.arguments = arguments;
            window.dispatchEvent(event);
            let rewrite = source.apply(this, arguments);
            return rewrite;
        };
    }

    handleStateChange(e, params?: any) {
        // 单页
        const trcert = window[tiangong_tracert];
        const {
            version: trcert_version,
            utm: { utm_data = {} } = {},
            _,
        } = trcert;

        let __source__ = params?.__source__ ? params.__source__ : "popstate";
        let url = window.location.href;
        let pathname = params?.pathname ? params.pathname : location.pathname;

        if (params?.pathname) {
            url = location.origin + params?.pathname;
        }

        const data = {
            __source__,
            __tags__: {},
            title: document.title || "",
            utmCnt: utm_data.utm_cnt || "",
            pre: _.page_referrer || "",
            utmUrl: utm_data.utm_url || "",
            trcert_version,
            pathname,
            url,
            createTime: new Date().getTime(),
            logType: 2,
        };

        this.send(data);
    }

    handlePushStateChange(e) {
        // handlePushStateChange

        const pathname = e.arguments ? e.arguments[2] : null;
        this.handleStateChange(e, { __source__: "pushState", pathname });
    }

    handleReplaceStateChange(e) {
        // handleReplaceStateChange

        const pathname = e.arguments ? e.arguments[2] : null;
        this.handleStateChange(e, { __source__: "replaceState", pathname });
    }

    start() {
        this.on(window, "popstate", (e) => this.handleStateChange(e));

        // hack the pushState and replaceState based on aop
        ["pushState", "replaceState"].forEach((method) => {
            window.history[method as MethodType] = this.aop(
                method as MethodType
            );
        });

        this.on(window, "pushState", (e: any) => this.handlePushStateChange(e));
        this.on(window, "replaceState", (e: any) =>
            this.handleReplaceStateChange(e)
        );
    }
}
