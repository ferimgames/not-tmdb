import { screen, render } from "@testing-library/react";
import MediaList from "@/components/MediaList";
import { MediaElement } from "@/types/MediaElement";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

const mediaElements: MediaElement[] = [
  {
    id: 1,
    img: "/path/img/image1.jpg",
    title: "Media 1",
    rating: 69,
    url: "/page/media1",
  },
  {
    id: 2,
    img: "/path/img/image2.jpg",
    title: "Media 2",
    rating: 100,
    url: "/page/media2",
  },
  {
    id: 3,
    img: "/path/img/image3.jpg",
    title: "Media 3",
    rating: 42,
    url: "/page/media3",
  },
];

test("Renders 3 elements", () => {
  render(<MediaList list={mediaElements} />);
  const mediaCards = screen.getAllByRole("link");
  expect(mediaCards).toHaveLength(3);
});

test("Render elements have provided information", () => {
  render(<MediaList list={mediaElements} />);

  for (const element of mediaElements) {
    const imgRegex = new RegExp(element.title);
    const img = screen.getByRole("img", { name: imgRegex });

    const title = screen.getByText(element.title);

    const ratingRegex = new RegExp(element.rating.toString());
    const rating = screen.getByText(ratingRegex);

    const link = screen.getByTestId(`test_${element.title}`);

    expect(img).toHaveAttribute("src", element.img);
    expect(link).toHaveAttribute("href", element.url);
    expect(title).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
  }
});
