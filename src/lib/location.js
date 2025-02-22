export class PermissionDeniedLocationError extends Error {
  constructor() {
    super("Permission to retrieve location was denied.");
  }
}

export class UnavailableLocationError extends Error {
  constructor() {
    super("Location information is not available");
  }
}

export class TimeoutLocationError extends Error {
  constructor() {
    super("Retrieving location timed out");
  }
}
export class UnknownLocationError extends Error {
  constructor() {
    super("Unknown error retrieving location");
  }
}

export default class Location {
  constructor() {
    this._geolocation = navigator.geolocation;
  }

  #_getSuccess(resolve) {
    return (o) => {
      resolve(o);
    };
  }

  #_getFailure(reject) {
    return ({ code }) => {
      switch (code) {
        case 1:
          return reject(new PermissionDeniedLocationError());

        case 2:
          return reject(new UnavailableLocationError());

        case 3:
          return reject(new TimeoutLocationError());

        default:
          return reject(new UnknownLocationError());
      }
    };
  }

  async get() {
    return new Promise((resolve, reject) => {
      this._geolocation.getCurrentPosition(
        this.#_getSuccess(resolve),
        this.#_getFailure(reject)
      );
    });
  }

  static async get() {
    return { coords: { latitude: 38.9842483, longitude: -94.5789786 } };
    const L = new Location();
    return L.get();
  }
}
