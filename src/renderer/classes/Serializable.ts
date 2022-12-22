export default abstract class Serializable {
  static from(json: Record<string, unknown>): void {
    Object.keys(json).forEach((key) => {
      this[key] = json[key];
    });
  }
}
