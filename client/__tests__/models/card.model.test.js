import Card from "../../src/js/models/game/card.model.js";

describe("Card :: testing cards methods", () => {
  const MOCK_UUID = "eba9dbf8-c207-4b87-9e7e-746f533285d0"
  const MOCK_CODE = 1
  it("Must create a card object with passed values", () => {
    const cardInstance = new Card(MOCK_UUID, MOCK_CODE);
    expect(cardInstance.getId()).toBe(MOCK_UUID);
    expect(cardInstance.getCode()).toBe(MOCK_CODE);
    expect(cardInstance.isFlipped()).toBe(false);
  });

  it("Must flip a card object when flip is called", () => {
    const cardInstance = new Card(MOCK_UUID, MOCK_CODE);
    cardInstance.flip();
    expect(cardInstance.isFlipped()).toBe(true);
  });

  it("Must flip a card object when unflip is called", () => {
    const cardInstance = new Card(MOCK_UUID, MOCK_CODE);
    cardInstance.flip();
    cardInstance.unflip();
    expect(cardInstance.isFlipped()).toBe(false);
  });
});
