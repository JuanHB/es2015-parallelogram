const State = {
    paths: [],
    circles: [],
    areaCircle: [],
    centerCircle: [],

    newPath: null,
    lastPath: null,

    newCircle: null,
    lastCircle: null,

    resetState: () => {
        this.paths = [];
        this.circles = [];
        this.newPath = null;
        this.lastPath = null;
        this.newCircle = null;
        this.lastCircle = null;
        this.areaCircle = [];
        this.centerCircle = [];
    }
};

export default State;

