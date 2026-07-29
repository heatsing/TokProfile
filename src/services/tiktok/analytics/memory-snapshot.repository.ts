import type {
  AuthorizedCreatorSnapshot,
  CreatorSnapshotRepository,
} from "./snapshot-types";
import { normalizeSnapshotUsername } from "./snapshot-validation";

export class MemoryCreatorSnapshotRepository implements CreatorSnapshotRepository {
  private readonly snapshots = new Map<string, AuthorizedCreatorSnapshot[]>();

  async findLatest(username: string) {
    const snapshots = this.snapshots.get(normalizeSnapshotUsername(username)) ?? [];

    return (
      [...snapshots].sort(
        (a, b) => new Date(b.capturedAt).getTime() - new Date(a.capturedAt).getTime(),
      )[0] ?? null
    );
  }

  async save(snapshot: AuthorizedCreatorSnapshot) {
    const username = normalizeSnapshotUsername(snapshot.creator.username);
    const snapshots = this.snapshots.get(username) ?? [];
    const withoutDuplicate = snapshots.filter(
      (existing) => existing.capturedAt !== snapshot.capturedAt,
    );

    this.snapshots.set(username, [...withoutDuplicate, snapshot]);
  }
}
