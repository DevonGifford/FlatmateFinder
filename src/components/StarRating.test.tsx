import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { StarRating } from "./StarRating";

describe("StarRating", () => {
  it("can be selected with a keyboard and exposes its state", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <StarRating filled={false} label="Set rating to 1 star" onClick={onClick} />
    );

    const button = screen.getByRole("button", { name: "Set rating to 1 star" });
    expect(button.getAttribute("aria-pressed")).toBe("false");

    button.focus();
    await user.keyboard("{Enter}");

    expect(onClick).toHaveBeenCalledOnce();
  });
});
