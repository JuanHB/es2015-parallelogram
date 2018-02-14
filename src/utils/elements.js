class ElementsUtils {

    static generateHex() {
        return (Math.random()*0xFFFFFF<<0).toString(16);
    }

}

export default ElementsUtils;