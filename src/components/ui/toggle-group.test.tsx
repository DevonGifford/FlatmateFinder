import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";

describe("ToggleGroup", () => {
  it("updates and clearly exposes the selected icon option", async () => {
    const user = userEvent.setup();

    render(
      <ToggleGroup type="single" aria-label="Choose an option">
        <ToggleGroupItem value="one">One</ToggleGroupItem>
        <ToggleGroupItem value="two">Two</ToggleGroupItem>
      </ToggleGroup>
    );

    const option = screen.getByRole("radio", { name: "One" });
    expect(option.getAttribute("aria-pressed")).toBe("false");

    await user.click(option);

    expect(option.getAttribute("aria-pressed")).toBe("true");
    expect(option.className).toContain("aria-pressed:bg-primary");
  });
});
