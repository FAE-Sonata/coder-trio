const caesar = require("../src/caesar");
const expect = require("chai").expect;

const coriolan = "Coriolanus";
describe("caesar", () => {
    it("handles malformed shift values appropriately", () =>  {
        const actualNotSupplied = caesar(coriolan);
        const actualZero = caesar(coriolan, 0);
        const actualLargePlus = caesar(coriolan, 26);
        const actualLargeMinus = caesar(coriolan, -40);
        
        expect(actualNotSupplied).to.be.false;
        expect(actualZero).to.be.false;
        expect(actualLargePlus).to.be.false;
        expect(actualLargeMinus).to.be.false;
    });

    it("encodes messages by shifting alphabetical characters within the " + 
        "alphabet, wrapping around to the beginning (Z/z --> A/a) where " +
        "appropriate", () =>  {
        const actualWithinPlus = caesar(coriolan, 5);
        const actualWithinMinus = caesar("NERO", -4);
        const actualOverPlus = caesar(coriolan, 10);
        const actualOverMinus = caesar(coriolan, -2);
        const actualNonAlpha = caesar("Coriolanus, STOP the invasion!", 7);
        
        expect(actualWithinPlus).to.equal("htwntqfszx");
        expect(actualWithinMinus).to.equal("jank");
        expect(actualOverPlus).to.equal("mybsyvkxec");
        expect(actualOverMinus).to.equal("ampgmjylsq");
        expect(actualNonAlpha).to.equal("jvypvshubz, zavw aol puchzpvu!");
    });

    it("decodes messages by acting as the inverse of the encoding function",
        () =>  {
        const actualWithinPlus = caesar("htwntqfszx", 5, false);
        const actualWithinMinus = caesar("JANK", -4, false);
        const actualOverPlus = caesar("mybsyvkxec", 10, false);
        const actualOverMinus = caesar("ampgmjylsq", -2, false);
        const actualNonAlpha = caesar("Jvypvshubz, ZAVW aol puchzpvu!", 7, false);
        
        expect(actualWithinPlus).to.equal(coriolan.toLowerCase());
        expect(actualWithinMinus).to.equal("nero");
        expect(actualOverPlus).to.equal(coriolan.toLowerCase());
        expect(actualOverMinus).to.equal(coriolan.toLowerCase());
        expect(actualNonAlpha).to.equal("coriolanus, stop the invasion!");
    });
});