const State = {
    paths: [],
    circles: [],

    newPath: null,
    lastPath: null,

    newCircle: null,
    lastCircle: null,

    resetState: function(){
        this.paths = [];
        this.circles = [];
        this.newPath = null;
        this.lastPath = null;
        this.newCircle = null;
        this.lastCircle = null;
    }
};

export default State;

