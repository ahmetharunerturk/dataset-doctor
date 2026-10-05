/**
 * Single source of truth for the illustrative sample dataset shown across the
 * page (hero report card, feature captions, health breakdown, report section).
 *
 * These are FIXED product-concept figures — never computed at runtime and not
 * measurements of anything real. The page tells ONE dataset's story:
 * 12,458 rows × 31 columns (22 numeric + 9 categorical, 14.2 MB), with
 * 4 null-carrying columns (0.8 % of cells), 109 duplicated pairs involving
 * 218 rows (1.75 % of the set) and an 87/13 class prior. The arithmetic is
 * the lock — e.g. 2 × 109 = 218 and 218 / 12458 ≈ 1.75 %.
 *
 * Semantics of `duplicates`: 218 counts every row taking part in duplication
 * (109 records × 2 occurrences); the 109 redundant second copies are the rows
 * to drop. Any quantity derived FROM the dataset must come from this module;
 * decorative diagram textures (matrix fills, distribution splits) stay local.
 */
export const SPECIMEN = {
  rows: 12458,
  columns: 31,
  types: { numeric: 22, categorical: 9 },
  sizeMb: 14.2,

  nulls: {
    /** Columns carrying null values. */
    columns: 4,
    /** Share of all cells that are null (texture figure). */
    cellSharePercent: 0.8,
  },

  duplicates: {
    /** Rows participating in duplication (109 pairs × 2 occurrences). */
    rowsInvolved: 218,
    /** Records that appear twice. */
    pairs: 109,
    /** Redundant second copies = rows to drop (equals `pairs`). */
    redundantCopies: 109,
    /** Share of the set involved in duplication (218 / 12458). */
    sharePercent: 1.75,
  },

  classes: { majorityPercent: 87, minorityPercent: 13 },

  health: {
    overall: 68,
    /** Completeness · Consistency · Class Balance · Duplicate Quality · Leakage Risk. */
    scores: [92, 81, 44, 76, 55] as const,
    zones: { strong: [80, 100], watch: [50, 79], act: [0, 49] } as const,
  },

  /**
   * Severity vocabulary shared by the hero report card and the report
   * section. `report` is worst-first as presented in the findings table.
   */
  severities: {
    report: ["critical", "warning", "info"] as const,
    preview: ["warning", "info", "warning", "critical"] as const,
  },

  /** Illustrative leakage pair cited by findings. */
  leak: { fields: ["field_12", "field_27"], rho: 0.94 },

  /** Illustrative scan latency shown in the hero card (demo figure). */
  analyzedSeconds: 1.2,
} as const;

export type Specimen = typeof SPECIMEN;