/**
 * Timestamp validation utilities ported from the Go implementation.
 * @see public-api/internal/validation/episode_timestamps.go
 */

// Timestamp type IDs from the Go config
export const TIMESTAMP_TYPE_IDS = {
  CANON: "9edc0037-fa4e-47a7-a29a-d9c43368daa8",
  MUST_WATCH: "e384759b-3cd2-4824-9569-128363b4452b",
  BRANDING: "97e3629a-95e5-4b1a-9411-73a47c0d0e25",
  INTRO: "14550023-2589-46f0-bfb4-152976506b4c",
  MIXED_INTRO: "cbb42238-d285-4c88-9e91-feab4bb8ae0a",
  NEW_INTRO: "679fb610-ff3c-4cf4-83c0-75bcc7fe8778",
  RECAP: "f38ac196-0d49-40a9-8fcf-f3ef2f40f127",
  FILLER: "c48f1dce-1890-4394-8ce6-c3f5b2f95e5e",
  TRANSITION: "9f0c6532-ccae-4238-83ec-a2804fe5f7b0",
  CREDITS: "2a730a51-a601-439b-bc1f-7b94a640ffb9",
  MIXED_CREDITS: "6c4ade53-4fee-447f-89e4-3bb29184e87a",
  NEW_CREDITS: "d839cdb1-21b3-455d-9c21-7ffeb37adbec",
  PREVIEW: "c7b1eddb-defa-4bc6-a598-f143081cfe4b",
  TITLE_CARD: "67321535-a4ea-4f21-8bed-fb3c8286b510",
  UNKNOWN: "ae57fcf9-27b0-49a7-9a99-a91aa7518a29",
} as const;

// Validation constants
const INTRO_DURATION_MIN = 50.0; // seconds
const INTRO_DURATION_MAX = 160.0; // seconds
const INTRO_COUNT_MAX = 1;
const TRANSITION_DURATION_MIN = 0.0; // seconds
const TRANSITION_DURATION_MAX = 20.0; // seconds
const TITLE_CARD_COUNT_MAX = 2; // Series title, episode title
const PREVIEW_COUNT_MAX = 1;
const CREDITS_COUNT_MAX = 3;

/** Minimal episode type for validation */
export interface ValidationEpisode {
  id?: string;
  baseDuration?: number | null;
}

/** Timestamp type for validation */
export interface ValidationTimestamp {
  id?: string | null;
  at: number;
  typeId: string;
  source?: string;
  episodeId?: string;
}

/** Result of timestamp validation */
export interface ValidationResult {
  timestamps: ValidationTimestamp[];
  isValid: boolean;
  errors: string[] | null;
}

/** Rule definition for timestamp validation */
interface ValidationRule {
  name: string;
  check: (
    episode: ValidationEpisode,
    timestamps: ValidationTimestamp[],
  ) => { timestamps: ValidationTimestamp[]; error: string | null };
}

// Type checking helper functions
function isIntro(typeId: string | undefined | null): boolean {
  if (!typeId) return false;
  return (
    typeId === TIMESTAMP_TYPE_IDS.INTRO ||
    typeId === TIMESTAMP_TYPE_IDS.NEW_INTRO ||
    typeId === TIMESTAMP_TYPE_IDS.MIXED_INTRO
  );
}

function isCredits(typeId: string | undefined | null): boolean {
  if (!typeId) return false;
  return (
    typeId === TIMESTAMP_TYPE_IDS.CREDITS ||
    typeId === TIMESTAMP_TYPE_IDS.NEW_CREDITS ||
    typeId === TIMESTAMP_TYPE_IDS.MIXED_CREDITS
  );
}

function isTransition(typeId: string | undefined | null): boolean {
  if (!typeId) return false;
  return typeId === TIMESTAMP_TYPE_IDS.TRANSITION;
}

function isTitleCard(typeId: string | undefined | null): boolean {
  if (!typeId) return false;
  return typeId === TIMESTAMP_TYPE_IDS.TITLE_CARD;
}

function isPreview(typeId: string | undefined | null): boolean {
  if (!typeId) return false;
  return typeId === TIMESTAMP_TYPE_IDS.PREVIEW;
}

