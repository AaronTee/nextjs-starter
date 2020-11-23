import Http from "@apis/Http";

export class WeatherApi extends Http {
  constructor(args?: { baseUrl: undefined }) {
    super(args);
  }

  getWeather() {
    return this.http.get<any>({
      relPath: `/weatherforecast`,
    });
  }
}
