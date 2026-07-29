import type {
  ParsedTikTokInput,
  TikTokToolResult,
  TikTokToolSuccess,
  TikTokToolType,
} from "@/types/tiktok";

import { analyticsService } from "./analytics.service";
import type { TikTokToolService } from "./contracts";
import { handleTikTokToolError } from "./error-handler";
import { TikTokToolError } from "./errors";
import { parseTikTokInput } from "./input-parser";
import { photoService } from "./photo.service";
import { profileService } from "./profile.service";
import { storyService } from "./story.service";
import { videoService } from "./video.service";

type AnyTikTokToolService = {
  [K in TikTokToolType]: TikTokToolService<K>;
}[TikTokToolType];

function inferTool(input: ParsedTikTokInput): TikTokToolType {
  switch (input.kind) {
    case "username":
    case "profile_url":
      return "profile";
    case "video_url":
      return "video";
    case "photo_url":
      return "photo";
    case "story_url":
      return "story";
    case "short_url":
      throw new TikTokToolError(
        "UNSUPPORTED_INPUT",
        "Short TikTok links must be resolved before the content type can be detected.",
        { details: { inputKind: input.kind }, retryable: true },
      );
  }
}

export class TikTokToolEngine {
  private readonly services = new Map<TikTokToolType, AnyTikTokToolService>();

  constructor(services: readonly AnyTikTokToolService[] = []) {
    services.forEach((service) => this.register(service));
  }

  register<K extends TikTokToolType>(service: TikTokToolService<K>): this {
    if (this.services.has(service.type)) {
      throw new TikTokToolError(
        "SERVICE_UNAVAILABLE",
        `A service is already registered for ${service.type}.`,
      );
    }

    this.services.set(service.type, service as AnyTikTokToolService);
    return this;
  }

  listTools(): TikTokToolType[] {
    return [...this.services.keys()];
  }

  async run(request: {
    input: string;
    tool?: TikTokToolType;
  }): Promise<TikTokToolResult> {
    let parsedInput: ParsedTikTokInput | undefined;
    let selectedTool = request.tool;

    try {
      parsedInput = parseTikTokInput(request.input);
      selectedTool ??= inferTool(parsedInput);
      const service = this.services.get(selectedTool);

      if (!service) {
        throw new TikTokToolError(
          "TOOL_NOT_REGISTERED",
          `The ${selectedTool} tool is not available.`,
          { details: { tool: selectedTool } },
        );
      }

      if (!service.supports(parsedInput)) {
        throw new TikTokToolError(
          "UNSUPPORTED_INPUT",
          `This input cannot be used with the ${selectedTool} tool.`,
          {
            details: {
              inputKind: parsedInput.kind,
              tool: selectedTool,
            },
          },
        );
      }

      const result = await service.resolve(parsedInput);

      return {
        data: result.data,
        input: parsedInput,
        ok: true,
        tool: selectedTool,
        view: result.view,
      } as TikTokToolSuccess;
    } catch (error) {
      return {
        data: null,
        error: handleTikTokToolError(error),
        input: parsedInput,
        ok: false,
        tool: selectedTool,
      };
    }
  }
}

export const tiktokToolEngine = new TikTokToolEngine([
  profileService,
  videoService,
  photoService,
  storyService,
  analyticsService,
]);