// Validation rules
const rules: ValidationRule[] = [
  // Ensure there's a timestamp at 0
  {
    name: "Ensure there's a timestamp at 0",
    check: (episode, timestamps) => {
      if (timestamps.length === 0 || timestamps[0].at <= 0) {
        return { timestamps, error: null };
      }
      const newTimestamps: ValidationTimestamp[] = [
        {
          at: 0,
          source: "ANIME_SKIP",
          typeId: TIMESTAMP_TYPE_IDS.UNKNOWN,
          episodeId: episode.id,
        },
        ...timestamps,
      ];
      return { timestamps: newTimestamps, error: null };
    },
  },

  // Merge timestamps with the same type and time
  {
    name: "Merge timestamps with the same type and time",
    check: (_episode, timestamps) => {
      const result: ValidationTimestamp[] = [];
      for (let i = 0; i < timestamps.length; i++) {
        const ts = timestamps[i];
        const prev = result[result.length - 1];
        if (i === 0 || !prev || prev.at !== ts.at || prev.typeId !== ts.typeId) {
          result.push(ts);
        }
      }
      return { timestamps: result, error: null };
    },
  },

  // Timestamps cannot be at the same time
  {
    name: "Timestamps cannot be at the same time",
    check: (_episode, timestamps) => {
      const duplicateMessages: string[] = [];
      for (let i = 1; i < timestamps.length; i++) {
        const prev = timestamps[i - 1];
        const ts = timestamps[i];
        if (prev.at === ts.at) {
          duplicateMessages.push(
            `${prev.typeId}+${ts.typeId}@${prev.at.toFixed(2)}`,
          );
        }
      }
      if (duplicateMessages.length > 0) {
        return { timestamps, error: duplicateMessages.join(", ") };
      }
      return { timestamps, error: null };
    },
  },

  // The same timestamp type should not be used twice in a row
  {
    name: "The same timestamp type should not be used twice in a row",
    check: (_episode, timestamps) => {
      const duplicateTypes: string[] = [];
      for (let i = 1; i < timestamps.length; i++) {
        const prev = timestamps[i - 1];
        const ts = timestamps[i];
        if (prev.typeId === ts.typeId) {
          duplicateTypes.push(ts.typeId);
        }
      }
      if (duplicateTypes.length > 0) {
        return { timestamps, error: duplicateTypes.join(", ") };
      }
      return { timestamps, error: null };
    },
  },

  // Max intro count rule
  createMaxTimestampTypeCountRule("intro", isIntro, INTRO_COUNT_MAX),

  // Intro duration rule
  createTimestampTypeDurationRule(
    "intro",
    isIntro,
    INTRO_DURATION_MIN,
    INTRO_DURATION_MAX,
  ),

  // Transition duration rule
  createTimestampTypeDurationRule(
    "transition",
    isTransition,
    TRANSITION_DURATION_MIN,
    TRANSITION_DURATION_MAX,
  ),

  // Max title card count rule
  createMaxTimestampTypeCountRule("title card", isTitleCard, TITLE_CARD_COUNT_MAX),

  // Max preview count rule
  createMaxTimestampTypeCountRule("preview", isPreview, PREVIEW_COUNT_MAX),

  // Max credits count rule
  createMaxTimestampTypeCountRule("credits", isCredits, CREDITS_COUNT_MAX),
];

/**
 * Creates a rule that validates the maximum count of a specific timestamp type.
 */
function createMaxTimestampTypeCountRule(
  targetTypeName: string,
  isType: (typeId: string | undefined | null) => boolean,
  maxCount: number,
): ValidationRule {
  return {
    name: `At most, there should be ${maxCount} ${targetTypeName}(s)`,
    check: (_episode, timestamps) => {
      const instances = timestamps.filter((ts) => isType(ts.typeId)).length;
      if (instances > maxCount) {
        return {
          timestamps,
          error: `${instances} ${targetTypeName}(s) found`,
        };
      }
      return { timestamps, error: null };
    },
  };
}

/**
 * Creates a rule that validates the duration of a specific timestamp type.
 */
function createTimestampTypeDurationRule(
  targetTypeName: string,
  isType: (typeId: string | undefined | null) => boolean,
  min: number,
  max: number,
): ValidationRule {
  return {
    name: `If ${targetTypeName}s exists, they should be between ${min.toFixed(2)}-${max.toFixed(2)}s long`,
    check: (episode, timestamps) => {
      const index = timestamps.findIndex((ts) => isType(ts.typeId));
      if (index === -1) {
        return { timestamps, error: null };
      }

      const ts = timestamps[index];
      let nextAt: number;

      if (index + 1 < timestamps.length) {
        nextAt = timestamps[index + 1].at;
      } else if (episode.baseDuration != null) {
        nextAt = episode.baseDuration;
      } else {
        // We can't find the end, so give a value resulting in a valid duration
        nextAt = ts.at + (min + max) / 2;
      }

      const duration = nextAt - ts.at;
      if (duration < min || duration > max) {
        return { timestamps, error: `${duration.toFixed(2)}s` };
      }

      return { timestamps, error: null };
    },
  };
}

/**
 * Validates episode timestamps and returns the validated timestamps,
 * whether they are valid, and any validation errors.
 *
 * Some rules can "fix" timestamps (like adding a timestamp at 0 or merging duplicates).
 * The returned timestamps include these fixes.
 *
 * @param episode - The episode being validated
 * @param timestamps - The timestamps to validate (should be sorted by `at`)
 * @returns Validation result with potentially modified timestamps, validity flag, and errors
 */
export function validateEpisodeTimestamps(
  episode: ValidationEpisode,
  timestamps: ValidationTimestamp[],
): ValidationResult {
  const validationErrors: string[] = [];
  let isValid = true;
  let currentTimestamps = [...timestamps];

  for (const rule of rules) {
    const result = rule.check(episode, currentTimestamps);
    currentTimestamps = result.timestamps;

    if (result.error !== null) {
      validationErrors.push(`${rule.name}: ${result.error}`);
      isValid = false;
    }
  }

  return {
    timestamps: currentTimestamps,
    isValid,
    errors: validationErrors.length > 0 ? validationErrors : null,
  };
}
