import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ImageCarousel } from "@/app/components/ImageCarousel";

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  ChevronLeft: () => <span data-testid="chevron-left">←</span>,
  ChevronRight: () => <span data-testid="chevron-right">→</span>,
}));

const testSlides = [
  { src: "slide1.jpg", alt: "Slide 1", title: "Title 1", description: "Desc 1" },
  { src: "slide2.jpg", alt: "Slide 2", title: "Title 2", description: "Desc 2" },
  { src: "slide3.jpg", alt: "Slide 3", title: "Title 3", description: "Desc 3" },
];

describe("ImageCarousel", () => {
  it("should render empty state when no slides provided", () => {
    render(<ImageCarousel slides={[]} />);
    expect(screen.getByText("暂无轮播内容")).toBeInTheDocument();
  });

  it("should render single slide without navigation", () => {
    render(<ImageCarousel slides={[testSlides[0]]} />);
    expect(screen.getByText("Title 1")).toBeInTheDocument();
    expect(screen.queryByTestId("chevron-left")).not.toBeInTheDocument();
    expect(screen.queryByTestId("chevron-right")).not.toBeInTheDocument();
  });

  it("should render multiple slides with navigation", () => {
    render(<ImageCarousel slides={testSlides} />);
    expect(screen.getByText("Title 1")).toBeInTheDocument();
    expect(screen.getByTestId("chevron-left")).toBeInTheDocument();
    expect(screen.getByTestId("chevron-right")).toBeInTheDocument();
  });

  it("should navigate to next slide on next button click", () => {
    render(<ImageCarousel slides={testSlides} />);
    const nextButton = screen.getByLabelText("下一张");

    // Initial state - slide 1 visible
    expect(screen.getByText("Title 1")).toBeInTheDocument();

    // Click next
    fireEvent.click(nextButton);
    expect(screen.getByText("Title 2")).toBeInTheDocument();
  });

  it("should navigate to previous slide on prev button click", () => {
    render(<ImageCarousel slides={testSlides} />);
    const prevButton = screen.getByLabelText("上一张");
    const nextButton = screen.getByLabelText("下一张");

    // Go to slide 2 first
    fireEvent.click(nextButton);
    expect(screen.getByText("Title 2")).toBeInTheDocument();

    // Go back to slide 1
    fireEvent.click(prevButton);
    expect(screen.getByText("Title 1")).toBeInTheDocument();
  });

  it("should wrap around from last slide to first", () => {
    render(<ImageCarousel slides={testSlides} />);
    const nextButton = screen.getByLabelText("下一张");

    // Navigate to slide 3
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    expect(screen.getByText("Title 3")).toBeInTheDocument();

    // One more click should wrap to slide 1
    fireEvent.click(nextButton);
    expect(screen.getByText("Title 1")).toBeInTheDocument();
  });

  it("should wrap around from first slide to last", () => {
    render(<ImageCarousel slides={testSlides} />);
    const prevButton = screen.getByLabelText("上一张");

    // Click previous from first slide
    fireEvent.click(prevButton);
    expect(screen.getByText("Title 3")).toBeInTheDocument();
  });

  it("should navigate to specific slide on dot click", () => {
    render(<ImageCarousel slides={testSlides} />);
    const dotButton = screen.getByLabelText("切换到第 3 张");

    fireEvent.click(dotButton);
    expect(screen.getByText("Title 3")).toBeInTheDocument();
  });

  it("should pause autoplay on mouse enter and resume on mouse leave", () => {
    vi.useFakeTimers();
    const container = render(<ImageCarousel slides={testSlides} intervalMs={1000} />);
    const carouselWrapper = container.container.firstChild as HTMLElement;

    // Initial - slide 1
    expect(screen.getByText("Title 1")).toBeInTheDocument();

    // Hover to pause
    fireEvent.mouseEnter(carouselWrapper);

    // Advance time - should not change
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(screen.getByText("Title 1")).toBeInTheDocument();

    // Resume by mouse leave
    fireEvent.mouseLeave(carouselWrapper);

    // Advance time - should change to slide 2
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(screen.getByText("Title 2")).toBeInTheDocument();

    vi.useRealTimers();
  });

  it("should autoplay to next slide after interval", () => {
    vi.useFakeTimers();
    render(<ImageCarousel slides={testSlides} intervalMs={1000} />);

    // Initial - slide 1
    expect(screen.getByText("Title 1")).toBeInTheDocument();

    // Advance time
    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText("Title 2")).toBeInTheDocument();

    vi.useRealTimers();
  });

  it("should render indicators for multiple slides", () => {
    render(<ImageCarousel slides={testSlides} />);

    testSlides.forEach((_, index) => {
      expect(screen.getByLabelText(`切换到第 ${index + 1} 张`)).toBeInTheDocument();
    });
  });

  it("should not autoplay when only one slide", () => {
    vi.useFakeTimers();
    render(<ImageCarousel slides={[testSlides[0]]} intervalMs={1000} />);

    // Advance time - should still be same slide
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(screen.getByText("Title 1")).toBeInTheDocument();

    vi.useRealTimers();
  });
});
