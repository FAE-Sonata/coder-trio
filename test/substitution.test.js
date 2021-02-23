const substitution = require("../src/substitution");
const expect = require("chai").expect;

const coriolan = "Coriolanus";
const keyboard = "mnbvcxzlkjhgfdsapoiuytrewq";
const special = "!@#$%^qwertyuiopasdfghjkl;";
// "!@#$%^qwertyuiopasdfghjkl;"
// "abcdefghijklmnopqrstuvwxyz"
describe("substitution", () => {
    it("handles malformed alphabets appropriately", () =>  {
        const actualShort = substitution(coriolan, "asdfgh");
        const actualRepeated = substitution(coriolan, "qwertyuiopasdfghjklzxcvbmm");
        const actualOver = substitution(coriolan, "qwertyuiopasdfghjkl;zxcvbnm");
        const actualSkipped = substitution(coriolan, false);
        const actualNull = substitution(coriolan, null, false);
        
        expect(actualShort).to.be.false;
        expect(actualRepeated).to.be.false;
        expect(actualOver).to.be.false;
        expect(actualSkipped).to.be.false;
        expect(actualNull).to.be.false;
    });

    it("encodes messages from the standard Latin alphabet to the alphabet " +
        "provided",
        () =>  {
        const actualAlphaOnly = substitution(coriolan, keyboard);
        const actualMixed = substitution("Sac it now!", keyboard);
        const actualSpecial = substitution("Zanzibar", special);
        
        expect(actualAlphaOnly).to.equal("bsoksgmdyi");
        expect(actualMixed).to.equal("imb ku dsr!");
        expect(actualSpecial).to.equal(";!i;e@!s");
    });

    it("decodes messages from the alphabet provided back to the standard " +
        "Latin alphabet",
        () =>  {
        const actualAlphaOnly = substitution("bsoksgmdyi", keyboard, false);
        const actualMixed = substitution("imb ku dsr!", keyboard, false);
        const actualSpecial = substitution(";!i;e@!s ^soif", special, false);
        
        expect(actualAlphaOnly).to.equal(coriolan.toLowerCase());
        expect(actualMixed).to.equal("sac it now!");
        expect(actualSpecial).to.equal("zanzibar front");
    });
});