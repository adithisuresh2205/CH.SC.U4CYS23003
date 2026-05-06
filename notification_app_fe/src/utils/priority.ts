export interface Notification {
  ID: string;
  Type: string;
  Message: string;
  Timestamp: string;
}

const WEIGHT: Record<string, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function getTopPriority(
  notifications: Notification[],
  viewedIds: Set<string>,
  limit = 10
): Notification[] {
  return notifications
    .filter((n) => !viewedIds.has(n.ID))
    .sort((a, b) => {
      const w = (WEIGHT[b.Type] ?? 0) - (WEIGHT[a.Type] ?? 0);
      if (w !== 0) return w;
      return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
    })
    .slice(0, limit);
}
