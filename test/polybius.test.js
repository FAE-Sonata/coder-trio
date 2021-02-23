const polybius = require("../src/polybius");
const expect = require("chai").expect;

const coriolan = "Coriolanus";
describe("polybius", () => {
    it("handles malformed decoded values appropriately", () =>  {
        const actualOdd = polybius("365", false);
        const actualSeparated = polybius("355 301", false);
        const actualOutOfBounds = polybius("1960", false);
        const actualNonDigits = polybius("Five Stars!", false);
        
        expect(actualOdd).to.be.false;
        expect(actualSeparated).to.be.false;
        expect(actualOutOfBounds).to.be.false;
        expect(actualNonDigits).to.be.false;
    });

    it("encodes messages with i and j both occupying the (4,2) coordinate",
        () =>  {
        const actualLong = polybius(coriolan);
        const actualSpace = polybius("Wasted sir");
        
        expect(actualLong).to.equal("31432442431311335434");
        expect(actualSpace).to.equal("251134445141 344224");
    });

    it("decodes messages by acting as the inverse of the encoding function, " +
        "except for the codomain point (4,2), which will be decoded as (i/j)",
        () =>  {
        const actualLong = polybius("31432442431311335434", false);
        const actualSpace = polybius("251134445141 344224", false);
        
        expect(actualLong).to.equal("cor(i/j)olanus");
        expect(actualSpace).to.equal("wasted s(i/j)r");
    });
});