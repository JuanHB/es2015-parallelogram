import State from '../state';

const math = {

    getParallelogramCenter(){

        let circles = State.circles,
            vertexA = circles[0],
            vertexB = circles[1],
            vertexC = circles[2],
            vertexD = circles[3];

        return {
            x : (vertexA.x+vertexB.x+vertexC.x+vertexD.x) / 4,
            y : (vertexA.y+vertexB.y+vertexC.y+vertexD.y) / 4
        };
    }

};

export default math;