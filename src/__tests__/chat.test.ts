import { describe, it, expect } from "vitest";
import { parseSseFrames } from "@/api";

describe("parseSseFrames", () => {
  it("parses complete event frames and keeps the incomplete tail", () => {
    const buf =
      'event: sources\ndata: [{"document_name":"A.pdf","page":1}]\n\n' +
      'event: delta\ndata: {"text":"你好"}\n\n' +
      'event: delta\ndata: {"text":"世界"}'; // 末帧不完整（无 \n\n）
    const { events, rest } = parseSseFrames(buf);
    expect(events).toHaveLength(2);
    expect(events[0].event).toBe("sources");
    expect(JSON.parse(events[0].data)).toEqual([{ document_name: "A.pdf", page: 1 }]);
    expect(events[1].event).toBe("delta");
    expect(JSON.parse(events[1].data).text).toBe("你好");
    expect(rest).toBe('event: delta\ndata: {"text":"世界"}');
  });

  it("handles CRLF line endings and the done event", () => {
    const buf = 'event: done\r\ndata: {"finish_reason":"stop"}\r\n\r\n';
    const { events, rest } = parseSseFrames(buf);
    expect(events).toHaveLength(1);
    expect(events[0].event).toBe("done");
    expect(JSON.parse(events[0].data).finish_reason).toBe("stop");
    expect(rest).toBe("");
  });

  it("returns no events when the buffer has no complete frame yet", () => {
    const { events, rest } = parseSseFrames('event: delta\ndata: {"text":"x"}');
    expect(events).toHaveLength(0);
    expect(rest).toContain("delta");
  });

  it("surfaces error frames", () => {
    const buf = 'event: error\ndata: {"detail":"生成失败"}\n\n';
    const { events } = parseSseFrames(buf);
    expect(events[0].event).toBe("error");
    expect(JSON.parse(events[0].data).detail).toBe("生成失败");
  });
});
