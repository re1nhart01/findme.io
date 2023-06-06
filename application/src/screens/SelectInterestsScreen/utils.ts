export function refactorIntsToInterests(ids: number[], c: string) {
  return ids.map((el) => {
    return {
      id: el * 30,
      user_hash_id: c,
      interests_id: el,
    };
  });
}
