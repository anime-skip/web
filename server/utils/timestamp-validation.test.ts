import { describe, it, expect } from "bun:test";
import {
  validateEpisodeTimestamps,
  TIMESTAMP_TYPE_IDS,
  type ValidationEpisode,
  type ValidationTimestamp,
} from "./timestamp-validation";

// Shorthand type IDs for cleaner tests
const canon = TIMESTAMP_TYPE_IDS.CANON;
const credits = TIMESTAMP_TYPE_IDS.CREDITS;
const filler = TIMESTAMP_TYPE_IDS.FILLER;
const intro = TIMESTAMP_TYPE_IDS.INTRO;
const mixedIntro = TIMESTAMP_TYPE_IDS.MIXED_INTRO;
const newIntro = TIMESTAMP_TYPE_IDS.NEW_INTRO;
const preview = TIMESTAMP_TYPE_IDS.PREVIEW;
const titleCard = TIMESTAMP_TYPE_IDS.TITLE_CARD;
const transition = TIMESTAMP_TYPE_IDS.TRANSITION;
const unknown = TIMESTAMP_TYPE_IDS.UNKNOWN;

describe("Episode Timestamps Validation", () => {
  it("should create an unknown timestamp at 0 when there's not a timestamp before or at 0", () => {
    const result = validateEpisodeTimestamps({}, [{ typeId: canon, at: 6 }]);

    expect(result.isValid).toBe(true);
    expect(result.errors).toBeNull();
    expect(result.timestamps).toEqual([
      { typeId: unknown, at: 0, source: "ANIME_SKIP", episodeId: undefined },
      { typeId: canon, at: 6 },
    ]);
  });

  it("should not create an unknown timestamp at 0 there's already a timestamp at 0", () => {
    const result = validateEpisodeTimestamps({}, [{ typeId: canon, at: 0 }]);

    expect(result.isValid).toBe(true);
    expect(result.errors).toBeNull();
    expect(result.timestamps).toEqual([{ typeId: canon, at: 0 }]);
  });

  it("should not create an unknown timestamp at 0 there's a timestamp before 0", () => {
    const result = validateEpisodeTimestamps({}, [{ typeId: canon, at: -2 }]);

    expect(result.isValid).toBe(true);
    expect(result.errors).toBeNull();
    expect(result.timestamps).toEqual([{ typeId: canon, at: -2 }]);
  });

  it("should merge timestamps of the same type at the same time", () => {
    const result = validateEpisodeTimestamps({}, [
      { typeId: canon, at: 0 },
      { typeId: canon, at: 0 },
    ]);

    expect(result.isValid).toBe(true);
    expect(result.errors).toBeNull();
    expect(result.timestamps).toEqual([{ typeId: canon, at: 0 }]);
  });

  it("should not allow two of the same timestamp types in a row", () => {
    const result = validateEpisodeTimestamps({}, [
      { typeId: canon, at: 0 },
      { typeId: canon, at: 30 },
    ]);

    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual([
      `The same timestamp type should not be used twice in a row: ${canon}`,
    ]);
    expect(result.timestamps).toEqual([
      { typeId: canon, at: 0 },
      { typeId: canon, at: 30 },
    ]);
  });

  it("should not allow timestamps of different types at the same time", () => {
    const result = validateEpisodeTimestamps({}, [
      { typeId: canon, at: 0 },
      { typeId: filler, at: 0 },
      { typeId: unknown, at: 52 },
      { typeId: filler, at: 52 },
    ]);

    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual([
      `Timestamps cannot be at the same time: ${canon}+${filler}@0.00, ${unknown}+${filler}@52.00`,
    ]);
    expect(result.timestamps).toEqual([
      { typeId: canon, at: 0 },
      { typeId: filler, at: 0 },
      { typeId: unknown, at: 52 },
      { typeId: filler, at: 52 },
    ]);
  });

  it("should not allow more than 1 intro", () => {
    const result = validateEpisodeTimestamps({}, [
      { typeId: newIntro, at: 0 },
      { typeId: intro, at: 90 },
    ]);

    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual([
      "At most, there should be 1 intro(s): 2 intro(s) found",
    ]);
    expect(result.timestamps).toEqual([
      { typeId: newIntro, at: 0 },
      { typeId: intro, at: 90 },
    ]);
  });

  it("should count new and mixed intros as intros", () => {
    const result = validateEpisodeTimestamps({}, [
      { typeId: newIntro, at: 0 },
      { typeId: mixedIntro, at: 90 },
    ]);

    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual([
      "At most, there should be 1 intro(s): 2 intro(s) found",
    ]);
    expect(result.timestamps).toEqual([
      { typeId: newIntro, at: 0 },
      { typeId: mixedIntro, at: 90 },
    ]);
  });

  describe("Intros", () => {
    describe("valid durations", () => {
      it.each([
        [90.0, "should accept 1m30s intros"],
        [50.0, "should accept 50s intros as the shortest"],
        [160.0, "should accept 2m40s intros as the longest"],
      ])("duration %f: %s", (duration) => {
        const result = validateEpisodeTimestamps({}, [
          { typeId: intro, at: 0 },
          { typeId: canon, at: duration },
        ]);

        expect(result.isValid).toBe(true);
        expect(result.errors).toBeNull();
        expect(result.timestamps).toEqual([
          { typeId: intro, at: 0 },
          { typeId: canon, at: duration },
        ]);
      });
    });

    describe("invalid durations", () => {
      it.each([
        [1.0, "should not allow 1s intros"],
        [49.0, "should not allow 49s intros"],
        [161.0, "should not allow 161s intros"],
      ])("duration %f: %s", (duration) => {
        const result = validateEpisodeTimestamps({}, [
          { typeId: intro, at: 0 },
          { typeId: canon, at: duration },
        ]);

        expect(result.isValid).toBe(false);
        expect(result.errors).toEqual([
          `If intros exists, they should be between 50.00-160.00s long: ${duration.toFixed(2)}s`,
        ]);
        expect(result.timestamps).toEqual([
          { typeId: intro, at: 0 },
          { typeId: canon, at: duration },
        ]);
      });
    });

    it("should use the episode duration as the next timestamp if there isn't one", () => {
      const result = validateEpisodeTimestamps(
        { baseDuration: 10.0 + 170.0 },
        [
          { typeId: canon, at: 0 },
          { typeId: newIntro, at: 10 },
        ],
      );

      expect(result.isValid).toBe(false);
      expect(result.errors).toEqual([
        "If intros exists, they should be between 50.00-160.00s long: 170.00s",
      ]);
      expect(result.timestamps).toEqual([
        { typeId: canon, at: 0 },
        { typeId: newIntro, at: 10 },
      ]);
    });

    it("should ignore the intro if there's not another timestamp and the episode duration is not known", () => {
      const result = validateEpisodeTimestamps({}, [
        { typeId: canon, at: 0 },
        { typeId: newIntro, at: 10 },
      ]);

      expect(result.isValid).toBe(true);
      expect(result.errors).toBeNull();
      expect(result.timestamps).toEqual([
        { typeId: canon, at: 0 },
        { typeId: newIntro, at: 10 },
      ]);
    });
  });

  it("should accept a standard episode structure", () => {
    const input: ValidationTimestamp[] = [
      { typeId: canon, at: 0.0 },
      { typeId: intro, at: 273.5 },
      { typeId: titleCard, at: 364.0 },
      { typeId: canon, at: 369.0 },
      { typeId: transition, at: 757.0 },
      { typeId: canon, at: 762.0 },
      { typeId: credits, at: 1211.0 },
      { typeId: canon, at: 1301.0 },
      { typeId: preview, at: 1417.0 },
    ];

    const result = validateEpisodeTimestamps({}, input);

    expect(result.isValid).toBe(true);
    expect(result.errors).toBeNull();
    expect(result.timestamps).toEqual(input);
  });
});
