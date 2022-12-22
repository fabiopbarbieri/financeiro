export default abstract class Serializable {
  from(json: Record<string, unknown>): void {
    Object.keys(json).forEach((key) => {
      try {
        this[key] = json[key];
        // eslint-disable-next-line no-empty
      } catch (err) {}
    });
  }
}
