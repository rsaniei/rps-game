import { render, screen, cleanup } from "@testing-library/react";
import user from "@testing-library/user-event";
import Weapon from "../components/Weapon";
import GameBoard from "../components/GameBoard";


describe("test gameboard component", () => {

  afterEach(() => {
    cleanup();
  });
  it("weapon is selected with out bug when user clicks on it", async () => {

    render(<Weapon weapon={{ id: "Paper", image: "./images/paper.png", dataTestid: "weapon-element" }} />);
    const weapon = screen.getByTestId("weapon-element");
    const weaponId = screen.getByTestId("weapon-id");

    const weaponImage = screen.getByTestId("weapon-image")
    await user.click(weapon);
    expect(weaponId).toHaveTextContent("Paper");
    expect(weaponImage).toHaveAttribute('src','./images/paper.png');
  });

  it("when user clicks on the button to play again, weopons and timer render correctly", async () => {

    render(<GameBoard/>);
    const weapon = screen.queryAllByTestId("weapon-element");
    await user.click(weapon[0]);
    const restartButt = screen.getByRole("button",{name: "Play again!"});
    await user.click(restartButt);
    const weapons = screen.queryAllByTestId("weapon-element");
    const timerId = screen.getByTestId("timer-element");
    expect(timerId).toHaveTextContent(3);
    expect(weapons.length).toBe(3);
  });

  it("user loses after time is up!", async () => {

    render(<GameBoard/>);
    // mimic delay for 3 seconds
    await new Promise((r) => setTimeout(r, 3100));
    const message = screen.getByTestId("lost");
    expect(message).toHaveTextContent("You Lost in this round!");

  });
});
