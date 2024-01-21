import { screen, render } from "@testing-library/react";
import MediaCard from "@/components/MediaCard";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

test("Renders information provided", async () => {
  render(
    <MediaCard
      title="Amazing Movie"
      img="/img/path/image.png"
      rating={69} //nice
      url={"/test/url"}
    />
  );

  const img = screen.getByRole("img", { name: /Amazing Movie/i });
  const title = screen.getByText(/Amazing Movie/);
  const rating = screen.getByText(/69/);
  const link = screen.getByRole("link");

  expect(img).toHaveAttribute("src", "/img/path/image.png");
  expect(link).toHaveAttribute("href", "/test/url");
  expect(title).toBeInTheDocument();
  expect(rating).toBeInTheDocument();
});
