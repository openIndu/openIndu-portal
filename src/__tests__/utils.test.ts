import { describe, it, expect } from "vitest";
import { cn } from "@/app/components/ui/utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("should handle conditional classes", () => {
    expect(cn("foo", true && "bar", false && "baz")).toBe("foo bar");
  });

  it("should handle arrays of classes", () => {
    expect(cn("foo", ["bar", "baz"])).toBe("foo bar baz");
  });

  it("should handle objects as classes", () => {
    expect(cn("foo", { bar: true, baz: false })).toBe("foo bar");
  });

  it("should handle mixed types", () => {
    expect(cn("foo", ["bar", { baz: true, qux: false }])).toBe("foo bar baz");
  });

  it("should remove duplicates with tailwind-merge", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
  });

  it("should handle undefined and null", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });

  it("should return empty string for no inputs", () => {
    expect(cn()).toBe("");
  });

  it("should merge conflicting Tailwind classes correctly", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("should merge conflicting spacing classes correctly", () => {
    expect(cn("m-4", "mx-8")).toBe("m-4 mx-8");
  });
});
