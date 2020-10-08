const manager = {
    callbacks: new Map(),
    backlog: [],
    uid: 0,
    io: null,

    registerObserver(options = {}) {
        this.io = new IntersectionObserver(this.callback.bind(this), options);
    },
    register(id, intersectedCallback) {
        this.io.observe(document.getElementById(id));
        this.callbacks.set(id, intersectedCallback);
    },

    runBacklog() {
        this.backlog.forEach((registerCallback) => {
            registerCallback(`vue-lazy-image-${this.uid}`);
        });
        this.backlog = [];
    },

    callback(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                this.io.unobserve(document.getElementById(entry.target.id));
                this.callbacks.get(entry.target.id)();
            }
        });
    },
};

export default manager;
